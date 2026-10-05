import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const EthicalBanner: React.FC = () => {
  return (
    <div className="bg-slate-50 border-b border-slate-200 text-slate-700 py-2.5 px-4 text-xs font-medium">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
          <span className="font-semibold text-slate-900">Core Ethical Principle:</span>
          <span>AI identifies signals. Humans make decisions. Welfare comes before surveillance.</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[11px]">
          <span>Risk ≠ Diagnosis</span>
          <span aria-hidden="true">·</span>
          <span>Alert ≠ Accusation</span>
          <span aria-hidden="true">·</span>
          <span>AI ≠ Final Decision</span>
        </div>
      </div>
    </div>
  );
};
