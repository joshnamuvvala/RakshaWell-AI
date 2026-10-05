import React, { useState } from 'react';
import { useStore } from '../../services/storeContext';
import { HeartPulse, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const SelfAssessmentView: React.FC = () => {
  const { addAssessment, setActiveView } = useStore();

  const [stress, setStress] = useState<number>(6);
  const [fatigue, setFatigue] = useState<number>(7);
  const [mood, setMood] = useState<number>(6);
  const [sleepHours, setSleepHours] = useState<number>(5.5);
  const [recoveryQuality, setRecoveryQuality] = useState<number>(5);
  const [workload, setWorkload] = useState<number>(8);
  const [emotionalWellbeing, setEmotionalWellbeing] = useState<number>(6);
  const [supportNeeds, setSupportNeeds] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAssessment({
      stressScore: stress,
      fatigueScore: fatigue,
      moodScore: mood,
      sleepHours,
      recoveryQuality,
      perceivedWorkload: workload,
      emotionalWellbeing,
      supportNeedsExpressed: supportNeeds,
      notes: notes.trim() ? notes : undefined,
      voluntary: true
    });
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Voluntary Wellness Check-in</h1>
            <p className="text-xs text-slate-500">Confidential personal baseline check</p>
          </div>
        </div>

        {/* Ethical Disclaimers Box */}
        <div className="mt-4 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-slate-700" />
            <span>Voluntary & Non-Diagnostic Guarantee</span>
          </div>
          <p className="text-[11px] text-slate-500">
            • <strong>This assessment is strictly voluntary.</strong> You may skip any question at any time.<br />
            • <strong>This is not a medical or psychiatric diagnosis.</strong> It evaluates self-perceived workload and recovery.<br />
            • <strong>Your responses help your Personal Welfare Twin understand changes from your baseline.</strong> Raw answers are never automatically broadcast to commanders.
          </p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-xs space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Check-in Successfully Recorded</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Your Personal Welfare Twin has logged your latest inputs and updated your 12-month baseline delta.
            Contributing factors have been re-calibrated.
          </p>

          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              onClick={() => setActiveView('personnel-dashboard')}
              className="py-2 px-4 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Return to Welfare Dashboard
            </button>
            <button
              onClick={() => setActiveView('personnel-chat')}
              className="py-2 px-4 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors flex items-center gap-1.5"
            >
              <span>Discuss with My Twin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-900">Perceived Stress</span>
                <span className="font-mono font-medium text-slate-700">{stress} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={stress}
                onChange={(e) => setStress(Number(e.target.value))}
                className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 - Minimal/Calm</span>
                <span>5 - Moderate</span>
                <span>10 - Very High</span>
              </div>
            </div>

            {/* Fatigue */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-900">Physical & Mental Fatigue</span>
                <span className="font-mono font-medium text-slate-700">{fatigue} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={fatigue}
                onChange={(e) => setFatigue(Number(e.target.value))}
                className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 - Energetic</span>
                <span>5 - Manageable</span>
                <span>10 - Exhausted</span>
              </div>
            </div>

            {/* Sleep Hours */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-900">Average Sleep Duration (Past 3 Days)</span>
                <span className="font-mono font-medium text-slate-700">{sleepHours} hrs / night</span>
              </div>
              <input
                type="range"
                min={3}
                max={11}
                step={0.5}
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>3 hrs</span>
                <span>7 hrs (Baseline Target)</span>
                <span>11 hrs</span>
              </div>
            </div>

            {/* Recovery Quality */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-900">Restorative Sleep Quality</span>
                <span className="font-mono font-medium text-slate-700">{recoveryQuality} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={recoveryQuality}
                onChange={(e) => setRecoveryQuality(Number(e.target.value))}
                className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 - Broken/Unrefreshing</span>
                <span>5 - Satisfactory</span>
                <span>10 - Deeply Rested</span>
              </div>
            </div>

            {/* Workload */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-900">Recent Task & Shift Pace</span>
                <span className="font-mono font-medium text-slate-700">{workload} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={workload}
                onChange={(e) => setWorkload(Number(e.target.value))}
                className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 - Light/Routine</span>
                <span>5 - Standard</span>
                <span>10 - Heavy Clustering</span>
              </div>
            </div>

            {/* Emotional Wellbeing */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-900">Overall Mood & Morale</span>
                <span className="font-mono font-medium text-slate-700">{emotionalWellbeing} / 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={emotionalWellbeing}
                onChange={(e) => setEmotionalWellbeing(Number(e.target.value))}
                className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 - Discouraged</span>
                <span>5 - Neutral</span>
                <span>10 - Optimistic</span>
              </div>
            </div>
          </div>

          {/* Support Toggle */}
          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={supportNeeds}
                onChange={(e) => setSupportNeeds(e.target.checked)}
                className="w-4 h-4 rounded text-slate-900 accent-slate-900 border-slate-300"
              />
              <div>
                <span className="text-xs font-semibold text-slate-900">
                  I would welcome informal contact from my Unit Welfare Officer
                </span>
                <p className="text-[11px] text-slate-500">
                  Optional. This flags a supportive, non-critical follow-up recommendation on the officer's confidential roster.
                </p>
              </div>
            </label>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Personal Reflection / Context (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Private context for your Personal Welfare Twin..."
              className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-slate-900 bg-white"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setActiveView('personnel-dashboard')}
              className="py-2 px-4 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
            >
              Submit Voluntary Check-in
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
