import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AuditLog,
  CounselingSession,
  FollowUpTask,
  PersonalBaseline,
  ResearchSource,
  Unit,
  User,
  UserRole,
  WelfareSignalRecord,
  WellnessAssessment
} from '../types';
import {
  DEMO_BASELINE_RAJESH,
  DEMO_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_COUNSELING_SESSIONS,
  INITIAL_FOLLOW_UPS,
  OFFICIAL_RESEARCH_SOURCES,
  RAJESH_LONGITUDINAL_ASSESSMENTS,
  SYNTHETIC_UNITS,
  generateSyntheticWelfareCases
} from '../data/mockData';
import { calculateWelfareSignal } from './welfareEngine';

interface StoreContextType {
  currentUser: User;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  switchUser: (userId: string) => void;
  users: User[];
  units: Unit[];
  assessments: WellnessAssessment[];
  addAssessment: (assessment: Omit<WellnessAssessment, 'id' | 'personnelId' | 'date'>) => Promise<void>;
  baseline: PersonalBaseline;
  welfareCases: WelfareSignalRecord[];
  updateCaseStatus: (caseId: string, status: WelfareSignalRecord['reviewStatus'], notes?: string) => void;
  counselingSessions: CounselingSession[];
  requestCounseling: (data: { urgency: 'routine' | 'priority' | 'urgent'; preferredFormat: 'confidential_in_person' | 'tele_welfare' | 'peer_buddy'; note?: string }) => void;
  scheduleCounseling: (sessionId: string, scheduledDate: string, officerNotes?: string) => void;
  completeCounseling: (sessionId: string, interventionCategory: any, notes: string, followUpDate?: string) => void;
  followUps: FollowUpTask[];
  completeFollowUp: (followUpId: string) => void;
  auditLogs: AuditLog[];
  logAuditEvent: (action: AuditLog['action'], resourceType: AuditLog['resourceType'], details: string, resourceId?: string) => void;
  researchSources: ResearchSource[];
  activeView: string;
  setActiveView: (view: string) => void;
  // Sidebar State
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
  // Auth & Session State
  isLoggedIn: boolean;
  logout: () => void;
  login: (userRole?: UserRole) => void;
  profileModalOpen: boolean;
  setProfileModalOpen: (open: boolean) => void;
  confirmLogoutModalOpen: boolean;
  setConfirmLogoutModalOpen: (open: boolean) => void;
  // OTP 2FA State
  isAuthenticating: boolean;
  showOTPModal: boolean;
  setShowOTPModal: (show: boolean) => void;
  pendingRoleSwitch: UserRole | null;
  verifyOTP: (code: string) => boolean;
  cancelOTP: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(DEMO_USERS);
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS[0]); // Subedar Rajesh Kumar
  const [currentRole, setCurrentRoleState] = useState<UserRole>('personnel');
  const [activeView, setActiveView] = useState<string>('personnel-dashboard');
  const [units] = useState<Unit[]>(SYNTHETIC_UNITS);
  const [baseline] = useState<PersonalBaseline>(DEMO_BASELINE_RAJESH);
  const [assessments, setAssessments] = useState<WellnessAssessment[]>(RAJESH_LONGITUDINAL_ASSESSMENTS);
  const [welfareCases, setWelfareCases] = useState<WelfareSignalRecord[]>(() => generateSyntheticWelfareCases());
  const [counselingSessions, setCounselingSessions] = useState<CounselingSession[]>(INITIAL_COUNSELING_SESSIONS);
  const [followUps, setFollowUps] = useState<FollowUpTask[]>(INITIAL_FOLLOW_UPS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [researchSources] = useState<ResearchSource[]>(OFFICIAL_RESEARCH_SOURCES);

  // Sidebar State (Default open on wide screens, responsive)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // Auth & Session state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [confirmLogoutModalOpen, setConfirmLogoutModalOpen] = useState<boolean>(false);

  const logout = () => {
    logAuditEvent('ROLE_CHANGED', 'security_setting', `User logged out of session (${currentUser.name})`);
    setIsLoggedIn(false);
    setConfirmLogoutModalOpen(false);
  };

  const login = (role: UserRole = 'personnel') => {
    setIsLoggedIn(true);
    setCurrentRole(role);
    logAuditEvent('LOGIN_SUCCESS', 'security_setting', `User initiated authenticated session (${role.toUpperCase()})`);
  };

  // 2FA OTP Modal states
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
  const [pendingRoleSwitch, setPendingRoleSwitch] = useState<UserRole | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const logAuditEvent = (action: AuditLog['action'], resourceType: AuditLog['resourceType'], details: string, resourceId?: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorRole: currentRole,
      action,
      resourceType,
      resourceId,
      details,
      ipAddress: '10.14.92.' + Math.floor(Math.random() * 80 + 10)
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const setCurrentRole = (newRole: UserRole) => {
    if (newRole === currentRole) return;
    // For seamless security demonstration, show OTP challenge when switching to privileged roles
    if (newRole === 'commander' || newRole === 'admin' || newRole === 'welfare_officer') {
      setPendingRoleSwitch(newRole);
      setShowOTPModal(true);
    } else {
      executeRoleSwitch(newRole);
    }
  };

  const executeRoleSwitch = (newRole: UserRole) => {
    setCurrentRoleState(newRole);
    const matchingUser = users.find(u => u.role === newRole) || users[0];
    setCurrentUser(matchingUser);

    if (newRole === 'personnel') setActiveView('personnel-dashboard');
    else if (newRole === 'welfare_officer') setActiveView('welfare-intelligence');
    else if (newRole === 'commander') setActiveView('commander-unit-welfare');
    else if (newRole === 'admin') setActiveView('admin-users');

    logAuditEvent('ROLE_CHANGED', 'security_setting', `Switched active role perspective to ${newRole.toUpperCase()} (${matchingUser.name})`);
  };

  const verifyOTP = (code: string): boolean => {
    // For demo convenience, accept standard '123456' or any 6-digit number
    if (code.length === 6) {
      if (pendingRoleSwitch) {
        executeRoleSwitch(pendingRoleSwitch);
        setPendingRoleSwitch(null);
      }
      setShowOTPModal(false);
      logAuditEvent('LOGIN_SUCCESS', 'security_setting', `2FA verification completed via secure OTP`);
      return true;
    }
    return false;
  };

  const cancelOTP = () => {
    setPendingRoleSwitch(null);
    setShowOTPModal(false);
  };

  const switchUser = (userId: string) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      setCurrentRoleState(found.role);
    }
  };

  const addAssessment = async (assessmentData: Omit<WellnessAssessment, 'id' | 'personnelId' | 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newAss: WellnessAssessment = {
      ...assessmentData,
      id: `ass-${Date.now()}`,
      personnelId: currentUser.id,
      date: today,
      voluntary: true
    };

    setAssessments(prev => [...prev, newAss]);

    // Recalculate signal for Subedar Rajesh Kumar
    const engineOut = calculateWelfareSignal({
      leaveDeficitDays: 38,
      deploymentMonthsInYear: 7,
      weeklyDutyHours: 52,
      recentTransfersCount: 1,
      latestAssessment: newAss,
      baseline,
      persistenceWeeks: 3
    });

    setWelfareCases(prev => prev.map(c => {
      if (c.personnelId === currentUser.id) {
        return {
          ...c,
          score: engineOut.score,
          level: engineOut.level,
          trend: engineOut.trend,
          primaryContributingFactors: engineOut.factors,
          recommendedSupport: engineOut.recommendations,
          calculatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    logAuditEvent('DATA_ACCESS', 'personnel_record', `Submitted voluntary self-assessment (Stress: ${assessmentData.stressScore}/10, Sleep: ${assessmentData.sleepHours}h)`);
  };

  const updateCaseStatus = (caseId: string, status: WelfareSignalRecord['reviewStatus'], notes?: string) => {
    setWelfareCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          reviewStatus: status,
          assignedOfficerName: currentUser.name
        };
      }
      return c;
    }));
    logAuditEvent('SIGNAL_REVIEWED', 'welfare_case', `Updated welfare signal case status to ${status.toUpperCase()} ${notes ? `(${notes})` : ''}`, caseId);
  };

  const requestCounseling = (data: { urgency: 'routine' | 'priority' | 'urgent'; preferredFormat: 'confidential_in_person' | 'tele_welfare' | 'peer_buddy'; note?: string }) => {
    const newSession: CounselingSession = {
      id: `counsel-${Date.now()}`,
      personnelId: currentUser.id,
      personnelName: currentUser.name,
      serviceNumber: currentUser.serviceNumber,
      officerId: 'user-officer-01',
      officerName: 'Major Anita Sharma (Assigned)',
      requestedAt: new Date().toISOString(),
      scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      status: 'requested',
      urgency: data.urgency,
      preferredFormat: data.preferredFormat,
      generalOutcomeNotes: data.note || 'Confidential request submitted directly by personnel.'
    };

    setCounselingSessions(prev => [newSession, ...prev]);

    // Update case status to support_offered or under_review
    setWelfareCases(prev => prev.map(c => {
      if (c.personnelId === currentUser.id) {
        return { ...c, reviewStatus: 'under_review' };
      }
      return c;
    }));

    logAuditEvent('COUNSELING_SCHEDULED', 'personnel_record', `Personnel requested confidential support (${data.urgency}, ${data.preferredFormat})`);
  };

  const scheduleCounseling = (sessionId: string, scheduledDate: string, officerNotes?: string) => {
    setCounselingSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          scheduledDate,
          status: 'scheduled',
          generalOutcomeNotes: officerNotes || s.generalOutcomeNotes
        };
      }
      return s;
    }));

    // Add automatic follow up task
    const session = counselingSessions.find(s => s.id === sessionId);
    if (session) {
      const newFup: FollowUpTask = {
        id: `fup-${Date.now()}`,
        caseId: sessionId,
        personnelId: session.personnelId,
        personnelName: session.personnelName,
        unitName: currentUser.unitName,
        dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        type: 'check_in',
        status: 'pending',
        assignedTo: currentUser.name
      };
      setFollowUps(prev => [newFup, ...prev]);
    }

    logAuditEvent('COUNSELING_SCHEDULED', 'welfare_case', `Scheduled counseling consultation for ${scheduledDate}`, sessionId);
  };

  const completeCounseling = (sessionId: string, interventionCategory: any, notes: string, followUpDate?: string) => {
    setCounselingSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          status: 'completed',
          generalInterventionCategory: interventionCategory,
          generalOutcomeNotes: notes,
          followUpDate
        };
      }
      return s;
    }));

    // Log high-level intervention without sensitive details
    logAuditEvent('COUNSELING_SCHEDULED', 'welfare_case', `Recorded general welfare intervention (${interventionCategory})`, sessionId);
  };

  const completeFollowUp = (followUpId: string) => {
    setFollowUps(prev => prev.map(f => {
      if (f.id === followUpId) {
        return { ...f, status: 'completed' };
      }
      return f;
    }));
    logAuditEvent('SIGNAL_REVIEWED', 'welfare_case', `Marked follow-up task completed`, followUpId);
  };

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        currentRole,
        setCurrentRole,
        switchUser,
        users,
        units,
        assessments,
        addAssessment,
        baseline,
        welfareCases,
        updateCaseStatus,
        counselingSessions,
        requestCounseling,
        scheduleCounseling,
        completeCounseling,
        followUps,
        completeFollowUp,
        auditLogs,
        logAuditEvent,
        researchSources,
        activeView,
        setActiveView,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        isLoggedIn,
        logout,
        login,
        profileModalOpen,
        setProfileModalOpen,
        confirmLogoutModalOpen,
        setConfirmLogoutModalOpen,
        isAuthenticating,
        showOTPModal,
        setShowOTPModal,
        pendingRoleSwitch,
        verifyOTP,
        cancelOTP
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
