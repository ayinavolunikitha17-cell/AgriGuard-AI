/* AgriMitra - Main Application Controller & UI Event Dispatcher */

let currentTab = 'doctor';
let isSimpleMode = false;
let activeRecommendation = null;

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // 1. Setup Language
  setLanguage('en');

  // 2. Setup Fields Dropdown
  renderFieldsDropdown();

  // 3. Render Initial Weather Data
  updateWeatherUI(weatherEngine.getCurrentWeather());

  // 4. Run Initial AI Scan with default sample (Rice Blast)
  runAiScan('rice_blast');

  // 5. Setup UI Event Listeners
  bindEvents();
}

function bindEvents() {
  // Navigation Tabs
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tab = e.currentTarget.getAttribute('data-tab');
      switchTab(tab);
    });
  });

  // Mode Toggle (Simple / Expert)
  document.getElementById('btnSimpleMode')?.addEventListener('click', () => setAppMode(true));
  document.getElementById('btnExpertMode')?.addEventListener('click', () => setAppMode(false));

  // Language Selector
  document.getElementById('langSelect')?.addEventListener('change', (e) => {
    setLanguage(e.target.value);
    refreshRecommendationDisplay();
  });

  // Field Selector
  document.getElementById('fieldSelect')?.addEventListener('change', (e) => {
    if (e.target.value === 'add_new') {
      promptAddNewField();
    } else {
      historyStore.setActiveField(e.target.value);
      renderFieldsLogs();
    }
  });

  // Sample Disease Photos Click
  document.querySelectorAll('.sample-photo-thumb').forEach(img => {
    img.addEventListener('click', (e) => {
      document.querySelectorAll('.sample-photo-thumb').forEach(i => i.classList.remove('selected'));
      e.currentTarget.classList.add('selected');
      const sampleId = e.currentTarget.getAttribute('data-sample');
      runAiScan(sampleId);
    });
  });

  // File Upload Dropzone
  const uploadZone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('cropFileInput');

  uploadZone?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleCustomPhotoUpload(e.target.files[0]);
    }
  });

  // Drag and Drop
  uploadZone?.addEventListener('dragover', (e) => e.preventDefault());
  uploadZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleCustomPhotoUpload(e.dataTransfer.files[0]);
    }
  });

  // Camera Capture Button
  document.getElementById('btnCameraCapture')?.addEventListener('click', openCameraModal);
  document.getElementById('btnCloseCameraModal')?.addEventListener('click', closeCameraModal);
  document.getElementById('btnSnapPhoto')?.addEventListener('click', snapCameraPhoto);

  // Audio Play Recommendation Button
  document.getElementById('audioPlayBtn')?.addEventListener('click', () => {
    if (activeRecommendation) {
      voiceEngine.togglePlayPause(activeRecommendation.fullSpeechText);
    }
  });

  document.getElementById('btnListenRecMain')?.addEventListener('click', () => {
    if (activeRecommendation) {
      voiceEngine.speak(activeRecommendation.fullSpeechText);
    }
  });

  // Voice Mic Input Button
  document.getElementById('micBtn')?.addEventListener('click', () => {
    voiceEngine.startListening((spokenText) => {
      const voiceInputText = document.getElementById('voiceInputText');
      if (voiceInputText) voiceInputText.value = spokenText;
      processVoiceQuery(spokenText);
    });
  });

  // Voice Query Quick Chips
  document.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const q = e.currentTarget.innerText;
      const voiceInputText = document.getElementById('voiceInputText');
      if (voiceInputText) voiceInputText.value = q;
      processVoiceQuery(q);
    });
  });

  // Weather Region Selector
  document.getElementById('regionSelect')?.addEventListener('change', (e) => {
    if (e.target.value === 'gps') {
      requestGpsLocation();
    } else {
      const wData = weatherEngine.setRegion(e.target.value);
      updateWeatherUI(wData);
      refreshRecommendationDisplay();
    }
  });

  // Chemical Acreage Input Change (Expert Mode)
  document.getElementById('inputAcres')?.addEventListener('input', (e) => {
    updateDosageCalculation(parseFloat(e.target.value) || 1.0);
  });

  // Help Read Page Button
  document.getElementById('btnHelpRead')?.addEventListener('click', () => {
    if (activeRecommendation) {
      voiceEngine.speak(activeRecommendation.fullSpeechText);
    }
  });

  // Export PDF / Print
  document.getElementById('btnExportReport')?.addEventListener('click', () => {
    window.print();
  });
}

function switchTab(tabName) {
  currentTab = tabName;
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-tab') === tabName);
  });

  document.querySelectorAll('.tab-content-page').forEach(page => {
    page.style.display = page.id === `page_${tabName}` ? 'block' : 'none';
  });

  if (tabName === 'fields') {
    renderFieldsLogs();
  }
}

function setAppMode(simple) {
  isSimpleMode = simple;
  document.body.classList.toggle('simple-mode', simple);
  document.body.classList.toggle('expert-mode', !simple);

  document.getElementById('btnSimpleMode')?.classList.toggle('active', simple);
  document.getElementById('btnExpertMode')?.classList.toggle('active', !simple);
}

