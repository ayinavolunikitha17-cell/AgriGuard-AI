/* AgriMitra - Central Recommendation Engine & "Can I Act Now?" Activity Readiness Calculator */

class AgriRecommendationEngine {
  generateRecommendation(diagnosis, weather, userVoiceQuery = "") {
    const lang = currentLang;
    const isTe = lang === 'te';
    const isHi = lang === 'hi';

    const wind = weather.windSpeed;
    const rainProb = weather.rainProb;
    const humidity = weather.humidity;
    const temp = weather.temp;

    // 1. WHAT IS THE ISSUE?
    let whatText = "";
    if (diagnosis.id === 'healthy') {
      whatText = isTe 
        ? `మీ ${diagnosis.crop} పంట ఆరోగ్యకరంగా ఉంది. తెగుళ్లు లేవు. పొలం తేమ ${weather.soilMoisture}% ఉంది.`
        : isHi 
        ? `आपकी ${diagnosis.crop} फसल स्वस्थ है। कोई रोग नहीं है। नमी ${weather.soilMoisture}% है।`
        : `Your ${diagnosis.crop} crop is healthy with clean foliage. Current soil moisture is ${weather.soilMoisture}%.`;
    } else {
      const diagName = isTe ? diagnosis.name_te : isHi ? diagnosis.name_hi : diagnosis.name;
      whatText = isTe 
        ? `${diagName} గుర్తించబడింది (తీవ్రత: ${diagnosis.severity}, AI నమ్మకం: ${diagnosis.confidence}%). వాతావరణ తేమ ${humidity}% తెగులు వ్యాప్తికి అనుకూలంగా ఉంది.`
        : isHi 
        ? `${diagName} पाया गया है (तीव्रता: ${diagnosis.severity}, AI सटीकता: ${diagnosis.confidence}%)। हवा में नमी ${humidity}% रोग फैलने के लिए अनुकूल है।`
        : `${diagName} detected (Severity: ${diagnosis.severity}, AI Confidence: ${diagnosis.confidence}%). High humidity of ${humidity}% accelerates spore spread.`;
    }

    // 2. RECOMMENDED ACTION
    let actionText = isTe ? diagnosis.curativeAction_te : isHi ? diagnosis.curativeAction_hi : diagnosis.curativeAction;

    // 3. WHEN TO ACT (BEST WINDOW)
    let whenText = "";
    if (wind > 14) {
      whenText = isTe 
        ? `ప్రస్తుతం గాలి వేగం ${wind} km/h ఉంది (ఎక్కువ). సాయంత్రం 4:00 PM తర్వాత గాలి తగ్గేవరకు వేచి ఉండండి.`
        : isHi 
        ? `अभी हवा की गति ${wind} किमी/घंटा है। आज शाम 4:00 बजे के बाद छिड़काव करें जब हवा धीमी हो।`
        : `Wind speed is currently high (${wind} km/h). Wait until 4:30 PM today when wind drops < 10 km/h.`;
    } else if (rainProb > 30) {
      whenText = isTe 
        ? `ముందున్న 6 గంటల్లో వర్షం అవకాశం ${rainProb}% ఉంది. వర్షం వెలిసిన తర్వాత లేదా రేపు ఉదయం 7-10 గంటల మధ్య చల్లండి.`
        : isHi 
        ? `अगले 6 घंटों में बारिश की संभावना ${rainProb}% है। बारिश रुकने के बाद या कल सुबह 7-10 बजे छिड़कें।`
        : `Rain probability is ${rainProb}% in next 6 hours. Delay spraying until dry window tomorrow 7:00 AM – 10:30 AM.`;
    } else {
      whenText = isTe 
        ? `ఈరోజు వాతావరణం అనుకూలంగా ఉంది! ఈరోజు సాయంత్రం 3:30 PM నుండి 6:00 PM మధ్య మందు పిచికారీ చేయడానికి ఉత్తమ సమయం.`
        : isHi 
        ? `आज मौसम बहुत अनुकूल है! आज शाम 3:30 बजे से 6:00 बजे के बीच छिड़काव के लिए उत्तम समय है।`
        : `Weather is safe! Best spraying window is TODAY between 3:30 PM and 6:00 PM.`;
    }

    // 4. WHY THIS RECOMMENDATION?
    let explainText = "";
    if (diagnosis.id === 'healthy') {
      explainText = isTe
        ? `పంటలో మచ్చలు లేవు. అనవసరంగా రసాయనాలు చల్లితే నాణ్యత తగ్గి ఖర్చు పెరుగుతుంది.`
        : isHi 
        ? `फसल में कोई रोग नहीं है। अनावश्यक दवा छिड़कने से लागत बढ़ती है और मित्र कीट मरते हैं।`
        : `No active disease found. Unnecessary chemical sprays waste money and harm beneficial insects.`;
    } else {
      explainText = isTe 
        ? `మంచు లేదా వర్షంలో పిచికారీ చేస్తే మందు కొట్టుకుపోతుంది. తేమ ${humidity}% మరియు గాలి ${wind} km/h ఉన్నప్పుడు పిచికారీ చేస్తే మందు ఆకులపై సమర్థవంతంగా పనిచేస్తుంది.`
        : isHi 
        ? `तेज हवा में दवा उड़ जाती है और बारिश में धुल जाती है। शाम को छिड़काव करने से दवा पत्तियों पर पूरी तरह अवशोषित होती है।`
        : `Spraying during windy (>12km/h) or rainy weather causes chemical drift & wash-off. Evening spraying ensures max leaf absorption.`;
    }

    return {
      what: whatText,
      action: actionText,
      when: whenText,
      explain: explainText,
      fullSpeechText: `${whatText}. ${actionText}. ${whenText}. ${explainText}`
    };
  }

