export type UserRole = 'personnel' | 'welfare_officer' | 'commander' | 'admin';

export type SignalLevel = 'normal' | 'monitor' | 'welfare_review' | 'immediate_review';

export interface User {
  id: string;
  name: string;
  serviceNumber: string;
  rank: string;
  role: UserRole;
  unitId: string;
  unitName: string;
  email: string;
  avatar?: string;
  joinedDate: string;
  is2FAEnabled: boolean;
  privacyPreferences: {
    voluntaryAssessmentsEnabled: boolean;
    shareAggregatesWithCommand: boolean;
    confidentialTwinOnly: boolean;
  };
}

export interface Unit {
  id: string;
  name: string;
  code: string;
  commanderName: string;
  officerCount: number;
  totalPersonnel: number;
  location: string;
  deploymentStatus: 'garrison' | 'field' | 'high_altitude' | 'transit';
  averageWorkloadHours: number;
  leaveUtilizationRate: number;
}

export interface PersonalBaseline {
  personnelId: string;
  baselinePeriodMonths: number;
  averageWeeklyDutyHours: number;
  typicalLeaveIntervalDays: number;
  baselineStressScore: number; // 0-100
  baselineFatigueScore: number; // 0-100
  baselineSleepHours: number;
  baselineRecoveryScore: number; // 0-100
  lastCalibratedDate: string;
}

export interface WellnessAssessment {
  id: string;
  personnelId: string;
  date: string;
  stressScore: number; // 1-10
  fatigueScore: number; // 1-10
  moodScore: number; // 1-10
  sleepHours: number; // 1-12
  recoveryQuality: number; // 1-10
  perceivedWorkload: number; // 1-10
  emotionalWellbeing: number; // 1-10
  supportNeedsExpressed: boolean;
  notes?: string;
  voluntary: boolean;
}

export interface RiskFactor {
  factor: string;
  category: 'duty_workload' | 'leave_deficit' | 'deployment_strain' | 'sleep_recovery' | 'stress_persistence' | 'recent_transfer';
  contributionScore: number; // SHAP value approx (-50 to +50)
  description: string;
  baselineValue: string;
  currentValue: string;
}

export interface WelfareSignalRecord {
  id: string;
  personnelId: string;
  personnelName: string;
  serviceNumber: string;
  unitId: string;
  unitName: string;
  calculatedAt: string;
  score: number; // 0-100
  level: SignalLevel;
  trend: 'improving' | 'stable' | 'escalating';
  persistenceWeeks: number;
  primaryContributingFactors: RiskFactor[];
  recommendedSupport: string[];
  humanReviewRequired: boolean;
  reviewStatus: 'pending' | 'under_review' | 'support_offered' | 'counseling_scheduled' | 'monitoring' | 'resolved';
  assignedOfficerId?: string;
  assignedOfficerName?: string;
}

export interface CounselingSession {
  id: string;
  personnelId: string;
  personnelName: string;
  serviceNumber: string;
  officerId: string;
  officerName: string;
  requestedAt: string;
  scheduledDate: string;
  status: 'requested' | 'scheduled' | 'completed' | 'followup_pending' | 'closed';
  urgency: 'routine' | 'priority' | 'urgent';
  preferredFormat: 'confidential_in_person' | 'tele_welfare' | 'peer_buddy';
  generalInterventionCategory?: 'schedule_adjustment' | 'rest_cycle' | 'family_support_referral' | 'workload_rebalance' | 'stress_mitigation';
  generalOutcomeNotes?: string; // High-level, non-stigmatizing, non-private
  followUpDate?: string;
  feedbackRating?: number; // 1-5
}

export interface FollowUpTask {
  id: string;
  caseId: string;
  personnelId: string;
  personnelName: string;
  unitName: string;
  dueDate: string;
  type: 'check_in' | 'recovery_review' | 'workload_check' | 'leave_status';
  status: 'pending' | 'completed' | 'overdue';
  assignedTo: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'DATA_ACCESS' | 'ROLE_CHANGED' | 'CONSENT_UPDATED' | 'COUNSELING_SCHEDULED' | 'SIGNAL_REVIEWED' | 'PRIVACY_REQUEST';
  resourceType: 'personnel_record' | 'welfare_case' | 'aggregate_report' | 'security_setting';
  resourceId?: string;
  details: string; // Sanitized, no private chat/session body
  ipAddress: string;
}

export interface ResearchSource {
  id: string;
  organization: string;
  title: string;
  url: string;
  publicationDate: string;
  sourceType: 'Government Publication' | 'International Organization' | 'Clinical/Occupational Guideline' | 'Defence Directive';
  topic: string;
  summary: string;
  verificationStatus: 'Official Verified' | 'Peer-Reviewed Verified' | 'Statutory Framework';
  keyTakeaway: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'twin';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; actionId: string }[];
}