function runAiScan(sampleId = null, customImgSrc = null) {
  const scanOverlay = document.getElementById('scanOverlay');
  const mainPreviewImg = document.getElementById('mainPreviewImg');

  // Trigger Scanning Overlay
  if (scanOverlay) scanOverlay.classList.add('active');

  if (customImgSrc && mainPreviewImg) {
    mainPreviewImg.src = customImgSrc;
  } else if (sampleId && mainPreviewImg) {
    if (sampleId === 'rice_blast') mainPreviewImg.src = 'assets/samples/rice_blast.png';
    else if (sampleId === 'chili_curl') mainPreviewImg.src = 'assets/samples/chili_leaf_curl.png';
    else if (sampleId === 'healthy') mainPreviewImg.src = 'assets/samples/healthy_paddy.png';
  }

  // Simulate 1.5s AI analysis sweep
  setTimeout(() => {
    if (scanOverlay) scanOverlay.classList.remove('active');
    const diagnosis = aiVisionEngine.analyzeImage(null, sampleId);
    renderDiagnosisResults(diagnosis);
    refreshRecommendationDisplay();
  }, 1400);
}

function handleCustomPhotoUpload(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    runAiScan(null, e.target.result);
  };
  reader.readAsDataURL(file);
}

function renderDiagnosisResults(diagnosis) {
  const isTe = currentLang === 'te';
  const isHi = currentLang === 'hi';

  const titleEl = document.getElementById('diagTitle');
  const severityEl = document.getElementById('diagSeverity');
  const confidenceEl = document.getElementById('diagConfidence');

  if (titleEl) titleEl.innerText = isTe ? diagnosis.name_te : isHi ? diagnosis.name_hi : diagnosis.name;
  if (severityEl) severityEl.innerText = diagnosis.severity;
  if (confidenceEl) confidenceEl.innerText = `${diagnosis.confidence}%`;

  // Draw heatmap overlay boxes on canvas if present
  drawHeatmapCanvas(diagnosis);

  // Update Dosage calculation
  const activeField = historyStore.getActiveField();
  updateDosageCalculation(activeField.acres);

  // Save log in history
  historyStore.addScanLog(activeField.id, diagnosis.name, diagnosis.curativeAction);
}

function drawHeatmapCanvas(diagnosis) {
  const canvas = document.getElementById('heatmapCanvas');
  const img = document.getElementById('mainPreviewImg');
  if (!canvas || !img) return;

  const ctx = canvas.getContext('2d');
  canvas.width = img.clientWidth || 300;
  canvas.height = img.clientHeight || 200;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (diagnosis.heatmapBoxes && diagnosis.heatmapBoxes.length > 0) {
    diagnosis.heatmapBoxes.forEach(box => {
      const bx = (box.x / 100) * canvas.width;
      const by = (box.y / 100) * canvas.height;
      const bw = (box.w / 100) * canvas.width;
      const bh = (box.h / 100) * canvas.height;

      // Draw bounding box
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.strokeRect(bx, by, bw, bh);

      // Label background
      ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
      ctx.fillRect(bx, by - 22, bw < 140 ? 140 : bw, 20);

      // Label text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(box.label, bx + 4, by - 8);
    });
  }
}

function refreshRecommendationDisplay() {
  const diagnosis = aiVisionEngine.getCurrentDiagnosis();
  const weather = weatherEngine.getCurrentWeather();
  const voiceInputText = document.getElementById('voiceInputText')?.value || "";

  activeRecommendation = recommendationEngine.generateRecommendation(diagnosis, weather, voiceInputText);

  // Render 4 Central Recommendation Cards (WHAT -> ACTION -> WHEN -> EXPLAIN)
  document.getElementById('recWhat').innerText = activeRecommendation.what;
  document.getElementById('recAction').innerText = activeRecommendation.action;
  document.getElementById('recWhen').innerText = activeRecommendation.when;
  document.getElementById('recExplain').innerText = activeRecommendation.explain;

  // Render "Can I Act Now?" Matrix
  const actNow = recommendationEngine.calculateCanIActNow(weather);
  renderActNowCard('actSpray', actNow.spraying);
  renderActNowCard('actIrrigate', actNow.irrigation);
  renderActNowCard('actFertilizer', actNow.fertilizer);
  renderActNowCard('actHarvest', actNow.harvesting);

  // Render Today's Tasks
  renderTodayTasks(recommendationEngine.generateTodayTasks(weather, diagnosis));
}

function renderActNowCard(elementId, actData) {
  const card = document.getElementById(elementId);
  if (!card) return;

  card.className = `act-card status-${actData.status}`;
  const pill = card.querySelector('.status-pill');
  const windowEl = card.querySelector('.act-window-val');

  if (pill) {
    pill.className = `status-pill ${actData.status}`;
    pill.innerText = actData.status === 'safe' ? getText('statusSafe') : actData.status === 'caution' ? getText('statusCaution') : getText('statusUnsafe');
  }
  if (windowEl) windowEl.innerText = actData.window;
}

