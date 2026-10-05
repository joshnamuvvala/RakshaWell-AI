import React from 'react';
import { ShieldCheck, HeartHandshake, FileCheck, Phone } from 'lucide-react';
import { useStore } from '../../services/storeContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Platform Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                RW
              </div>
              <span className="font-bold text-slate-900 text-sm">RakshaWell-AI</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              AI-powered personnel welfare intelligence system designed to detect early changes in personal baseline, explain contributing factors, and facilitate humane support.
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              PROTOTYPE DATASET — SYNTHETIC
            </p>
          </div>

          {/* Col 2: Ethical Bounds */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
              Safety & Ethics Mandate
            </h4>
            <ul className="space-y-1.5 text-slate-500 text-[11px]">
              <li>• AI identifies signals; humans make decisions</li>
              <li>• Welfare comes before surveillance</li>
              <li>• Zero clinical psychiatric diagnosis</li>
              <li>• No promotion or disciplinary linkage</li>
            </ul>
          </div>

          {/* Col 3: Support Resources */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-slate-700" />
              Helpline & Support Links
            </h4>
            <div className="text-slate-500 text-[11px] space-y-1">
              <p className="font-medium text-slate-700 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-500" />
                Tele-MANAS: 14416 (24/7 Toll-free)
              </p>
              <p>Army/CAPF Welfare Cell: Available in Unit</p>
              <p className="text-slate-400">All support dialogues are strictly confidential.</p>
            </div>
          </div>

          {/* Col 4: Quick Navigation & Audit */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-slate-700" />
              Institutional Reference
            </h4>
            <div className="flex flex-col gap-1.5 text-[11px]">
              <button
                onClick={() => setActiveView('research-sources')}
                className="text-left text-slate-600 hover:text-slate-900 hover:underline"
              >
                Official Research & Policy Layer
              </button>
              <button
                onClick={() => setActiveView('admin-privacy')}
                className="text-left text-slate-600 hover:text-slate-900 hover:underline"
              >
                Data Privacy & Consent Center
              </button>
              <button
                onClick={() => setActiveView('admin-audit')}
                className="text-left text-slate-600 hover:text-slate-900 hover:underline"
              >
                Tamper-Evident Audit Logs
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© 2026 RakshaWell-AI · Built for Smart India Hackathon Prototype Demonstration.</p>
          <div className="flex items-center gap-3">
            <span>Confidential & Internal</span>
            <span aria-hidden="true">·</span>
            <span>WCAG 2.1 AA Compliant</span>
            <span aria-hidden="true">·</span>
            <span>ISO/IEC 27001 Controls</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
