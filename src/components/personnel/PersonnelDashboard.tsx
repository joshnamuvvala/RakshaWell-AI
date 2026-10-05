import React from 'react';
import { useStore } from '../../services/storeContext';
import {
  HeartPulse,
  TrendingUp,
  MessageSquare,
  LifeBuoy,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Info,
  Calendar,
  Lock
} from 'lucide-react';

interface PersonnelDashboardProps {
  onOpenSupportModal: () => void;
}

export const PersonnelDashboard: React.FC<PersonnelDashboardProps> = ({ onOpenSupportModal }) => {
  const { currentUser, baseline, assessments, welfareCases, setActiveView } = useStore();

  // Find the primary demo case for the current personnel
  const myCase = welfareCases.find(c => c.personnelId === currentUser.id) || welfareCases[0];
  const latestAssessment = assessments[assessments.length - 1];

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'immediate_review':
        return <span className="font-semibold text-rose-700">Immediate Human Review</span>;
      case 'welfare_review':
        return <span className="font-semibold text-amber-700">Welfare Review</span>;
      case 'monitor':
        return <span className="font-semibold text-sky-700">Monitor</span>;
      default:
        return <span className="font-semibold text-emerald-700">Normal Baseline</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome & Privacy Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Welcome, {currentUser.name}
              </h1>
              <span className="text-xs text-slate-500 font-mono">({currentUser.serviceNumber})</span>
            </div>
            <p className="text-xs text-slate-500">
              {currentUser.rank} · {currentUser.unitName}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg">
            <Lock className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Your personal wellness information is private and access-controlled.</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
          <button
            onClick={() => setActiveView('personnel-chat')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Talk to My Twin</span>
          </button>
          <button
            onClick={() => setActiveView('personnel-checkin')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            <HeartPulse className="w-4 h-4 text-slate-600" />
            <span>Take Wellness Check</span>
          </button>
          <button
            onClick={() => setActiveView('personnel-journey')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            <TrendingUp className="w-4 h-4 text-slate-600" />
            <span>View My Journey</span>
          </button>
          <button
            onClick={onOpenSupportModal}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-100 text-slate-900 hover:bg-slate-200 rounded-lg text-xs font-semibold transition-colors"
          >
            <LifeBuoy className="w-4 h-4 text-slate-700" />
            <span>Request Support</span>
          </button>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Current Welfare Signal */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Current Welfare Signal
              </span>
              <span className="text-xs text-slate-400">Multi-Signal Engine</span>
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-extrabold text-slate-900">{myCase.score}</span>
              <span className="text-xs text-slate-400">/ 100</span>
              <div className="ml-auto text-xs">{getLevelBadge(myCase.level)}</div>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Variance detected from your 12-month baseline. Trend is <span className="font-medium text-slate-900">{myCase.trend}</span>.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-400">Core Rule: </span>
            <span className="text-slate-600 font-medium">Risk ≠ Diagnosis. Alert ≠ Accusation.</span>
          </div>
        </div>

        {/* Card 2: Personal Welfare Twin */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Personal Welfare Twin
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Shield className="w-3 h-3 text-slate-400" /> Private
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Weekly Duty Load:</span>
                <span className="font-semibold text-slate-900">56h (Baseline: {baseline.averageWeeklyDutyHours}h)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Sleep Average:</span>
                <span className="font-semibold text-slate-900">5.4h (Baseline: {baseline.baselineSleepHours}h)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Leave Elapsed:</span>
                <span className="font-semibold text-slate-900">128 days (Baseline: {baseline.typicalLeaveIntervalDays}d)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('personnel-dashboard')}
            className="text-xs font-medium text-slate-900 hover:underline pt-3 border-t border-slate-100 flex items-center justify-between"
          >
            <span>Explore full Twin telemetry</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Today's Check-in & Support */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Latest Voluntary Check-in
              </span>
              <span className="text-xs text-slate-400">{latestAssessment ? latestAssessment.date : 'Pending'}</span>
            </div>
            {latestAssessment ? (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Self-Reported Stress:</span>
                  <span className="font-semibold text-slate-900">{latestAssessment.stressScore} / 10</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Perceived Fatigue:</span>
                  <span className="font-semibold text-slate-900">{latestAssessment.fatigueScore} / 10</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Emotional Wellbeing:</span>
                  <span className="font-semibold text-slate-900">{latestAssessment.emotionalWellbeing} / 10</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No voluntary check-in recorded yet for this week.</p>
            )}
          </div>

          <button
            onClick={() => setActiveView('personnel-checkin')}
            className="text-xs font-medium text-slate-900 hover:underline pt-3 border-t border-slate-100 flex items-center justify-between"
          >
            <span>Record today's voluntary check-in</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary Contributing Factors (SHAP Explanation) & Recommended Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contributing Factors */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Why Did My Signal Change?</h2>
              <p className="text-xs text-slate-500">Transparent contributing factors vs your personal baseline</p>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">SHAP Attributions</span>
          </div>

          <div className="space-y-3">
            {myCase.primaryContributingFactors.map((factor, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900">{factor.factor}</span>
                  <span className="text-slate-600 font-mono font-medium">+{factor.contributionScore} pts</span>
                </div>
                <p className="text-slate-600 mb-2 leading-relaxed">{factor.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span>Baseline: <strong className="text-slate-700">{factor.baselineValue}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Observed: <strong className="text-slate-700">{factor.currentValue}</strong></span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 mt-4">
            Notice: Contributing factors reflect operational indicators and voluntary inputs. They are strictly informational to assist human welfare officers.
          </p>
        </div>

        {/* Recommended Welfare Support */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Recommended Support Actions</h2>
                <p className="text-xs text-slate-500">Non-punitive recovery and duty adjustments</p>
              </div>
              <LifeBuoy className="w-4 h-4 text-slate-500" />
            </div>

            <div className="space-y-2.5">
              {myCase.recommendedSupport.map((rec, index) => (
                <div key={index} className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-white">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-slate-900">{rec}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Coordinated privately with your Unit Welfare Officer.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">Support Status: </span>
              <span>
                {myCase.reviewStatus === 'counseling_scheduled'
                  ? 'Confidential dialogue scheduled with Major Anita Sharma (Unit Welfare Officer).'
                  : 'Open for confidential outreach.'}
              </span>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need immediate confidential advice?</span>
            <button
              onClick={onOpenSupportModal}
              className="py-1.5 px-3 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Request Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
