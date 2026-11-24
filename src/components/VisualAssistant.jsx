import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, Scan, ArrowRight, Info } from 'lucide-react';
import { VISUAL_DEMO_SAMPLES } from '../data/assistantData';

export default function VisualAssistant({ onTriggerCommand }) {
  const [selectedSample, setSelectedSample] = useState(VISUAL_DEMO_SAMPLES[0]);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setSelectedSample({
          id: 'custom-upload',
          title: file.name,
          description: 'Uploaded user image for multimodal AI Vision inspection',
          badge: 'User Upload',
          previewText: 'Detected text & visual entities from client upload...',
          analysis: {
            type: 'Uploaded Document / Image',
            keyPoints: [
              `File "${file.name}" loaded with contrast enhancement`,
              'OCR pre-processing applied across regional language characters',
              'Ready for conversational questioning and instant summarization'
            ],
            suggestedAction: 'Ask SARA: "Summarize this photo"'
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="visual-ai" className="py-28 bg-black relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Multimodal Vision</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Visual <span className="font-serif italic font-normal text-neutral-400">understanding.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-normal">
            Point your camera at study notes, regional street signs, medication labels, or code snippets to extract insights, translate dialects, and summarize complex paragraphs.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-neutral-400 text-xs">
            <Info className="w-3.5 h-3.5 text-neutral-400" />
            <span>Demonstration interface simulating SARA's multimodal OCR & image reasoning pipeline.</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Sample Selectors (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">
              Select Preset or Upload:
            </span>

            {VISUAL_DEMO_SAMPLES.map((sample) => (
              <div
                key={sample.id}
                onClick={() => {
                  setSelectedSample(sample);
                  setUploadedImage(null);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedSample.id === sample.id && !uploadedImage
                    ? 'bg-[#121216] border-white/20'
                    : 'bg-[#09090b] border-white/[0.06] hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs sm:text-sm font-medium text-white">{sample.title}</h4>
                  <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded">
                    {sample.badge}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-normal">{sample.description}</p>
              </div>
            ))}

            <label className="cursor-pointer block p-5 rounded-xl border border-dashed border-white/[0.12] hover:border-white/30 bg-[#09090b] text-center transition-colors">
              <Upload className="w-5 h-5 text-neutral-400 mx-auto mb-1.5" />
              <span className="text-xs font-medium text-white block">Upload an image</span>
              <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">
                PNG, JPG or screenshots
              </span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          {/* Right: Visual Inspection Screen (7 cols) */}
          <div className="lg:col-span-7 p-7 rounded-2xl bg-[#09090b] border border-white/[0.07] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono">
              <span className="text-neutral-400">Scanner Viewport</span>
              <span className="text-blue-400">{selectedSample.badge}</span>
            </div>

            {/* Preview Box */}
            <div className="p-4 rounded-xl bg-black border border-white/[0.06] min-h-[140px] flex flex-col justify-center">
              {uploadedImage ? (
                <div className="max-h-48 flex items-center justify-center overflow-hidden rounded-lg">
                  <img src={uploadedImage} alt="Uploaded preview" className="max-h-48 object-contain" />
                </div>
              ) : (
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 block mb-1">OCR DETECTED TOKENS:</span>
                  <p className="text-xs font-mono text-neutral-200 leading-relaxed bg-white/[0.02] p-3 rounded-lg border border-white/[0.04]">
                    "{selectedSample.previewText}"
                  </p>
                </div>
              )}
            </div>

            {/* Analysis Points */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                Extracted Insights:
              </span>
              {selectedSample.analysis.keyPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-normal">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Action suggestion */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 block">SUGGESTED ACTION:</span>
                <span className="text-xs text-white font-medium">{selectedSample.analysis.suggestedAction}</span>
              </div>
              <button
                onClick={() => onTriggerCommand(selectedSample.analysis.suggestedAction)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-black bg-white hover:bg-neutral-200 transition-colors shrink-0"
              >
                Ask SARA
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
