import React, { useState } from 'react';
import { Volume2, Play } from 'lucide-react';
import { LANGUAGES } from '../data/assistantData';
import { speechEngine } from '../utils/speech';

export default function MultilingualAssistant({ selectedLang = 'te', onSelectLang, onTriggerCommand }) {
  const [activeTab, setActiveTab] = useState(selectedLang || 'te');

  const sampleConversations = {
    te: [
      {
        user: 'WhatsApp open cheyyi.',
        meaning: 'Open WhatsApp.',
        response: 'WhatsApp open chestunnanu. Evariki message pettali?',
      },
      {
        user: 'Rahul ki call cheyyi.',
        meaning: 'Call Rahul.',
        response: 'Rahul Sharma (+91 98765 43210) ki phone dial chestunnanu.',
      },
      {
        user: 'Naku 7 PM ki reminder pettu.',
        meaning: 'Set a reminder for me at 7 PM.',
        response: 'Sayantram 7:00 PM ki "Evening Study Session" reminder register chesanu.',
      }
    ],
    hi: [
      {
        user: 'व्हाट्सएप खोलो।',
        meaning: 'Open WhatsApp.',
        response: 'व्हाट्सएप खोला जा रहा है।',
      },
      {
        user: 'राहुल को कॉल करो।',
        meaning: 'Call Rahul.',
        response: 'राहुल शर्मा को कॉल मिलाया जा रहा है।',
      },
      {
        user: 'आज का मेरा शेड्यूल बताओ।',
        meaning: 'Tell me my schedule for today.',
        response: 'आज सुबह 10:30 बजे प्रोजेक्ट रिव्यू और शाम 7:00 बजे स्टडी सेशन है।',
      }
    ],
    mr: [
      {
        user: 'आजचा माझा schedule सांग.',
        meaning: 'Tell me my schedule for today.',
        response: 'आज सकाळी 10:30 वाजता प्रोजेक्ट रिव्ह्यू आणि संध्याकाळी 7:00 वाजता अभ्यास आहे.',
      },
      {
        user: 'व्हॉट्सॲप उघडा.',
        meaning: 'Open WhatsApp.',
        response: 'व्हॉट्सॲप उघडत आहे.',
      },
      {
        user: 'राहुलला मेसेज पाठवा.',
        meaning: 'Send a message to Rahul.',
        response: 'राहुलसाठी मेसेज तयार केला आहे.',
      }
    ],
    en: [
      {
        user: 'Open WhatsApp and message Rahul.',
        meaning: 'Direct deep-link action',
        response: 'Launching WhatsApp and opening chat for Rahul Sharma.',
      },
      {
        user: 'Start Study Mode now.',
        meaning: 'Multi-action smart routine',
        response: 'Study Mode active: DND on, notes open, 45-min timer started.',
      },
      {
        user: 'Summarize my notifications.',
        meaning: 'Notification extraction',
        response: 'You have 1 urgent notice from Prof. Sundaram regarding Capstone Review.',
      }
    ]
  };

  const handlePlayVoice = (text, langCode) => {
    const langObj = LANGUAGES.find(l => l.code === langCode);
    if (langObj) {
      speechEngine.speak(text, langObj.voiceCode);
    }
  };

  return (
    <section id="multilingual" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Regional Dialect Support</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Truly <span className="font-serif italic font-normal text-neutral-400">multilingual.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-normal">
            Technology should speak your mother tongue. SARA AI understands natural dialectal expressions, mixed-code sentences, and delivers audio feedback in your chosen regional accent.
          </p>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setActiveTab(lang.code);
                if (onSelectLang) onSelectLang(lang.code);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-colors flex items-center gap-1.5 ${
                activeTab === lang.code
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#09090b] text-neutral-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.native}</span>
              <span className="text-[10px] opacity-60">({lang.name})</span>
            </button>
          ))}
        </div>

        {/* Sample Conversations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sampleConversations[activeTab]?.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.07] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Dialogue {idx + 1}</span>
                  <button
                    onClick={() => handlePlayVoice(item.response, activeTab)}
                    className="p-1 rounded text-neutral-400 hover:text-white transition-colors"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-black border border-white/[0.05] mb-3">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-0.5">SPOKEN COMMAND:</span>
                  <p className="text-sm font-semibold text-white">"{item.user}"</p>
                  <p className="text-[11px] text-neutral-400 font-normal italic mt-0.5">({item.meaning})</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[10px] font-mono text-blue-400 block mb-0.5">SARA RESPONSE:</span>
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal">{item.response}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.04]">
                <button
                  onClick={() => onTriggerCommand(item.user)}
                  className="w-full py-2 rounded-full text-xs font-medium text-black bg-white hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Test in AI Demo</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
