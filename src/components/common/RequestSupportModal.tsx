import React, { useState } from 'react';
import { useStore } from '../../services/storeContext';
import { LifeBuoy, ShieldCheck, HeartHandshake, CheckCircle2, X } from 'lucide-react';

interface RequestSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestSupportModal: React.FC<RequestSupportModalProps> = ({ isOpen, onClose }) => {
  const { requestCounseling, currentUser } = useStore();
  const [urgency, setUrgency] = useState<'routine' | 'priority' | 'urgent'>('priority');
  const [preferredFormat, setPreferredFormat] = useState<'confidential_in_person' | 'tele_welfare' | 'peer_buddy'>('confidential_in_person');
  const [note, setNote] = useState<string>('Requesting an informal check-in to discuss extended duty rotation and recovery support.');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestCounseling({
      urgency,
      preferredFormat,
      note
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Support Request Submitted</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your confidential request has been routed directly to the designated Unit Welfare Officer. No disciplinary or promotional records are ever impacted.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Request Confidential Welfare Support</h3>
                <p className="text-xs text-slate-500">Voluntary & access-controlled assistance</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 mb-5 space-y-1">
              <div className="flex items-center gap-2 font-medium text-slate-900">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                <span>Zero Stigma & Strict Confidentiality Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-500">
                This dialogue is protected. Information shared with your Welfare Officer is strictly non-punitive and separate from commanding officer operational evaluations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'routine', label: 'Routine (Within 5-7 days)' },
                    { id: 'priority', label: 'Priority (Within 48 hours)' },
                    { id: 'urgent', label: 'Urgent (Within 24 hours)' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setUrgency(item.id as any)}
                      className={`p-2 rounded-lg text-xs font-medium border text-left transition-colors ${
                        urgency === item.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Support Channel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'confidential_in_person', label: 'In-Person (Unit Office)' },
                    { id: 'tele_welfare', label: 'Tele-Welfare (Secure Call)' },
                    { id: 'peer_buddy', label: 'Peer Buddy Check-in' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPreferredFormat(item.id as any)}
                      className={`p-2 rounded-lg text-xs font-medium border text-left transition-colors ${
                        preferredFormat === item.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Focus of Support (Optional)
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Share any brief context (e.g. sleep disruption, duty pace, family concerns)..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-slate-900 bg-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Submit Confidential Request</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