function renderTodayTasks(tasks) {
  const container = document.getElementById('todayTasksContainer');
  if (!container) return;

  container.innerHTML = tasks.map(t => `
    <div class="task-item" style="${t.urgent ? 'border-left-color: var(--status-red); background: rgba(239, 68, 68, 0.05);' : ''}">
      <input type="checkbox" class="task-checkbox" ${t.done ? 'checked' : ''} id="task_${t.id}">
      <label for="task_${t.id}" style="font-weight: 600; cursor: pointer; ${t.done ? 'text-decoration: line-through; opacity: 0.7;' : ''}">${t.title}</label>
      ${t.urgent ? '<span class="status-pill unsafe" style="font-size:0.65rem; margin-left:auto;">URGENT</span>' : ''}
    </div>
  `).join('');
}

function updateWeatherUI(w) {
  document.getElementById('wTemp').innerText = `${w.temp}°C`;
  document.getElementById('wHumidity').innerText = `${w.humidity}%`;
  document.getElementById('wRain').innerText = `${w.rainProb}%`;
  document.getElementById('wWind').innerText = `${w.windSpeed} km/h ${w.windDir}`;
  document.getElementById('wSoil').innerText = `${w.soilMoisture}%`;
  document.getElementById('wRegionName').innerText = w.name;
}

function processVoiceQuery(queryText) {
  const diagnosis = aiVisionEngine.getCurrentDiagnosis();
  const weather = weatherEngine.getCurrentWeather();
  activeRecommendation = recommendationEngine.generateRecommendation(diagnosis, weather, queryText);
  
  // Highlight central recommendation engine and speak response
  refreshRecommendationDisplay();
  voiceEngine.speak(activeRecommendation.fullSpeechText);
}

function requestGpsLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const wData = await weatherEngine.fetchLocationWeather(pos.coords.latitude, pos.coords.longitude);
        updateWeatherUI(wData);
        refreshRecommendationDisplay();
      },
      (err) => {
        alert("GPS access denied or unavailable. Using default regional weather.");
      }
    );
  }
}

function updateDosageCalculation(acres) {
  const calc = historyStore.calculateDosage(acres);
  document.getElementById('resWaterLiters').innerText = `${calc.waterLiters} Liters`;
  document.getElementById('resChemicalGram').innerText = `${calc.chemicalAmount} g/ml`;
}

function renderFieldsDropdown() {
  const select = document.getElementById('fieldSelect');
  if (!select) return;

  const fields = historyStore.getFields();
  select.innerHTML = fields.map(f => `<option value="${f.id}">${f.name}</option>`).join('') + `<option value="add_new">${getText('addNewField')}</option>`;
  select.value = historyStore.activeFieldId;
}

function renderFieldsLogs() {
  const container = document.getElementById('fieldLogsContainer');
  const activeField = historyStore.getActiveField();
  if (!container || !activeField) return;

  container.innerHTML = `
    <div style="background: var(--bg-main); padding: 16px; border-radius: var(--radius-md); margin-bottom: 16px;">
      <h3 style="color: var(--primary-700); margin-bottom: 6px;">${activeField.name}</h3>
      <p style="font-size: 0.9rem;"><strong>Crop:</strong> ${activeField.crop} | <strong>Area:</strong> ${activeField.acres} Acres | <strong>Soil:</strong> ${activeField.soil}</p>
    </div>
    <h4>Treatment & Scan Logs:</h4>
    ${activeField.logs.length === 0 ? '<p style="color: var(--text-muted); margin-top: 8px;">No logs recorded yet for this field.</p>' : activeField.logs.map(log => `
      <div class="task-item" style="border-left-color: var(--primary-600); margin-top: 8px;">
        <div>
          <strong>${log.date}</strong> - ${log.disease}<br>
          <span style="font-size: 0.85rem; color: var(--text-muted);">${log.treatment}</span>
        </div>
        <span class="status-pill safe" style="margin-left: auto;">${log.status}</span>
      </div>
    `).join('')}
  `;
}

function promptAddNewField() {
  const name = prompt("Enter Field Name:", "Field 3 - Golden Cotton");
  if (name) {
    const crop = prompt("Enter Crop Type:", "Cotton");
    const acres = prompt("Enter Size in Acres:", "2.0");
    const newF = historyStore.addField(name, crop, acres, "Black Clay");
    renderFieldsDropdown();
    renderFieldsLogs();
  }
}

// Camera Modal Logic
let mediaStream = null;

function openCameraModal() {
  const modal = document.getElementById('cameraModal');
  const video = document.getElementById('cameraVideo');
  if (modal) modal.classList.add('open');

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        mediaStream = stream;
        if (video) video.srcObject = stream;
      })
      .catch(err => {
        console.warn("Camera stream failed:", err);
        alert("Camera permission denied or camera not available. Please upload a crop photo instead.");
        closeCameraModal();
      });
  }
}

function closeCameraModal() {
  const modal = document.getElementById('cameraModal');
  if (modal) modal.classList.remove('open');
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
}

function snapCameraPhoto() {
  const video = document.getElementById('cameraVideo');
  const canvas = document.createElement('canvas');
  if (video && video.videoWidth) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    closeCameraModal();
    runAiScan(null, canvas.toDataURL('image/png'));
  }
}
