import React, { useState } from 'react';
import { useStore } from '../../services/storeContext';
import {
  ShieldCheck,
  Activity,
  Moon,
  Zap,
  Clock,
  Sparkles,
  MessageSquare,
  Send,
  RefreshCw,
  AlertTriangle,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

interface DigitalTwinWidgetProps {
  onOpenSupportModal: () => void;
  onNavigateToChat: () => void;
}

export const DigitalTwinWidget: React.FC<DigitalTwinWidgetProps> = ({
  onOpenSupportModal,
  onNavigateToChat
}) => {
  const { currentUser, baseline, welfareCases } = useStore();
  const myCase = welfareCases.find(c => c.personnelId === currentUser.id) || welfareCases[0];

  const [activeNode, setActiveNode] = useState<'cognitive' | 'circadian' | 'somatic' | 'leave'>('circadian');
  const [quickInput, setQuickInput] = useState<string>('');
  const [twinReply, setTwinReply] = useState<string | null>(
    "I'm observing a cumulative sleep deficit (-1.8h) and sustained night watch duty. How are your energy levels today?"
  );
  const [isAsking, setIsAsking] = useState<boolean>(false);

  const nodeDetails = {
    cognitive: {
      title: 'Cognitive & Duty Load',
      value: '56 hrs/week',
      baseline: '44 hrs/week',
      diff: '+12 hrs (+27%)',
      status: 'Elevated Workload',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      description: 'Extended night watch cadence combined with forward logistics operations.'
    },
    circadian: {
      title: 'Sleep & Circadian Rhythm',
      value: '5.4 hrs/night',
      baseline: '7.2 hrs/night',
      diff: '-1.8 hrs deficit',
      status: 'Rest Deficit',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Recorded sleep window disrupted by staggered watch shifts over past 21 days.'
    },
    somatic: {
      title: 'Physical Recovery Reserve',
      value: '52 / 100',
      baseline: '82 / 100',
      diff: '-30 pts reserve',
      status: 'Depleted Reserve',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      description: 'Cumulative physical fatigue is outpacing standard 48-hour recovery cadence.'
    },
    leave: {
      title: 'Leave & R&R Cycle',
      value: '128 days elapsed',
      baseline: '90-day cycle',
      diff: '+38 days overdue',
      status: 'Leave Deficit',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      description: 'Overdue rotational rest due to operational freeze in forward snowbound sector.'
    }
  };

  const handleAskTwin = async (queryText?: string) => {
    const q = queryText || quickInput;
    if (!q.trim() || isAsking) return;
    setIsAsking(true);
    setQuickInput('');

    try {
      const res = await fetch('/api/twin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          context: {
            name: currentUser.name,
            rank: currentUser.rank,
            unit: currentUser.unitName,
            baselineDuty: `${baseline.averageWeeklyDutyHours}h`,
            currentDuty: '56h',
            baselineSleep: `${baseline.baselineSleepHours}h`,
            currentSleep: '5.4h',
            daysSinceLeave: '128 days'
          }
        })
      });
      const data = await res.json();
      setTwinReply(data.reply);
    } catch {
      setTwinReply(
        "Based on your 12-month baseline, your sleep deficit and extended 56h duty hours are the primary drivers of your elevated signal. A short rest rotation will bring you back to equilibrium."
      );
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
      {/* Top Colorful Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-100">
            DT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Personal Welfare Twin (Live Telemetry)
              </h2>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Benchmarked strictly against your individual historical baseline ({currentUser.name})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToChat}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Full Twin Dialogue</span>
          </button>
          <button
            onClick={onOpenSupportModal}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            <span>Request Support</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Biometric Twin Visualizer + Telemetry Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Left: Biometric Avatar Wireframe Simulation (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200 rounded-xl p-5 relative flex flex-col items-center justify-center min-h-[340px]">
          <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Activity className="w-3 h-3 text-indigo-500" />
            <span>Telemetry Nodes · Click to inspect</span>
          </div>

          {/* Interactive Silhouette & Nodes */}
          <div className="relative w-48 h-64 flex items-center justify-center my-2">
            {/* SVG Silhouette representation */}
            <svg
              viewBox="0 0 160 220"
              className="w-full h-full text-slate-300 stroke-slate-300 fill-slate-100/60"
              strokeWidth="2"
            >
              {/* Head */}
              <circle cx="80" cy="30" r="18" />
              {/* Torso & Arms */}
              <path d="M54 55 Q80 50 106 55 L116 110 L102 112 L96 68 L96 140 L84 140 L84 200 L76 200 L76 140 L64 140 L64 68 L58 112 L44 110 Z" />
            </svg>

            {/* Pulsing Interactive Telemetry Hotspots */}
            {/* 1. Cognitive Node (Head) */}
            <button
              onClick={() => setActiveNode('cognitive')}
              className={`absolute top-4 left-[72px] w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                activeNode === 'cognitive'
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-200 scale-125'
                  : 'bg-indigo-500 text-white hover:scale-110'
              }`}
              title="Cognitive / Duty Load"
            >
              <Zap className="w-3 h-3" />
            </button>

            {/* 2. Circadian Node (Chest/Sleep) */}
            <button
              onClick={() => setActiveNode('circadian')}
              className={`absolute top-20 left-[72px] w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                activeNode === 'circadian'
                  ? 'bg-purple-600 text-white ring-4 ring-purple-200 scale-125'
                  : 'bg-purple-500 text-white hover:scale-110'
              }`}
              title="Circadian / Sleep Recovery"
            >
              <Moon className="w-3 h-3" />
            </button>

            {/* 3. Somatic Node (Core/Fatigue) */}
            <button
              onClick={() => setActiveNode('somatic')}
              className={`absolute top-32 left-[72px] w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                activeNode === 'somatic'
                  ? 'bg-amber-600 text-white ring-4 ring-amber-200 scale-125'
                  : 'bg-amber-500 text-white hover:scale-110'
              }`}
              title="Somatic / Physical Fatigue"
            >
              <Activity className="w-3 h-3" />
            </button>

            {/* 4. Leave/Recuperation Node (Lower) */}
            <button
              onClick={() => setActiveNode('leave')}
              className={`absolute bottom-4 left-[72px] w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                activeNode === 'leave'
                  ? 'bg-rose-600 text-white ring-4 ring-rose-200 scale-125'
                  : 'bg-rose-500 text-white hover:scale-110'
              }`}
              title="Leave / R&R Overdue"
            >
              <Clock className="w-3 h-3" />
            </button>
          </div>

          {/* Node Selector Pills */}
          <div className="grid grid-cols-4 gap-1.5 w-full mt-2">
            {[
              { id: 'cognitive', label: 'Duty', color: 'text-indigo-600', activeBg: 'bg-indigo-600 text-white' },
              { id: 'circadian', label: 'Sleep', color: 'text-purple-600', activeBg: 'bg-purple-600 text-white' },
              { id: 'somatic', label: 'Fatigue', color: 'text-amber-600', activeBg: 'bg-amber-600 text-white' },
              { id: 'leave', label: 'Leave', color: 'text-rose-600', activeBg: 'bg-rose-600 text-white' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveNode(tab.id as any)}
                className={`py-1 text-[11px] font-semibold rounded-md transition-all text-center ${
                  activeNode === tab.id
                    ? tab.activeBg
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Selected Node Detail & Inline AI Twin Bubble (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Active Node Detail Card */}
          {(() => {
            const current = nodeDetails[activeNode];
            return (
              <div className={`p-4 rounded-xl border ${current.borderColor} ${current.bgColor} transition-all`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${current.color}`}>
                      {current.title}
                    </span>
                    <span className="text-[10px] font-semibold bg-white/80 px-2 py-0.5 rounded-full text-slate-700 border border-slate-200">
                      {current.status}
                    </span>
                  </div>
                  <span className={`font-mono font-bold text-xs ${current.color}`}>
                    {current.diff}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-white/90 p-3 rounded-lg border border-slate-200/60 text-xs mb-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Current Telemetry:</span>
                    <span className="font-bold text-slate-900 text-sm">{current.value}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Personal Baseline:</span>
                    <span className="font-bold text-slate-600 text-sm">{current.baseline}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {current.description}
                </p>
              </div>
            );
          })()}

          {/* Inline AI Welfare Twin Dialogue Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900">Personal Twin Reflection</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Confidential AI</span>
            </div>

            <div className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs leading-relaxed">
              {isAsking ? (
                <div className="flex items-center gap-2 text-slate-500 py-1">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                  <span>Reflecting on baseline variance...</span>
                </div>
              ) : (
                twinReply
              )}
            </div>

            {/* Quick Ask Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskTwin()}
                placeholder="Ask Twin about workload, fatigue or leave..."
                className="flex-1 py-1.5 px-3 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
              />
              <button
                onClick={() => handleAskTwin()}
                disabled={isAsking || !quickInput.trim()}
                className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs"
              >
                <Send className="w-3 h-3" />
                <span>Ask</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
