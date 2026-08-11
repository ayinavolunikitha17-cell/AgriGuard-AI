/* AgriMitra - Multi-Lingual Speech Recognition & Text-to-Speech Engine */

class AgriVoiceEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.recognition = null;
    this.isListening = false;
    this.isPlaying = false;
    this.currentUtterance = null;
    this.voices = [];

    this.initSpeechSynthesis();
    this.initSpeechRecognition();
  }

  initSpeechSynthesis() {
    if (this.synth) {
      const loadVoices = () => {
        this.voices = this.synth.getVoices();
      };
      loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = loadVoices;
      }
    }
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateMicUI(true);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateMicUI(false);
      };

      this.recognition.onerror = (e) => {
        console.warn('Speech recognition error:', e.error);
        this.isListening = false;
        this.updateMicUI(false);
      };
    }
  }

  // Speak text in the farmer's selected language
  speak(text, lang = currentLang, callback = null) {
    if (!this.synth) {
      console.warn("SpeechSynthesis not supported.");
      if (callback) callback();
      return;
    }

    this.stop(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language code
    if (lang === 'te') utterance.lang = 'te-IN';
    else if (lang === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';

    // Find voice matching language
    const matchedVoice = this.voices.find(v => v.lang.startsWith(utterance.lang) || v.lang.includes(lang));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.rate = 0.95; // Slightly calmer speaking speed for farmers
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isPlaying = true;
      this.updatePlayerUI(true, text);
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.updatePlayerUI(false, "");
      if (callback) callback();
    };

    utterance.onerror = (err) => {
      console.error("SpeechSynthesis error:", err);
      this.isPlaying = false;
      this.updatePlayerUI(false, "");
      if (callback) callback();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.updatePlayerUI(false, "");
  }

  togglePlayPause(currentText) {
    if (this.isPlaying) {
      this.stop();
    } else if (currentText) {
      this.speak(currentText);
    }
  }

  startListening(onResultCallback) {
    if (!this.recognition) {
      // Fallback for browsers without Web Speech Recognition (prompt mock input)
      const simulatedText = prompt(
        getText('voicePlaceholder') + "\n(Simulated Voice Input for demo):", 
        currentLang === 'te' ? 'వరిలో మందు ఎప్పుడు చల్లాలి?' : currentLang === 'hi' ? 'धान में दवाई कब छिड़कें?' : 'Should I spray pesticide today?'
      );
      if (simulatedText && onResultCallback) {
        onResultCallback(simulatedText);
      }
      return;
    }

    // Set recognition language
    if (currentLang === 'te') this.recognition.lang = 'te-IN';
    else if (currentLang === 'hi') this.recognition.lang = 'hi-IN';
    else this.recognition.lang = 'en-IN';

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onResultCallback) {
        onResultCallback(transcript);
      }
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn("Recognition already active or blocked:", e);
    }
  }

  updateMicUI(isListening) {
    const micBtn = document.getElementById('micBtn');
    const voiceInput = document.getElementById('voiceInputText');
    if (micBtn) {
      if (isListening) {
        micBtn.classList.add('listening');
        micBtn.innerHTML = '🎙️';
        if (voiceInput) voiceInput.placeholder = currentLang === 'te' ? 'వింటోంది... మాట్లాడండి' : currentLang === 'hi' ? 'सुन रहा है... बोलें' : 'Listening... Speak now';
      } else {
        micBtn.classList.remove('listening');
        micBtn.innerHTML = '🎤';
        if (voiceInput) voiceInput.placeholder = getText('voicePlaceholder');
      }
    }
  }

  updatePlayerUI(isPlaying, text) {
    const playBtn = document.getElementById('audioPlayBtn');
    const audioText = document.getElementById('audioTextDisplay');
    const waveAnim = document.getElementById('audioWaveAnim');

    if (playBtn) {
      playBtn.innerHTML = isPlaying ? '⏸️' : '▶️';
    }
    if (audioText) {
      audioText.textContent = isPlaying ? (text.length > 60 ? text.substring(0, 60) + '...' : text) : getText('btnListen');
    }
    if (waveAnim) {
      waveAnim.style.display = isPlaying ? 'flex' : 'none';
    }
  }
}

const voiceEngine = new AgriVoiceEngine();
