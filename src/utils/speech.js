// Speech synthesis and recognition utility with continuous wake-word listening loop
import { parseVoiceAction, detectWakeWord } from './actionDispatcher';

export class SpeechEngine {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.isContinuous = false;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.speechEnabled = true;
    this.isSpeaking = false;
    this.currentLang = 'en-US';
    this.callbacks = {};
    this.restartTimeout = null;

    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.initRecognitionEvents();
      }
    }
  }

  isSpeechRecognitionSupported() {
    return !!this.recognition;
  }

  initRecognitionEvents() {
    if (!this.recognition) return;

    this.recognition.onstart = () => {
      this.isListening = true;
      if (this.callbacks.onStart) this.callbacks.onStart();
    };

    this.recognition.onresult = (event) => {
      if (!event.results || !event.results.length) return;
      const latestResult = event.results[event.results.length - 1];
      if (latestResult && latestResult[0]) {
        const transcript = latestResult[0].transcript.trim();
        if (transcript && this.callbacks.onResult) {
          this.callbacks.onResult(transcript);
        }
      }
    };

    this.recognition.onerror = (event) => {
      const err = event.error;
      // Harmless browser events that occur during natural speech pauses or restarts
      if (err === 'no-speech' || err === 'aborted') {
        if (this.isContinuous && !this.isSpeaking) {
          clearTimeout(this.restartTimeout);
          this.restartTimeout = setTimeout(() => {
            this.safeStart();
          }, 200);
        }
        return;
      }

      console.warn('Speech recognition status:', err);

      if (err === 'not-allowed' || err === 'audio-capture') {
        this.isContinuous = false;
        this.isListening = false;
        if (this.callbacks.onError) {
          this.callbacks.onError('Microphone access denied. Please click the lock icon in your URL bar and allow microphone permissions.');
        }
        return;
      }

      // For network or transient glitches, auto-restart if continuous
      if (this.isContinuous && !this.isSpeaking) {
        clearTimeout(this.restartTimeout);
        this.restartTimeout = setTimeout(() => {
          this.safeStart();
        }, 500);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.callbacks.onEnd) this.callbacks.onEnd();

      // ALWAYS-ON: Automatically restart speech recognition whenever it cycles
      if (this.isContinuous && !this.isSpeaking) {
        clearTimeout(this.restartTimeout);
        this.restartTimeout = setTimeout(() => {
          this.safeStart();
        }, 150);
      }
    };
  }

  safeStart() {
    if (!this.recognition || this.isListening || this.isSpeaking) return;
    try {
      this.recognition.lang = this.currentLang;
      this.recognition.start();
    } catch (e) {
      // Catch already started or transient browser state
    }
  }

  startContinuous({ onStart, onResult, onError, onEnd, lang = 'en-US' }) {
    if (!this.recognition) {
      if (onError) onError('Speech recognition is not supported in this browser. Please type your command.');
      return;
    }

    this.isContinuous = true;
    this.currentLang = lang;
    this.callbacks = { onStart, onResult, onError, onEnd };
    this.safeStart();
  }

  stopContinuous() {
    this.isContinuous = false;
    clearTimeout(this.restartTimeout);
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
    this.isListening = false;
  }

  // Legacy single-shot listener support
  startListening({ onStart, onResult, onError, onEnd, lang = 'en-US' }) {
    this.startContinuous({ onStart, onResult, onError, onEnd, lang });
  }

  stopListening() {
    this.stopContinuous();
  }

  speak(text, lang = 'en-US', onStart, onEnd) {
    if (!this.synth || !this.speechEnabled) {
      if (onEnd) onEnd();
      return;
    }

    this.isSpeaking = true;

    // Temporarily pause recognition so microphone does not pick up SARA's own voice
    if (this.recognition && this.isListening) {
      try {
        this.recognition.abort();
      } catch (e) {}
    }

    try {
      this.synth.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang || 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      const voices = this.synth.getVoices();
      const match = voices.find(v => v.lang.startsWith((lang || 'en').slice(0, 2)));
      if (match) {
        utterance.voice = match;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      const handleFinish = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();

        // After speaking finishes, resume continuous recognition if still enabled!
        if (this.isContinuous) {
          clearTimeout(this.restartTimeout);
          this.restartTimeout = setTimeout(() => {
            this.safeStart();
          }, 300);
        }
      };

      utterance.onend = handleFinish;
      utterance.onerror = handleFinish;

      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      this.isSpeaking = false;
      if (onEnd) onEnd();
      if (this.isContinuous) {
        this.safeStart();
      }
    }
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
  }
}

export const speechEngine = new SpeechEngine();

// Command interpreter that maps natural language to actions and responses using actionDispatcher
export function processCommand(rawInput, selectedLang = 'en') {
  const parsed = parseVoiceAction(rawInput, selectedLang);
  return {
    action: parsed.actionId,
    appName: parsed.appName,
    spoken: parsed.spoken,
    display: parsed.display,
    isWakeWordAck: !!parsed.isWakeWordAck,
    details: parsed.actionPayload ? {
      ...parsed.actionPayload,
      status: 'Ready for execution'
    } : null,
    actionPayload: parsed.actionPayload
  };
}
