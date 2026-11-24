import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Video, 
  PhoneCall, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Wifi, 
  BatteryCharging,
  Layers,
  MapPin,
  Play
} from 'lucide-react';
import { processCommand } from '../utils/speech';
import { executeAppAction } from '../utils/actionDispatcher';

export default function ProductIntro({ onTriggerCommand }) {
  const [phoneState, setPhoneState] = useState('idle');
  const [activeReply, setActiveReply] = useState('Your study mode is ready!');
  const [activeTab, setActiveTab] = useState('actions');
  const [actionNotice, setActionNotice] = useState(null);

  const capabilities = [
    { title: 'Open Apps', desc: 'Launch YouTube, Google Maps, Camera, and settings instantly through verified package intents.' },
    { title: 'Smart Calling', desc: 'Search contacts and initiate hands-free phone calls with double-confirmation safety.' },
    { title: 'Personal Reminders', desc: 'Create study timers, daily alarms, and schedule notifications through AlarmManager.' },
    { title: 'Smart Routines', desc: 'Trigger customized multi-app macros like Study Mode or Bedtime with a single command.' },
  ];

  const handleSimulateCommand = (cmd) => {
    setPhoneState('listening');
    setActionNotice(null);

    setTimeout(() => {
      setPhoneState('speaking');
      const res = processCommand(cmd, 'en');
      setActiveReply(res.spoken);

      setTimeout(() => {
        setPhoneState('idle');
      }, 3500);
    }, 400);
  };

  return (
    <section id="product" className="py-24 md:py-32 bg-black relative border-t border-white/[0.06] overflow-hidden">
      
      {/* 3D Liquid Sapphire Silk Ribbon Wave Backdrop behind the phone */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <svg
          className="w-full h-full object-cover absolute top-0 left-0 opacity-80"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="productSilkPrimary" x1="10%" y1="20%" x2="90%" y2="80%">
              <stop offset="0%" stopColor="#000e33" stopOpacity="0.2" />
              <stop offset="30%" stopColor="#0044cc" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#0088ff" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#001859" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="productSilkCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#0066ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00113b" stopOpacity="0" />
            </linearGradient>
            <filter id="productSilkGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="20" stdDeviation="30" floodColor="#0038b8" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Ribbon Path sweeping smoothly under and around the left phone */}
          <motion.path
            filter="url(#productSilkGlow)"
            d="M -100 680 C 180 500, 380 620, 580 440 C 780 260, 920 380, 1100 280 C 1280 180, 1420 290, 1550 200 L 1550 900 L -100 900 Z"
            animate={{
              d: [
                "M -100 680 C 180 500, 380 620, 580 440 C 780 260, 920 380, 1100 280 C 1280 180, 1420 290, 1550 200 L 1550 900 L -100 900 Z",
                "M -100 660 C 200 520, 360 600, 560 460 C 760 280, 940 360, 1120 260 C 1300 160, 1400 310, 1550 220 L 1550 900 L -100 900 Z",
                "M -100 680 C 180 500, 380 620, 580 440 C 780 260, 920 380, 1100 280 C 1280 180, 1420 290, 1550 200 L 1550 900 L -100 900 Z"
              ]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            fill="url(#productSilkPrimary)"
            opacity="0.85"
          />

          {/* Specular ribbon ridge edge */}
          <motion.path
            d="M -100 680 C 180 500, 380 620, 580 440 C 780 260, 920 380, 1100 280 C 1280 180, 1420 290, 1550 200"
            animate={{
              d: [
                "M -100 680 C 180 500, 380 620, 580 440 C 780 260, 920 380, 1100 280 C 1280 180, 1420 290, 1550 200",
                "M -100 660 C 200 520, 360 600, 560 460 C 760 280, 940 360, 1120 260 C 1300 160, 1400 310, 1550 220",
                "M -100 680 C 180 500, 380 620, 580 440 C 780 260, 920 380, 1100 280 C 1280 180, 1420 290, 1550 200"
              ]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            stroke="url(#productSilkCyan)"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        {/* Ambient Cyan Blur Bloom */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Tilted Smartphone Mockup (Angled slightly to the right) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="phone-chassis w-[300px] sm:w-[330px] h-[640px] rounded-[50px] p-[10px] relative select-none transition-transform duration-500"
            >
              
              {/* Dynamic Island Pill */}
              <div className="dynamic-island absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full z-30 flex items-center justify-center gap-2 shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1e1e24] border border-slate-700 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-950" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
              </div>

              {/* Internal Screen */}
              <div className="phone-screen-display w-full h-full rounded-[42px] overflow-hidden flex flex-col justify-between pt-7 pb-4 px-4 relative">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-2 mb-1">
                  <span>9:41</span>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-3 h-3 text-neutral-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                </div>

                {/* SARA AI Header */}
                <div className="flex items-center gap-2 px-1 py-1">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#0066ff] to-[#38bdf8] flex items-center justify-center p-[1px]">
                    <div className="w-full h-full bg-black rounded-[4px] flex items-center justify-center">
                      <span className="font-sans font-bold text-[9px] text-white">S</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-white tracking-tight">
                    SARA <span className="text-blue-500 font-mono text-[10px]">AI</span>
                  </span>
                </div>

                {/* Central Luminous 3D Blue Sphere & Audio Visualizer */}
                <div className="my-auto py-4 flex flex-col items-center justify-center text-center">
                  
                  {/* Glowing 3D Orb */}
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-blue-700 via-blue-500 to-cyan-300 p-[2px] shadow-[0_0_50px_rgba(0,102,255,0.65)] animate-pulse">
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-black/85 via-blue-950/70 to-black flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-1.5 rounded-full border border-cyan-400/35" />
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 blur-sm opacity-90" />
                    </div>
                  </div>

                  {/* Audio Waveform */}
                  <div className="flex items-center gap-1 h-7 mt-5">
                    {[35, 80, 50, 100, 70, 90, 45, 75, 40].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{
                          height: phoneState === 'speaking'
                            ? [`${h * 0.4}%`, `${h}%`, `${h * 0.5}%`]
                            : [`${h * 0.25}%`, `${h * 0.6}%`, `${h * 0.25}%`]
                        }}
                        transition={{ duration: 0.6 + i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-1 bg-gradient-to-t from-blue-500 to-cyan-300 rounded-full"
                      />
                    ))}
                  </div>

                  {/* Status Bubble: "Your study mode is ready!" (Matches Reference Screenshot) */}
                  <div className="mt-5 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                    <p className="text-xs font-medium text-white tracking-tight">
                      "{activeReply}"
                    </p>
                  </div>

                </div>

                {/* Android Action Quick Pills */}
                <div className="p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-around text-[10px] font-mono text-neutral-400">
                  <button 
                    onClick={() => handleSimulateCommand('Start Study Mode')}
                    className="py-1 px-2 rounded-lg hover:text-white transition-colors text-blue-300 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-blue-400" /> Study Mode
                  </button>
                  <button 
                    onClick={() => handleSimulateCommand('Open YouTube')}
                    className="py-1 px-2 rounded-lg hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Video className="w-3 h-3 text-red-400" /> YouTube
                  </button>
                  <button 
                    onClick={() => handleSimulateCommand('Call Rahul')}
                    className="py-1 px-2 rounded-lg hover:text-white transition-colors flex items-center gap-1"
                  >
                    <PhoneCall className="w-3 h-3 text-emerald-400" /> Call
                  </button>
                </div>

                {/* Android Home Bar */}
                <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-2" />

              </div>

            </motion.div>

          </div>

          {/* Right Column: Narrative Typography & 4 Checkmarks (Matches Reference Screenshot) */}
          <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2 text-left">
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight text-white leading-[1.08]">
              Your phone, <br />
              <span className="font-serif italic font-normal text-neutral-200">
                powered by your voice.
              </span>
            </h2>

            <p className="mt-6 text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-lg">
              Open apps, make calls, manage reminders, and interact with your phone naturally.
            </p>

            {/* 4 Checkmark Items with Glowing Cyan Checkmarks */}
            <div className="mt-8 space-y-4 max-w-md">
              {capabilities.map((item) => (
                <div key={item.title} className="flex items-start gap-3.5 group">
                  <div className="w-5 h-5 rounded-full bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-[#38bdf8] shadow-[0_0_10px_rgba(0,102,255,0.25)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white tracking-tight">{item.title}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex items-center gap-4">
              <a
                href="#demo"
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-all hover:scale-[1.02] shadow-lg inline-flex items-center gap-2 group"
              >
                <span>Try SARA AI Live</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#how-it-works"
                className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors py-2"
              >
                See Architecture →
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
