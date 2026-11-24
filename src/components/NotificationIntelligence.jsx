import React, { useState } from 'react';
import { Bell, Sparkles, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { SAMPLE_NOTIFICATIONS } from '../data/assistantData';

export default function NotificationIntelligence({ onTriggerCommand }) {
  const [filterPriority, setFilterPriority] = useState('All');
  const priorities = ['All', 'Urgent', 'High', 'Normal', 'Low'];

  const filteredNotifications = SAMPLE_NOTIFICATIONS.filter(n => 
    filterPriority === 'All' || n.priority === filterPriority
  );

  return (
    <section id="notifications" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Attention Shield</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Notification <span className="font-serif italic font-normal text-neutral-400">intelligence.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-normal">
            Eliminate alert fatigue. SARA reads incoming push streams through Android's NotificationListenerService, isolates spam from urgent mentor messages, and synthesizes executive summaries.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-neutral-400 text-xs">
            <Info className="w-3.5 h-3.5 text-neutral-400" />
            <span>Requires user consent to bind android.service.notification.NotificationListenerService.</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Push Notification Feed (7 cols) */}
          <div className="lg:col-span-7 p-7 rounded-2xl bg-[#09090b] border border-white/[0.07]">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">Incoming Feed Interceptor</span>
              
              <div className="flex items-center gap-1.5">
                {priorities.map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilterPriority(p)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      filterPriority === p 
                        ? 'bg-white text-black' 
                        : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.04]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-4 rounded-xl bg-black border border-white/[0.05] hover:border-white/[0.12] transition-all"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{notif.app}</span>
                      <span className="text-neutral-400 font-normal">from {notif.sender}</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">{notif.time}</span>
                  </div>

                  <h4 className="text-xs font-medium text-neutral-200">{notif.title}</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-normal">{notif.content}</p>

                  {notif.extractedAction && (
                    <div className="mt-2.5 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] font-mono text-neutral-300 flex items-center justify-between">
                      <span>Action: {notif.extractedAction}</span>
                      <span className="text-blue-400 text-[10px]">Extracted</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Spoken Summary Output (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-7 rounded-2xl bg-[#09090b] border border-white/[0.07] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-blue-400 block mb-2">Executive Daily Briefing</span>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  "Tell me the important messages I received today"
                </h3>

                <div className="mt-4 p-4 rounded-xl bg-black border border-white/[0.06] text-xs text-neutral-300 font-mono leading-relaxed space-y-2">
                  <div className="text-neutral-400 text-[11px]">SARA VOICE BRIEFING:</div>
                  <p>
                    "You have 1 urgent notice and 1 team update: Prof. Sundaram confirmed your Capstone Project review tomorrow at 10:30 AM in Lab 3. Rahul also pushed the voice intent service branch for testing."
                  </p>
                </div>
              </div>

              <button
                onClick={() => onTriggerCommand('Summarize my notifications')}
                className="mt-6 w-full py-2.5 rounded-full text-xs font-medium text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Trigger in AI Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#09090b] border border-white/[0.07] text-xs text-neutral-400 leading-relaxed font-normal">
              <strong className="text-white block font-medium mb-1">On-Device Regex Sanitization</strong>
              Financial OTPs, banking passcodes, and biometric authentication tokens are never passed to external inference models.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
