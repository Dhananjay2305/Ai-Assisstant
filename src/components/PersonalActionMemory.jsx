import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Workflow, 
  Sparkles, 
  Clock, 
  Trash2, 
  Edit3, 
  Plus, 
  CheckCircle2, 
  Zap, 
  ShieldCheck,
  Play,
  ArrowRight
} from 'lucide-react';

export default function PersonalActionMemory({ onTriggerCommand }) {
  const [actionRules, setActionRules] = useState([
    {
      id: 'rule-1',
      trigger: 'When I say "Start Study Mode"',
      action: 'Open Notion app, activate DND, and start a 45-minute timer',
      frequency: 'Every evening at 7 PM',
      category: 'Focus Macro'
    },
    {
      id: 'rule-2',
      trigger: 'Every day at 8:00 PM',
      action: 'Remind me: "Call Parents (Amma & Nanna)" and prime dialer',
      frequency: 'Daily habit (18 times used)',
      category: 'Relationship Routine'
    },
    {
      id: 'rule-3',
      trigger: 'When responding to daily queries',
      action: 'Default voice to Telugu (తెలుగు) with English transliteration',
      frequency: 'Persistent preference',
      category: 'Language Preference'
    }
  ]);

  const [showAddMacro, setShowAddMacro] = useState(false);
  const [newMacro, setNewMacro] = useState({ trigger: '', action: '', category: 'Custom Shortcut' });
  const [testedRuleId, setTestedRuleId] = useState(null);

  const handleAddMacro = (e) => {
    e.preventDefault();
    if (!newMacro.trigger.trim() || !newMacro.action.trim()) return;

    setActionRules(prev => [
      ...prev,
      {
        id: 'rule-' + Date.now(),
        trigger: newMacro.trigger.trim(),
        action: newMacro.action.trim(),
        frequency: 'Newly created rule',
        category: newMacro.category
      }
    ]);

    setNewMacro({ trigger: '', action: '', category: 'Custom Shortcut' });
    setShowAddMacro(false);
  };

  const handleDelete = (id) => {
    setActionRules(prev => prev.filter(r => r.id !== id));
  };

  const handleTestRun = (rule) => {
    setTestedRuleId(rule.id);
    if (onTriggerCommand) {
      onTriggerCommand(rule.trigger.replace(/^When I say\s*"/i, '').replace(/"$/, ''));
    }
    setTimeout(() => {
      setTestedRuleId(null);
    }, 2200);
  };

  return (
    <section id="action-memory" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />
            <span>Autonomous Habit Learning</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Personal <span className="font-serif italic font-normal text-neutral-400">Action Memory.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-400 font-normal leading-relaxed">
            SARA doesn’t just store static facts; it learns your repeatable mobile behavior. It remembers that you call your family at 8 PM, prefer Telugu audio, and that "Study Mode" triggers three apps in harmony.
          </p>
        </div>

        {/* Action Rules Grid */}
        <div className="p-7 rounded-2xl bg-[#09090b] border border-white/[0.07]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.06] gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>Learned Action Macros & Custom Triggers</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5 font-normal">
                Trigger patterns mapped directly to Android OS workflows
              </p>
            </div>

            <button
              onClick={() => setShowAddMacro(!showAddMacro)}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-white bg-[#0066ff] hover:bg-[#0052cc] transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddMacro ? 'Close Creator' : 'Add New Macro'}</span>
            </button>
          </div>

          {/* Add Macro Form */}
          {showAddMacro && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddMacro}
              className="p-5 my-6 rounded-xl bg-black border border-white/[0.08] space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Trigger Condition
                  </label>
                  <input
                    type="text"
                    placeholder='e.g., When I say "Gym Time"'
                    value={newMacro.trigger}
                    onChange={(e) => setNewMacro({ ...newMacro, trigger: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#09090b] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Target Android Action
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Open Spotify playlist & start stopwatch"
                    value={newMacro.action}
                    onChange={(e) => setNewMacro({ ...newMacro, action: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#09090b] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Macro Category
                  </label>
                  <select
                    value={newMacro.category}
                    onChange={(e) => setNewMacro({ ...newMacro, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#09090b] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Focus Macro">Focus Macro</option>
                    <option value="Relationship Routine">Relationship Routine</option>
                    <option value="Language Preference">Language Preference</option>
                    <option value="Media Shortcut">Media Shortcut</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMacro(false)}
                  className="px-4 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors"
                >
                  Save Action Macro
                </button>
              </div>
            </motion.form>
          )}

          {/* Rules List */}
          <div className="space-y-3 mt-6">
            {actionRules.map((rule) => {
              const isTested = testedRuleId === rule.id;
              return (
                <div
                  key={rule.id}
                  className="p-4 rounded-xl bg-black border border-white/[0.05] hover:border-white/[0.12] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/[0.05]">
                        {rule.category}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        {rule.frequency}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-white">
                      {rule.trigger}
                    </div>

                    <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3 text-blue-400 shrink-0" />
                      <span>{rule.action}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleTestRun(rule)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                        isTested 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                          : 'bg-white/[0.03] border-white/[0.07] text-neutral-300 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      {isTested ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Simulated</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 text-blue-400" />
                          <span>Test Macro</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(rule.id)}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-white/[0.04] transition-colors"
                      title="Delete action macro"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Privacy Note */}
          <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Learned macros execute strictly on-device without cloud telemetry</span>
            </div>
            <span className="font-mono text-[11px] text-neutral-400 hidden sm:inline">
              Keystore Encrypted
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}