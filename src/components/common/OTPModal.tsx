import React, { useState } from 'react';
import { useStore } from '../../services/storeContext';
import { ShieldCheck, Lock, AlertCircle, X } from 'lucide-react';

export const OTPModal: React.FC = () => {
  const { showOTPModal, cancelOTP, verifyOTP, pendingRoleSwitch, currentUser } = useStore();
  const [code, setCode] = useState<string>('123456');
  const [error, setError] = useState<string>('');

  if (!showOTPModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyOTP(code)) {
      setError('Invalid 6-digit OTP code. Enter 123456 for demo access.');
    } else {
      setError('');
    }
  };

  const roleName = pendingRoleSwitch
    ? pendingRoleSwitch.replace('_', ' ').toUpperCase()
    : 'PRIVILEGED SESSION';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={cancelOTP}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Two-Factor Authentication</h3>
            <p className="text-xs text-slate-500">Security verification required for {roleName}</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 mb-5 text-xs text-slate-600 space-y-1">
          <div className="flex items-center justify-between font-medium">
            <span>Authentication Target:</span>
            <span className="text-slate-900">{roleName}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>Identity Token:</span>
            <span>{currentUser.serviceNumber}</span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-200">
            Simulated defense OTP sent via secure service gateway. (Pre-filled demo code: <span className="font-mono text-slate-700 font-semibold">123456</span>)
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Enter 6-Digit Verification Code
            </label>
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              placeholder="123456"
              className="w-full text-center tracking-widest text-xl font-mono py-2.5 px-3 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={cancelOTP}
              className="flex-1 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify & Continue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