  calculateCanIActNow(weather) {
    const wind = weather.windSpeed;
    const rain = weather.rainProb;
    const humidity = weather.humidity;
    const soil = weather.soilMoisture;

    // 1. Spraying Readiness
    let sprayStatus = "safe";
    let sprayWindow = "Today 3:30 PM - 6:00 PM";
    if (wind > 15 || rain > 45) {
      sprayStatus = "unsafe";
      sprayWindow = "Unsafe! High wind/rain threat.";
    } else if (wind > 10 || rain > 20) {
      sprayStatus = "caution";
      sprayWindow = "Marginal window. Use drift nozzle.";
    }

    // 2. Irrigation Readiness
    let irrigateStatus = "safe";
    let irrigateWindow = "Normal 2-inch standing water";
    if (rain > 40 || soil > 75) {
      irrigateStatus = "unsafe";
      irrigateWindow = "HOLD! Rain expected & soil moist.";
    } else if (soil > 60) {
      irrigateStatus = "caution";
      irrigateWindow = "Light irrigation only if needed.";
    }

    // 3. Fertilizer Readiness
    let fertStatus = "safe";
    let fertWindow = "Apply Urea/DAP before 5 PM";
    if (rain > 50) {
      fertStatus = "unsafe";
      fertWindow = "HOLD! Heavy rain will wash fertilizer.";
    } else if (rain > 25) {
      fertStatus = "caution";
      fertWindow = "Incorporate into soil quickly.";
    }

    // 4. Harvesting Readiness
    let harvestStatus = "safe";
    let harvestWindow = "Dry sunny forecast for 48 hrs";
    if (rain > 25 || humidity > 85) {
      harvestStatus = "unsafe";
      harvestWindow = "Delay harvest due to moisture risk.";
    }

    return {
      spraying: { status: sprayStatus, window: sprayWindow },
      irrigation: { status: irrigateStatus, window: irrigateWindow },
      fertilizer: { status: fertStatus, window: fertWindow },
      harvesting: { status: harvestStatus, window: harvestWindow }
    };
  }

  generateTodayTasks(weather, diagnosis) {
    const isTe = currentLang === 'te';
    const isHi = currentLang === 'hi';

    const tasks = [
      {
        id: 1,
        title: isTe ? "పొలంలో డ్రైనేజీ కాల్వలు శుభ్రం చేయండి" : isHi ? "खेत की निकास नालियों की सफाई करें" : "Inspect field drainage channels for smooth water outflow",
        urgent: weather.rainProb > 30,
        done: false
      },
      {
        id: 2,
        title: isTe ? `పంట ఆకులను పరిశీలించండి (${diagnosis.crop})` : isHi ? `फसल की पत्तियों का निरीक्षण करें (${diagnosis.crop})` : `Check leaf undersides for pests in ${diagnosis.crop}`,
        urgent: diagnosis.id !== 'healthy',
        done: false
      },
      {
        id: 3,
        title: isTe ? "పసుపు జిగురు అట్టలు (Yellow Traps) సరిచూడండి" : isHi ? "पीले चिपचिपे कार्ड जांचें" : "Check Yellow Sticky Traps for whiteflies/thrips population count",
        urgent: false,
        done: true
      },
      {
        id: 4,
        title: isTe ? "సాయంత్రం 4 గంటలకు నీటి మట్టం పరిశీలించండి" : isHi ? "शाम 4 बजे पानी का स्तर जांचें" : "Record soil moisture level at 4:00 PM before evening decision",
        urgent: false,
        done: false
      }
    ];

    return tasks;
  }
}

const recommendationEngine = new AgriRecommendationEngine();
