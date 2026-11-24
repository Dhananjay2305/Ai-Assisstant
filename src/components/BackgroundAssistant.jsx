import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, 
  Mic, 
  Smartphone, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Bell, 
  Cpu, 
  Volume2,
  Lock,
  Layers,
  Play,
  Download,
  Settings,
  Terminal
} from 'lucide-react';
import { parseVoiceAction, executeAppAction } from '../utils/actionDispatcher';

export default function BackgroundAssistant() {
  const [activeCommand, setActiveCommand] = useState('Hey SARA, open YouTube.');
  const [listeningState, setListeningState] = useState('hotword_standby'); // 'hotword_standby' | 'wake_detected' | 'dispatching'
  const [showSetupModal, setShowSetupModal] = useState(false);

  const exampleCommands = [
    {
      phrase: 'Hey SARA, open WhatsApp.',
      action: 'Target: com.whatsapp — Intent: android.intent.action.MAIN',
      category: 'App Launch',
    },
    {
      phrase: 'Hey SARA, open YouTube.',
      action: 'Target: com.google.android.youtube — Intent: android.intent.action.VIEW',
      category: 'App Launch',
    },
    {
      phrase: 'Hey SARA, call Rahul.',
      action: 'Target: TelecomManager — Action: ACTION_CALL with safety confirmation',
      category: 'Smart Calling',
    },
    {
      phrase: 'Hey SARA, start my study mode.',
      action: 'Target: SystemSettings — DND ON, Notion launch, 45m Timer',
      category: 'Routine Macro',
    },
    {
      phrase: 'Hey SARA, remind me at 7 PM.',
      action: 'Target: AlarmClock — Action: ACTION_SET_ALARM (19:00)',
      category: 'Reminder',
    },
  ];

  const handleTestCommand = (cmd) => {
    setActiveCommand(cmd.phrase);
    setListeningState('wake_detected');

    setTimeout(() => {
      setListeningState('dispatching');
      setTimeout(() => {
        setListeningState('hotword_standby');
      }, 3000);
    }, 800);
  };

  const scrollToArchitecture = (e) => {
    e.preventDefault();
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="background-assistant" className="py-28 bg-black relative border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/[0.08] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] shadow-[0_0_6px_#0066ff] animate-pulse" />
            <span>Native Android VoiceInteractionService</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight text-white leading-[1.08]">
            Your assistant, even when the <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-neutral-400">website is closed.</span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto">
            While web browsers restrict microphone access once tabs are closed, SARA AI includes a native Android application powered by <strong className="text-white">VoiceInteractionService</strong> and an always-on background foreground service.
          </p>
        </div>

        {/* Feature Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Command triggers & technical explanation (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.07] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                  <Radio className="w-3.5 h-3.5 text-blue-400" />
                  <span>Interactive Wake-Word Simulation</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Hotword Engine Ready
                </span>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">
                Tap any example phrase below to simulate how SARA catches the wake-word while the device is in standby and maps it directly to Android intent execution:
              </p>

              {/* Example Commands List */}
              <div className="space-y-2.5 pt-1">
                {exampleCommands.map((cmd) => {
                  const isSelected = activeCommand === cmd.phrase;
                  return (
                    <button
                      key={cmd.phrase}
                      onClick={() => handleTestCommand(cmd)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between group ${
                        isSelected 
                          ? 'bg-blue-600/10 border-blue-500/40 text-white' 
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                          isSelected ? 'bg-blue-500 text-white' : 'bg-white/[0.04] text-neutral-400 group-hover:text-white'
                        }`}>
                          <Mic className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-medium">"{cmd.phrase}"</div>
                          <div className="text-[10px] font-mono text-neutral-400 mt-0.5">{cmd.action}</div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-neutral-400 border border-white/[0.05] shrink-0 ml-2">
                        {cmd.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Architecture Link & Setup Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => setShowSetupModal(!showSetupModal)}
                className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md inline-flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Native Android App Setup Guide</span>
              </button>

              <a
                href="#how-it-works"
                onClick={scrollToArchitecture}
                className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors py-2 flex items-center gap-1.5"
              >
                <span>View OS Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Technical Transparency Note */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-400 leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-medium">Native Android Isolation: </span>
                Websites cannot listen to voice commands when closed due to browser security sandboxes. The native Android application in <code className="text-blue-300 font-mono">android/</code> runs as a native Android service with <code className="text-neutral-300 font-mono">VoiceInteractionService</code> and a persistent foreground notification, ensuring 24/7 responsiveness even when the screen is locked or browser is closed.
              </div>
            </div>

          </div>

          {/* Right Column: Premium Android Smartphone Visualizer (6 cols) */}
          <div className="lg:col-span-6 flex justify-center">
            
            {/* Phone Chassis */}
            <div className="phone-chassis w-[310px] sm:w-[350px] h-[640px] rounded-[50px] p-[10px] relative select-none">
              
              {/* Dynamic Island / Camera punch */}
              <div className="dynamic-island absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full z-30 flex items-center justify-center gap-2 shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1e1e24] border border-slate-700" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
              </div>

              {/* Internal Android Display */}
              <div className="phone-screen-display w-full h-full rounded-[42px] overflow-hidden flex flex-col justify-between pt-7 pb-4 px-4 relative">
                
                {/* Top Status Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-2 mb-2">
                  <span>07:45 PM</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.06] text-neutral-300">Android 15</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  </div>
                </div>

                {/* SARA App Interface Header */}
                <div className="flex items-center justify-between px-2 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#0066ff] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                      S
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">SARA Assistant</div>
                      <div className="text-[9px] font-mono text-neutral-400">Background Service Active</div>
                    </div>
                  </div>
                  
                  {/* Wake-Word Indicator */}
                  <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>"Hey SARA"</span>
                  </div>
                </div>

                {/* Middle: Background Listening Status Visualizer */}
                <div className="my-auto py-6 flex flex-col items-center justify-center text-center">
                  
                  {/* Audio Waveform Orb */}
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600/20 via-blue-900/10 to-transparent border border-blue-500/25 flex items-center justify-center shadow-[0_0_30px_rgba(0,102,255,0.15)]">
                    
                    {/* Concentric subtle radar pulse */}
                    <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping opacity-25" />

                    {/* Animated Waveform Bars */}
                    <div className="flex items-center gap-1 h-12 z-10">
                      {[35, 75, 55, 95, 65, 85, 45, 60].map((barHeight, idx) => {
                        const isSpeaking = listeningState !== 'hotword_standby';
                        return (
                          <motion.span
                            key={idx}
                            animate={{
                              height: isSpeaking 
                                ? [`${barHeight * 0.4}%`, `${barHeight}%`, `${barHeight * 0.3}%`]
                                : [`${barHeight * 0.2}%`, `${barHeight * 0.35}%`, `${barHeight * 0.2}%`]
                            }}
                            transition={{
                              duration: 0.6 + idx * 0.08,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                            className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-cyan-300"
                          />
                        );
                      })}
                    </div>

                    <div className="absolute bottom-2 text-[9px] font-mono text-neutral-400">
                      {listeningState === 'hotword_standby' && 'Listening for wake-word'}
                      {listeningState === 'wake_detected' && 'Wake word verified!'}
                      {listeningState === 'dispatching' && 'Dispatching Intent...'}
                    </div>
                  </div>

                  {/* Recognized Command Bubble */}
                  <div className="mt-5 w-full p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-left space-y-2">
                    <div>
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">Received Voice Payload:</div>
                      <div className="text-xs font-medium text-white mt-0.5">"{activeCommand}"</div>
                    </div>

                    <button
                      onClick={() => {
                        const parsed = parseVoiceAction(activeCommand);
                        if (parsed && parsed.actionPayload) {
                          executeAppAction(parsed.actionPayload);
                        }
                      }}
                      className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-[#0066ff] hover:bg-[#0052cc] text-white flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Execute Action on Phone</span>
                    </button>

                    <div className="text-[10px] font-mono text-blue-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                      <span>{listeningState === 'dispatching' ? 'Intent dispatched' : 'Tap above to test real launch'}</span>
                    </div>
                  </div>

                </div>

                {/* Bottom App Tray Controls */}
                <div className="space-y-2 mt-auto">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-neutral-300">Lock-screen Activation</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                      Allowed
                    </span>
                  </div>

                  {/* Android Home Bar */}
                  <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-2" />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Native Android APK Setup Modal / Drawer */}
        {showSetupModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-8 rounded-3xl bg-[#090d19] border border-blue-500/30 text-left relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">SARA AI Native Android Assistant Setup</h3>
                  <p className="text-xs text-neutral-400">Run independently from the browser with system-level assistant privileges</p>
                </div>
              </div>
              <button
                onClick={() => setShowSetupModal(false)}
                className="text-xs text-neutral-400 hover:text-white px-3 py-1 rounded-lg bg-white/[0.04]"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.06] space-y-2">
                <div className="font-mono text-blue-400 font-semibold flex items-center gap-2">
                  <span>01</span> <span>Build or Open Project</span>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Open the <code className="text-white">android/</code> directory in <strong>Android Studio</strong> or run <code className="text-white">./gradlew assembleDebug</code> to generate the APK.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.06] space-y-2">
                <div className="font-mono text-blue-400 font-semibold flex items-center gap-2">
                  <span>02</span> <span>Set Default Assistant</span>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Go to Android <strong>Settings → Apps → Default Apps → Digital Assistant App</strong> and choose <strong>SARA AI</strong> to enable home-button and lockscreen summon.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.06] space-y-2">
                <div className="font-mono text-blue-400 font-semibold flex items-center gap-2">
                  <span>03</span> <span>Background Listening</span>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Toggle on "Background Voice Listening". SARA will now standby for <strong>"Hey SARA"</strong> even when your browser is closed and phone is on home screen!
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
