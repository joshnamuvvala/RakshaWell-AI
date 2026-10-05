import React from 'react';
import { useStore } from '../../services/storeContext';
import { ShieldCheck, UserCheck, Clock, Activity, MessageSquare, LifeBuoy, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

interface PersonalWelfareTwinViewProps {
  onOpenSupportModal: () => void;
}

export const PersonalWelfareTwinView: React.FC<PersonalWelfareTwinViewProps> = ({ onOpenSupportModal }) => {
  const { currentUser, baseline, welfareCases, setActiveView } = useStore();
  const myCase = welfareCases.find(c => c.personnelId === currentUser.id) || welfareCases[0];

  return (
    <div className="space-y-6">
      {/* Banner: Private by Default */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Personal Welfare Twin
            </h1>
            <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
              Private by Default
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Your Personal Welfare Twin creates a secure, individualized longitudinal baseline of your recovery, workload, and rest patterns. It measures you only against your <em>own historical baseline</em> — never ranking or comparing you with colleagues.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('personnel-chat')}
            className="flex items-center gap-1.5 py-2 px-3 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Talk to My Twin</span>
          </button>
          <button
            onClick={onOpenSupportModal}
            className="flex items-center gap-1.5 py-2 px-3 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Request Support</span>
          </button>
        </div>
      </div>

      {/* Baseline Calibration Card & Current Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Baseline Calibration */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Your 12-Month Personal Baseline</h2>
              <p className="text-xs text-slate-500">Calibrated from authorized organizational indicators</p>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Calibrated: {baseline.lastCalibratedDate}</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500">Standard Weekly Duty Hours:</span>
              <span className="font-semibold text-slate-900">{baseline.averageWeeklyDutyHours} hrs / week</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500">Typical Leave Cadence:</span>
              <span className="font-semibold text-slate-900">Every {baseline.typicalLeaveIntervalDays} days</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500">Historical Sleep Average:</span>
              <span className="font-semibold text-slate-900">{baseline.baselineSleepHours} hrs / night</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500">Baseline Stress Reserve:</span>
              <span className="font-semibold text-slate-900">{baseline.baselineStressScore} / 100</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500">Baseline Recovery Score:</span>
              <span className="font-semibold text-slate-900">{baseline.baselineRecoveryScore} / 100</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
            <span>Baseline calibrations are individual-specific. Variations do not represent negative evaluations.</span>
          </div>
        </div>

        {/* Current State vs Baseline: What Changed? */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">What Changed from Your Baseline?</h2>
              <p className="text-xs text-slate-500">Recent 30-day observable indicators</p>
            </div>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-900">Weekly Duty Load</span>
                <span className="font-mono text-slate-700 font-medium">+12 hrs above baseline</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Current roster logged 56 hours this week vs your normal 44 hours.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-900">Nightly Sleep Duration</span>
                <span className="font-mono text-slate-700 font-medium">-1.8 hrs deficit</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Average recorded rest is 5.4 hours vs your calibrated 7.2 hours.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-900">Leave Rotation Interval</span>
                <span className="font-mono text-slate-700 font-medium">+38 days overdue</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                128 days elapsed since last R&R block (standard cycle: 90 days).
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Overall Welfare Signal:</span>
            <span className="font-semibold text-slate-900">Score 58/100 · Welfare Review</span>
          </div>
        </div>
      </div>

      {/* Why It Changed: SHAP Contributing Factors Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Why It Changed (Transparent Factor Attributions)</h2>
            <p className="text-xs text-slate-500">Rule-based explainability and signal factor weights</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Prototype Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {myCase.primaryContributingFactors.map((factor, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-900">{factor.factor}</span>
                  <span className="font-mono text-slate-700 bg-slate-200/80 px-1.5 py-0.5 rounded font-medium text-[11px]">
                    +{factor.contributionScore} pts
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed mb-3 text-[11px]">
                  {factor.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Personal Baseline: <strong>{factor.baselineValue}</strong></span>
                <span>Current: <strong>{factor.currentValue}</strong></span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3 rounded-lg bg-slate-100 text-slate-700 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>
            <strong>Welfare Twin Principle:</strong> "Your recent fatigue is above your usual baseline." Not a clinical diagnostic or fitness label.
          </span>
          <button
            onClick={() => setActiveView('personnel-journey')}
            className="text-slate-900 font-medium underline flex items-center gap-1 shrink-0"
          >
            <span>View 12-Month Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
