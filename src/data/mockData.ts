import {
  AuditLog,
  CounselingSession,
  FollowUpTask,
  PersonalBaseline,
  ResearchSource,
  Unit,
  User,
  WelfareSignalRecord,
  WellnessAssessment
} from '../types';

export const SYNTHETIC_UNITS: Unit[] = [
  {
    id: 'unit-alpha',
    name: '14th Mountain Division - Alpha Batt.',
    code: '14-MD-A',
    commanderName: 'Col. Vikramaditya Singh',
    officerCount: 14,
    totalPersonnel: 480,
    location: 'Northern Sector (Forward)',
    deploymentStatus: 'field',
    averageWorkloadHours: 54.2,
    leaveUtilizationRate: 68.4
  },
  {
    id: 'unit-bravo',
    name: '8th Armoured Brigade - Bravo Garrison',
    code: '8-AB-B',
    commanderName: 'Col. Ranjit Kulkarni',
    officerCount: 12,
    totalPersonnel: 395,
    location: 'Western Plains',
    deploymentStatus: 'garrison',
    averageWorkloadHours: 44.8,
    leaveUtilizationRate: 84.1
  },
  {
    id: 'unit-charlie',
    name: 'High Altitude Support Wing - Charlie Sqn.',
    code: 'HASW-C',
    commanderName: 'Gp. Capt. Devendra Mehra',
    officerCount: 9,
    totalPersonnel: 210,
    location: 'Eastern Sub-Sector',
    deploymentStatus: 'high_altitude',
    averageWorkloadHours: 58.6,
    leaveUtilizationRate: 59.2
  },
  {
    id: 'unit-delta',
    name: 'Central Logistics & Training Depot',
    code: 'CLTD-D',
    commanderName: 'Col. Aruna Iyer',
    officerCount: 16,
    totalPersonnel: 540,
    location: 'Central Command Base',
    deploymentStatus: 'garrison',
    averageWorkloadHours: 42.1,
    leaveUtilizationRate: 88.7
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'user-personnel-01',
    name: 'Subedar Rajesh Kumar',
    serviceNumber: 'JC-489211K',
    rank: 'Subedar',
    role: 'personnel',
    unitId: 'unit-alpha',
    unitName: '14th Mountain Division - Alpha Batt.',
    email: 'rajesh.kumar@rakshawell.internal',
    joinedDate: '2016-04-12',
    is2FAEnabled: true,
    privacyPreferences: {
      voluntaryAssessmentsEnabled: true,
      shareAggregatesWithCommand: true,
      confidentialTwinOnly: false
    }
  },
  {
    id: 'user-officer-01',
    name: 'Major Anita Sharma',
    serviceNumber: 'IC-624108M',
    rank: 'Major (Welfare & Medical Officer)',
    role: 'welfare_officer',
    unitId: 'unit-alpha',
    unitName: '14th Mountain Division - Alpha Batt.',
    email: 'anita.sharma@rakshawell.internal',
    joinedDate: '2019-08-01',
    is2FAEnabled: true,
    privacyPreferences: {
      voluntaryAssessmentsEnabled: true,
      shareAggregatesWithCommand: true,
      confidentialTwinOnly: false
    }
  },
  {
    id: 'user-commander-01',
    name: 'Col. Vikramaditya Singh',
    serviceNumber: 'IC-519820P',
    rank: 'Colonel (Commanding Officer)',
    role: 'commander',
    unitId: 'unit-alpha',
    unitName: '14th Mountain Division - Alpha Batt.',
    email: 'vikramaditya.singh@rakshawell.internal',
    joinedDate: '2012-01-15',
    is2FAEnabled: true,
    privacyPreferences: {
      voluntaryAssessmentsEnabled: true,
      shareAggregatesWithCommand: true,
      confidentialTwinOnly: false
    }
  },
  {
    id: 'user-admin-01',
    name: 'Sunita Rao',
    serviceNumber: 'CIV-ADM-9942',
    rank: 'Chief Information & Compliance Officer',
    role: 'admin',
    unitId: 'unit-delta',
    unitName: 'Central Logistics & Training Depot',
    email: 'sunita.rao@rakshawell.internal',
    joinedDate: '2021-03-10',
    is2FAEnabled: true,
    privacyPreferences: {
      voluntaryAssessmentsEnabled: true,
      shareAggregatesWithCommand: true,
      confidentialTwinOnly: false
    }
  }
];

