import { PersonalBaseline, RiskFactor, SignalLevel, WelfareSignalRecord, WellnessAssessment } from '../types';

export interface SignalInputs {
  leaveDeficitDays: number; // days past normal leave cycle
  deploymentMonthsInYear: number;
  weeklyDutyHours: number;
  recentTransfersCount: number;
  latestAssessment?: WellnessAssessment;
  baseline: PersonalBaseline;
  persistenceWeeks: number;
}

export interface EngineResult {
  score: number;
  level: SignalLevel;
  levelLabel: string;
  trend: 'improving' | 'stable' | 'escalating';
  factors: RiskFactor[];
  recommendations: string[];
  humanReviewRequired: boolean;
  explanationSummary: string;
}

/**
 * RakshaWell-AI Multi-Signal Welfare Engine
 * Rule-based with SHAP-approximated linear attribution for transparent, auditable signals.
 * Strictly adheres to ethical bounds: NO psychiatric labels, NO disciplinary metrics.
 */
export function calculateWelfareSignal(inputs: SignalInputs): EngineResult {
  const { leaveDeficitDays, deploymentMonthsInYear, weeklyDutyHours, recentTransfersCount, latestAssessment, baseline, persistenceWeeks } = inputs;

  const factors: RiskFactor[] = [];
  let rawScore = 10; // Baseline healthy reserve

  // 1. Duty Workload vs Baseline
  const dutyDiff = weeklyDutyHours - baseline.averageWeeklyDutyHours;
  if (dutyDiff > 8) {
    const dutyContribution = Math.min(30, Math.round(dutyDiff * 1.5));
    rawScore += dutyContribution;
    factors.push({
      factor: 'Extended Duty Hours',
      category: 'duty_workload',
      contributionScore: dutyContribution,
      description: `Logged ${weeklyDutyHours}h/week vs personal baseline of ${baseline.averageWeeklyDutyHours}h/week.`,
      baselineValue: `${baseline.averageWeeklyDutyHours}h/wk`,
      currentValue: `${weeklyDutyHours}h/wk`
    });
  } else if (dutyDiff < -5) {
    rawScore -= 5;
    factors.push({
      factor: 'Balanced Duty Roster',
      category: 'duty_workload',
      contributionScore: -5,
      description: `Current duty schedule is well within historical baseline limits.`,
      baselineValue: `${baseline.averageWeeklyDutyHours}h/wk`,
      currentValue: `${weeklyDutyHours}h/wk`
    });
  }

  // 2. Leave Deficit vs Baseline Interval
  if (leaveDeficitDays > 45) {
    const leaveContribution = Math.min(25, Math.round(leaveDeficitDays * 0.3));
    rawScore += leaveContribution;
    factors.push({
      factor: 'Delayed Rest & Recuperation Leave',
      category: 'leave_deficit',
      contributionScore: leaveContribution,
      description: `Elapsed time since last major leave is ${leaveDeficitDays} days past typical individual rotation interval.`,
      baselineValue: `Every ${baseline.typicalLeaveIntervalDays} days`,
      currentValue: `+${leaveDeficitDays} days delayed`
    });
  }

  // 3. Deployment Load
  if (deploymentMonthsInYear > 6) {
    const deployContribution = Math.min(20, (deploymentMonthsInYear - 6) * 4);
    rawScore += deployContribution;
    factors.push({
      factor: 'Sustained Field Deployment',
      category: 'deployment_strain',
      contributionScore: deployContribution,
      description: `Active operational deployment spans ${deploymentMonthsInYear} months in the preceding 12-month period.`,
      baselineValue: `Standard 3-4 months`,
      currentValue: `${deploymentMonthsInYear} months`
    });
  }

  // 4. Voluntary Self-Assessment Feedback (Stress, Sleep & Fatigue)
  if (latestAssessment) {
    const stressScale = latestAssessment.stressScore * 10;
    const stressDelta = stressScale - baseline.baselineStressScore;
    if (stressDelta > 15) {
      const stressContribution = Math.min(25, Math.round(stressDelta * 0.4));
      rawScore += stressContribution;
      factors.push({
        factor: 'Self-Reported Elevated Tension',
        category: 'stress_persistence',
        contributionScore: stressContribution,
        description: `Recent check-in indicated elevated perceived stress (${latestAssessment.stressScore}/10) compared to personal baseline (${Math.round(baseline.baselineStressScore / 10)}/10).`,
        baselineValue: `${Math.round(baseline.baselineStressScore / 10)}/10`,
        currentValue: `${latestAssessment.stressScore}/10`
      });
    }

    const sleepDelta = baseline.baselineSleepHours - latestAssessment.sleepHours;
    if (sleepDelta >= 1.5) {
      const sleepContribution = Math.min(20, Math.round(sleepDelta * 5));
      rawScore += sleepContribution;
      factors.push({
        factor: 'Sleep & Recovery Deficit',
        category: 'sleep_recovery',
        contributionScore: sleepContribution,
        description: `Average nightly sleep recorded at ${latestAssessment.sleepHours}h vs baseline of ${baseline.baselineSleepHours}h.`,
        baselineValue: `${baseline.baselineSleepHours} hrs`,
        currentValue: `${latestAssessment.sleepHours} hrs`
      });
    }

    if (latestAssessment.supportNeedsExpressed) {
      rawScore += 15;
      factors.push({
        factor: 'Personnel Requested Wellness Support',
        category: 'stress_persistence',
        contributionScore: 15,
        description: `Member indicated a preference for supportive welfare contact in voluntary check-in.`,
        baselineValue: 'No active request',
        currentValue: 'Support requested'
      });
    }
  }

  // 5. Transfer Frequency
  if (recentTransfersCount >= 2) {
    const transferContribution = recentTransfersCount * 5;
    rawScore += transferContribution;
    factors.push({
      factor: 'Relocation & Posting Adjustment',
      category: 'recent_transfer',
      contributionScore: transferContribution,
      description: `${recentTransfersCount} station movements recorded in past 18 months, requiring family and environment recalibration.`,
      baselineValue: '1 relocation / 36 mo',
      currentValue: `${recentTransfersCount} transfers`
    });
  }

  // 6. Persistence Multiplier (Multi-signal stability check)
  if (persistenceWeeks > 3 && rawScore > 35) {
    const persistenceBonus = Math.min(15, persistenceWeeks * 2);
    rawScore += persistenceBonus;
    factors.push({
      factor: 'Multi-Week Indicator Persistence',
      category: 'stress_persistence',
      contributionScore: persistenceBonus,
      description: `Elevated variance indicators have persisted across ${persistenceWeeks} consecutive weeks rather than an isolated spike.`,
      baselineValue: 'Transient (<1 wk)',
      currentValue: `${persistenceWeeks} weeks sustained`
    });
  }

  // Clamp 0-100
  const finalScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  // Determine Level according to Phase 8 specs:
  // 0-24: Normal
  // 25-49: Monitor
  // 50-74: Welfare Review
  // 75-100: Immediate Human Review
  let level: SignalLevel = 'normal';
  let levelLabel = 'Normal';
  let humanReviewRequired = false;

  if (finalScore >= 75) {
    level = 'immediate_review';
    levelLabel = 'Immediate Human Review';
    humanReviewRequired = true;
  } else if (finalScore >= 50) {
    level = 'welfare_review';
    levelLabel = 'Welfare Review';
    humanReviewRequired = true;
  } else if (finalScore >= 25) {
    level = 'monitor';
    levelLabel = 'Monitor';
    humanReviewRequired = false;
  } else {
    level = 'normal';
    levelLabel = 'Normal Baseline';
    humanReviewRequired = false;
  }

  // Generate appropriate support recommendations
  const recommendations: string[] = [];
  if (level === 'immediate_review' || level === 'welfare_review') {
    recommendations.push('Designated Welfare Officer contact within 48 hours');
    recommendations.push('Duty roster rest cycle adjustment and relief rotation');
    recommendations.push('Expedited review of accumulated leave eligibility');
    recommendations.push('Confidential one-on-one welfare dialogue offer');
  } else if (level === 'monitor') {
    recommendations.push('Encourage standard recovery window and sleep regularity');
    recommendations.push('Review unit workload allocation to prevent sustained clustering');
    recommendations.push('Promote voluntary check-in via Personal Welfare Twin');
  } else {
    recommendations.push('Maintain regular training and rest cadence');
    recommendations.push('Continue periodic voluntary wellness check-ins');
  }

  // Trend determination
  const trend = persistenceWeeks > 2 && finalScore > 45 ? 'escalating' : (finalScore < 30 ? 'improving' : 'stable');

  const explanationSummary = factors.length > 0
    ? `Calculated from ${factors.length} primary observable indicators against individual historical baseline.`
    : 'All organizational indicators and voluntary check-in metrics are within calibrated personal baseline.';

  return {
    score: finalScore,
    level,
    levelLabel,
    trend,
    factors: factors.sort((a, b) => b.contributionScore - a.contributionScore),
    recommendations,
    humanReviewRequired,
    explanationSummary
  };
}
