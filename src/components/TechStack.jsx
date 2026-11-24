import React from 'react';
import { Smartphone, Cpu, Database, Radio, Code, CheckCircle2, Clock } from 'lucide-react';

export default function TechStack() {
  const stack = [
    {
      category: 'Native Android Architecture',
      icon: Smartphone,
      tools: ['Kotlin', 'Android Studio', 'Jetpack Compose', 'Android Assistant APIs', 'Android Intents'],
      status: 'In Active Development',
      statusType: 'android',
      desc: 'Engineered natively in Kotlin with Jetpack Compose. Leverages Android Assistant APIs (VoiceInteractionSession) and explicit Intent dispatching.'
    },
    {
      category: 'Artificial Intelligence & Speech',
      icon: Cpu,
      tools: ['OpenAI API', 'Speech Recognition', 'Text-to-Speech', 'Semantic NLU'],
      status: 'Implemented in Demo & App',
      statusType: 'implemented',
      desc: 'Multimodal semantic understanding capable of distinguishing regional accents and parsing compound commands across English, Telugu, Hindi, and Marathi.'
    },
    {
      category: 'Cloud & Encrypted Persistence',
      icon: Database,
      tools: ['Supabase', 'PostgreSQL', 'Android Keystore (AES-256)'],
      status: 'Implemented & Secured',
      statusType: 'implemented',
      desc: 'Encrypted persistence layer ensuring user-approved personal memories and custom action macros remain isolated on-device with optional Supabase cloud backup.'
    },
    {
      category: 'Operating System Frameworks',
      icon: Radio,
      tools: ['TelecomManager', 'AlarmManager', 'NotificationListenerService', 'AccessibilityService'],
      status: 'Native Android Planned',
      statusType: 'android',
      desc: 'Authorized OS primitives enabling direct package launches, SMS dictation, hands-free dialer engagement, and priority notification digests.'
    },
    {
      category: 'Web Simulator & Interactive Experience',
      icon: Code,
      tools: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Web Speech API'],
      status: 'Live on Website',
      statusType: 'implemented',
      desc: 'High-performance interactive demonstration environment mirroring Android client behavior safely without modifying your local computer.'
    }
  ];

  return (
    <section id="tech" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />
            <span>Technology Stack</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Engineered with <span className="font-serif italic font-normal text-neutral-400">precision.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-400 font-normal leading-relaxed">
            Built using modern, type-safe industry standards across native Android, machine learning pipelines, and secure cloud storage.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Live Website Implementation</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Native Android App Target</span>
            </span>
          </div>
        </div>

        {/* Minimal Stack Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stack.map((item) => {
            const Icon = item.icon;
            const isImplemented = item.statusType === 'implemented';
            return (
              <div 
                key={item.category}
                className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.07] hover:border-white/[0.16] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isImplemented 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white tracking-tight">
                    {item.category}
                  </h3>

                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.04] flex flex-wrap gap-1.5">
                  {item.tools.map((t) => (
                    <span 
                      key={t}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-neutral-300 border border-white/[0.05]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}