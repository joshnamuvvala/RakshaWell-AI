import React from 'react';
import { useStore } from '../../services/storeContext';
import { BookOpen, ExternalLink, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

export const ResearchView: React.FC = () => {
  const { researchSources } = useStore();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Official Research & Statutory Evidence Layer
            </h1>
            <p className="text-xs text-slate-500">
              Authoritative policy directives and peer-reviewed scientific foundation
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
          <span>
            <strong>Public Policy Compliance:</strong> Grounded strictly in official open-source government publications, international health guidelines, and peer-reviewed occupational research. Zero classified defense information is utilized.
          </span>
        </div>
      </div>

      {/* Sources List */}
      <div className="space-y-4">
        {researchSources.map(src => (
          <div key={src.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
                  {src.organization}
                </span>
                <h3 className="text-base font-bold text-slate-900">{src.title}</h3>
              </div>

              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{src.verificationStatus}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span>Topic: <strong className="text-slate-700">{src.topic}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Published: <strong className="text-slate-700">{src.publicationDate}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Source Type: <strong className="text-slate-700">{src.sourceType}</strong></span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              {src.summary}
            </p>

            <div className="p-3 rounded-lg border border-slate-200 text-xs text-slate-800">
              <span className="font-semibold text-slate-900 block mb-0.5">Key Operational Takeaway:</span>
              <p className="text-[11px] text-slate-600">{src.keyTakeaway}</p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Source Reference ID: {src.id}</span>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-900 font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>Access Official Document</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
