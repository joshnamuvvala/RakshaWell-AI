import React, { useState } from 'react';
import { useStore } from '../../services/storeContext';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  ShieldCheck,
  FileCheck,
  UserCheck
} from 'lucide-react';
import { CounselingSession } from '../../types';

export const CounselingView: React.FC = () => {
  const { counselingSessions, completeCounseling, scheduleCounseling } = useStore();

  const [selectedSession, setSelectedSession] = useState<CounselingSession | null>(null);
  const [intervention, setIntervention] = useState<'schedule_adjustment' | 'rest_cycle' | 'family_support_referral' | 'workload_rebalance' | 'stress_mitigation'>('schedule_adjustment');
  const [outcomeNotes, setOutcomeNotes] = useState<string>('Reviewed duty roster. Adjusted night watch frequency and authorized 7-day recuperative leave window.');
  const [followUpDate, setFollowUpDate] = useState<string>('2026-10-14');

  const handleComplete = (sessionId: string) => {
    completeCounseling(sessionId, intervention, outcomeNotes, followUpDate);
    setSelectedSession(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Confidential Counseling & Support</h1>
            <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
              Welfare Cell
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Support coordination workflow for authorized Welfare Officers
          </p>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
          <span>General intervention tracking only. Private dialogue transcripts are strictly protected.</span>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {counselingSessions.map(session => (
          <div key={session.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-900 text-sm">{session.personnelName}</span>
                <span className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded ${
                  session.urgency === 'urgent'
                    ? 'bg-rose-100 text-rose-800'
                    : session.urgency === 'priority'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {session.urgency}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Service Number:</span>
                  <span className="font-mono text-slate-800">{session.serviceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Preferred Channel:</span>
                  <span className="capitalize text-slate-800">{session.preferredFormat.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Scheduled Date:</span>
                  <span className="font-medium text-slate-800">
                    {session.scheduledDate ? new Date(session.scheduledDate).toLocaleDateString() : 'Pending Scheduling'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Workflow Status:</span>
                  <span className="font-semibold text-slate-900 capitalize">{session.status.replace('_', ' ')}</span>
                </div>
              </div>

              {session.generalOutcomeNotes && (
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-4">
                  <span className="font-semibold text-slate-900 block mb-1">General Intervention Log:</span>
                  <p className="text-[11px] leading-relaxed">{session.generalOutcomeNotes}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {session.status !== 'completed' ? (
                <button
                  onClick={() => setSelectedSession(session)}
                  className="py-1.5 px-3 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Record General Intervention
                </button>
              ) : (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Intervention Recorded</span>
                </span>
              )}

              {session.feedbackRating && (
                <span className="text-xs text-slate-500 font-medium">
                  Personnel Feedback: {session.feedbackRating}/5 ★
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Completion Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Record General Intervention ({selectedSession.personnelName})
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter organizational support details. Never enter sensitive personal disclosures.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Intervention Category
                </label>
                <select
                  value={intervention}
                  onChange={(e) => setIntervention(e.target.value as any)}
                  className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  <option value="schedule_adjustment">Duty Schedule & Night Watch Adjustment</option>
                  <option value="rest_cycle">Recuperative Leave & Rest Cycle</option>
                  <option value="workload_rebalance">Sub-Unit Task Rebalancing</option>
                  <option value="family_support_referral">Family Welfare Referral</option>
                  <option value="stress_mitigation">Peer Buddy & Recovery Cadence</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  High-Level Outcome Notes (Auditable & Non-Stigmatizing)
                </label>
                <textarea
                  rows={3}
                  value={outcomeNotes}
                  onChange={(e) => setOutcomeNotes(e.target.value)}
                  className="w-full p-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Schedule Post-Intervention Follow-up
                </label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSession(null)}
                  className="flex-1 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleComplete(selectedSession.id)}
                  className="flex-1 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Save & Log Follow-up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
