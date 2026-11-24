import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, 
  Mic, 
  Cpu, 
  GitFork, 
  Smartphone, 
  Volume2, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircle, 
  PhoneCall, 
  Clock, 
  Workflow, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export default function HowItWorks() {
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState(0);

  const workflowSteps = [
    {
      num: '01',
      title: 'Wake Word Detection',
      tagline: 'On-Device Standby',
      desc: 'Ultra low-power acoustic engine listens locally for "Hey SARA" without transmitting audio or draining device battery.',
      icon: Radio,
      detail: 'Runs via native Android VoiceInteractionService with zero cloud dependency during standby.'
    },
    {
      num: '02',
      title: 'Speech Recognition',
      tagline: 'Multilingual STT',
      desc: 'Converts captured vocal audio into normalized textual tokens across English, Telugu, Hindi, and Marathi.',
      icon: Mic,
      detail: 'Handles regional pronunciation nuances, accents, and noisy environments with acoustic noise reduction.'
    },
    {
      num: '03',
      title: 'AI Understanding',
      tagline: 'Semantic NLU',
      desc: 'Parses conversational intent, resolves ambiguous entity targets (contacts, app names), and extracts exact parameters.',
      icon: Cpu,
      detail: 'Determines whether the user wants to launch an app, place a call, trigger a macro, or query memory.'
    },
    {
      num: '04',
      title: 'Action Planning',
      tagline: 'Safety & Permission Gate',
      desc: 'Constructs deterministic Android Intent payloads and triggers safety confirmations for sensitive phone operations.',
      icon: GitFork,
      detail: 'Verifies runtime permissions (Microphone, Contacts, Accessibility, System Alert Window).'
    },
    {
      num: '05',
      title: 'Android Action Execution',
      tagline: 'Native OS Intents',
      desc: 'Dispatches verified intent to Android framework — launching apps, triggering dialers, setting alarms, or executing routines.',
      icon: Smartphone,
      detail: 'Executes without web-browser friction using standard Android framework APIs and Intent.ACTION_VIEW.'
    },
    {
      num: '06',
      title: 'Voice Response',
      tagline: 'Neural Audio Confirmation',
      desc: 'Confirms task completion in the user\'s preferred dialect and synchronizes recent action history to on-device memory.',
      icon: Volume2,
      detail: 'Generates natural TTS speech feedback so you stay updated without needing to look at your screen.'
    },
  ];

  const nativeCapabilities = [
    {
      title: 'Open Installed Apps',
      desc: 'Launch WhatsApp, YouTube, Google Maps, Camera, and settings instantly through package intents.',
      icon: Smartphone,
      badge: 'Package Manager',
      example: '"Open YouTube"'
    },
    {
      title: 'Prepare Phone Calls',
      desc: 'Search local contacts and prime the native Android TelecomManager dialer with confirmation gates.',
      icon: PhoneCall,
      badge: 'TelecomManager',
      example: '"Call Rahul"'
    },
    {
      title: 'Open WhatsApp Chats',
      desc: 'Jump directly to specific contact threads with pre-filled message text ready for one-tap dispatch.',
      icon: MessageCircle,
      badge: 'Intent.ACTION_VIEW',
      example: '"Message Rahul on WhatsApp"'
    },
    {
      title: 'Create Reminders & Alarms',
      desc: 'Set native Android alarms, calendar events, and recurring notifications through AlarmManager.',
      icon: Clock,
      badge: 'AlarmManager API',
      example: '"Remind me at 7 PM"'
    },
    {
      title: 'Start Smart Routines',
      desc: 'Chain multiple actions — enable DND, start a focus timer, open notes, and toggle device brightness.',
      icon: Workflow,
      badge: 'Routine Chainer',
      example: '"Start Study Mode"'
    },
    {
      title: 'Respond Through Voice',
      desc: 'Deliver clear, low-latency spoken confirmations across English, Telugu, Hindi, and Marathi.',
      icon: Volume2,
      badge: 'Neural TTS',
      example: '"Action completed, Rahul."'
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-black relative border-t border-white/[0.06] overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/[0.07] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Connected 3-Step Action Pipeline (Matches Reference Screenshot) */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white"
          >
            From a simple command to a <span className="font-serif italic font-normal text-neutral-300">real action.</span>
          </motion.h2>

          {/* 3 Connected Nodes */}
          <div className="mt-14 relative">
            {/* Connecting Horizontal Line (Desktop) */}
            <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-blue-500/10 via-blue-500/40 to-blue-500/10 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative z-10">
              
              {/* Step 1: You Speak */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#050b1d] border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-[0_0_25px_rgba(0,102,255,0.35)] mb-4 hover:scale-105 transition-transform">
                  <Mic className="w-6 h-6 text-[#38bdf8]" />
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight">You Speak</h3>
                <p className="mt-1 text-xs text-neutral-400 font-normal max-w-[200px]">
                  Say "Hey SARA" or give a command.
                </p>
              </motion.div>

              {/* Step 2: SARA Understands */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#050b1d] border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-[0_0_25px_rgba(0,102,255,0.35)] mb-4 hover:scale-105 transition-transform">
                  <Cpu className="w-6 h-6 text-[#38bdf8]" />
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight">SARA Understands</h3>
                <p className="mt-1 text-xs text-neutral-400 font-normal max-w-[200px]">
                  AI interprets your intent.
                </p>
              </motion.div>

              {/* Step 3: SARA Acts */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#050b1d] border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-[0_0_25px_rgba(0,102,255,0.35)] mb-4 hover:scale-105 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-[#38bdf8]" />
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight">SARA Acts</h3>
                <p className="mt-1 text-xs text-neutral-400 font-normal max-w-[200px]">
                  Get things done instantly.
                </p>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Section Sub-Header for Android System Architecture */}
        <div className="text-center max-w-3xl mx-auto mb-14 pt-10 border-t border-white/[0.06]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] shadow-[0_0_6px_#0066ff]" />
            <span>Android Assistant Architecture</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white">
            Under the hood: <span className="font-serif italic font-normal text-neutral-400">Zero-latency execution.</span>
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed max-w-xl mx-auto">
            Experience the complete pipeline: from local acoustic wake-word capture to deterministic Android OS intent execution and voice confirmation.
          </p>
        </div>

        {/* Visual Workflow Pipeline (6 Steps) */}
        <div className="mb-20">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6 text-center">
            End-To-End Execution Pipeline
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = selectedWorkflowStep === idx;

              return (
                <div
                  key={step.num}
                  onClick={() => setSelectedWorkflowStep(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected 
                      ? 'bg-[#0e0e14] border-blue-500/50 shadow-[0_0_25px_rgba(0,102,255,0.15)]' 
                      : 'bg-[#09090b] border-white/[0.07] hover:border-white/[0.16]'
                  }`}
                >
                  <div>
                    {/* Step Number + Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-neutral-400 group-hover:text-blue-400 transition-colors">
                        {step.num}
                      </span>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-white/[0.04] text-neutral-300'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-blue-400 mb-1">
                      {step.tagline}
                    </div>

                    <h3 className="text-sm font-semibold text-white tracking-tight leading-snug">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  {/* Arrow Indicator for Flow */}
                  {idx < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-white/20">
                      →
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-neutral-400">
                    Step {idx + 1} of 6
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Banner */}
          <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="font-mono text-neutral-400">Pipeline Detail:</span>
              <span>{workflowSteps[selectedWorkflowStep].detail}</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
              Step {workflowSteps[selectedWorkflowStep].num} Active
            </span>
          </div>
        </div>

        {/* Native Android Capabilities Grid */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight">
              Native Android OS Functionality
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              SARA AI interfaces directly with core Android system frameworks to accomplish real physical phone actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {nativeCapabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.07] hover:border-white/[0.16] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-blue-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-neutral-400 border border-white/[0.05]">
                        {cap.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white tracking-tight">
                      {cap.title}
                    </h4>

                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-normal">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-blue-400">
                      {cap.example}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sensitive Actions Confirmation Callout */}
          <div className="mt-8 p-5 rounded-2xl bg-[#09090b] border border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">Sensitive Action Security Gate</h4>
                <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                  Financial transfers, sending outbound messages, making unprompted phone calls, and accessing private memories require explicit user confirmation and authorized Android permissions.
                </p>
              </div>
            </div>

            <a
              href="#privacy"
              className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap"
            >
              Learn about privacy gates →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}