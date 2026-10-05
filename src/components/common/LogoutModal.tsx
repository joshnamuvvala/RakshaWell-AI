import React from 'react';
import { useStore } from '../../services/storeContext';
import { LogOut, ShieldAlert, X, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types';

export const LogoutModal: React.FC = () => {
  const {
    confirmLogoutModalOpen,
    setConfirmLogoutModalOpen,
    logout,
    login,
    isLoggedIn,
    currentUser
  } = useStore();

  if (!confirmLogoutModalOpen && isLoggedIn) return null;

  // If user is already logged out, show the secure login screen
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center animate-fadeIn">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base mx-auto mb-4">
            RW
          </div>
          <h2 className="text-lg font-bold text-slate-900">RakshaWell-AI Portal</h2>
          <p className="text-xs text-slate-500 mb-6">
            Session terminated. Select an authorized operational identity to sign in:
          </p>

          <div className="space-y-2 mb-6 text-left text-xs">
            {[
              { role: 'personnel', name: 'Subedar Rajesh Kumar', label: 'Personnel (14th Mountain Div)' },
              { role: 'welfare_officer', name: 'Major Anita Sharma', label: 'Welfare & Medical Officer' },
              { role: 'commander', name: 'Col. Vikramaditya Singh', label: 'Commanding Officer' },
              { role: 'admin', name: 'Sunita Rao', label: 'System & Security Admin' }
            ].map(item => (
              <button
                key={item.role}
                onClick={() => login(item.role as UserRole)}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="font-semibold text-slate-900 block group-hover:text-indigo-600 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-slate-500">{item.label}</span>
                </div>
                <span className="text-xs text-slate-400 font-mono group-hover:text-slate-900">
                  Login →
                </span>
              </button>
            ))}
          </div>

          <p className="text-[11px] text-slate-400">
            Protected internal defense network · 2FA Enforced
          </p>
        </div>
      </div>
    );
  }

  // Active confirmation dialog
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-2xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 relative animate-fadeIn">
        <button
          onClick={() => setConfirmLogoutModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          aria-label="Cancel"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <LogOut className="w-5 h-5" />
        </div>

        <h3 className="text-base font-bold text-slate-900 text-center mb-1">
          Terminate Current Session?
        </h3>
        <p className="text-xs text-slate-500 text-center mb-5 leading-relaxed">
          You are currently signed in as <strong>{currentUser.name}</strong> ({currentUser.rank}). Your session tokens will be purged.
        </p>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setConfirmLogoutModalOpen(false)}
            className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={logout}
            className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs"
          >
            Confirm Logout
          </button>
        </div>
      </div>
    </div>
  );
};
