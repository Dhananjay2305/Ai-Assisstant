import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  PhoneCall, 
  Database, 
  Workflow, 
  Bell, 
  Compass, 
  Languages, 
  Camera, 
  ShieldAlert, 
  Clock,
  ArrowRight
} from 'lucide-react';

export default function FeaturesSection({ onTriggerCommand }) {
  const features = [
    {
      id: 'voice-control',
      title: 'Voice Control',
      description: 'Speak naturally, get things done.',
      icon: Mic,
      targetId: 'demo',
      command: 'Open YouTube',
    },
    {
      id: 'personal-memory',
      title: 'Personal AI Memory',
      description: 'Remember what matters.',
      icon: Database,
      targetId: 'memory',
      command: 'What did I tell you about my project?',
    },
    {
      id: 'routine-automation',
      title: 'Smart Routines',
      description: 'Automate your daily tasks.',
      icon: Workflow,
      targetId: 'routines',
      command: 'Start Study Mode',
    },
    {
      id: 'notification-intelligence',
      title: 'Notification Intelligence',
      description: 'Get the important stuff first.',
      icon: Bell,
      targetId: 'notifications',
      command: 'Summarize my notifications',
    },
    {
      id: 'visual-ai',
      title: 'Visual AI',
      description: 'Understand what you see.',
      icon: Camera,
      targetId: 'visual-ai',
      command: 'Analyze document photo',
    },
    {
      id: 'emergency-assistant',
      title: 'Emergency Assistant',
      description: 'Get help when you need it.',
      icon: ShieldAlert,
      targetId: 'emergency',
      command: 'SARA, I need help',
    },
  ];

  const handleCardClick = (targetId, command) => {
    if (onTriggerCommand && command) {
      onTriggerCommand(command);
    }
  };

  return (
    <section id="features" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Built for Android Productivity</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Designed to make your day <span className="font-serif italic font-normal text-neutral-400">simpler.</span>
          </h2>
          
          <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-normal">
            Every feature is engineered to remove friction from your smartphone interactions without cluttering your digital headspace.
          </p>
        </div>

        {/* Feature Cards Grid (Minimal dark cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => handleCardClick(feature.targetId, feature.command)}
                className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.07] hover:border-white/[0.18] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/80 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Test <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-neutral-100 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <span>Voice Prompt:</span>
                  <span className="text-blue-400/90 group-hover:text-blue-300 transition-colors truncate max-w-[170px]">
                    "{feature.command}"
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
