import React, { useState } from 'react';
import { useStore } from '../../services/storeContext';
import {
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle2,
  LifeBuoy,
  Shield,
  Activity,
  ArrowRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const WellnessJourneyView: React.FC = () => {
  const { assessments, baseline, counselingSessions } = useStore();
  const [timeFilter, setTimeFilter] = useState<'1M' | '3M' | '6M' | '1Y'>('6M');

  // Prepare chart data combining longitudinal assessments
  const chartData = assessments.map(a => ({
    date: a.date.slice(5),
    Stress: a.stressScore * 10,
    Fatigue: a.fatigueScore * 10,
    SleepQuality: a.recoveryQuality * 10,
    Workload: a.perceivedWorkload * 10,
    BaselineStress: baseline.baselineStressScore
  }));

  const timelineEvents = [
    {
      date: '2026-04-10',
      title: 'Initial 12-Month Baseline Calibration',
      type: 'baseline',
      description: 'Established normal working baseline: 44h weekly duty, 7.2h sleep, 90-day leave interval.',
      status: 'completed'
    },
    {
      date: '2026-08-25',
      title: 'Forward Outpost Logistics Rotation',
      type: 'operational',
      description: 'Duty hours increased from 44h to 56h/week. Night watch cadence intensified.',
      status: 'completed'
    },
    {
      date: '2026-09-18',
      title: 'Welfare Signal Elevated (58/100)',
      type: 'signal',
      description: 'Multi-signal engine detected sleep deficit (-1.8h) and delayed leave interval (+38d).',
      status: 'completed'
    },
    {
      date: '2026-10-03',
      title: 'Confidential Support Dialogue Requested',
      type: 'support',
      description: 'Voluntary request logged directly through Personal Welfare Twin portal.',
      status: 'completed'
    },
    {
      date: '2026-10-07',
      title: 'Scheduled Welfare Dialogue with Major Anita Sharma',
      type: 'counseling',
      description: 'Non-punitive review of rest cycles and leave rotation planning.',
      status: 'upcoming'
    },
    {
      date: '2026-10-14',
      title: 'Post-Intervention Baseline Follow-up',
      type: 'followup',
      description: 'Automated 7-day recovery review to verify roster rebalance.',
      status: 'upcoming'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">My Wellness Journey</h1>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Prototype Dataset — Synthetic
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Longitudinal telemetry tracking recovery trends and support milestones across time
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          {(['1M', '3M', '6M', '1Y'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                timeFilter === filter
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Longitudinal Trend Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Multi-Signal Metric Trajectory</h2>
            <p className="text-xs text-slate-500">Scaled 0-100 vs calibrated personal stress baseline</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">12-Month Interval</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line
                type="monotone"
                dataKey="Stress"
                stroke="#0f172a"
                strokeWidth={2}
                dot={{ r: 3, fill: '#0f172a' }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="Fatigue"
                stroke="#64748b"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#64748b' }}
              />
              <Line
                type="monotone"
                dataKey="Workload"
                stroke="#475569"
                strokeWidth={2}
                dot={{ r: 3, fill: '#475569' }}
              />
              <Line
                type="monotone"
                dataKey="SleepQuality"
                stroke="#94a3b8"
                strokeWidth={1.5}
                dot={{ r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>• <strong>Baseline Stability:</strong> Normal reserve maintained through Q2.</span>
          <span>• <strong>Late Q3 Variance:</strong> Duty clustering coincides with sleep deficit.</span>
          <span>• <strong>Recovery Phase:</strong> Rebalance intervention underway.</span>
        </div>
      </div>

      {/* Welfare Milestones Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Longitudinal Support Milestones</h2>
            <p className="text-xs text-slate-500">From detection to human review, intervention and recovery</p>
          </div>
          <Activity className="w-4 h-4 text-slate-400" />
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {timelineEvents.map((evt, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              <div
                className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center ${
                  evt.status === 'completed'
                    ? 'border-slate-900 text-slate-900'
                    : 'border-slate-300 text-slate-400'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    evt.status === 'completed' ? 'bg-slate-900' : 'bg-slate-300'
                  }`}
                />
              </div>

              <div className="flex-1 bg-slate-50 rounded-lg p-3.5 border border-slate-200 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-slate-900">{evt.title}</span>
                  <span className="text-[11px] text-slate-500 font-mono">{evt.date}</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">{evt.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
