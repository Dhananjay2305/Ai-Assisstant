import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle2, Sparkles, GraduationCap, Briefcase, Sun, Moon } from 'lucide-react';
import { INITIAL_ROUTINES } from '../data/assistantData';

export default function SmartRoutines({ onTriggerCommand }) {
  const [routines, setRoutines] = useState(INITIAL_ROUTINES);
  const [activeRunningRoutine, setActiveRunningRoutine] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const iconMap = {
    GraduationCap,
    Briefcase,
    Sun,
    Moon
  };

  const handleToggleRoutine = (id) => {
    setRoutines(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const handleSimulateExecution = (routine) => {
    setActiveRunningRoutine(routine);
    setCurrentStepIndex(0);

    routine.steps.forEach((_, idx) => {
      setTimeout(() => {
        setCurrentStepIndex(idx + 1);
      }, (idx + 1) * 700);
    });
  };

  return (
    <section id="routines" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Chained Actions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Smart routine <span className="font-serif italic font-normal text-neutral-400">automation.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-normal">
            One single voice command triggers a synchronized sequence of mobile actions across study sessions, work check-ins, morning briefings, and bedtime silence.
          </p>
        </div>

        {/* Minimal Routines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {routines.map((routine) => {
            const IconComponent = iconMap[routine.icon] || Sparkles;

            return (
              <div
                key={routine.id}
                className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.07] hover:border-white/[0.16] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/80">
                        <IconComponent className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                          {routine.name}
                        </h3>
                        <p className="text-xs text-neutral-400 font-normal">{routine.tagline}</p>
                      </div>
                    </div>

                    {/* Toggle */}
                    <button
                      onClick={() => handleToggleRoutine(routine.id)}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
                        routine.active ? 'bg-[#0055ff]' : 'bg-neutral-800'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          routine.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Spoken voice trigger */}
                  <div className="my-3 p-2.5 rounded-lg bg-black border border-white/[0.04] flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400 text-[11px]">SPOKEN TRIGGER:</span>
                    <span className="text-neutral-200">"{routine.voiceTrigger}"</span>
                  </div>

                  {/* Steps sequence */}
                  <div className="space-y-1.5 mt-4">
                    {routine.steps.map((st, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-2 p-2 rounded-lg bg-black/60 border border-white/[0.03] text-xs text-neutral-300 font-normal"
                      >
                        <span className="w-4 h-4 rounded bg-white/[0.04] text-neutral-400 flex items-center justify-center text-[10px] font-mono shrink-0">
                          {i + 1}
                        </span>
                        <span className="truncate">{st.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.04] flex items-center justify-between gap-3">
                  <button
                    onClick={() => onTriggerCommand(routine.voiceTrigger)}
                    className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                  >
                    Test trigger →
                  </button>

                  <button
                    onClick={() => handleSimulateExecution(routine)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium text-black bg-white hover:bg-neutral-200 transition-all flex items-center gap-1.5"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Routine</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Routine Simulation Execution Modal */}
      <AnimatePresence>
        {activeRunningRoutine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <div className="w-full max-w-md p-6 rounded-2xl bg-[#09090b] border border-white/[0.12] shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <span className="text-xs font-mono uppercase text-neutral-400">
                  Executing: {activeRunningRoutine.name}
                </span>
                <span className="text-xs font-mono text-blue-400">
                  {currentStepIndex >= activeRunningRoutine.steps.length ? 'Finished' : 'In Progress'}
                </span>
              </div>

              <div className="space-y-2 py-2">
                {activeRunningRoutine.steps.map((step, idx) => {
                  const isDone = currentStepIndex > idx;
                  const isCurrent = currentStepIndex === idx;

                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                        isDone 
                          ? 'bg-black border-white/[0.08] text-neutral-200' 
                          : isCurrent
                          ? 'bg-blue-950/20 border-blue-500/30 text-blue-300'
                          : 'bg-black/30 border-white/[0.02] text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : isCurrent ? (
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded bg-white/[0.04] text-neutral-400 flex items-center justify-center text-[10px] font-mono shrink-0">
                            {idx + 1}
                          </span>
                        )}
                        <span>{step.text}</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {isDone ? 'DONE' : isCurrent ? 'RUNNING' : 'QUEUED'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-400">Android Intent Chaining</span>
                <button
                  onClick={() => setActiveRunningRoutine(null)}
                  className="px-4 py-1.5 rounded-full text-xs font-medium text-black bg-white hover:bg-neutral-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
