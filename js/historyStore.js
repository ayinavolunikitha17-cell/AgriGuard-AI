/* AgriMitra - Multi-Field Management & Treatment Log Repository (LocalStorage) */

const DEFAULT_FIELDS = [
  {
    id: "field_1",
    name: "Field 1 - Green Valley Paddy (వరి)",
    crop: "Rice (Paddy)",
    acres: 2.5,
    sowDate: "2026-06-15",
    soil: "Alluvial Clay Loam",
    location: "Guntur Rural, AP",
    logs: [
      {
        date: "2026-08-05",
        disease: "Rice Leaf Blast",
        treatment: "Tricyclazole 75% WP @ 120g/acre",
        status: "Controlled"
      }
    ]
  },
  {
    id: "field_2",
    name: "Field 2 - Sunrise Chilli (మిర్చి)",
    crop: "Chilli / Pepper",
    acres: 1.5,
    sowDate: "2026-07-01",
    soil: "Red Sandy Loam",
    location: "Warangal Urban, TS",
    logs: [
      {
        date: "2026-08-01",
        disease: "Chilli Leaf Curl Virus",
        treatment: "Fipronil 5% SC @ 400ml/acre",
        status: "Under Monitoring"
      }
    ]
  }
];

class AgriHistoryStore {
  constructor() {
    this.storageKey = 'agrimitra_fields_v1';
    this.fields = this.loadFields();
    this.activeFieldId = this.fields[0]?.id || "field_1";
  }

  loadFields() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn("Could not access localStorage:", e);
    }
    return DEFAULT_FIELDS;
  }

  saveFields() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.fields));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  }

  getFields() {
    return this.fields;
  }

  getActiveField() {
    return this.fields.find(f => f.id === this.activeFieldId) || this.fields[0];
  }

  setActiveField(fieldId) {
    this.activeFieldId = fieldId;
  }

  addField(name, crop, acres, soil) {
    const newField = {
      id: "field_" + Date.now(),
      name: name || `Field ${this.fields.length + 1} - ${crop}`,
      crop: crop || "General Crop",
      acres: parseFloat(acres) || 1.0,
      sowDate: new Date().toISOString().split('T')[0],
      soil: soil || "Black Soil",
      location: "Local Farm",
      logs: []
    };
    this.fields.push(newField);
    this.activeFieldId = newField.id;
    this.saveFields();
    return newField;
  }

  addScanLog(fieldId, diagnosisName, treatment) {
    const field = this.fields.find(f => f.id === fieldId);
    if (field) {
      field.logs.unshift({
        date: new Date().toISOString().split('T')[0],
        disease: diagnosisName,
        treatment: treatment,
        status: "Applied Today"
      });
      this.saveFields();
    }
  }

  calculateDosage(acres, chemicalGramPerLiter = 0.6, waterLitersPerAcre = 200) {
    const totalWater = acres * waterLitersPerAcre;
    const totalChemical = totalWater * chemicalGramPerLiter;
    return {
      waterLiters: totalWater,
      chemicalAmount: totalChemical.toFixed(1)
    };
  }
}

const historyStore = new AgriHistoryStore();
