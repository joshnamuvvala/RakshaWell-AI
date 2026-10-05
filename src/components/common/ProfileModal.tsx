import React from 'react';
import { useStore } from '../../services/storeContext';
import { X, User, ShieldCheck, Lock, Building, Calendar, Mail, CheckCircle2 } from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const { profileModalOpen, setProfileModalOpen, currentUser } = useStore();

  if (!profileModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-2xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          onClick={() => setProfileModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-full bg-slate-900 text-white font-bold text-base flex items-center justify-center shadow-md">
            {currentUser.name
              .split(' ')
              .map(n => n[0])
              .slice(0, 2)
              .join('')}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{currentUser.name}</h3>
            <p className="text-xs text-slate-500">{currentUser.rank} · {currentUser.serviceNumber}</p>
          </div>
        </div>

        <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              Formation Unit:
            </span>
            <span className="font-semibold text-slate-900">{currentUser.unitName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              Official Email:
            </span>
            <span className="font-mono text-slate-700">{currentUser.email}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Joined Service:
            </span>
            <span className="text-slate-700">{currentUser.joinedDate}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              Two-Factor Auth:
            </span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Enforced
            </span>
          </div>
        </div>

        <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-[11px] text-indigo-900 space-y-1 mb-5">
          <div className="font-semibold flex items-center gap-1">
            <Lock className="w-3 h-3 text-indigo-600" />
            <span>Personnel Confidentiality Policy</span>
          </div>
          <p className="text-indigo-800 leading-relaxed">
            Your Personal Welfare Twin data and private counseling sessions are strictly access-controlled. No unauthorized party can access your voluntary check-ins.
          </p>
        </div>

        <button
          onClick={() => setProfileModalOpen(false)}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
        >
          Close Profile
        </button>
      </div>
    </div>
  );
};
