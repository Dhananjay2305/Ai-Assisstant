import React from 'react';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function Roadmap() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Voice Recognition & Conversation',
      status: 'Implemented',
      target: 'Live on Website & Core Engine',
      desc: 'Multilingual speech-to-text, natural language intent parser, and low-latency neural audio feedback across English, Telugu, Hindi, and Marathi.',
    },
    {
      phase: 'Phase 2',
      title: 'App Launching & Phone Actions',
      status: 'Implemented in Demo',
      target: 'Android Intent Framework',
      desc: 'Simulated and native intent models for WhatsApp, YouTube, Maps, Camera, and System Settings with zero user touch.',
    },
    {
      phase: 'Phase 3',
      title: 'Calling, Messaging & Reminders',
      status: 'In Beta Testing',
      target: 'Native Android OS Service',
      desc: 'Contact recognition, dialer preparation, WhatsApp dictation with safety confirmation gates, and AlarmManager scheduling.',
    },
    {
      phase: 'Phase 4',
      title: 'Personal Memory & Smart Routines',
      status: 'In Development',
      target: 'On-Device Keystore Encrypted',
      desc: 'Encrypted on-device habit learning, multi-action routine chaining (Study Mode, Bedtime), and custom personal action memory macros.',
    },
    {
      phase: 'Phase 5',
      title: 'Background Voice Assistant',
      status: 'Planned Native Android',
      target: 'VoiceInteractionService API',
      desc: 'Always-available "Hey SARA" wake-word activation while device screen is locked or website is closed, built natively in Kotlin.',
    },
    {
      phase: 'Phase 6',
      title: 'Official Google Play Launch',
      status: 'Planned Milestone',
      target: 'System Assistant Certification',
      desc: 'Default Assistant role certification on Google Play Store with quantized on-device edge AI and offline wake-word recognition.',
    },
  ];

  return (
    <section id="roadmap" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />
            <span>Product Timeline</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Development <span className="font-serif italic font-normal text-neutral-400">roadmap.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-400 font-normal leading-relaxed">
            From interactive conversational foundations to a certified system-level Android voice assistant.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-neutral-400 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Clearly distinguishing website simulator features from planned native Android capabilities.</span>
          </div>
        </div>

        {/* Minimal Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {phases.map((ph) => {
            const isImplemented = ph.status.includes('Implemented');
            const isBeta = ph.status.includes('Beta');
            const isDev = ph.status.includes('Development');

            return (
              <div 
                key={ph.phase}
                className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.07] hover:border-white/[0.16] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-blue-400 font-semibold">{ph.phase}</span>
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] ${
                      isImplemented 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : isBeta
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : isDev
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        : 'bg-white/[0.03] text-neutral-400 border-white/[0.06]'
                    }`}>
                      {ph.status}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white tracking-tight">
                    {ph.title}
                  </h3>

                  <div className="text-[11px] font-mono text-neutral-400 mt-1">
                    Target: {ph.target}
                  </div>

                  <p className="mt-3 text-xs text-neutral-400 leading-relaxed font-normal">
                    {ph.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.04] text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                  <span>SARA AI Android Engine</span>
                  {isImplemented ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}