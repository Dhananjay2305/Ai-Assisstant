import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Key, 
  CheckCircle2, 
  Mic, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function PrivacySecurity() {
  const [showDetailedGovernance, setShowDetailedGovernance] = useState(false);
  const [permissions, setPermissions] = useState([
    {
      id: 'mic',
      title: 'Microphone & Audio Input',
      desc: 'Activated only when explicitly pressing the mic or when wake-word is active. Never records passively or streams audio to cloud ad brokers.',
      granted: true,
    },
    {
      id: 'bg-listening',
      title: 'User-Controlled Background Listening',
      desc: 'Always optional. Background wake-word detection runs locally on-device via low-power hardware DSP with instant kill-switch.',
      granted: true,
    },
    {
      id: 'contacts',
      title: 'Address Book & Contacts',
      desc: 'Used solely for local name resolution during call and messaging commands. Zero cloud syncing or remote aggregation.',
      granted: true,
    },
    {
      id: 'memory',
      title: 'Secure Encrypted Personal Memory',
      desc: 'All user preferences, routines, and habit notes are protected with AES-256 GCM backed by the Android hardware Keystore.',
      granted: true,
    },
    {
      id: 'confirmations',
      title: 'Confirmation Before Sensitive Actions',
      desc: 'Financial triggers, outbound transmissions, and calls require explicit secondary confirmation before dispatch.',
      granted: true,
    },
    {
      id: 'history',
      title: 'Transparent Action History Audit',
      desc: 'Every intent dispatched by SARA is logged locally in an inspectable audit trail. You can review and clear your history anytime.',
      granted: true,
    },
  ]);

  const toggle = (id) => {
    setPermissions(prev => prev.map(p => p.id === id ? { ...p, granted: !p.granted } : p));
  };

  const privacyCheckmarks = [
    { title: 'User-controlled permissions', desc: 'Granular toggles for microphone, contacts, and background wake-word.' },
    { title: 'Transparent actions', desc: 'Every action requires your visible intent and provides instant execution feedback.' },
    { title: 'Personal memory controls', desc: 'Hardware-backed AES-256 encrypted storage that you can inspect or wipe at any second.' },
  ];

  return (
    <section id="privacy" className="py-24 md:py-32 bg-black relative border-t border-white/[0.06] overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/[0.12] blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Main Reference Showcase: Intelligence with your privacy in mind */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Subtitle & 3 Glowing Checkmarks */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight text-white leading-[1.08]">
              Intelligence with <br />
              <span className="font-serif italic font-normal text-neutral-200">
                your privacy in mind.
              </span>
            </h2>

            <p className="mt-6 text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-lg">
              Your data stays yours. SARA AI follows privacy-first principles for a secure experience.
            </p>

            {/* 3 Glowing Checkmark Bullets */}
            <div className="mt-8 space-y-5 max-w-md">
              {privacyCheckmarks.map((item) => (
                <div key={item.title} className="flex items-start gap-3.5 group">
                  <div className="w-5 h-5 rounded-full bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-[#38bdf8] shadow-[0_0_12px_rgba(0,102,255,0.3)]">
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

            {/* Toggle Detailed Governance Button */}
            <div className="mt-9">
              <button
                onClick={() => setShowDetailedGovernance(!showDetailedGovernance)}
                className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors py-1.5"
              >
                <span>{showDetailedGovernance ? 'Hide Permission Governance Controls' : 'View Permission Governance Controls'}</span>
                {showDetailedGovernance ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>

          {/* Right Column: 3D Glowing Glass Shield with Flowing Silk Ribbon Waves */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            
            {/* 3D Glass Shield + Swirling Ribbon Container */}
            <div className="relative w-[320px] sm:w-[380px] h-[380px] sm:h-[420px] flex items-center justify-center">
              
              {/* Flowing Ribbon Waves surrounding the shield */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="shieldRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#001a5e" stopOpacity="0.4" />
                    <stop offset="35%" stopColor="#0055ff" stopOpacity="0.95" />
                    <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#00103a" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="shieldSpecularGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <filter id="shieldRibbonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="15" stdDeviation="25" floodColor="#0066ff" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Sweeping Ribbon 1: Cradling under the shield */}
                <motion.path
                  filter="url(#shieldRibbonGlow)"
                  d="M 20 280 C 100 360, 260 380, 380 290 C 310 240, 180 320, 20 280 Z"
                  animate={{
                    d: [
                      "M 20 280 C 100 360, 260 380, 380 290 C 310 240, 180 320, 20 280 Z",
                      "M 20 270 C 110 370, 270 370, 380 300 C 300 250, 170 330, 20 270 Z",
                      "M 20 280 C 100 360, 260 380, 380 290 C 310 240, 180 320, 20 280 Z"
                    ]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  fill="url(#shieldRibbonGrad)"
                />

                {/* Sweeping Ribbon 2: Specular upper wave */}
                <motion.path
                  d="M 40 310 C 140 380, 260 380, 360 300"
                  animate={{
                    d: [
                      "M 40 310 C 140 380, 260 380, 360 300",
                      "M 40 300 C 150 390, 270 370, 360 310",
                      "M 40 310 C 140 380, 260 380, 360 300"
                    ]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  stroke="url(#shieldSpecularGrad)"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>

              {/* 3D Glass Shield */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="relative z-10 w-44 h-56 sm:w-52 sm:h-64 rounded-b-[70px] rounded-t-[20px] bg-gradient-to-b from-[#0e1b3d]/90 via-[#060d24]/95 to-[#020512] border-2 border-cyan-400/50 shadow-[0_0_60px_rgba(0,102,255,0.45)] backdrop-blur-2xl flex flex-col items-center justify-center p-6 transition-transform cursor-pointer"
              >
                {/* Shield Gloss Refraction Highlight */}
                <div className="absolute top-2 left-3 right-3 h-16 rounded-t-[14px] bg-gradient-to-b from-white/20 via-cyan-300/10 to-transparent pointer-events-none" />

                {/* Inner Lock Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-[#38bdf8] flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,102,255,0.7)] mb-2">
                  <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>

                <div className="text-center mt-3">
                  <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest font-semibold">
                    Encrypted
                  </span>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                    AES-256 On-Device
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>

        {/* Detailed Permission Governance Drawer (Expandable) */}
        {showDetailedGovernance && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-16 pt-12 border-t border-white/[0.08]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left: Permission Controls (7 cols) */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-[#09090b] border border-white/[0.07]">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                  <span className="text-xs font-mono uppercase text-neutral-400">Permission Governance</span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    100% User Audited
                  </span>
                </div>

                <div className="space-y-3">
                  {permissions.map((p) => (
                    <div 
                      key={p.id}
                      className="p-4 rounded-xl bg-black border border-white/[0.05] hover:border-white/[0.1] transition-all flex items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-white">{p.title}</h4>
                        <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed font-normal">{p.desc}</p>
                      </div>

                      <button
                        onClick={() => toggle(p.id)}
                        className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 ${
                          p.granted ? 'bg-[#0066ff]' : 'bg-neutral-800'
                        }`}
                        aria-label={`Toggle permission for ${p.title}`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            p.granted ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Security Safeguards (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                <div className="p-5 rounded-2xl bg-[#09090b] border border-white/[0.07]">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-blue-400 mb-3">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Zero Advertising Telemetry</h4>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed font-normal">
                    SARA AI does not sell data, track browsing histories across third-party apps, or profile your vocal patterns for ad networks.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#09090b] border border-white/[0.07]">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-blue-400 mb-3">
                    <Key className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Hardware Keystore Encryption</h4>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed font-normal">
                    Personal action rules and memory items are bound to the Android TEE (Trusted Execution Environment).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full compliance with Android 15 Privacy Sandbox standards.</span>
                </div>

              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
