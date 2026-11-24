import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Mic, 
  Zap, 
  ShieldCheck, 
  Play, 
  Sparkles,
  Wifi,
  Battery,
  MessageCircle,
  Clock,
  Video
} from 'lucide-react';
import HeroVisual from './HeroVisual';

export default function Hero({ onSelectCommand }) {
  const featureStrip = [
    { title: 'Voice-first interaction', icon: Mic },
    { title: 'Personal intelligence', icon: Zap },
    { title: 'Real-world actions', icon: ShieldCheck },
  ];

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-black overflow-hidden flex flex-col justify-center min-h-[92vh]">
      
      {/* 3D Liquid Sapphire Silk Background Ribbons */}
      <HeroVisual />

      <div className="max-w-[1240px] w-full mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline, Badges & Action Buttons (6 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Announcement badge: Introducing SARA AI ✦ */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleScrollTo('demo')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/25 hover:border-blue-400/40 transition-all mb-7 cursor-pointer shadow-[0_0_15px_rgba(0,102,255,0.2)] group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0088ff] shadow-[0_0_8px_#38bdf8] animate-pulse" />
              <span className="text-xs font-medium text-blue-200 tracking-tight">
                Introducing SARA AI ✦
              </span>
            </motion.div>

            {/* Headline: Your Personal AI. Always Within Reach. */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-sans font-bold tracking-[-0.04em] text-white leading-[1.06]"
            >
              Your Personal AI. <br />
              <span className="font-serif italic font-normal text-neutral-200">
                Always Within Reach.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-sm sm:text-base text-neutral-400 max-w-lg font-normal leading-relaxed"
            >
              SARA AI is your intelligent personal assistant that understands your voice, remembers what matters, and helps you get things done.
            </motion.p>

            {/* Action Buttons: Explore SARA AI → & ▷ See How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <a
                href="#demo"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('demo');
                }}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center gap-2 group"
              >
                <span>Explore SARA AI</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('how-it-works');
                }}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-800 dark:text-white bg-white/95 hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-300/90 dark:border-white/[0.12] transition-all flex items-center gap-2 backdrop-blur-sm shadow-md"
              >
                <div className="w-4 h-4 rounded-full border border-slate-400 dark:border-white/40 flex items-center justify-center">
                  <Play className="w-2 h-2 fill-current ml-0.5 text-blue-600 dark:text-white" />
                </div>
                <span>See How It Works</span>
              </a>
            </motion.div>

            {/* Feature Pills: Voice-first interaction | Personal intelligence | Real-world actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-14 flex flex-wrap items-center gap-6 sm:gap-8 text-neutral-400 text-xs"
            >
              {featureStrip.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/[0.06] flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-neutral-300 tracking-tight">{item.title}</span>
                  </div>
                );
              })}
            </motion.div>

          </div>

          {/* Right Column: Tilted 3D Smartphone with Glowing AI Orb (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative z-10">
            
            {/* Ambient Sapphire Glow behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[550px] bg-gradient-to-tr from-blue-600/35 via-cyan-500/20 to-transparent blur-[85px] rounded-full pointer-events-none" />

            {/* Tilted 3D Smartphone Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="phone-chassis w-[300px] sm:w-[330px] h-[640px] rounded-[50px] p-[10px] relative select-none transition-transform duration-500"
            >
              
              {/* Dynamic Island / Speaker Pill */}
              <div className="dynamic-island absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full z-30 flex items-center justify-center gap-2 shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-[#151922] border border-slate-700 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-950" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
              </div>

              {/* Internal Screen */}
              <div className="phone-screen-display w-full h-full rounded-[42px] overflow-hidden flex flex-col justify-between pt-7 pb-4 px-4 relative">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-2 mb-1">
                  <span className="font-semibold text-white">9:41</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-slate-400">5G</span>
                    <Wifi className="w-3 h-3 text-slate-300" />
                    <div className="w-5 h-2.5 border border-slate-300 rounded-[3px] p-[1px] flex items-center">
                      <div className="h-full w-full bg-emerald-400 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* SARA AI Header inside Phone */}
                <div className="flex items-center gap-2 px-1 py-1">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#0066ff] via-[#2563eb] to-[#38bdf8] flex items-center justify-center p-[1px] shadow-[0_2px_8px_rgba(0,102,255,0.4)]">
                    <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center">
                      <span className="font-sans font-black text-[10px] text-white">S</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1">
                    SARA <span className="text-[#38bdf8] font-mono text-[10px] font-bold">AI</span>
                  </span>
                </div>

                {/* Greeting: Hello! How can I help you today? */}
                <div className="px-1 text-center mt-2">
                  <h3 className="text-base font-bold text-white tracking-tight">Hello!</h3>
                  <p className="text-xs text-slate-300 mt-0.5">How can I help you today?</p>
                </div>

                {/* Central 3D Blue Glowing Orb Visualizer */}
                <div className="my-auto py-2 flex flex-col items-center justify-center">
                  
                  {/* Glowing 3D Blue Orb */}
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-300 p-[2px] shadow-[0_0_50px_rgba(0,102,255,0.7),0_0_20px_rgba(56,189,248,0.5)]">
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-slate-950 via-blue-950/80 to-slate-950 flex items-center justify-center relative overflow-hidden">
                      {/* Inner glint ring */}
                      <div className="absolute inset-1 rounded-full border border-cyan-400/30" />
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 blur-sm opacity-90 animate-pulse" />
                    </div>
                  </div>

                  {/* Audio Waveform */}
                  <div className="flex items-center gap-1 h-6 mt-4">
                    {[30, 75, 45, 95, 60, 85, 40, 65, 35].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{
                          height: [`${h * 0.35}%`, `${h}%`, `${h * 0.45}%`]
                        }}
                        transition={{ duration: 0.6 + i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-1 bg-gradient-to-t from-blue-500 to-cyan-300 rounded-full shadow-[0_0_6px_#38bdf8]"
                      />
                    ))}
                  </div>

                  {/* Microphone Icon Button */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0066ff] to-[#38bdf8] text-white flex items-center justify-center shadow-[0_0_25px_rgba(0,102,255,0.6)] mt-3 cursor-pointer hover:scale-105 transition-transform">
                    <Mic className="w-4 h-4 text-white" />
                  </div>

                  {/* Quick Action Suggestion Chips */}
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 px-1">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 flex items-center gap-1.5 backdrop-blur-md shadow-sm transition-colors font-medium">
                      <Video className="w-3 h-3 text-cyan-400" /> Open YouTube
                    </span>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 flex items-center gap-1.5 backdrop-blur-md shadow-sm transition-colors font-medium">
                      <Clock className="w-3 h-3 text-cyan-400" /> Set Reminder
                    </span>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 flex items-center gap-1.5 backdrop-blur-md shadow-sm transition-colors font-medium">
                      <Sparkles className="w-3 h-3 text-cyan-400" /> Start Study Mode
                    </span>
                  </div>

                </div>

                {/* Recent Actions Card */}
                <div className="p-3 rounded-2xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-between text-left backdrop-blur-md shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white tracking-tight">Opened YouTube</div>
                      <div className="text-[10px] font-mono text-slate-400">2 min ago</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-medium">View all →</span>
                </div>

                {/* Android Home Bar */}
                <div className="w-32 h-1 bg-white/40 rounded-full mx-auto mt-2" />

              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}
