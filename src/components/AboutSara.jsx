import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AboutSara({ onTriggerCommand }) {
  return (
    <section id="about" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Product Mission</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            About <span className="font-serif italic font-normal text-neutral-400">SARA AI.</span>
          </h2>
        </div>

        {/* Editorial Text Statement */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#09090b] border border-white/[0.07] max-w-3xl mx-auto text-center space-y-6">
          <p className="text-lg sm:text-xl font-normal text-neutral-200 leading-relaxed font-sans">
            "SARA AI is an intelligent voice-based personal assistant designed to make smartphone interaction more natural, productive, and accessible. By combining artificial intelligence, voice recognition, personal memory, and Android automation, SARA aims to transform the way people interact with their mobile devices."
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed max-w-xl mx-auto">
            From launching specific WhatsApp conversations to configuring study timers, dialing emergency guardians, and translating regional signage, SARA executes real actions on Android hardware with zero unapproved background activity.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <a
              href="#demo"
              className="px-5 py-2 rounded-full text-xs font-medium text-black bg-white hover:bg-neutral-200 transition-all"
            >
              Experience SARA in Action
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
