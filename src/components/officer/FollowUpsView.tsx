import React from 'react';
import { useStore } from '../../services/storeContext';
import { CheckCircle2, Clock, Calendar, AlertCircle } from 'lucide-react';

export const FollowUpsView: React.FC = () => {
  const { followUps, completeFollowUp } = useStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Welfare Follow-up Tracker</h1>
          <p className="text-xs text-slate-500">
            Systematic post-intervention monitoring to verify recovery and roster sustainability
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
          {followUps.filter(f => f.status === 'pending').length} Actions Pending
        </div>
      </div>

      {/* Follow-up Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {followUps.map(fup => (
          <div key={fup.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-sm">{fup.personnelName}</span>
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                  fup.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {fup.status}
                </span>
              </div>

              <p className="text-xs text-slate-500 mb-3">{fup.unitName}</p>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Review Objective:</span>
                  <span className="font-medium capitalize text-slate-800">{fup.type.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Scheduled Date:</span>
                  <span className="font-mono text-slate-800">{fup.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Officer:</span>
                  <span className="text-slate-800">{fup.assignedTo}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
              {fup.status === 'pending' ? (
                <button
                  onClick={() => completeFollowUp(fup.id)}
                  className="w-full py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Check-in Completed</span>
                </button>
              ) : (
                <span className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Check-in Verified</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
