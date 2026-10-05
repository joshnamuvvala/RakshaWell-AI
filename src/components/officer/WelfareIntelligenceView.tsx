import React from 'react';
import { useStore } from '../../services/storeContext';
import {
  Activity,
  AlertTriangle,
  Users,
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const WelfareIntelligenceView: React.FC = () => {
  const { welfareCases, counselingSessions, followUps, setActiveView } = useStore();

  const immediateCount = welfareCases.filter(c => c.level === 'immediate_review').length;
  const reviewCount = welfareCases.filter(c => c.level === 'welfare_review').length;
  const monitorCount = welfareCases.filter(c => c.level === 'monitor').length;
  const normalCount = welfareCases.filter(c => c.level === 'normal').length;

  const distributionData = [
    { name: 'Normal', count: normalCount, color: '#10b981' },
    { name: 'Monitor', count: monitorCount, color: '#0284c7' },
    { name: 'Welfare Review', count: reviewCount, color: '#f59e0b' },
    { name: 'Immediate Review', count: immediateCount, color: '#e11d48' }
  ];

  const unitSignalBreakdown = [
    { unit: 'Alpha Batt.', immediate: 2, review: 5, monitor: 12, normal: 48 },
    { unit: 'Bravo Garr.', immediate: 0, review: 2, monitor: 8, normal: 38 },
    { unit: 'Charlie Sqn.', immediate: 3, review: 6, monitor: 9, normal: 22 },
    { unit: 'Delta Depot', immediate: 0, review: 1, monitor: 6, normal: 54 }
  ];

  return (
    <div className="space-y-6">
      {/* Officer Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Welfare Intelligence Console</h1>
            <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
              Welfare Officer Clearance
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Multi-signal early detection triage for authorized human welfare review
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('officer-cases')}
            className="py-2 px-3 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>Review Active Cases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Immediate Human Review</span>
            <span className="w-2 h-2 rounded-full bg-rose-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{immediateCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Outreach recommended within 24h
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Welfare Review Recommended</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{reviewCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Multi-week baseline deviations
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Active Counseling Cases</span>
            <CalendarCheck className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {counselingSessions.filter(s => s.status === 'scheduled' || s.status === 'requested').length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Voluntary confidential dialogues
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Pending Follow-ups</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {followUps.filter(f => f.status === 'pending').length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Post-support recovery checks
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Signal Distribution by Formations */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Welfare Signal Triage by Unit</h2>
              <p className="text-xs text-slate-500">Distribution across active formations</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">105 Personnel Monitored</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={unitSignalBreakdown} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="unit" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="normal" name="Normal" fill="#10b981" stackId="a" />
                <Bar dataKey="monitor" name="Monitor" fill="#0284c7" stackId="a" />
                <Bar dataKey="review" name="Welfare Review" fill="#f59e0b" stackId="a" />
                <Bar dataKey="immediate" name="Immediate Review" fill="#e11d48" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Triage List */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">Priority Outreach Queue</h2>
              <span className="text-[11px] text-slate-400">Human Discretion</span>
            </div>

            <div className="space-y-3">
              {welfareCases
                .filter(c => c.humanReviewRequired)
                .slice(0, 3)
                .map(c => (
                  <div key={c.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs">
                    <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                      <span>{c.personnelName}</span>
                      <span className={c.level === 'immediate_review' ? 'text-rose-700 font-bold' : 'text-amber-700 font-bold'}>
                        {c.score}/100
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-1.5">{c.unitName}</p>
                    <p className="text-[11px] text-slate-600 line-clamp-1">
                      {c.primaryContributingFactors[0]?.factor}: {c.primaryContributingFactors[0]?.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <button
            onClick={() => setActiveView('officer-cases')}
            className="w-full mt-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
          >
            Open All Cases ({welfareCases.length})
          </button>
        </div>
      </div>
    </div>
  );
};
