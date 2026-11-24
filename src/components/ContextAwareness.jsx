import React, { useState } from 'react';
import { Compass, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { CONTEXT_SCENARIOS } from '../data/assistantData';

export default function ContextAwareness({ onTriggerCommand }) {
  const [selectedScenario, setSelectedScenario] = useState(CONTEXT_SCENARIOS[0]);

  return (
    <section id="context" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Proactive Sensing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Context-aware <span className="font-serif italic font-normal text-neutral-400">intelligence.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-normal">
            SARA doesn't wait to be told. By analyzing temporal patterns, Bluetooth handshakes, active apps, and location cues, SARA proactively anticipates your needs.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Scenario Selectors (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">
              Select Real-World Situations:
            </span>

            {CONTEXT_SCENARIOS.map((sc) => (
              <div
                key={sc.id}
                onClick={() => setSelectedScenario(sc)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedScenario.id === sc.id
                    ? 'bg-[#121216] border-white/20'
                    : 'bg-[#09090b] border-white/[0.06] hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs sm:text-sm font-medium text-white">{sc.situation}</h4>
                  <span className="text-[10px] font-mono text-neutral-400">{sc.confidence}</span>
                </div>
                <p className="text-xs text-neutral-400 font-mono truncate">{sc.sensorInput}</p>
              </div>
            ))}
          </div>

          {/* Right: SARA Inference Screen (7 cols) */}
          <div className="lg:col-span-7 p-7 rounded-2xl bg-[#09090b] border border-white/[0.07] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono">
              <span className="text-neutral-400">Sensor Fusion Pipeline</span>
              <span className="text-emerald-400">Telemetry Active</span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                Environment Input:
              </span>
              <div className="p-3 rounded-lg bg-black border border-white/[0.06] text-xs font-mono text-neutral-300">
                {selectedScenario.sensorInput}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                SARA Reasoning:
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                {selectedScenario.saraInference}
              </p>
            </div>

            {/* Spoken Proactive Suggestion */}
            <div className="p-4 rounded-xl bg-black border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-blue-400">
                <Zap className="w-3.5 h-3.5" /> PROACTIVE SPOKEN PROMPT:
              </div>
              <p className="text-sm font-medium text-white italic">
                "{selectedScenario.saraSuggestion}"
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-400">No manual searching needed</span>
                <button
                  onClick={() => onTriggerCommand(selectedScenario.quickAction)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-black bg-white hover:bg-neutral-200 transition-colors"
                >
                  {selectedScenario.quickAction}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