export const DEMO_BASELINE_RAJESH: PersonalBaseline = {
  personnelId: 'user-personnel-01',
  baselinePeriodMonths: 12,
  averageWeeklyDutyHours: 44,
  typicalLeaveIntervalDays: 90,
  baselineStressScore: 32, // out of 100
  baselineFatigueScore: 28,
  baselineSleepHours: 7.2,
  baselineRecoveryScore: 82,
  lastCalibratedDate: '2026-09-01'
};

// 12-Month longitudinal voluntary check-ins for Subedar Rajesh Kumar
export const RAJESH_LONGITUDINAL_ASSESSMENTS: WellnessAssessment[] = [
  {
    id: 'ass-01',
    personnelId: 'user-personnel-01',
    date: '2026-04-10',
    stressScore: 3,
    fatigueScore: 3,
    moodScore: 8,
    sleepHours: 7.5,
    recoveryQuality: 8,
    perceivedWorkload: 4,
    emotionalWellbeing: 8,
    supportNeedsExpressed: false,
    voluntary: true
  },
  {
    id: 'ass-02',
    personnelId: 'user-personnel-01',
    date: '2026-05-15',
    stressScore: 4,
    fatigueScore: 4,
    moodScore: 7,
    sleepHours: 7.0,
    recoveryQuality: 7,
    perceivedWorkload: 5,
    emotionalWellbeing: 7,
    supportNeedsExpressed: false,
    voluntary: true
  },
  {
    id: 'ass-03',
    personnelId: 'user-personnel-01',
    date: '2026-06-20',
    stressScore: 4,
    fatigueScore: 4,
    moodScore: 8,
    sleepHours: 7.2,
    recoveryQuality: 8,
    perceivedWorkload: 5,
    emotionalWellbeing: 8,
    supportNeedsExpressed: false,
    voluntary: true
  },
  {
    id: 'ass-04',
    personnelId: 'user-personnel-01',
    date: '2026-07-28',
    stressScore: 5,
    fatigueScore: 5,
    moodScore: 7,
    sleepHours: 6.8,
    recoveryQuality: 6,
    perceivedWorkload: 6,
    emotionalWellbeing: 7,
    supportNeedsExpressed: false,
    voluntary: true
  },
  {
    id: 'ass-05',
    personnelId: 'user-personnel-01',
    date: '2026-08-25',
    stressScore: 6,
    fatigueScore: 7,
    moodScore: 6,
    sleepHours: 6.1,
    recoveryQuality: 5,
    perceivedWorkload: 8,
    emotionalWellbeing: 6,
    supportNeedsExpressed: false,
    voluntary: true
  },
  {
    id: 'ass-06',
    personnelId: 'user-personnel-01',
    date: '2026-09-18',
    stressScore: 7,
    fatigueScore: 8,
    moodScore: 5,
    sleepHours: 5.4,
    recoveryQuality: 4,
    perceivedWorkload: 9,
    emotionalWellbeing: 5,
    supportNeedsExpressed: true,
    notes: 'Extended night watch cadence combined with remote outpost logistics delay.',
    voluntary: true
  },
  {
    id: 'ass-07',
    personnelId: 'user-personnel-01',
    date: '2026-10-02',
    stressScore: 7,
    fatigueScore: 7,
    moodScore: 6,
    sleepHours: 5.8,
    recoveryQuality: 5,
    perceivedWorkload: 8,
    emotionalWellbeing: 6,
    supportNeedsExpressed: true,
    voluntary: true
  }
];

