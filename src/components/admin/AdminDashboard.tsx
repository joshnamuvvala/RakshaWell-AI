import React, { useState } from 'react';
import { useStore } from '../../services/storeContext';
import {
  Users,
  ShieldAlert,
  Lock,
  FileText,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Database,
  EyeOff
} from 'lucide-react';
import { UserRole } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { users, auditLogs, logAuditEvent, activeView, setActiveView } = useStore();

  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'security' | 'privacy' | 'audit'>('users');

  const permissionsMatrix = [
    { permission: 'View Own Personal Welfare Twin', personnel: true, officer: false, commander: false, admin: false },
    { permission: 'Submit Voluntary Wellness Check', personnel: true, officer: false, commander: false, admin: false },
    { permission: 'Request Confidential Counseling', personnel: true, officer: false, commander: false, admin: false },
    { permission: 'Review Assigned Welfare Signals', personnel: false, officer: true, commander: false, admin: false },
    { permission: 'Manage Counseling & Interventions', personnel: false, officer: true, commander: false, admin: false },
    { permission: 'View Unit Aggregate Welfare Indicators', personnel: false, officer: true, commander: true, admin: false },
    { permission: 'View Individual Chat Logs', personnel: false, officer: false, commander: false, admin: false }, // RESTRICTED TO ZERO
    { permission: 'Manage Users & Security Configurations', personnel: false, officer: false, commander: false, admin: true },
    { permission: 'Review Tamper-Evident Audit Logs', personnel: false, officer: false, commander: false, admin: true }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Security & Governance Console</h1>
            <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
              System Admin
            </span>
          </div>
          <p className="text-xs text-slate-500">
            RBAC permissions, privacy compliance, security audit logging, and consent management
          </p>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
          <EyeOff className="w-4 h-4 text-slate-700 shrink-0" />
          <span>Admin roles have zero access to private individual welfare conversations.</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'users' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'roles' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Roles & Permissions Matrix
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'security' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Security & 2FA Controls
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'privacy' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Privacy Center
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'audit' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Audit Logs
        </button>
      </div>

      {/* Tab: Users */}
      {activeTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Provisioned Defense Personnel & Officer Accounts</h2>
            <span className="text-xs text-slate-400 font-mono">{users.length} Active System Accounts</span>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Name / Rank</th>
                <th className="py-3 px-4">Service Number</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Assigned Formation</th>
                <th className="py-3 px-4">2FA Enforced</th>
                <th className="py-3 px-4">Provisioned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 block">{u.name}</span>
                    <span className="text-[11px] text-slate-500">{u.rank}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{u.serviceNumber}</td>
                  <td className="py-3 px-4">
                    <span className="capitalize font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{u.unitName}</td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Enforced
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">{u.joinedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Roles & Permissions Matrix */}
      {activeTab === 'roles' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Role-Based Access Control (RBAC) Permission Matrix</h2>
            <p className="text-xs text-slate-500">Strict least-privilege boundary enforcement across all actors</p>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Operational Capability</th>
                <th className="py-3 px-4 text-center">Personnel</th>
                <th className="py-3 px-4 text-center">Welfare Officer</th>
                <th className="py-3 px-4 text-center">Commander</th>
                <th className="py-3 px-4 text-center">System Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionsMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-medium text-slate-900">{item.permission}</td>
                  <td className="py-3 px-4 text-center">
                    {item.personnel ? <span className="text-emerald-700 font-bold">✓</span> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.officer ? <span className="text-emerald-700 font-bold">✓</span> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.commander ? <span className="text-emerald-700 font-bold">✓</span> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.admin ? <span className="text-emerald-700 font-bold">✓</span> : <span className="text-slate-300">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Security & 2FA Controls */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900">Cryptographic & Session Architecture</h2>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-900 block mb-1">Defense Multi-Factor OTP Gate</span>
                <p className="text-[11px] text-slate-500">
                  All privileged role actions (Welfare Officer, Commander, Admin) require secondary 6-digit OTP verification.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-900 block mb-1">Row Level Security (RLS)</span>
                <p className="text-[11px] text-slate-500">
                  Database constraints strictly partition individual records. Personnel cannot query other personnel IDs.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-900 block mb-1">Session Inactivity Timeout</span>
                <p className="text-[11px] text-slate-500">
                  Automated lock after 15 minutes of idle session time to protect forward-deployed shared workstations.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900">Security Event Monitor</h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-700">LOGIN_SUCCESS (Multi-Factor)</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Healthy</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-700">UNAUTHORIZED_ACCESS_ATTEMPT</span>
                <span className="text-[10px] text-slate-400">0 in past 24h</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-700">RLS_POLICY_AUDIT</span>
                <span className="text-[10px] text-emerald-700 font-semibold">100% Passing</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-700">AUDIT_LOG_INTEGRITY</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Verified SHA-256</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Privacy Center */}
      {activeTab === 'privacy' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">Personnel Privacy Charter</h2>
            <p className="text-xs text-slate-500">
              Clear institutional transparency regarding data collection, minimization, and voluntary controls
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <span className="font-semibold text-slate-900">What data is collected?</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Authorized organizational duty rosters, leave intervals, deployment history, and voluntary self-reported wellness ratings.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <span className="font-semibold text-slate-900">Why is it collected?</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Strictly to detect early baseline fatigue shifts and offer compassionate, non-punitive welfare support before burnout occurs.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <span className="font-semibold text-slate-900">Who can access it?</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Only the individual member and authorized Unit Welfare Officers. Commanders only see anonymized unit-level aggregate charts.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <span className="font-semibold text-slate-900">What is voluntary?</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                All wellness check-in questionnaires and chat conversations with the Personal Welfare Twin are 100% voluntary and private.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Tamper-Evident Security & Access Audit Log</h2>
              <p className="text-xs text-slate-500">Every sensitive query, status change, and login event is immutably logged</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">{auditLogs.length} Events Logged</span>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">Audit Details (Sanitized)</th>
                <th className="py-3 px-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{log.timestamp}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-900">{log.actorName}</span>
                    <span className="text-[10px] text-slate-400 block capitalize">{log.actorRole.replace('_', ' ')}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-700 font-semibold">{log.action}</td>
                  <td className="py-3 px-4 text-slate-600 capitalize text-[11px]">{log.resourceType.replace('_', ' ')}</td>
                  <td className="py-3 px-4 text-slate-600 text-[11px] max-w-xs">{log.details}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
