import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Lock, History, AlertTriangle } from 'lucide-react';

export default function EmergencyAssistant({ onTriggerCommand }) {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [confirmed, setConfirmed] = useState(false);

  const emergencyContacts = [
    { name: 'Mom (Amma)', relation: 'Primary Guardian', phone: '+91 99000 11223', status: 'Priority #1' },
    { name: 'Rahul Sharma', relation: 'Project Partner', phone: '+91 98765 43210', status: 'Backup #2' },
  ];

  const [auditLog, setAuditLog] = useState([
    {
      id: 'log-1',
      date: '2026-11-20 18:40',
      action: 'Emergency Test Verification',
      status: 'Confirmed by user',
      target: 'Mom (+91 99000 11223)'
    }
  ]);

  const handleStartEmergencyFlow = () => {
    setEmergencyActive(true);
    setConfirmed(false);
    setCountdown(5);

    let sec = 5;
    const interval = setInterval(() => {
      sec -= 1;
      setCountdown(sec);
      if (sec <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleConfirmEmergency = () => {
    setConfirmed(true);
    setAuditLog(prev => [
      {
        id: 'log-' + Date.now(),
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: 'Voice Emergency ("SARA, I need help")',
        status: 'Action Approved & Dispatched',
        target: 'Mom (+91 99000 11223) with GPS'
      },
      ...prev
    ]);
  };

  return (
    <section id="emergency" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>Emergency Safety Protocol</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Emergency <span className="font-serif italic font-normal text-neutral-400">assistant.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-normal">
            When seconds count, SARA responds immediately to "SARA, I need help". It primes emergency dialers, alerts trusted guardians, and stages live GPS coordinates—with confirmation safeguards.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Guardians & Trigger (5 cols) */}
          <div className="lg:col-span-5 p-7 rounded-2xl bg-[#09090b] border border-white/[0.07] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono">
              <span className="text-neutral-400">Designated SOS Contacts</span>
              <span className="text-emerald-400">Verified</span>
            </div>

            <div className="space-y-2.5">
              {emergencyContacts.map((c, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-black border border-white/[0.05] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-white">{c.name}</h4>
                    <p className="text-[11px] text-neutral-400 font-mono">{c.relation} • {c.phone}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleStartEmergencyFlow}
              className="w-full py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Simulate "SARA, I need help" Trigger</span>
            </button>
          </div>

          {/* Right: Simulation Monitor & Audit Log (7 cols) */}
          <div className="lg:col-span-7 p-7 rounded-2xl bg-[#09090b] border border-white/[0.07] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono">
              <span className="text-neutral-400">SOS Workflow Monitor</span>
              <span className="text-neutral-400">
                {emergencyActive ? (confirmed ? 'DISPATCHED' : 'COUNTDOWN') : 'STANDBY'}
              </span>
            </div>

            {emergencyActive ? (
              <div className="p-5 rounded-xl bg-black border border-white/[0.08] text-center space-y-4">
                {!confirmed ? (
                  <>
                    <div className="w-12 h-12 rounded-full border-2 border-rose-500 text-rose-500 flex items-center justify-center font-mono font-bold text-lg mx-auto">
                      {countdown}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white">Emergency Sequence Triggered</h4>
                      <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto font-normal">
                        Ready to dial Mom (+91 99000 11223) and transmit simulated GPS coordinates: 17.3850° N, 78.4867° E.
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => setEmergencyActive(false)}
                        className="px-4 py-1.5 rounded-full text-xs text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmEmergency}
                        className="px-4 py-1.5 rounded-full text-xs font-medium text-white bg-rose-600 hover:bg-rose-500"
                      >
                        Confirm Dispatch
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 py-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h4 className="text-sm font-semibold text-white">Emergency Dispatched</h4>
                    <p className="text-xs text-neutral-400 font-normal">
                      Dialer initialized and SMS alert prepared with location link.
                    </p>
                    <button
                      onClick={() => setEmergencyActive(false)}
                      className="mt-2 text-xs text-neutral-400 hover:text-white underline font-mono"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-black border border-white/[0.04] text-center text-xs text-neutral-400 font-mono">
                Emergency protocol ready. Tap the simulate button on the left to test.
              </div>
            )}

            {/* Audit Log */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase text-neutral-400 block mb-2">
                Encrypted Safety Audit Log:
              </span>
              <div className="space-y-2">
                {auditLog.map((log) => (
                  <div key={log.id} className="p-2.5 rounded-lg bg-black border border-white/[0.04] flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-white block">{log.action}</span>
                      <span className="text-[10px] text-neutral-400">{log.target}</span>
                    </div>
                    <span className="text-emerald-400 text-[11px]">{log.status}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
