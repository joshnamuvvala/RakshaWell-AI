import React, { useState } from 'react';
import { useStore } from '../../services/storeContext';
import {
  Building,
  BarChart2,
  PieChart,
  Users,
  ShieldAlert,
  Lock,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

export const CommanderDashboard: React.FC = () => {
  const { units } = useStore();
  const [selectedSubTab, setSelectedSubTab] = useState<'unit-welfare' | 'workload' | 'trends'>('unit-welfare');

  const unitWorkloadData = units.map(u => ({
    name: u.code,
    fullName: u.name,
    AvgHours: u.averageWorkloadHours,
    LeaveUtilization: u.leaveUtilizationRate,
    Strength: u.totalPersonnel
  }));

  const aggregateTrendsData = [
    { month: 'May', LeaveUtilization: 78, WorkloadIndex: 45, FatigueIndex: 32 },
    { month: 'Jun', LeaveUtilization: 80, WorkloadIndex: 46, FatigueIndex: 31 },
    { month: 'Jul', LeaveUtilization: 74, WorkloadIndex: 49, FatigueIndex: 36 },
    { month: 'Aug', LeaveUtilization: 68, WorkloadIndex: 56, FatigueIndex: 44 },
    { month: 'Sep', LeaveUtilization: 64, WorkloadIndex: 58, FatigueIndex: 48 },
    { month: 'Oct', LeaveUtilization: 69, WorkloadIndex: 53, FatigueIndex: 42 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Command Welfare Intelligence</h1>
            <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
              Command Level Clearance
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Authorized organizational welfare indicators and operational workload distribution
          </p>
        </div>

        {/* Strict Privacy Notice for Commanders */}
        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center gap-2 max-w-md">
          <Lock className="w-4 h-4 text-slate-700 shrink-0" />
          <span>
            <strong>Privacy Enforcement:</strong> Individual chat transcripts and private counseling notes are completely excluded from command dashboards.
          </span>
        </div>
      </div>

      {/* Internal View Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setSelectedSubTab('unit-welfare')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            selectedSubTab === 'unit-welfare'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Unit Welfare Overview
        </button>
        <button
          onClick={() => setSelectedSubTab('workload')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            selectedSubTab === 'workload'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Workload & Duty Distribution
        </button>
        <button
          onClick={() => setSelectedSubTab('trends')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            selectedSubTab === 'trends'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Aggregate Longitudinal Trends
        </button>
      </div>

      {/* View 1: Unit Welfare Overview */}
      {selectedSubTab === 'unit-welfare' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {units.map(unit => (
              <div key={unit.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 text-sm">{unit.code}</span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {unit.deploymentStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-xs text-slate-600 font-medium mb-3">{unit.name}</h3>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Strength:</span>
                      <span className="font-mono text-slate-900 font-semibold">{unit.totalPersonnel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg Weekly Duty:</span>
                      <span className="font-mono text-slate-900 font-semibold">{unit.averageWorkloadHours}h / wk</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Leave Utilization:</span>
                      <span className="font-mono text-slate-900 font-semibold">{unit.leaveUtilizationRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-500">
                  CO: {unit.commanderName}
                </div>
              </div>
            ))}
          </div>

          {/* Unit Observations & Resource Planning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 mb-3">Unit Welfare Observations</h2>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
                  <div className="font-semibold mb-0.5">High Altitude Support Wing (HASW-C)</div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Sustained workload concentration (58.6h avg). Leave utilization depressed at 59.2%. Recommended action: Command review of rotational relief schedule.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800">
                  <div className="font-semibold mb-0.5">14th Mountain Division - Alpha Batt.</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Temporary logistics surge past 4 weeks. 3 sub-units require leave clearing to normalize baseline before winter freeze.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 mb-3">Welfare Resource Requirements</h2>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2 p-2.5 rounded-lg border border-slate-100">
                  <FileCheck className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900">Rotational Relief Authorizations:</span>
                    <p className="text-[11px] text-slate-500">2 platoons in forward snowbound posts due for scheduled garrison rotation.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 p-2.5 rounded-lg border border-slate-100">
                  <FileCheck className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900">Family Welfare Connectivity:</span>
                    <p className="text-[11px] text-slate-500">Satellite communications bandwidth allocated for Charlie Squadron family calling.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Workload & Duty Distribution */}
      {selectedSubTab === 'workload' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Weekly Duty Hours vs Standard Baseline (44h Target)</h2>
              <p className="text-xs text-slate-500">Comparative workload distribution across formations</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Aggregated Data</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={unitWorkloadData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 70]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="AvgHours" name="Average Weekly Duty Hours" fill="#0f172a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="LeaveUtilization" name="Leave Utilization Rate (%)" fill="#64748b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* View 3: Aggregate Longitudinal Trends */}
      {selectedSubTab === 'trends' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">6-Month Organizational Welfare Indicator Trajectory</h2>
              <p className="text-xs text-slate-500">Tracking aggregate workload pressure and leave correlation</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Division-Wide</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={aggregateTrendsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="WorkloadIndex" name="Workload Stress Index" stroke="#0f172a" strokeWidth={2} />
                <Line type="monotone" dataKey="LeaveUtilization" name="Leave Utilization Rate (%)" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="FatigueIndex" name="Aggregate Fatigue Index" stroke="#e11d48" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-500 mt-4">
            Analysis: High workload in August/September coincided with an increase in aggregate fatigue index. Rest rotational adjustments in October are stabilizing unit baseline.
          </p>
        </div>
      )}
    </div>
  );
};
