import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PhoneCall, 
  MessageCircle, 
  Send, 
  UserCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Search,
  Lock,
  ArrowRight
} from 'lucide-react';
import { CONTACTS } from '../data/assistantData';

export default function SmartCommunication({ onTriggerCommand }) {
  const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'call' | 'message' | null
  const [messageDraft, setMessageDraft] = useState('I will arrive in 10 minutes.');
  const [actionConfirmed, setActionConfirmed] = useState(false);

  const filteredContacts = CONTACTS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInitiateCall = (contact) => {
    setSelectedContact(contact);
    setActionConfirmed(false);
    setActiveModal('call');
  };

  const handleInitiateMessage = (contact) => {
    setSelectedContact(contact);
    setActionConfirmed(false);
    setActiveModal('message');
  };

  const handleConfirmAction = () => {
    setActionConfirmed(true);
    setTimeout(() => {
      setActiveModal(null);
      setActionConfirmed(false);
    }, 2200);
  };

  return (
    <section id="communication" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />
            <span>Smart Calling & Messaging</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Voice-Driven <span className="font-serif italic font-normal text-neutral-400">Communication.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-400 font-normal leading-relaxed">
            SARA recognizes names naturally, disambiguates similar contacts, prepares dialer actions, and dictates WhatsApp or SMS messages with mandatory confirmation gates.
          </p>
        </div>

        {/* Communication Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Contact Directory & Search (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#09090b] border border-white/[0.07]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white">Verified Contact Registry</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Local phonebook parsed with phonetic matching</p>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-black border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Contact Cards List */}
            <div className="space-y-3 mt-4">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-3.5 rounded-xl bg-black border border-white/[0.05] hover:border-white/[0.12] transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-blue-400 font-medium">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-white flex items-center gap-2">
                        <span>{contact.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.04] text-neutral-400 border border-white/[0.05]">
                          {contact.relationship}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                        {contact.phone} • {contact.role}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleInitiateCall(contact)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.06] transition-colors flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                      <span className="hidden sm:inline">Call</span>
                    </button>

                    <button
                      onClick={() => handleInitiateMessage(contact)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.06] transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                      <span className="hidden sm:inline">Message</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>Security Rule: Zero background dialing</span>
              <span className="text-emerald-400">Confirmation Gate Active</span>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Simulator & Confirmation (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.07]">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 pb-3 border-b border-white/[0.05]">
                <ShieldAlert className="w-4 h-4 text-blue-400" />
                <span>Simulated Telecom Action</span>
              </div>

              {activeModal ? (
                <div className="mt-4 space-y-4">
                  <div className="p-4 rounded-xl bg-black border border-white/[0.08]">
                    <div className="text-xs text-neutral-400 uppercase font-mono">Pending Action:</div>
                    <div className="text-sm font-semibold text-white mt-1 flex items-center gap-2">
                      {activeModal === 'call' ? (
                        <>
                          <PhoneCall className="w-4 h-4 text-blue-400" />
                          <span>Initiate Voice Call to {selectedContact?.name}</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-4 h-4 text-blue-400" />
                          <span>Send WhatsApp Message to {selectedContact?.name}</span>
                        </>
                      )}
                    </div>

                    <div className="text-xs font-mono text-neutral-400 mt-2">
                      Target: {selectedContact?.phone}
                    </div>

                    {activeModal === 'message' && (
                      <div className="mt-3">
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                          Draft Message:
                        </label>
                        <textarea
                          value={messageDraft}
                          onChange={(e) => setMessageDraft(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#09090b] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-blue-500"
                          rows={2}
                        />
                      </div>
                    )}
                  </div>

                  {actionConfirmed ? (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Action confirmed. Android Intent dispatched successfully.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleConfirmAction}
                        className="flex-1 py-2 rounded-xl text-xs font-medium text-black bg-white hover:bg-neutral-200 transition-colors shadow-md"
                      >
                        Confirm & Execute
                      </button>
                      <button
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6 py-8 text-center text-neutral-400 text-xs space-y-2">
                  <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto text-neutral-400 mb-3">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <p>Select any contact on the left to simulate SARA's voice call or WhatsApp message dispatch.</p>
                  <p className="text-[11px] font-mono text-neutral-500">Every transmission requires affirmative user intent.</p>
                </div>
              )}
            </div>

            {/* Quick Trigger Pill */}
            <div 
              onClick={() => {
                if (onTriggerCommand) onTriggerCommand('Call Rahul');
              }}
              className="p-4 rounded-2xl bg-[#09090b] border border-white/[0.07] hover:border-white/[0.16] cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white group-hover:text-blue-400 transition-colors">
                    Try voice command: "Call Rahul"
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">Simulate via web audio console</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}