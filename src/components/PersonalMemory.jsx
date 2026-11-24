import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  Lock, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { INITIAL_MEMORIES } from '../data/assistantData';

export default function PersonalMemory({ onTriggerCommand }) {
  const [memories, setMemories] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sara_ai_memories');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return INITIAL_MEMORIES;
        }
      }
    }
    return INITIAL_MEMORIES;
  });

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ category: 'Personal Routines', key: '', value: '' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sara_ai_memories', JSON.stringify(memories));
    }
  }, [memories]);

  const categories = ['All', 'Language & Identity', 'Study & Projects', 'Schedule', 'Contacts', 'Personal Routines'];

  const filteredMemories = memories.filter((m) => {
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch = 
      m.key.toLowerCase().includes(searchFilter.toLowerCase()) || 
      m.value.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = (id) => {
    setMemories(prev => prev.filter(m => m.id !== id));
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!newItem.key.trim() || !newItem.value.trim()) return;

    const added = {
      id: 'mem-' + Date.now(),
      category: newItem.category,
      key: newItem.key.trim(),
      value: newItem.value.trim(),
      permissionApproved: true,
      timestamp: new Date().toISOString().split('T')[0],
    };

    setMemories(prev => [added, ...prev]);
    setNewItem({ category: 'Personal Routines', key: '', value: '' });
    setShowAddModal(false);
  };

  return (
    <section id="memory" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>On-Device Context</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Personal <span className="font-serif italic font-normal text-neutral-400">AI memory.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-normal">
            SARA AI adapts to your life by remembering key details: your study schedule, preferred language, favorite contacts, and project goals. Every memory requires your explicit permission.
          </p>
        </div>

        {/* Minimal Memory Console */}
        <div className="p-7 rounded-2xl bg-[#09090b] border border-white/[0.07]">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
            
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search saved memories..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-black border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-full text-xs font-medium text-black bg-white hover:bg-neutral-200 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add Memory
              </button>

              <button
                onClick={() => setMemories(INITIAL_MEMORIES)}
                className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                title="Reset defaults"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-black'
                    : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Memory Items Grid */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredMemories.map((mem) => (
                <div
                  key={mem.id}
                  className="p-5 rounded-xl bg-black border border-white/[0.06] hover:border-white/[0.14] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2 text-[10px] font-mono text-neutral-400">
                      <span>{mem.category}</span>
                      <span>{mem.timestamp}</span>
                    </div>

                    <h4 className="text-xs font-semibold text-white tracking-tight">
                      {mem.key}
                    </h4>

                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-normal">
                      {mem.value}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Approved
                    </span>

                    <button
                      onClick={() => handleDelete(mem.id)}
                      className="p-1 rounded text-neutral-400 hover:text-rose-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Minimal Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#09090b] border border-white/[0.12] shadow-2xl">
            <h3 className="text-sm font-semibold text-white mb-4">Add Memory Item</h3>
            <form onSubmit={handleAddNew} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black border border-white/[0.08] text-xs text-white focus:outline-none"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c} className="bg-black">{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">Memory Title</label>
                <input
                  type="text"
                  placeholder="e.g. Study Schedule, Project Goal"
                  value={newItem.key}
                  onChange={(e) => setNewItem({ ...newItem, key: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black border border-white/[0.08] text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">Details to Remember</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Prefer 45-minute study timers and Telugu responses"
                  value={newItem.value}
                  onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black border border-white/[0.08] text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 rounded-full text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full text-xs font-medium text-black bg-white hover:bg-neutral-200"
                >
                  Save Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
