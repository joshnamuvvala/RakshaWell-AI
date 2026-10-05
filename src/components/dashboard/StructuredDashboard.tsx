import React, { useState } from 'react';
import { useStore } from '../../services/storeContext';
import {
  HeartPulse,
  TrendingUp,
  MessageSquare,
  LifeBuoy,
  Clock,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  Moon,
  Calendar,
  Activity,
  Layers,
  ChevronRight,
  Send,
  PhoneCall,
  UserCheck,
  BookOpen,
  Lock
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { DigitalTwinWidget } from './DigitalTwinWidget';

interface StructuredDashboardProps {
  onOpenSupportModal: () => void;
  onNavigateToTab: (tabId: string) => void;
}

export const StructuredDashboard: React.FC<StructuredDashboardProps> = ({
  onOpenSupportModal,
  onNavigateToTab
}) => {
  const { currentUser, baseline, assessments, addAssessment, welfareCases, counselingSessions, currentRole } = useStore();

  const myCase = welfareCases.find(c => c.personnelId === currentUser.id) || welfareCases[0];
  const latestAssessment = assessments[assessments.length - 1];

  // Rapid In-Dashboard Check-in Form States
  const [quickStress, setQuickStress] = useState<number>(6);
  const [quickFatigue, setQuickFatigue] = useState<number>(7);
  const [quickSleep, setQuickSleep] = useState<number>(5.5);
  const [quickWorkload, setQuickWorkload] = useState<number>(8);
  const [checkinSaved, setCheckinSaved] = useState<boolean>(false);

  const handleQuickCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAssessment({
      stressScore: quickStress,
      fatigueScore: quickFatigue,
      moodScore: 6,
      sleepHours: quickSleep,
      recoveryQuality: 5,
      perceivedWorkload: quickWorkload,
      emotionalWellbeing: 6,
      supportNeedsExpressed: false,
      voluntary: true
    });
    setCheckinSaved(true);
    setTimeout(() => setCheckinSaved(false), 3000);
  };

  // 6-Month Chart Data
  const chartData = assessments.map(a => ({
    date: a.date.slice(5),
    Stress: a.stressScore * 10,
    Fatigue: a.fatigueScore * 10,
    SleepQuality: a.recoveryQuality * 10,
    Workload: a.perceivedWorkload * 10
  }));

  // Signal color helpers
  const getSignalColor = (level: string) => {
    switch (level) {
      case 'immediate_review':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          text: 'text-rose-700',
          ring: 'ring-rose-500',
          label: 'Immediate Human Review'
        };
      case 'welfare_review':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-700',
          ring: 'ring-amber-500',
          label: 'Welfare Review'
        };
      case 'monitor':
        return {
          bg: 'bg-sky-50',
          border: 'border-sky-200',
          text: 'text-sky-700',
          ring: 'ring-sky-500',
          label: 'Monitor'
        };
      default:
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-700',
          ring: 'ring-emerald-500',
          label: 'Normal Baseline'
        };
    }
  };

  const signalStyle = getSignalColor(myCase.level);

  return (
    <div className="space-y-8">
      {/* 1. Executive Top Hero Card with Colors & High-Contrast Metrics */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Identity & Mission Banner */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                {currentUser.unitName}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {currentUser.serviceNumber}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Welfare Command Hub · {currentUser.name}
            </h1>
            <p className="text-xs text-slate-500">
              Personalized Welfare Intelligence Console · Calibrated on individual 12-month baseline
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigateToTab('personnel-chat')}
              className="py-2 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Talk to My Twin</span>
            </button>
            <button
              onClick={() => onNavigateToTab('personnel-checkin')}
              className="py-2 px-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-xs font-semibold shadow-2xs transition-all flex items-center gap-2"
            >
              <HeartPulse className="w-4 h-4 text-rose-500" />
              <span>Full Wellness Check</span>
            </button>
            <button
              onClick={onOpenSupportModal}
              className="py-2 px-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <LifeBuoy className="w-4 h-4 text-emerald-400" />
              <span>Request Support</span>
            </button>
          </div>
        </div>

        {/* 4 Colorful High-Density Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          {/* Metric 1: Current Welfare Signal */}
          <div className={`p-4 rounded-xl border ${signalStyle.border} ${signalStyle.bg} flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className={signalStyle.text}>Welfare Signal</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/80 border ${signalStyle.border}`}>
                  {signalStyle.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900">{myCase.score}</span>
                <span className="text-xs text-slate-500 font-mono">/ 100</span>
              </div>
            </div>
            <div className="pt-2 mt-2 border-t border-slate-200/60 text-[11px] text-slate-600 flex justify-between">
              <span>Trend: <strong className="text-slate-800 capitalize">{myCase.trend}</strong></span>
              <span>{myCase.persistenceWeeks} wks sustained</span>
            </div>
          </div>

          {/* Metric 2: Duty Workload */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-indigo-700 mb-1">
                <span>Weekly Duty Load</span>
                <Zap className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900">56</span>
                <span className="text-xs text-slate-500 font-mono">hrs / week</span>
              </div>
            </div>
            <div className="pt-2 mt-2 border-t border-indigo-100 text-[11px] text-slate-600 flex justify-between">
              <span>Baseline: {baseline.averageWeeklyDutyHours}h</span>
              <span className="text-indigo-700 font-bold">+12h variance</span>
            </div>
          </div>

          {/* Metric 3: Sleep & Circadian Recovery */}
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-purple-700 mb-1">
                <span>Sleep Average</span>
                <Moon className="w-3.5 h-3.5 text-purple-500" />
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900">5.4</span>
                <span className="text-xs text-slate-500 font-mono">hrs / night</span>
              </div>
            </div>
            <div className="pt-2 mt-2 border-t border-purple-100 text-[11px] text-slate-600 flex justify-between">
              <span>Baseline: {baseline.baselineSleepHours}h</span>
              <span className="text-purple-700 font-bold">-1.8h deficit</span>
            </div>
          </div>

          {/* Metric 4: Leave Interval */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-rose-700 mb-1">
                <span>Leave Cycle</span>
                <Clock className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900">128</span>
                <span className="text-xs text-slate-500 font-mono">days elapsed</span>
              </div>
            </div>
            <div className="pt-2 mt-2 border-t border-rose-100 text-[11px] text-slate-600 flex justify-between">
              <span>Cycle: Every 90d</span>
              <span className="text-rose-700 font-bold">+38d overdue</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE DIGITAL WELFARE TWIN (Interactive Live Component in Dashboard) */}
      <DigitalTwinWidget
        onOpenSupportModal={onOpenSupportModal}
        onNavigateToChat={() => onNavigateToTab('personnel-chat')}
      />

      {/* 3. Middle Section: Rapid Check-in + SHAP Factors (Side by Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Rapid Check-in Widget (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-bold text-slate-900">Rapid Wellness Check-in</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Voluntary · Instant Sync</span>
            </div>

            {checkinSaved && (
              <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Today's check-in logged! Baseline variance updated.</span>
              </div>
            )}

            <form onSubmit={handleQuickCheckin} className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">Perceived Stress</span>
                  <span className="font-mono font-bold text-slate-900">{quickStress} / 10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={quickStress}
                  onChange={(e) => setQuickStress(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">Physical Fatigue</span>
                  <span className="font-mono font-bold text-slate-900">{quickFatigue} / 10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={quickFatigue}
                  onChange={(e) => setQuickFatigue(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">Recent Sleep Duration</span>
                  <span className="font-mono font-bold text-slate-900">{quickSleep} hrs</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={10}
                  step={0.5}
                  value={quickSleep}
                  onChange={(e) => setQuickSleep(Number(e.target.value))}
                  className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">Duty & Task Pace</span>
                  <span className="font-mono font-bold text-slate-900">{quickWorkload} / 10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={quickWorkload}
                  onChange={(e) => setQuickWorkload(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save Today's Check-in</span>
              </button>
            </form>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Non-diagnostic · Stored confidentially in your personal twin
          </div>
        </div>

        {/* Explainability / SHAP Factor Decomposition (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Why Did My Signal Change?</h3>
                <p className="text-xs text-slate-500">Transparent factor contributions vs personal baseline</p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">SHAP Weights</span>
            </div>

            <div className="space-y-3">
              {myCase.primaryContributingFactors.map((f, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{f.factor}</span>
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded text-[11px]">
                      +{f.contributionScore} pts
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed mb-2">{f.description}</p>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500">
                    <span>Baseline: <strong className="text-slate-700">{f.baselineValue}</strong></span>
                    <span>·</span>
                    <span>Observed: <strong className="text-slate-700">{f.currentValue}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">Identified for human welfare review</span>
            <button
              onClick={() => onNavigateToTab('personnel-welfare-twin')}
              className="text-indigo-600 font-semibold hover:underline flex items-center gap-1 text-xs"
            >
              <span>Explore Twin Diagnostics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Multi-Signal Longitudinal Trend Graph (Full Width Card) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-4 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">Longitudinal Wellness Trajectory</h3>
            </div>
            <p className="text-xs text-slate-500">
              6-Month multi-signal telemetry tracking stress, fatigue, sleep quality, and workload pace
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
              PROTOTYPE DATASET — SYNTHETIC
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Line
                type="monotone"
                dataKey="Stress"
                name="Perceived Stress"
                stroke="#0f172a"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#0f172a' }}
              />
              <Line
                type="monotone"
                dataKey="Fatigue"
                name="Physical Fatigue"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 3, fill: '#f59e0b' }}
              />
              <Line
                type="monotone"
                dataKey="Workload"
                name="Duty Load"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 3, fill: '#6366f1' }}
              />
              <Line
                type="monotone"
                dataKey="SleepQuality"
                name="Sleep Recovery"
                stroke="#a855f7"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={{ r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Support & Counseling Pipeline + Tele-MANAS Helpline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support Pipeline */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Confidential Support & Welfare Services</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Zero Stigma</span>
            </div>

            <div className="space-y-3">
              {counselingSessions.slice(0, 2).map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{s.personnelName}</span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {s.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] mb-1">
                    Assigned Officer: <strong className="text-slate-800">{s.officerName}</strong>
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    {s.generalOutcomeNotes || 'Scheduled confidential welfare consultation.'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need to talk with your Unit Welfare Officer?</span>
            <button
              onClick={onOpenSupportModal}
              className="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Request Dialogue
            </button>
          </div>
        </div>

        {/* 24/7 Helpline & Emergency Card */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold tracking-tight">Tele-MANAS & Armed Forces Helpline</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              24/7 Free, Confidential, Multilingual Mental Health & Welfare Support.
            </p>

            <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/10 text-center">
              <span className="text-[10px] uppercase font-mono text-emerald-400 block font-semibold">Toll-Free Helpline</span>
              <span className="text-2xl font-extrabold tracking-wider text-white">14416</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400">
            Available across all forward and garrison formations.
          </div>
        </div>
      </div>
    </div>
  );
};
