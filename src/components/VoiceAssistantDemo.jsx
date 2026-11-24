import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Send, 
  Trash2, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Info, 
  Smartphone, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Play, 
  AlertCircle, 
  PhoneCall, 
  MessageCircle, 
  Camera, 
  MapPin, 
  Video, 
  Mail, 
  Search, 
  Clock, 
  ShieldCheck,
  Radio,
  Zap
} from 'lucide-react';
import { speechEngine, processCommand } from '../utils/speech';
import { executeAppAction, isAndroidDevice, detectWakeWord, parseVoiceAction } from '../utils/actionDispatcher';
import { LANGUAGES } from '../data/assistantData';

export default function VoiceAssistantDemo({ externalCommand, selectedLang = 'en', onSelectLang }) {
  const [inputText, setInputText] = useState('');
  
  // Primary States: idle | wake_word_detected | listening | thinking | executing | completed | error
  const [assistantState, setAssistantState] = useState('idle');
  // Listening Sub-mode: 'awaiting_wake_word' | 'awaiting_command'
  const [listeningSubState, setListeningSubState] = useState('awaiting_wake_word');
  const [isMicActive, setIsMicActive] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'sara',
      text: 'Hello. SARA AI is active and listening for your voice in Always-On mode. Say "Hey SARA" followed by your command.',
      timestamp: 'Just now',
      actionPayload: null
    }
  ]);

  const [activeSimulation, setActiveSimulation] = useState(null);

  const [executionFeedback, setExecutionFeedback] = useState(null);
  const [lastRecognizedSpeech, setLastRecognizedSpeech] = useState('');
  const [currentExecutingAction, setCurrentExecutingAction] = useState(null);

  const messagesEndRef = useRef(null);
  const lastProcessedRef = useRef({ text: '', time: 0 });
  const listeningSubStateRef = useRef(listeningSubState);

  // Keep ref synchronized with state for real-time recognition callbacks
  useEffect(() => {
    listeningSubStateRef.current = listeningSubState;
  }, [listeningSubState]);

  // When external command is triggered from Hero or features
  useEffect(() => {
    if (externalCommand) {
      handleProcessUserCommand(externalCommand, true);
    }
  }, [externalCommand]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, assistantState]);

  // Always-On Listening Mode: Automatically start listening on load
  useEffect(() => {
    handleStartListening();

    // Auto-activate on first user touch/click if browser blocks autoplay mic access
    const handleFirstGesture = () => {
      if (!speechEngine.isListening) {
        handleStartListening();
      }
    };
    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  const quickCommands = [
    'Hey SARA',
    'Open YouTube',
    'Open Google Maps',
    'Open Camera',
    'Call Rahul',
    'Send a message to Rahul',
    'Set a reminder for 7 PM',
    'Start my study mode',
    'Tell me today\'s schedule',
    'Open Gmail'
  ];

  /**
   * Dispatches speech synthesis with auto-restart protection.
   */
  const speakResponse = useCallback((text, onComplete) => {
    if (!isAudioEnabled) {
      if (onComplete) onComplete();
      return;
    }

    const currentLangObj = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];
    speechEngine.speak(
      text,
      currentLangObj.voiceCode,
      () => {},
      () => {
        if (onComplete) onComplete();
      }
    );
  }, [isAudioEnabled, selectedLang]);

  /**
   * Main speech transcript handler from continuous SpeechRecognition.
   */
  const handleTranscript = useCallback((rawTranscript) => {
    if (!rawTranscript || !rawTranscript.trim()) return;
    const transcript = rawTranscript.trim();
    setLastRecognizedSpeech(transcript);

    // Prevent duplicate processing of the same speech within 1.2 seconds
    const now = Date.now();
    if (
      lastProcessedRef.current.text === transcript.toLowerCase() &&
      now - lastProcessedRef.current.time < 1200
    ) {
      return;
    }
    lastProcessedRef.current = { text: transcript.toLowerCase(), time: now };

    const wakeCheck = detectWakeWord(transcript);
    const currentSubState = listeningSubStateRef.current;

    // SCENARIO 1: User says Wake Word only ("Hey SARA", "Hey Sarah", "SARA")
    if (wakeCheck.hasWakeWord && wakeCheck.isWakeWordOnly) {
      setAssistantState('wake_word_detected');
      setListeningSubState('awaiting_command');

      const userMsg = {
        id: 'user-' + Date.now(),
        sender: 'user',
        text: transcript,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const saraReplyText = "Yes, I'm listening.";
      const saraMsg = {
        id: 'sara-' + Date.now(),
        sender: 'sara',
        text: saraReplyText,
        spoken: saraReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionPayload: null
      };

      setMessages(prev => [...prev, userMsg, saraMsg]);

      speakResponse(saraReplyText, () => {
        setAssistantState('listening');
        // Remains in 'awaiting_command' substate, waiting for user's command!
      });
      return;
    }

    // SCENARIO 2: Compound wake word + command ("Hey SARA, open WhatsApp")
    if (wakeCheck.hasWakeWord && !wakeCheck.isWakeWordOnly && wakeCheck.commandText) {
      setAssistantState('wake_word_detected');
      setTimeout(() => {
        handleProcessUserCommand(wakeCheck.commandText, false, transcript);
      }, 400);
      return;
    }

    // SCENARIO 3: SARA was already awaiting a command after saying "Yes, I'm listening."
    if (currentSubState === 'awaiting_command') {
      handleProcessUserCommand(transcript, false);
      return;
    }

    // SCENARIO 4: Direct command spoken without wake-word prefix while in listening mode
    // (e.g. user just said "Open WhatsApp" directly)
    const parsed = parseVoiceAction(transcript, selectedLang);
    if (parsed.actionId !== 'UNRECOGNIZED' && parsed.actionId !== 'EMPTY') {
      handleProcessUserCommand(transcript, false);
    } else {
      // Unrelated background chatter while awaiting wake word: ignore or show gentle hint
      console.log('Ignored speech without wake-word:', transcript);
    }
  }, [selectedLang, speakResponse]);

  /**
   * Processes the command, sets Executing state, speaks voice confirmation, and triggers action.
   */
  const handleProcessUserCommand = (commandText, isManualTrigger = false, originalRawText = null) => {
    if (!commandText || !commandText.trim()) return;

    const displayUserText = originalRawText || commandText;

    // 1. Add User Message
    const userMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: displayUserText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // 2. State: Thinking -> Executing
    setAssistantState('thinking');
    setExecutionFeedback(null);

    setTimeout(() => {
      const result = processCommand(commandText, selectedLang);

      setAssistantState('executing');
      setCurrentExecutingAction(result.actionPayload ? result.actionPayload.targetName : result.action);
      setActiveSimulation(result);

      // 3. Add SARA Response Message with Action Execution Button
      const saraMessage = {
        id: 'sara-' + Date.now(),
        sender: 'sara',
        text: result.display,
        spoken: result.spoken,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionPayload: result.actionPayload
      };
      setMessages(prev => [...prev, saraMessage]);

      // 4. Voice Confirmation: SARA speaks aloud
      speakResponse(result.spoken, () => {
        setAssistantState('completed');

        // Automatically attempt action execution if payload exists
        if (result.actionPayload) {
          executeAppAction(result.actionPayload, (feedback) => {
            setExecutionFeedback(feedback);
          });
        }

        // 5. Always-On: Return to listening mode immediately
        setTimeout(() => {
          setListeningSubState('awaiting_wake_word');
          setAssistantState('listening');
          setIsMicActive(true);
          setCurrentExecutingAction(null);
          if (!speechEngine.isListening && !speechEngine.isSpeaking) {
            speechEngine.safeStart();
          }
        }, 1200);
      });
    }, 450);
  };

  /**
   * Toggles Continuous Assistant Listening Mode.
   */
  const handleStartListening = () => {
    const currentLangObj = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];
    setIsMicActive(true);
    setAssistantState('listening');
    setListeningSubState('awaiting_wake_word');
    setExecutionFeedback(null);

    speechEngine.startContinuous({
      lang: currentLangObj.voiceCode,
      onStart: () => {
        setIsMicActive(true);
      },
      onResult: (transcript) => {
        handleTranscript(transcript);
      },
      onError: (err) => {
        console.warn('Speech engine status:', err);
        setAssistantState('error');
        setIsMicActive(false);
        setMessages(prev => [
          ...prev,
          {
            id: 'err-' + Date.now(),
            sender: 'system',
            text: `Microphone issue: ${err}. Please allow microphone permissions in your browser or type commands into the input box below.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actionPayload: null
          }
        ]);
      },
      onEnd: () => {
        // Recognition cycle ends naturally and SpeechEngine restarts if continuous is on
      }
    });
  };

  const handleStopListening = () => {
    speechEngine.stopContinuous();
    setIsMicActive(false);
    setAssistantState('idle');
    setListeningSubState('awaiting_wake_word');
  };

  const handleToggleListening = () => {
    if (isMicActive) {
      handleStopListening();
    } else {
      handleStartListening();
    }
  };

  const handleActionClick = (actionPayload) => {
    if (!actionPayload) return;

    setExecutionFeedback({
      status: 'pending',
      message: `Dispatching ${actionPayload.buttonLabel || actionPayload.targetName}...`
    });

    executeAppAction(actionPayload, (feedback) => {
      setExecutionFeedback(feedback);
      setTimeout(() => {
        setExecutionFeedback(null);
      }, 5000);
    });
  };

  const handleClearHistory = () => {
    speechEngine.stopSpeaking();
    setMessages([
      {
        id: 'msg-init-' + Date.now(),
        sender: 'sara',
        text: 'History cleared. Say "Hey SARA" or click Start Listening to begin.',
        timestamp: 'Just now',
        actionPayload: null
      }
    ]);
    setActiveSimulation(null);
    setExecutionFeedback(null);
  };

  const getActionIcon = (actionPayload) => {
    if (!actionPayload) return <Play className="w-3.5 h-3.5" />;
    const { type, targetName } = actionPayload;
    if (type === 'CALL') return <PhoneCall className="w-3.5 h-3.5" />;
    if (type === 'CAMERA') return <Camera className="w-3.5 h-3.5" />;
    if (type === 'SEARCH') return <Search className="w-3.5 h-3.5" />;
    if (type === 'CALENDAR') return <Clock className="w-3.5 h-3.5" />;
    if (targetName === 'WhatsApp') return <MessageCircle className="w-3.5 h-3.5" />;
    if (targetName === 'YouTube') return <Video className="w-3.5 h-3.5" />;
    if (targetName === 'Google Maps') return <MapPin className="w-3.5 h-3.5" />;
    if (targetName === 'Gmail') return <Mail className="w-3.5 h-3.5" />;
    return <ExternalLink className="w-3.5 h-3.5" />;
  };

  return (
    <section id="demo" className="py-28 bg-black relative border-t border-white/[0.06]">
      {/* Hidden native camera capture input for Android & Mobile camera access */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        id="sara-native-camera-input" 
        className="hidden" 
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setExecutionFeedback({
              status: 'success',
              message: `Captured photo: ${e.target.files[0].name} (${(e.target.files[0].size / 1024).toFixed(1)} KB)`
            });
          }
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] shadow-[0_0_6px_#0066ff]" />
            <span>Hey SARA Voice Assistant & Actions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Experience <span className="font-serif italic font-normal text-neutral-400">SARA AI</span> live.
          </h2>

          <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-normal">
            Click <strong>Start Listening</strong>, say <span className="text-white font-medium">"Hey SARA"</span>, and speak any supported command. SARA responds aloud and executes the action.
          </p>

          {/* Operational transparency notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-neutral-400 text-xs">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Continuous conversation flow: Idle → Wake Word Detected → SARA Responds → Listening for Command → Action Executed.</span>
          </div>
        </div>

        {/* Reference Showcase Console: "Try SARA AI Live" with Centered Glowing Mic & Horizontal Waveforms */}
        <div className="w-full mb-10 p-6 sm:p-8 rounded-3xl bg-[#080d1a]/85 border border-blue-500/25 backdrop-blur-xl relative overflow-hidden shadow-[0_15px_40px_rgba(0,102,255,0.18)]">
          {/* Ambient inner glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[160px] bg-blue-500/15 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            
            {/* Left: AI Demo Pill & Subtitle */}
            <div className="text-left max-w-sm">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-[11px] font-medium text-blue-300 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0088ff] animate-pulse shadow-[0_0_8px_#38bdf8]" />
                <span>AI Demo</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                Try SARA AI Live
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                Say something like <span className="text-neutral-200 font-medium">"Open YouTube"</span> or <span className="text-neutral-200 font-medium">"Start my study mode"</span>.
              </p>
            </div>

            {/* Center: Glowing Circular Mic with Expanding Horizontal Waveforms */}
            <div className="flex items-center gap-3 sm:gap-5 my-1">
              {/* Left soundwave */}
              <div className="flex items-center gap-1 h-10">
                {[25, 45, 75, 40, 90, 60, 30].map((h, i) => (
                  <motion.span
                    key={`l-${i}`}
                    animate={{
                      height: isMicActive || assistantState !== 'idle'
                        ? [`${h * 0.35}%`, `${h}%`, `${h * 0.45}%`]
                        : [`${h * 0.2}%`, `${h * 0.4}%`, `${h * 0.2}%`]
                    }}
                    transition={{ duration: 0.6 + i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1 bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300 rounded-full"
                  />
                ))}
              </div>

              {/* Glowing Mic Button */}
              <button
                onClick={handleToggleListening}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 relative group cursor-pointer ${
                  isMicActive 
                    ? 'bg-gradient-to-tr from-[#0055ff] to-[#38bdf8] text-white shadow-[0_0_40px_rgba(0,102,255,0.8)] scale-105' 
                    : 'bg-gradient-to-tr from-blue-700 to-blue-500 text-white shadow-[0_0_30px_rgba(0,102,255,0.5)] hover:shadow-[0_0_45px_rgba(0,102,255,0.7)] hover:scale-105'
                }`}
                title={isMicActive ? "Click to Stop Listening" : "Click to Start Listening"}
              >
                <div className="absolute inset-1 rounded-full border border-white/25 pointer-events-none" />
                <Mic className="w-7 h-7 sm:w-8 sm:h-8" />
              </button>

              {/* Right soundwave */}
              <div className="flex items-center gap-1 h-10">
                {[30, 60, 90, 40, 75, 45, 25].map((h, i) => (
                  <motion.span
                    key={`r-${i}`}
                    animate={{
                      height: isMicActive || assistantState !== 'idle'
                        ? [`${h * 0.45}%`, `${h}%`, `${h * 0.35}%`]
                        : [`${h * 0.2}%`, `${h * 0.4}%`, `${h * 0.2}%`]
                    }}
                    transition={{ duration: 0.6 + i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1 bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Right: "Try these commands:" Chips */}
            <div className="text-left sm:text-right flex flex-col items-start sm:items-end">
              <span className="text-xs text-neutral-400 mb-2 font-mono">Try these commands:</span>
              <div className="grid grid-cols-2 gap-2 max-w-xs">
                {[
                  { label: 'Open YouTube', cmd: 'Open YouTube' },
                  { label: 'Call Rahul', cmd: 'Call Rahul' },
                  { label: 'Start Study Mode', cmd: 'Start my study mode' },
                  { label: 'Set a Reminder', cmd: 'Set a reminder for 7 PM' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleProcessUserCommand(item.cmd, true)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-200 bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-blue-400/50 transition-all text-center whitespace-nowrap active:scale-95"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Global Feedback Banner */}
        {executionFeedback && (
          <div className={`mb-6 p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono transition-all ${
            executionFeedback.status === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : executionFeedback.status === 'fallback'
              ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
              : executionFeedback.status === 'warning'
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              : 'bg-white/[0.04] border-white/10 text-white'
          }`}>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-current" />
              <span>{executionFeedback.message}</span>
            </div>
            {executionFeedback.fallbackUrl && (
              <a
                href={executionFeedback.fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-400 hover:text-white"
              >
                Open Web Fallback →
              </a>
            )}
          </div>
        )}

        {/* Demo Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: AI Visualizer, States & Action Dispatch Console (5 cols) */}
          <div className="lg:col-span-5 p-7 rounded-2xl bg-[#09090b] border border-white/[0.07] flex flex-col justify-between items-center text-center relative overflow-hidden">
            
            {/* Top Status & Audio Mute Bar */}
            <div className="w-full flex items-center justify-between pb-4 border-b border-white/[0.06] text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isMicActive ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-600'}`} />
                <span>{isMicActive ? 'Microphone Active' : 'Microphone Standby'}</span>
              </div>
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="p-1 rounded text-neutral-400 hover:text-white transition-colors"
                title={isAudioEnabled ? 'Voice output enabled' : 'Voice output muted'}
              >
                {isAudioEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Live Listening Mode Badge */}
            {isMicActive && (
              <div className="mt-3 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-[11px] font-mono flex items-center gap-2 animate-pulse shadow-sm">
                <Radio className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold">
                  {listeningSubState === 'awaiting_wake_word' 
                    ? 'MIC ACTIVE — Listening for "Hey SARA"' 
                    : 'MIC ACTIVE — Listening for command (e.g. "Open YouTube")'}
                </span>
              </div>
            )}

            {/* Central Animated Waveform Orb */}
            <div className="my-6 flex flex-col items-center">
              <div 
                onClick={isMicActive ? handleStopListening : handleStartListening}
                className={`w-36 h-36 rounded-full border transition-all duration-500 cursor-pointer flex items-center justify-center relative ${
                  assistantState === 'wake_word_detected'
                    ? 'border-cyan-400 bg-cyan-400/20 shadow-[0_0_60px_rgba(34,211,238,0.5)] scale-110'
                    : assistantState === 'listening'
                    ? 'border-blue-500 bg-blue-500/15 shadow-[0_0_50px_rgba(0,102,255,0.4)] scale-105'
                    : assistantState === 'executing'
                    ? 'border-emerald-500 bg-emerald-500/15 shadow-[0_0_50px_rgba(16,185,129,0.35)]'
                    : assistantState === 'thinking'
                    ? 'border-purple-500 bg-purple-500/15 shadow-[0_0_50px_rgba(168,85,247,0.3)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                }`}
              >
                {/* Waveform bars */}
                <div className="flex items-center gap-1.5 h-10 px-3">
                  {[35, 75, 50, 95, 65, 85, 40].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        height: assistantState === 'wake_word_detected'
                          ? [`${h * 0.6}%`, `${h}%`, `${h * 0.7}%`]
                          : assistantState === 'listening'
                          ? [`${h * 0.3}%`, `${h * 0.8}%`, `${h * 0.3}%`]
                          : assistantState === 'executing'
                          ? [`${h * 0.5}%`, `${h}%`, `${h * 0.4}%`]
                          : assistantState === 'thinking'
                          ? [`${h * 0.4}%`, `${h * 0.6}%`, `${h * 0.4}%`]
                          : [`${h * 0.2}%`, `${h * 0.3}%`, `${h * 0.2}%`]
                      }}
                      transition={{ duration: 0.5 + i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
                      className={`w-1 rounded-full ${
                        assistantState === 'wake_word_detected' ? 'bg-cyan-300' :
                        assistantState === 'executing' ? 'bg-emerald-400' :
                        assistantState === 'listening' ? 'bg-blue-400' :
                        assistantState === 'thinking' ? 'bg-purple-400' : 'bg-neutral-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* State Badge with Exact Required State Labels */}
              <div className="mt-4 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  assistantState === 'wake_word_detected' ? 'bg-cyan-400 animate-ping' :
                  assistantState === 'listening' ? 'bg-blue-400 animate-pulse' :
                  assistantState === 'executing' ? 'bg-emerald-400' :
                  assistantState === 'thinking' ? 'bg-purple-400' :
                  assistantState === 'completed' ? 'bg-emerald-400' :
                  assistantState === 'error' ? 'bg-rose-500' : 'bg-neutral-600'
                }`} />
                <span className="text-xs font-mono uppercase tracking-widest text-slate-800 dark:text-neutral-300 font-bold">
                  {assistantState === 'wake_word_detected' && 'Wake Word Detected'}
                  {assistantState === 'listening' && (listeningSubState === 'awaiting_command' ? 'Listening for Command' : 'Listening for "Hey SARA"')}
                  {assistantState === 'thinking' && 'Thinking'}
                  {assistantState === 'executing' && 'Executing Action'}
                  {assistantState === 'completed' && 'Completed'}
                  {assistantState === 'idle' && 'Idle (Microphone Off)'}
                  {assistantState === 'error' && 'Error'}
                </span>
              </div>

              {/* Real-Time Last Speech Detection Pill */}
              {lastRecognizedSpeech && (
                <div className="mt-2 text-[11px] font-mono text-slate-600 dark:text-neutral-400 truncate max-w-xs px-2">
                  Heard: <span className="text-slate-900 dark:text-white font-semibold">"{lastRecognizedSpeech}"</span>
                </div>
              )}
            </div>

            {/* Active Action / Wake-Word Status Box */}
            <div className="w-full">
              {activeSimulation && activeSimulation.actionPayload ? (
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.08] text-left text-xs space-y-3 shadow-sm">
                  <div className="flex items-center justify-between text-slate-600 dark:text-neutral-400 font-mono text-[11px]">
                    <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                      <Smartphone className="w-3.5 h-3.5" /> Action Execution
                    </span>
                    <span className="text-[10px] bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-transparent px-1.5 py-0.5 rounded text-slate-800 dark:text-neutral-300 font-medium">
                      {activeSimulation.actionPayload.targetName}
                    </span>
                  </div>

                  <p className="text-slate-800 dark:text-neutral-200 text-xs leading-relaxed font-normal">
                    {activeSimulation.display}
                  </p>

                  {/* Primary Functional Action Button (omitted if Open WhatsApp) */}
                  {activeSimulation.actionPayload.buttonLabel && !activeSimulation.actionPayload.buttonLabel.toLowerCase().includes('open whatsapp') && (
                    <button
                      onClick={() => handleActionClick(activeSimulation.actionPayload)}
                      className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-white bg-[#0066ff] hover:bg-[#0052cc] shadow-[0_0_15px_rgba(0,102,255,0.4)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                      {getActionIcon(activeSimulation.actionPayload)}
                      <span className="font-semibold">{activeSimulation.actionPayload.buttonLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}

                  <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 truncate">
                    {activeSimulation.actionPayload.description || 'Verified intent payload ready'}
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.04] text-xs text-slate-700 dark:text-neutral-300 font-mono font-medium shadow-sm">
                  {assistantState === 'wake_word_detected'
                    ? '⚡ "Hey SARA" detected! SARA is listening for your command.'
                    : 'Click "Start Listening" and say "Hey SARA", or pick a command below.'}
                </div>
              )}

              {/* Start Listening & Stop Listening Buttons (Requirement 6) */}
              <div className="mt-5 flex items-center justify-center gap-3">
                {!isMicActive ? (
                  <button
                    onClick={handleStartListening}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:text-black dark:bg-white dark:hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Mic className="w-4 h-4 text-blue-400 dark:text-blue-600" />
                    <span>Start Listening ("Hey SARA")</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopListening}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-all flex items-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MicOff className="w-4 h-4" />
                    <span>Stop Listening</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Right: Conversation Feed, Spoken Feedback & Command Input (7 cols) */}
          <div className="lg:col-span-7 p-7 rounded-2xl bg-[#09090b] border border-white/[0.07] flex flex-col justify-between h-[640px]">
            
            {/* Header with clear button */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">Conversation & Action Feed</span>
                {isMicActive && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20 font-medium">
                    Listening
                  </span>
                )}
              </div>
              <button
                onClick={handleClearHistory}
                className="text-[11px] font-mono text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white flex items-center gap-1 transition-colors font-medium"
              >
                <Trash2 className="w-3 h-3" /> Clear History
              </button>
            </div>

            {/* Quick command suggestions */}
            <div className="py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-white/[0.04]">
              {quickCommands.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleProcessUserCommand(cmd, true)}
                  className="shrink-0 text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] text-slate-800 dark:text-neutral-300 border border-slate-300/80 dark:border-white/[0.05] transition-colors font-medium shadow-sm"
                >
                  "{cmd}"
                </button>
              ))}
            </div>

            {/* Message Feed with Real Spoken Confirmations & Action Buttons */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 mb-1 px-1">
                    {msg.sender === 'user' ? 'You' : msg.sender === 'system' ? 'System' : 'SARA AI'} • {msg.timestamp}
                  </span>
                  
                  <div
                    className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0066ff] text-white rounded-tr-none shadow-sm'
                        : msg.sender === 'system'
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-500/20 rounded-tl-none'
                        : 'bg-slate-100 dark:bg-black text-slate-900 dark:text-neutral-200 border border-slate-300/80 dark:border-white/[0.08] rounded-tl-none shadow-sm font-normal'
                    }`}
                  >
                    <div>{msg.text}</div>

                    {/* Action Execution Button rendered directly in SARA's message bubble (omitted if Open WhatsApp) */}
                    {msg.actionPayload && msg.actionPayload.buttonLabel && !msg.actionPayload.buttonLabel.toLowerCase().includes('open whatsapp') && (
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 flex items-center gap-1.5 font-semibold">
                          <Smartphone className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          <span>Action Ready to Launch:</span>
                        </div>
                        
                        <button
                          onClick={() => handleActionClick(msg.actionPayload)}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.98]"
                        >
                          {getActionIcon(msg.actionPayload)}
                          <span>{msg.actionPayload.buttonLabel || 'Launch Action'}</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </button>

                        <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 flex items-center justify-between">
                          <span>{msg.actionPayload.description || 'Android Intent'}</span>
                          {isAndroidDevice() ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Android Chrome</span>
                          ) : (
                            <span className="text-slate-500 dark:text-neutral-400">Web / App Fallback</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form for Text Testing */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleProcessUserCommand(inputText, true);
              }}
              className="pt-3 border-t border-slate-200 dark:border-white/[0.06] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type 'Hey SARA', 'Open YouTube', 'Call Rahul'..."
                className="flex-1 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-black border border-slate-300 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-blue-500 font-sans shadow-inner"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-9 h-9 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-slate-800 dark:hover:bg-neutral-200 disabled:opacity-30 transition-all shrink-0 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
