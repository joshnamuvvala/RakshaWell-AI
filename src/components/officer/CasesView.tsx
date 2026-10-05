import React, { useState } from 'react';
import { useStore } from '../../services/storeContext';
import {
  Search,
  Filter,
  Eye,
  CalendarCheck,
  CheckCircle2,
  X,
  ShieldCheck,
  AlertCircle,
  Clock
} from 'lucide-react';
import { SignalLevel, WelfareSignalRecord } from '../../types';

export const CasesView: React.FC = () => {
  const { welfareCases, updateCaseStatus, scheduleCounseling, logAuditEvent, setActiveView } = useStore();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<WelfareSignalRecord | null>(null);

  // Status update state inside drawer
  const [newStatus, setNewStatus] = useState<WelfareSignalRecord['reviewStatus']>('under_review');
  const [officerNote, setOfficerNote] = useState<string>('');
  const [showScheduleForm, setShowScheduleForm] = useState<boolean>(false);
  const [scheduledDate, setScheduledDate] = useState<string>('2026-10-09T10:00');

  const filteredCases = welfareCases.filter(c => {
    const matchesSearch =
      c.personnelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.serviceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.unitName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterLevel === 'all' || c.level === filterLevel;
    return matchesSearch && matchesFilter;
  });

  const handleOpenCase = (c: WelfareSignalRecord) => {
    setSelectedCase(c);
    setNewStatus(c.reviewStatus);
    setOfficerNote('');
    setShowScheduleForm(false);
    logAuditEvent('DATA_ACCESS', 'welfare_case', `Officer reviewed case details for ${c.serviceNumber}`, c.id);
  };

  const handleSaveStatus = () => {
    if (!selectedCase) return;
    updateCaseStatus(selectedCase.id, newStatus, officerNote);
    setSelectedCase(prev => prev ? { ...prev, reviewStatus: newStatus } : null);
  };

  const handleScheduleDialog = () => {
    if (!selectedCase) return;
    scheduleCounseling(selectedCase.id, scheduledDate, officerNote || 'Follow-up welfare consultation');
    updateCaseStatus(selectedCase.id, 'counseling_scheduled', `Scheduled for ${scheduledDate}`);
    setShowScheduleForm(false);
    setSelectedCase(prev => prev ? { ...prev, reviewStatus: 'counseling_scheduled' } : null);
  };

  const getBadge = (level: SignalLevel) => {
    switch (level) {
      case 'immediate_review':
        return <span className="font-semibold text-rose-700">Immediate Review</span>;
      case 'welfare_review':
        return <span className="font-semibold text-amber-700">Welfare Review</span>;
      case 'monitor':
        return <span className="font-semibold text-sky-700">Monitor</span>;
      default:
        return <span className="font-semibold text-emerald-700">Normal</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Authorized Welfare Cases</h1>
          <p className="text-xs text-slate-500">
            Confidential case management for personnel with identified baseline shifts
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID or unit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 w-60 bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            {['all', 'immediate_review', 'welfare_review', 'monitor'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filterLevel === lvl
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl === 'all'
                  ? 'All'
                  : lvl === 'immediate_review'
                  ? 'Immediate'
                  : lvl === 'welfare_review'
                  ? 'Review'
                  : 'Monitor'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Personnel ID</th>
                <th className="py-3 px-4">Service No.</th>
                <th className="py-3 px-4">Formation / Unit</th>
                <th className="py-3 px-4">Signal Score</th>
                <th className="py-3 px-4">Signal Level</th>
                <th className="py-3 px-4">Trend</th>
                <th className="py-3 px-4">Review Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">{c.personnelName}</td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{c.serviceNumber}</td>
                  <td className="py-3 px-4 text-slate-600 max-w-[200px] truncate">{c.unitName}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{c.score}/100</td>
                  <td className="py-3 px-4">{getBadge(c.level)}</td>
                  <td className="py-3 px-4 capitalize text-slate-600">{c.trend}</td>
                  <td className="py-3 px-4">
                    <span className="capitalize text-[11px] text-slate-700 font-medium">
                      {c.reviewStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleOpenCase(c)}
                      className="py-1 px-2.5 bg-slate-900 text-white rounded-md text-xs font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-1 shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Details Drawer / Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Welfare Officer Case Audit View
              </span>
              <h2 className="text-lg font-bold text-slate-900">{selectedCase.personnelName}</h2>
              <p className="text-xs text-slate-500">
                {selectedCase.serviceNumber} · {selectedCase.unitName}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs mb-5">
              <div>
                <span className="text-slate-500 block text-[11px]">Signal Score:</span>
                <span className="font-bold text-slate-900 text-sm">{selectedCase.score}/100</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Level:</span>
                <div>{getBadge(selectedCase.level)}</div>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Persistence:</span>
                <span className="font-medium text-slate-900">{selectedCase.persistenceWeeks} consecutive weeks</span>
              </div>
            </div>

            {/* Contributing Factors */}
            <div className="mb-5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Contributing Factor Decomposition (SHAP Weights)
              </h3>
              <div className="space-y-2">
                {selectedCase.primaryContributingFactors.map((factor, i) => (
                  <div key={i} className="p-3 rounded-lg border border-slate-200 bg-white text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-900">{factor.factor}</span>
                      <span className="font-mono text-slate-700 font-medium">+{factor.contributionScore} pts</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mb-1.5">{factor.description}</p>
                    <div className="text-[10px] text-slate-400 flex gap-2">
                      <span>Baseline: {factor.baselineValue}</span>
                      <span>·</span>
                      <span>Current: {factor.currentValue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Support */}
            <div className="mb-5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Support Action Protocol
              </h3>
              <ul className="space-y-1 text-xs text-slate-600">
                {selectedCase.recommendedSupport.map((rec, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case Actions & Status Update */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Update Case Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="under_review">Under Review</option>
                    <option value="support_offered">Support Offered</option>
                    <option value="counseling_scheduled">Counseling Scheduled</option>
                    <option value="monitoring">Monitoring Post-Intervention</option>
                    <option value="resolved">Resolved / Baseline Restored</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Officer Case Annotation
                  </label>
                  <input
                    type="text"
                    value={officerNote}
                    onChange={(e) => setOfficerNote(e.target.value)}
                    placeholder="e.g. Discussed roster adjustment with sub-unit"
                    className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {showScheduleForm ? (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900">Schedule Counseling Dialogue</span>
                    <button
                      type="button"
                      onClick={() => setShowScheduleForm(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                  <button
                    onClick={handleScheduleDialog}
                    className="py-1.5 px-3 bg-slate-900 text-white rounded-md font-medium text-xs hover:bg-slate-800"
                  >
                    Confirm Appointment & Log Follow-up
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowScheduleForm(true)}
                    className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <CalendarCheck className="w-4 h-4 text-slate-600" />
                    <span>Schedule Counseling</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveStatus}
                    className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                  >
                    Save Status Update
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
