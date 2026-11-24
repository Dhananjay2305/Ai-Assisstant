import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Sparkles, 
  Mic, 
  Send, 
  PhoneCall, 
  MessageCircle, 
  GraduationCap, 
  Clock, 
  Battery, 
  Wifi, 
  Signal, 
  Settings, 
  CheckCircle2, 
  Volume2,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import AiOrb from './AiOrb';
import { processCommand } from '../utils/speech';

export default function PhoneMockup() {
  const [phoneState, setPhoneState] = useState('idle'); // idle | listening | speaking
  const [phoneInput, setPhoneInput] = useState('');
  const [activeScreen, setActiveScreen] = useState('assistant'); // 'assistant' | 'routines' | 'memory'
  const [assistantReply, setAssistantReply] = useState('How can I help you on your phone today?');
  const [lastAction, setLastAction] = useState('Standby on Android OS');
  const [recentList, setRecentList] = useState([
    'Open WhatsApp',
    'Call Rahul',
    'Study Mode'
  ]);

  const handlePhoneAction = (cmd) => {
    setPhoneState('listening');
    setLastAction(`Executing: "${cmd}"`);

    setTimeout(() => {
      setPhoneState('speaking');
      const res = processCommand(cmd, 'en');
      setAssistantReply(res.spoken);
      setLastAction(res.display);

      if (!recentList.includes(cmd)) {
        setRecentList(prev => [cmd, ...prev.slice(0, 2)]);
      }

      setTimeout(() => {
        setPhoneState('idle');
      }, 3500);
    }, 600);
  };

  return (
    <section className="py-24 relative bg-[#050814]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Smartphone className="w-3.5 h-3.5" /> Mobile Experience Preview
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Android Smartphone <span className="gradient-text">App Preview</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience the actual SARA AI Android client running on a simulated flagship smartphone. Tap buttons on the handset to test tactile responses, speech states, and real-time app drawer interactions.
          </p>
        </div>

        {/* Center: The Smartphone Mockup Frame */}
        <div className="flex flex-col items-center justify-center">
          
          {/* Phone Body Container */}
          <div className="relative w-[340px] sm:w-[380px] h-[720px] rounded-[50px] bg-[#0c1024] p-3 shadow-[0_0_60px_rgba(56,189,248,0.25)] border-[6px] border-[#222a4d] ring-1 ring-white/10 select-none">
            
            {/* Dynamic Island / Camera Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#111] border border-white/10 mr-4" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            {/* Internal Touch Display */}
            <div className="w-full h-full rounded-[42px] bg-[#050816] overflow-hidden flex flex-col justify-between pt-7 pb-4 px-4 relative">
              
              {/* Phone Status Bar */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 px-2 pt-1 mb-2">
                <span>07:00 PM</span>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4 text-emerald-400" />
                </div>
              </div>

              {/* Top Bar with Brand */}
              <div className="flex items-center justify-between px-1 py-1 mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-xs text-cyan-400">
                    S
                  </div>
                  <span className="font-display font-extrabold text-sm text-white tracking-wide">
                    SARA <span className="text-cyan-400 text-xs">AI</span>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  <span>Android 15</span>
                </div>
              </div>

              {/* Greeting */}
              <div className="px-1 text-left">
                <h4 className="text-base font-bold text-white">
                  Good evening, <span className="text-cyan-400">User</span> 👋
                </h4>
                <p className="text-[11px] text-slate-400">
                  Ready to execute mobile actions
                </p>
              </div>

              {/* Central Interactive Orb Area */}
              <div className="my-auto flex flex-col items-center justify-center py-2">
                <AiOrb state={phoneState} size="sm" onClick={() => handlePhoneAction('Start Study Mode')} />
                
                {/* Assistant Speech Bubble */}
                <div className="mt-4 w-full p-3 rounded-2xl bg-[#0e163b]/90 border border-cyan-500/30 text-center shadow-lg">
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
                    "{assistantReply}"
                  </p>
                  <span className="text-[9px] font-mono text-cyan-400/80 block mt-1">
                    {lastAction}
                  </span>
                </div>
              </div>

              {/* Quick Action Tiles Inside Mobile Screen */}
              <div className="space-y-2 mt-auto">
                <div className="text-[10px] font-mono uppercase text-slate-400 px-1">
                  Tap Quick Actions:
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handlePhoneAction('Open WhatsApp')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-left transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-slate-200 truncate">WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handlePhoneAction('Call Rahul')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-left transition-all flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-xs text-slate-200 truncate">Call Rahul</span>
                  </button>

                  <button
                    onClick={() => handlePhoneAction('Start Study Mode')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-left transition-all flex items-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="text-xs text-slate-200 truncate">Study Mode</span>
                  </button>

                  <button
                    onClick={() => handlePhoneAction('Set a reminder for 7 PM')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-left transition-all flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs text-slate-200 truncate">Remind 7 PM</span>
                  </button>
                </div>

                {/* Bottom Voice Command Input in Phone */}
                <div className="pt-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (phoneInput.trim()) {
                        handlePhoneAction(phoneInput);
                        setPhoneInput('');
                      }
                    }}
                    className="flex items-center gap-1.5"
                  >
                    <input
                      type="text"
                      placeholder="Ask SARA anything..."
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-xl bg-cyan-400 text-slate-950 font-bold shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                {/* Home Indicator Bar */}
                <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-2 pointer-events-none" />
              </div>

            </div>

          </div>

          <p className="mt-4 text-xs font-mono text-slate-400">
            Interactive Android Phone Mockup: Click any action tile inside the handset
          </p>

        </div>

      </div>
    </section>
  );
}