export const INITIAL_COUNSELING_SESSIONS: CounselingSession[] = [
  {
    id: 'counsel-01',
    personnelId: 'user-personnel-01',
    personnelName: 'Subedar Rajesh Kumar',
    serviceNumber: 'JC-489211K',
    officerId: 'user-officer-01',
    officerName: 'Major Anita Sharma',
    requestedAt: '2026-10-03T11:00:00Z',
    scheduledDate: '2026-10-07T14:30:00Z',
    status: 'scheduled',
    urgency: 'priority',
    preferredFormat: 'confidential_in_person',
    generalInterventionCategory: 'schedule_adjustment',
    generalOutcomeNotes: 'Scheduled initial welfare dialogue to address operational fatigue and review upcoming rest cycle.'
  },
  {
    id: 'counsel-02',
    personnelId: 'syn-pers-012',
    personnelName: 'Havildar Suresh Babu',
    serviceNumber: '15408922M',
    officerId: 'user-officer-01',
    officerName: 'Major Anita Sharma',
    requestedAt: '2026-09-12T09:30:00Z',
    scheduledDate: '2026-09-16T10:00:00Z',
    status: 'completed',
    urgency: 'routine',
    preferredFormat: 'confidential_in_person',
    generalInterventionCategory: 'rest_cycle',
    generalOutcomeNotes: 'Approved 14-day accumulated leave and temporary rotation to administrative daylight duty.',
    followUpDate: '2026-10-12',
    feedbackRating: 5
  },
  {
    id: 'counsel-03',
    personnelId: 'syn-pers-045',
    personnelName: 'Sepoy Vikram Rathore',
    serviceNumber: '15789012L',
    officerId: 'user-officer-01',
    officerName: 'Major Anita Sharma',
    requestedAt: '2026-10-01T16:00:00Z',
    scheduledDate: '2026-10-06T11:00:00Z',
    status: 'scheduled',
    urgency: 'urgent',
    preferredFormat: 'confidential_in_person',
    generalInterventionCategory: 'family_support_referral',
    generalOutcomeNotes: 'Priority outreach following elevated multi-signal alert and consecutive missed leave cycles.'
  }
];

export const INITIAL_FOLLOW_UPS: FollowUpTask[] = [
  {
    id: 'fup-01',
    caseId: 'counsel-02',
    personnelId: 'syn-pers-012',
    personnelName: 'Havildar Suresh Babu',
    unitName: '14th Mountain Division - Alpha Batt.',
    dueDate: '2026-10-12',
    type: 'recovery_review',
    status: 'pending',
    assignedTo: 'Major Anita Sharma'
  },
  {
    id: 'fup-02',
    caseId: 'counsel-01',
    personnelId: 'user-personnel-01',
    personnelName: 'Subedar Rajesh Kumar',
    unitName: '14th Mountain Division - Alpha Batt.',
    dueDate: '2026-10-14',
    type: 'workload_check',
    status: 'pending',
    assignedTo: 'Major Anita Sharma'
  },
  {
    id: 'fup-03',
    caseId: 'counsel-03',
    personnelId: 'syn-pers-045',
    personnelName: 'Sepoy Vikram Rathore',
    unitName: '14th Mountain Division - Alpha Batt.',
    dueDate: '2026-10-09',
    type: 'check_in',
    status: 'pending',
    assignedTo: 'Major Anita Sharma'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-10-05T07:15:20Z',
    actorId: 'user-officer-01',
    actorName: 'Major Anita Sharma',
    actorRole: 'welfare_officer',
    action: 'SIGNAL_REVIEWED',
    resourceType: 'welfare_case',
    resourceId: 'case-alpha-489211',
    details: 'Accessed authorized welfare signal contributing factors for personnel ID: JC-489211K.',
    ipAddress: '10.14.88.12'
  },
  {
    id: 'log-002',
    timestamp: '2026-10-04T16:40:11Z',
    actorId: 'user-personnel-01',
    actorName: 'Subedar Rajesh Kumar',
    actorRole: 'personnel',
    action: 'COUNSELING_SCHEDULED',
    resourceType: 'personnel_record',
    resourceId: 'counsel-01',
    details: 'Initiated confidential counseling request through Personal Welfare Twin portal.',
    ipAddress: '10.14.92.44'
  },
  {
    id: 'log-003',
    timestamp: '2026-10-04T09:12:00Z',
    actorId: 'user-admin-01',
    actorName: 'Sunita Rao',
    actorRole: 'admin',
    action: 'ROLE_CHANGED',
    resourceType: 'security_setting',
    details: 'Periodic verification of RBAC authorization boundaries and encryption key validation.',
    ipAddress: '10.14.10.02'
  },
  {
    id: 'log-004',
    timestamp: '2026-10-03T18:05:44Z',
    actorId: 'user-commander-01',
    actorName: 'Col. Vikramaditya Singh',
    actorRole: 'commander',
    action: 'DATA_ACCESS',
    resourceType: 'aggregate_report',
    details: 'Viewed anonymized unit-level workload and leave utilization distribution (14th MD).',
    ipAddress: '10.14.88.01'
  }
];

