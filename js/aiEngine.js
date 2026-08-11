/* AgriMitra - AI Crop Doctor Vision & Diagnosis Simulation Engine */

const CROP_DISEASE_DB = {
  rice_blast: {
    id: "rice_blast",
    crop: "Rice (Paddy)",
    name: "Rice Leaf Blast (Pyricularia oryzae)",
    name_te: "వరి అగ్గి తెగులు (బ్లాస్ట్)",
    name_hi: "धान का झुलसा रोग (ब्लास्ट)",
    severity: "High",
    confidence: 94,
    type: "Fungal Disease",
    symptoms: "Spindle/eye-shaped spots with gray center & reddish-brown margins on leaf blades.",
    heatmapBoxes: [
      { x: 30, y: 25, w: 22, h: 18, label: "Lesion Spore Cluster #1" },
      { x: 55, y: 48, w: 28, h: 20, label: "Necrotic Center #2" }
    ],
    curativeAction: "Spray Tricyclazole 75% WP @ 0.6 g/liter of water OR Isoprothiolane 40% EC @ 1.5 ml/liter.",
    curativeAction_te: "ట్రైసైక్లాజోల్ 75% WP నీటికి 0.6 గ్రాములు లేదా ఐసోప్రోథియోలేన్ 40% EC 1.5 మి.లీ లీటరు నీటిలో కలిపి పిచికారీ చేయండి.",
    curativeAction_hi: "ट्राईसाइकलाज़ोल 75% WP 0.6 ग्राम/लीटर या आइसोप्रोथिओलेन 40% EC 1.5 मिली/लीटर पानी में मिलाकर छिड़कें।",
    dosagePerAcre: "120 grams Tricyclazole in 200 Liters of water per acre.",
    dosagePerAcre_te: "ఎకరానికి 120 గ్రాముల ట్రైసైక్లాజోల్ 200 లీటర్ల నీటిలో కదపాలి.",
    dosagePerAcre_hi: "प्रति एकड़ 120 ग्राम ट्राईसाइकलाज़ोल 200 लीटर पानी में मिलाकर।",
    humidityRiskThreshold: 75,
    windRiskMax: 12
  },

  chili_curl: {
    id: "chili_curl",
    crop: "Chilli / Pepper",
    name: "Chilli Leaf Curl Virus (ChLCV / Begomovirus)",
    name_te: "మిర్చి ఆకు ముడత (తామర పురుగులు/తెల్ల ఈగ వల్ల)",
    name_hi: "मिर्च का पर्ण कुंचन रोग (लीफ कर्ल)",
    severity: "Moderate to High",
    confidence: 91,
    type: "Viral & Sucking Pest Vector",
    symptoms: "Upward leaf curling, stunting, puckering, and vein thickening spread by Whiteflies & Thrips.",
    heatmapBoxes: [
      { x: 20, y: 15, w: 40, h: 35, label: "Leaf Curling Puckering" },
      { x: 60, y: 55, w: 25, h: 25, label: "Whitefly Nymph Spores" }
    ],
    curativeAction: "Spray Fipronil 5% SC @ 2 ml/liter OR Thiamethoxam 25% WG @ 0.4 g/liter + Yellow Sticky Traps (10/acre).",
    curativeAction_te: "ఫిప్రోనిల్ 5% SC నీటికి 2 మి.లీ లేదా థయామెథాక్సమ్ 25% WG 0.4 గ్రా/లీటర్ చొప్పున పిచికారీ చేయండి. ఎకరానికి 10 పసుపు అట్టలు పెట్టండి.",
    curativeAction_hi: "फिप्रोनिल 5% SC 2 मिली/लीटर या थियामेथॉक्सम 25% WG 0.4 ग्राम/लीटर का छिड़काव करें + पीले चिपचिपे कार्ड लगाएं।",
    dosagePerAcre: "400 ml Fipronil in 200 Liters of water per acre.",
    dosagePerAcre_te: "ఎకరానికి 400 మి.లీ ఫిప్రోనిల్ 200 లీటర్ల నీటిలో చల్లాలి.",
    dosagePerAcre_hi: "प्रति एकड़ 400 मिली फिप्रोनिल 200 लीटर पानी में।",
    humidityRiskThreshold: 70,
    windRiskMax: 15
  },

  healthy: {
    id: "healthy",
    crop: "Rice / Cotton / General",
    name: "Healthy Plant Foliage (No Pest/Disease Detected)",
    name_te: "ఆరోగ్యకరమైన పంట (ఎటువంటి తెగులు లేదు)",
    name_hi: "स्वस्थ पौधा (कोई रोग नहीं पाया गया)",
    severity: "None",
    confidence: 97,
    type: "Healthy Crop",
    symptoms: "Lush green leaves, optimal chlorophyll vigor index, robust stem integrity.",
    heatmapBoxes: [],
    curativeAction: "Maintain scheduled irrigation & top dress Nitrogen (Urea @ 25 kg/acre) at panicle initiation stage.",
    curativeAction_te: "క్రమమైన నీటి పారుదల అందించండి. యూరియా ఎకరానికి 25 కేజీలు చల్లండి.",
    curativeAction_hi: "नियमित सिंचाई जारी रखें। प्रति एकड़ 25 किग्रा यूरिया की शीर्ष खुराक दें।",
    dosagePerAcre: "Balanced NPK maintenance.",
    dosagePerAcre_te: "సమతుల్య NPK ఎరువులు సరిపోతాయి.",
    dosagePerAcre_hi: "संतुलित NPK पोषण जारी रखें।",
    humidityRiskThreshold: 90,
    windRiskMax: 20
  }
};

class AgriAiVisionEngine {
  constructor() {
    this.currentDiagnosis = CROP_DISEASE_DB.rice_blast;
  }

  analyzeImage(imageElement, sampleId = null) {
    if (sampleId && CROP_DISEASE_DB[sampleId]) {
      this.currentDiagnosis = CROP_DISEASE_DB[sampleId];
    } else {
      // Default to rice blast or alternate diagnosis based on randomness for demo photos
      const keys = Object.keys(CROP_DISEASE_DB);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      this.currentDiagnosis = CROP_DISEASE_DB[randomKey];
    }
    return this.currentDiagnosis;
  }

  getCurrentDiagnosis() {
    return this.currentDiagnosis;
  }
}

const aiVisionEngine = new AgriAiVisionEngine();
