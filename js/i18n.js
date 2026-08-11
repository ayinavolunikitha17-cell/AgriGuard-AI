/* AgriMitra - Multi-Lingual Internationalization Engine (EN, TE, HI) */

const i18nData = {
  en: {
    appTitle: "AgriMitra",
    appTagline: "AI Farmer Assistant • Voice & Photo Guided",
    simpleMode: "Simple Mode",
    expertMode: "Expert Mode",
    fieldLabel: "Active Field:",
    helpVoiceBtn: "Help Read Page",
    
    // Navigation Tabs
    tabDoctor: "🩺 Crop Doctor",
    tabCanIAct: "⚡ Can I Act Now?",
    tabToday: "📋 Today's Tasks",
    tabFields: "🌾 My Fields & Logs",
    tabExpert: "👨‍🌾 KVK Expert",

    // Audio Bar
    audioPlaying: "Playing Audio Recommendation...",
    audioPaused: "Audio Paused",
    btnListen: "🔊 Listen Recommendation",

    // Crop Doctor Photo Section
    cropDoctorTitle: "Crop Doctor - Photo & AI Diagnosis",
    uploadPrompt: "Tap to Take Photo or Drag & Drop Crop Image",
    uploadSub: "Supports leaf, fruit, stem photos (JPG, PNG)",
    btnCamera: "📷 Take Camera Photo",
    samplePhotosLabel: "Or select a sample disease photo:",
    sampleBlast: "Rice Leaf Blast",
    sampleCurl: "Chilli Leaf Curl",
    sampleHealthy: "Healthy Paddy",
    scanBtn: "🔍 Analyze Photo with AI",
    scanningText: "Analyzing plant features, lesions, & leaf symptoms...",

    // Central Recommendation Engine (WHAT -> ACTION -> WHEN -> EXPLAIN)
    recEngineTitle: "AgriMitra Central Recommendation",
    whatLabel: "1. WHAT IS THE ISSUE?",
    actionLabel: "2. RECOMMENDED ACTION",
    whenLabel: "3. WHEN TO ACT (BEST WINDOW)",
    explainLabel: "4. WHY THIS RECOMMENDATION?",

    // "Can I Act Now?" Matrix
    canIActTitle: "Can I Act Now? Field Activity Readiness",
    actSub: "Calculated based on current wind, humidity, rain forecast & soil state.",
    actSpraying: "Pesticide / Fungicide Spraying",
    actIrrigation: "Field Irrigation",
    actFertilizer: "Fertilizer Application",
    actHarvesting: "Harvesting & Drying",
    statusSafe: "SAFE TO ACT",
    statusCaution: "USE CAUTION",
    statusUnsafe: "DO NOT ACT NOW",
    windowLabel: "Safe Window:",

    // Weather Metrics
    weatherTitle: "Live Weather & Microclimate",
    tempLabel: "Temperature",
    humidityLabel: "Humidity",
    rainProbLabel: "Rain Probability",
    windLabel: "Wind Speed",
    soilLabel: "Soil Moisture",

    // Voice Query
    voiceTitle: "Ask AgriMitra by Voice",
    voicePlaceholder: "Tap microphone and speak in English, Telugu, or Hindi...",
    quickVoices: "Quick Questions:",
    q1: "Should I spray pesticide today?",
    q2: "When to irrigate paddy field?",
    q3: "How to cure chilli leaf curl?",

    // Today Tasks & Risk Alerts
    todayTitle: "What Should I Do Today?",
    alertTitle: "⚡ Early Crop Risk Warning",

    // Expert Mode Additions
    confidenceLabel: "AI Confidence Score:",
    chemicalDosageTitle: "Chemical Dosage Calculator per Acre",
    acresLabel: "Field Size (Acres):",
    waterNeeded: "Water Needed (Liters):",
    chemicalNeeded: "Chemical Required (Grams/ml):",

    // Multi-Field & Log
    myFieldsTitle: "Multi-Field Management & Treatment History",
    addNewField: "+ Add New Field",
    treatmentLog: "Past Diagnoses & Spray Logs",

    // Expert Escalation
    kvkTitle: "Escalate to Agricultural Expert (KVK)",
    kvkDesc: "Send field scan, location weather, and symptoms to local Krishi Officer.",
    btnCallKVK: "📞 Call Helpline (1800-180-1551)",
    btnExportPDF: "📄 Export Field Health Report (PDF/Print)",
  },

  te: {
    appTitle: "అగ్రిమిత్ర",
    appTagline: "రైతు AI సహాయకుడు • వాయిస్ & ఫోటో మార్గదర్శి",
    simpleMode: "సులభ మోడ్",
    expertMode: "నిపుణుల మోడ్",
    fieldLabel: "ప్రస్తుత పొలం:",
    helpVoiceBtn: "వాయిస్ సహాయం",

    // Navigation Tabs
    tabDoctor: "🩺 పంట డాక్టర్",
    tabCanIAct: "⚡ ఇప్పుడు చేయవచ్చా?",
    tabToday: "📋 ఈరోజు పనులు",
    tabFields: "🌾 నా పొలాలు & రికార్డులు",
    tabExpert: "👨‍🌾 కృషి అధికారి",

    // Audio Bar
    audioPlaying: "ఆడియో సూచన వింటున్నారు...",
    audioPaused: "ఆడియో ఆపబడింది",
    btnListen: "🔊 ఆడియో వినండి",

    // Crop Doctor Photo Section
    cropDoctorTitle: "పంట డాక్టర్ - ఫోటో AI నిర్ధారణ",
    uploadPrompt: "ఫోటో తీయడానికి తాకండి లేదా ఇక్కడ వేయండి",
    uploadSub: "ఆకులు, కాయల ఫోటోలను సపోర్ట్ చేస్తుంది",
    btnCamera: "📷 కెమెరాతో ఫోటో తీయి",
    samplePhotosLabel: "లేదా ఈ నమూనా వ్యాధి ఫోటో ఎంచుకోండి:",
    sampleBlast: "వరి అగ్గి తెగులు",
    sampleCurl: "మిర్చి ఆకు ముడత",
    sampleHealthy: "ఆరోగ్యకరమైన వరి",
    scanBtn: "🔍 AI తో ఫోటో పరీక్షించండి",
    scanningText: "ఆకు మచ్చలు, రంగు మార్పులు AI విశ్లేషిస్తోంది...",

    // Central Recommendation Engine
    recEngineTitle: "అగ్రిమిత్ర ముఖ్య సిఫార్సు",
    whatLabel: "1. ఏమి సమస్య ఉంది?",
    actionLabel: "2. చేయాల్సిన పని (పరిష్కారం)",
    whenLabel: "3. ఎప్పుడు చేయాలి (సరైన సమయం)",
    explainLabel: "4. ఎందుకు ఈ సమయం ఎంచుకున్నాం?",

    // "Can I Act Now?" Matrix
    canIActTitle: "ఇప్పుడు ఈ పని చేయవచ్చా?",
    actSub: "ప్రస్తుత గాలి వేగం, వర్ష సూచన మరియు గాలి తేమ ఆధారంగా.",
    actSpraying: "మందుల పిచికారీ (స్ప్రే)",
    actIrrigation: "పొలానికి నీరు పెట్టడం",
    actFertilizer: "ఎరువులు వేయడం",
    actHarvesting: "పంట కోత / ఆరబెట్టడం",
    statusSafe: "చేయవచ్చు (సురక్షితం)",
    statusCaution: "జాగ్రత్తగా చేయండి",
    statusUnsafe: "ఇప్పుడు చేయవద్దు (ప్రమాదం)",
    windowLabel: "అనుకూల సమయం:",

    // Weather Metrics
    weatherTitle: "వాతావరణం & గాలి వివరాలు",
    tempLabel: "ఉష్ణోగ్రత",
    humidityLabel: "గాలి తేమ",
    rainProbLabel: "వర్షం అవకాశం",
    windLabel: "గాలి వేగం",
    soilLabel: "నేల తేమ",

    // Voice Query
    voiceTitle: "నోటితో అడగండి (వాయిస్)",
    voicePlaceholder: "మైక్ నొక్కి తెలుగు, ఇంగ్లీష్ లేదా హిందీలో మాట్లాడండి...",
    quickVoices: "త్వరిత ప్రశ్నలు:",
    q1: "ఈరోజు పిచికారీ చేయవచ్చా?",
    q2: "వరికి నీరు ఎప్పుడు పెట్టాలి?",
    q3: "మిర్చి ఆకు ముడత నివారణ ఎలా?",

    // Today Tasks & Risk Alerts
    todayTitle: "ఈరోజు పొలంలో చేయాల్సిన పనులు",
    alertTitle: "⚡ ముందస్తు తెగులు ప్రమాద హెచ్చరిక",

    // Expert Mode Additions
    confidenceLabel: "AI ఖచ్చితత్వం:",
    chemicalDosageTitle: "ఎకరానికి మందు మోతాదు లెక్కింపు",
    acresLabel: "పొలం వైశాల్యం (ఎకరాలు):",
    waterNeeded: "కావలసిన నీరు (లీటర్లు):",
    chemicalNeeded: "కావలసిన మందు (గ్రాములు/మి.లీ):",

    // Multi-Field & Log
    myFieldsTitle: "నా పొలాలు & పిచికారీ రికార్డులు",
    addNewField: "+ కొత్త పొలం చేర్చు",
    treatmentLog: "గత పరీక్షల రికార్డులు",

    // Expert Escalation
    kvkTitle: "కృషి విజ్ఞాన కేంద్రం (KVK) అధికారికి పంపండి",
    kvkDesc: "మీ పొలం ఫోటో మరియు వివరాలను కృషి అధికారికి పంపండి.",
    btnCallKVK: "📞 టోల్ ఫ్రీ నంబర్ (1800-180-1551)",
    btnExportPDF: "📄 రిపోర్ట్ డౌన్‌లోడ్ / ప్రింట్",
  },

  hi: {
    appTitle: "एग्रिमित्र",
    appTagline: "किसान AI सहायक • आवाज और फोटो मार्गदर्शन",
    simpleMode: "सरल मोड",
    expertMode: "विशेषज्ञ मोड",
    fieldLabel: "वर्तमान खेत:",
    helpVoiceBtn: "आवाज सहायता",

    // Navigation Tabs
    tabDoctor: "🩺 फसल डॉक्टर",
    tabCanIAct: "⚡ क्या अभी काम करें?",
    tabToday: "📋 आज के कार्य",
    tabFields: "🌾 मेरे खेत और रिकॉर्ड",
    tabExpert: "👨‍🌾 कृषि विशेषज्ञ",

    // Audio Bar
    audioPlaying: "ऑडियो सलाह सुन रहे हैं...",
    audioPaused: "ऑडियो रुका हुआ है",
    btnListen: "🔊 सलाह सुनें",

    // Crop Doctor Photo Section
    cropDoctorTitle: "फसल डॉक्टर - फोटो AI जांच",
    uploadPrompt: "फोटो खींचने के लिए टैप करें या यहां लाएं",
    uploadSub: "पत्तियों और फलों की फोटो (JPG, PNG)",
    btnCamera: "📷 कैमरे से फोटो लें",
    samplePhotosLabel: "या यह नमूना रोग फोटो चुनें:",
    sampleBlast: "धान झुलसा रोग",
    sampleCurl: "मिर्च पर्ण कुंचन",
    sampleHealthy: "स्वस्थ धान",
    scanBtn: "🔍 AI से जांच करें",
    scanningText: "पत्तियों के धब्बों और लक्षणों का विश्लेषण जारी है...",

    // Central Recommendation Engine
    recEngineTitle: "एग्रिमित्र मुख्य सलाह",
    whatLabel: "1. समस्या क्या है?",
    actionLabel: "2. क्या उपाय करें?",
    whenLabel: "3. सही समय कब है?",
    explainLabel: "4. यह सलाह क्यों दी गई?",

    // "Can I Act Now?" Matrix
    canIActTitle: "क्या मैं अभी यह काम कर सकता हूँ?",
    actSub: "हवा की गति, बारिश की संभावना और नमी के आधार पर।",
    actSpraying: "कीटनाशक / फफूंदनाशक का छिड़काव",
    actIrrigation: "खेत की सिंचाई",
    actFertilizer: "खाद डालना",
    actHarvesting: "फसल कटाई व सुखाना",
    statusSafe: "कर सकते हैं (सुरक्षित)",
    statusCaution: "सावधानी से करें",
    statusUnsafe: "अभी न करें (जोखिम)",
    windowLabel: "उत्तम समय:",

    // Weather Metrics
    weatherTitle: "मौसम और हवा की जानकारी",
    tempLabel: "तापमान",
    humidityLabel: "हवा की नमी",
    rainProbLabel: "बारिश की संभावना",
    windLabel: "हवा की गति",
    soilLabel: "मृदा नमी",

    // Voice Query
    voiceTitle: "बोलकर पूछें (आवाज)",
    voicePlaceholder: "माइक दबाएं और हिंदी, तेलुगु या अंग्रेजी में बोलें...",
    quickVoices: "त्वरित प्रश्न:",
    q1: "क्या आज दवाई का छिड़काव करें?",
    q2: "धान में पानी कब लगाएं?",
    q3: "मिर्च का मरोड़िया रोग कैसे रोकें?",

    // Today Tasks & Risk Alerts
    todayTitle: "आज खेत में क्या करना है?",
    alertTitle: "⚡ रोग चेतावनी",

    // Expert Mode Additions
    confidenceLabel: "AI सटीकता:",
    chemicalDosageTitle: "प्रति एकड़ दवा की खुराक गणना",
    acresLabel: "खेत का आकार (एकड़):",
    waterNeeded: "आवश्यक पानी (लीटर):",
    chemicalNeeded: "आवश्यक दवा (ग्राम/मिली):",

    // Multi-Field & Log
    myFieldsTitle: "मेरे खेत और छिड़काव इतिहास",
    addNewField: "+ नया खेत जोड़ें",
    treatmentLog: "पुराने उपचार का रिकॉर्ड",

    // Expert Escalation
    kvkTitle: "कृषि विज्ञान केंद्र (KVK) विशेषज्ञ से संपर्क",
    kvkDesc: "अपने खेत की फोटो और विवरण कृषि अधिकारी को भेजें।",
    btnCallKVK: "📞 टोल फ्री नंबर (1800-180-1551)",
    btnExportPDF: "📄 रिपोर्ट डाउनलोड / प्रिंट करें",
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  if (!i18nData[lang]) lang = 'en';
  currentLang = lang;
  document.documentElement.lang = lang;
  
  // Translate elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nData[lang][key]) {
      el.textContent = i18nData[lang][key];
    }
  });

  // Translate placeholders with data-i18n-ph
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (i18nData[lang][key]) {
      el.placeholder = i18nData[lang][key];
    }
  });
}

function getText(key) {
  return i18nData[currentLang]?.[key] || i18nData['en'][key] || key;
}