export const OFFICIAL_RESEARCH_SOURCES: ResearchSource[] = [
  {
    id: 'src-01',
    organization: 'Ministry of Defence & Armed Forces Medical Services',
    title: 'Comprehensive Psychological Health & Personnel Welfare Framework for Armed Forces',
    url: 'https://mod.gov.in/sites/default/files/mental-health-guidelines.pdf',
    publicationDate: '2023-11-14',
    sourceType: 'Government Publication',
    topic: 'Occupational Stress & Early Detection in Forward Formations',
    summary: 'Establishes statutory duty of care, proactive rest cycles, buddy support systems, and institutional guidelines against stigmatization.',
    verificationStatus: 'Official Verified',
    keyTakeaway: 'Early identification of sleep disruption and sustained duty hours prevents severe operational fatigue.'
  },
  {
    id: 'src-02',
    organization: 'Ministry of Home Affairs (MHA)',
    title: 'CAPF Personnel Welfare & Rotational Rest Directive',
    url: 'https://mha.gov.in/en/division-of-mha/police-modernisation-division',
    publicationDate: '2024-03-22',
    sourceType: 'Government Publication',
    topic: 'Leave Utilization & Work-Life Equilibrium in Hard Areas',
    summary: 'Mandates timely leave granting, transparent rosters, and mandatory annual wellness reviews for high-stress deployments.',
    verificationStatus: 'Official Verified',
    keyTakeaway: 'Leave deficits exceeding 60 days correlate with an exponential rise in preventable physical and emotional strain.'
  },
  {
    id: 'src-03',
    organization: 'World Health Organization (WHO)',
    title: 'Guidelines on Mental Health at Work & Psychosocial Risk Mitigation',
    url: 'https://www.who.int/publications/i/item/9789240053052',
    publicationDate: '2022-09-28',
    sourceType: 'International Organization',
    topic: 'Organizational Risk Factors & Evidence-Based Interventions',
    summary: 'Comprehensive global standard distinguishing surveillance from compassionate occupational support systems.',
    verificationStatus: 'Peer-Reviewed Verified',
    keyTakeaway: 'Systemic interventions like workload recalibration yield 3.8x greater sustainability than purely individual-focused resilience training.'
  },
  {
    id: 'src-04',
    organization: 'International Labour Organization (ILO)',
    title: 'Promoting Safety and Health in High-Risk Occupations (Convention No. 155 & Guidance)',
    url: 'https://www.ilo.org/global/topics/safety-and-health-at-work',
    publicationDate: '2023-05-10',
    sourceType: 'International Organization',
    topic: 'Rest Periods, Continuous Shift Limits, and Fatigue Management',
    summary: 'International technical consensus on physiological limits of sustained watchkeeping and cumulative sleep debt.',
    verificationStatus: 'Peer-Reviewed Verified',
    keyTakeaway: 'Predictable rest cycles and circadian recovery windows are core operational safety requirements.'
  },
  {
    id: 'src-05',
    organization: 'United Nations Department of Peace Operations (DPO)',
    title: 'Mental Health Strategy for Uniformed Personnel in Field Deployments',
    url: 'https://peacekeeping.un.org/en/mental-health-strategy',
    publicationDate: '2024-01-18',
    sourceType: 'Defence Directive',
    topic: 'Pre-deployment Baselines, In-mission Monitoring & Post-tour Reintegration',
    summary: 'Framework utilized across multi-national peacekeeping troops to benchmark individual baseline variance and destigmatize help-seeking.',
    verificationStatus: 'Statutory Framework',
    keyTakeaway: 'Personal baseline tracking is superior to population-wide ranking because resilience thresholds are inherently individual.'
  }
];

