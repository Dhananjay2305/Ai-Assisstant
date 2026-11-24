import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  MessageCircle, 
  MapPin, 
  Camera, 
  PhoneCall, 
  Settings, 
  ExternalLink, 
  Sparkles, 
  Play,
  Layers,
  ArrowRight
} from 'lucide-react';
import { APP_CATALOG } from '../data/assistantData';

const YoutubeIcon = ({ className, style }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className || "w-6 h-6"} 
    style={style}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function MobileAppControl({ onTriggerCommand }) {
  const [selectedApp, setSelectedApp] = useState(APP_CATALOG[0]);

  const iconMap = {
    MessageCircle,
    Youtube: YoutubeIcon,
    MapPin,
    Camera,
    PhoneCall,
    Settings
  };

  return (
    <section id="features" className="py-24 relative bg-[#050814]">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Smartphone className="w-3.5 h-3.5" /> Android Ecosystem Control
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Seamless <span className="gradient-text">Mobile App</span> Control
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            SARA AI bridges voice intelligence with native Android OS capabilities. With direct Android Intent dispatching, you can launch apps, pass deep parameters, open cameras, and navigate system settings hands-free.
          </p>
        </div>

        {/* Interactive App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {APP_CATALOG.map((app) => {
            const IconComponent = iconMap[app.icon] || Smartphone;
            const isSelected = selectedApp.id === app.id;

            return (
              <motion.div
                key={app.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedApp(app)}
                className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 ${
                  isSelected 
                    ? 'bg-[#0f1738] border-cyan-500/50 shadow-[0_0_30px_rgba(56,189,248,0.2)]' 
                    : 'bg-[#090e24]/70 border-white/10 hover:border-white/20'
                } border backdrop-blur-xl relative overflow-hidden group`}
              >
                {/* Accent glow corner */}
                <div 
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{ backgroundColor: app.color }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: `${app.color}22`, border: `1px solid ${app.color}55` }}
                  >
                    <IconComponent className="w-6 h-6" style={{ color: app.color }} />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                    {app.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {app.name}
                </h3>
                
                <p className="text-xs font-mono text-cyan-400/80 mt-1 truncate">
                  {app.intent}
                </p>

                {/* Voice Commands List */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" /> Sample Voice Commands:
                  </div>
                  {app.voiceCommands.map((cmd, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTriggerCommand(cmd.en);
                      }}
                      className="w-full text-left text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/5 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 flex items-center justify-between group/cmd transition-all"
                    >
                      <span className="truncate">"{cmd.en}"</span>
                      <Play className="w-3 h-3 text-cyan-400 opacity-0 group-hover/cmd:opacity-100 transition-opacity shrink-0" />
                    </button>
                  ))}
                </div>

                {/* Capabilities list */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {app.supportedActions.slice(0, 2).map((act, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400">
                      ✓ {act}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deep Dive Architecture Feature Callout */}
        <div className="rounded-3xl p-8 bg-gradient-to-r from-[#0a112c] via-[#0d173b] to-[#11123a] border border-cyan-500/25 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-mono mb-3">
                <Layers className="w-3.5 h-3.5" /> Android IPC & Intent Dispatcher
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                How SARA AI Triggers Native Phone Apps
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Rather than relying on restricted sandboxes, SARA AI dispatches structured <code>Android Intent</code> envelopes. When you say <span className="text-cyan-300">"Open WhatsApp"</span> or <span className="text-indigo-300">"Open Google Maps and route to campus"</span>, SARA builds the URI payload, validates permissions, and launches the target package directly via the Android OS Activity Manager.
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[11px] font-mono text-cyan-400 block">Package Resolution</span>
                  <span className="text-xs text-slate-300 font-semibold">getLaunchIntentForPackage()</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[11px] font-mono text-indigo-400 block">Deep Linking</span>
                  <span className="text-xs text-slate-300 font-semibold">Intent.ACTION_VIEW (URI)</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[11px] font-mono text-emerald-400 block">System Guard</span>
                  <span className="text-xs text-slate-300 font-semibold">Zero Unverified Actions</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/50 border border-white/10 text-center font-mono">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-3">
                <Smartphone className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-xs text-slate-400">Selected Demo Target</span>
              <span className="text-base font-bold text-white mt-1">{selectedApp.name}</span>
              <span className="text-[11px] text-cyan-400 mt-1 break-all">{selectedApp.intent}</span>
              
              <button
                onClick={() => onTriggerCommand(`Open ${selectedApp.name}`)}
                className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                Test Voice Trigger in SARA
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