// Helper to generate 100+ realistic synthetic personnel cases for Officer and Commander views
export function generateSyntheticWelfareCases(): WelfareSignalRecord[] {
  const ranks = ['Sepoy', 'Lance Naik', 'Naik', 'Havildar', 'Naib Subedar', 'Subedar', 'Subedar Major'];
  const firstNames = ['Rajesh', 'Suresh', 'Vikram', 'Priya', 'Amit', 'Manoj', 'Deepak', 'Arjun', 'Gurpreet', 'Jaswant', 'Ramesh', 'Harish', 'Manish', 'Kishore', 'Praveen', 'Rohit', 'Sunil', 'Santosh'];
  const lastNames = ['Kumar', 'Babu', 'Rathore', 'Verma', 'Singh', 'Rawat', 'Thapa', 'Nair', 'Sharma', 'Patil', 'Yadav', 'Bisht', 'Chauhan', 'Kaur', 'Reddy'];

  const cases: WelfareSignalRecord[] = [
    // Case 1: Primary Demo Personnel (Subedar Rajesh Kumar)
    {
      id: 'case-01',
      personnelId: 'user-personnel-01',
      personnelName: 'Subedar Rajesh Kumar',
      serviceNumber: 'JC-489211K',
      unitId: 'unit-alpha',
      unitName: '14th Mountain Division - Alpha Batt.',
      calculatedAt: '2026-10-04T08:00:00Z',
      score: 58,
      level: 'welfare_review',
      trend: 'escalating',
      persistenceWeeks: 3,
      primaryContributingFactors: [
        {
          factor: 'Extended Duty Hours',
          category: 'duty_workload',
          contributionScore: 24,
          description: 'Logged 56h/week vs calibrated baseline of 44h/week during outpost logistics phase.',
          baselineValue: '44h/wk',
          currentValue: '56h/wk'
        },
        {
          factor: 'Delayed Rest & Recuperation Leave',
          category: 'leave_deficit',
          contributionScore: 18,
          description: 'Last rotation leave was 128 days ago (baseline interval: 90 days).',
          baselineValue: 'Every 90 days',
          currentValue: '+38 days overdue'
        },
        {
          factor: 'Sleep & Recovery Deficit',
          category: 'sleep_recovery',
          contributionScore: 16,
          description: 'Self-reported average sleep reduced to 5.4h vs baseline of 7.2h.',
          baselineValue: '7.2 hrs',
          currentValue: '5.4 hrs'
        }
      ],
      recommendedSupport: [
        'Designated Welfare Officer contact within 48 hours',
        'Duty roster rest cycle adjustment and relief rotation',
        'Expedited review of accumulated leave eligibility'
      ],
      humanReviewRequired: true,
      reviewStatus: 'counseling_scheduled',
      assignedOfficerId: 'user-officer-01',
      assignedOfficerName: 'Major Anita Sharma'
    },
    // Case 2: Sepoy Vikram Rathore (Immediate Human Review)
    {
      id: 'case-02',
      personnelId: 'syn-pers-045',
      personnelName: 'Sepoy Vikram Rathore',
      serviceNumber: '15789012L',
      unitId: 'unit-alpha',
      unitName: '14th Mountain Division - Alpha Batt.',
      calculatedAt: '2026-10-04T08:00:00Z',
      score: 79,
      level: 'immediate_review',
      trend: 'escalating',
      persistenceWeeks: 4,
      primaryContributingFactors: [
        {
          factor: 'Delayed Rest & Recuperation Leave',
          category: 'leave_deficit',
          contributionScore: 28,
          description: 'Delayed leave cycle by 62 days due to operational hold in snowbound area.',
          baselineValue: 'Every 90 days',
          currentValue: '+62 days overdue'
        },
        {
          factor: 'Self-Reported Elevated Tension',
          category: 'stress_persistence',
          contributionScore: 26,
          description: 'Voluntary check-in indicates sustained high stress (8/10).',
          baselineValue: '3/10',
          currentValue: '8/10'
        },
        {
          factor: 'Sustained Field Deployment',
          category: 'deployment_strain',
          contributionScore: 25,
          description: 'Consecutive forward high-altitude post duration now exceeds 9 months.',
          baselineValue: '4-5 months',
          currentValue: '9.2 months'
        }
      ],
      recommendedSupport: [
        'Immediate Welfare Officer outreach within 24 hours',
        'Command relief authorization for rest and family contact window'
      ],
      humanReviewRequired: true,
      reviewStatus: 'under_review',
      assignedOfficerId: 'user-officer-01',
      assignedOfficerName: 'Major Anita Sharma'
    },
    // Case 3: Havildar Suresh Babu (Improving after Support)
    {
      id: 'case-03',
      personnelId: 'syn-pers-012',
      personnelName: 'Havildar Suresh Babu',
      serviceNumber: '15408922M',
      unitId: 'unit-alpha',
      unitName: '14th Mountain Division - Alpha Batt.',
      calculatedAt: '2026-10-03T09:30:00Z',
      score: 32,
      level: 'monitor',
      trend: 'improving',
      persistenceWeeks: 1,
      primaryContributingFactors: [
        {
          factor: 'Recovering Duty Schedule',
          category: 'duty_workload',
          contributionScore: 12,
          description: 'Rotated to daylight logistics following counseling session on Sept 16.',
          baselineValue: '42h/wk',
          currentValue: '45h/wk'
        }
      ],
      recommendedSupport: [
        'Follow-up review scheduled for Oct 12',
        'Maintain balanced roster cadence'
      ],
      humanReviewRequired: false,
      reviewStatus: 'monitoring',
      assignedOfficerId: 'user-officer-01',
      assignedOfficerName: 'Major Anita Sharma'
    }
  ];

  // Synthesize up to 105 total personnel records distributed across the 4 units
  for (let i = 4; i <= 105; i++) {
    const fName = firstNames[i % firstNames.length];
    const lName = lastNames[(i * 3) % lastNames.length];
    const rank = ranks[i % ranks.length];
    const unit = SYNTHETIC_UNITS[i % SYNTHETIC_UNITS.length];
    
    // Distribute score: 65% Normal (10-24), 20% Monitor (25-49), 11% Welfare Review (50-74), 4% Immediate Review (75-92)
    let score = 14 + (i % 11);
    let level: 'normal' | 'monitor' | 'welfare_review' | 'immediate_review' = 'normal';
    let humanReview = false;
    let trend: 'improving' | 'stable' | 'escalating' = 'stable';
    let status: 'pending' | 'under_review' | 'support_offered' | 'counseling_scheduled' | 'monitoring' | 'resolved' = 'resolved';

    if (i % 25 === 0) {
      score = 76 + (i % 14);
      level = 'immediate_review';
      humanReview = true;
      trend = 'escalating';
      status = 'under_review';
    } else if (i % 8 === 0) {
      score = 52 + (i % 18);
      level = 'welfare_review';
      humanReview = true;
      trend = i % 2 === 0 ? 'escalating' : 'stable';
      status = 'support_offered';
    } else if (i % 4 === 0) {
      score = 28 + (i % 19);
      level = 'monitor';
      humanReview = false;
      trend = 'stable';
      status = 'monitoring';
    }

    cases.push({
      id: `syn-case-${i.toString().padStart(3, '0')}`,
      personnelId: `syn-pers-${i.toString().padStart(3, '0')}`,
      personnelName: `${rank} ${fName} ${lName}`,
      serviceNumber: `15${(700000 + i * 142).toString()}X`,
      unitId: unit.id,
      unitName: unit.name,
      calculatedAt: '2026-10-04T06:00:00Z',
      score,
      level,
      trend,
      persistenceWeeks: level === 'immediate_review' ? 4 : (level === 'welfare_review' ? 2 : 1),
      primaryContributingFactors: [
        {
          factor: level === 'normal' ? 'Normal Operating Cadence' : 'Shift & Operational Demands',
          category: 'duty_workload',
          contributionScore: Math.round(score * 0.45),
          description: `Operating within standard task parameters for ${unit.name}.`,
          baselineValue: '42h/wk',
          currentValue: `${40 + (score > 50 ? 12 : 2)}h/wk`
        }
      ],
      recommendedSupport: level === 'normal'
        ? ['Standard welfare monitoring']
        : ['Offer supportive check-in during weekly unit review'],
      humanReviewRequired: humanReview,
      reviewStatus: status,
      assignedOfficerName: 'Major Anita Sharma'
    });
  }

  return cases;
}
