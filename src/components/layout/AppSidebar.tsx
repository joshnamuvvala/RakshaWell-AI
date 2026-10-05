import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../services/storeContext';
import {
  X,
  Activity,
  User,
  HeartPulse,
  TrendingUp,
  Zap,
  Moon,
  MessageSquare,
  LifeBuoy,
  CalendarCheck,
  Clock,
  PhoneCall,
  Lock,
  ShieldCheck,
  FileText,
  Shield,
  HeartHandshake,
  UserCheck,
  FileSpreadsheet,
  BarChart2,
  PieChart,
  Building,
  Users,
  ShieldAlert,
  Server,
  BookOpen,
  LogOut,
  ChevronDown,
  Settings,
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserRole } from '../../types';

interface AppSidebarProps {
  onOpenSupportModal: () => void;
}

interface SidebarNavItem {
  label: string;
  icon: any;
  viewId: string;
  isAction?: boolean;
  actionType?: string;
}

interface SidebarNavGroup {
  title: string;
  items: SidebarNavItem[];
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ onOpenSupportModal }) => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    currentUser,
    currentRole,
    activeView,
    setActiveView,
    setConfirmLogoutModalOpen,
    setProfileModalOpen
  } = useStore();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen, setIsSidebarOpen]);

  const handleNavClick = (viewId: string, isAction?: boolean, actionType?: string) => {
    if (isAction) {
      if (actionType === 'support') {
        onOpenSupportModal();
      } else if (actionType === 'feedback') {
        setFeedbackToast('Feedback channel recorded. Thank you for helping improve welfare support.');
        setTimeout(() => setFeedbackToast(null), 3000);
      } else if (actionType === 'hotline') {
        onOpenSupportModal();
      }
    } else {
      setActiveView(viewId);
    }

    // On mobile screens, automatically close the drawer after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Structured Navigation Groups for PERSONNEL
  const personnelGroups: SidebarNavGroup[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', icon: Activity, viewId: 'personnel-dashboard' }
      ]
    },
    {
      title: 'My Wellness',
      items: [
        { label: 'Personal Welfare Twin', icon: User, viewId: 'personnel-welfare-twin' },
        { label: 'Self Assessment', icon: HeartPulse, viewId: 'personnel-checkin' },
        { label: 'Wellness Journey', icon: TrendingUp, viewId: 'personnel-journey' },
        { label: 'Stress & Fatigue Trends', icon: Zap, viewId: 'personnel-journey' },
        { label: 'Workload & Recovery', icon: Moon, viewId: 'personnel-welfare-twin' },
        { label: 'Talk to My Twin', icon: MessageSquare, viewId: 'personnel-chat' }
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Request Counseling', icon: LifeBuoy, viewId: '', isAction: true, actionType: 'support' },
        { label: 'My Counseling', icon: CalendarCheck, viewId: 'officer-counseling' },
        { label: 'Follow-ups', icon: Clock, viewId: 'officer-followups' },
        { label: 'Immediate Help', icon: PhoneCall, viewId: '', isAction: true, actionType: 'hotline' }
      ]
    },
    {
      title: 'Privacy',
      items: [
        { label: 'Privacy Center', icon: Lock, viewId: 'admin-privacy' },
        { label: 'My Consent', icon: ShieldCheck, viewId: 'admin-privacy' },
        { label: 'Data Access History', icon: FileText, viewId: 'admin-audit' },
        { label: 'Data Sharing Controls', icon: Shield, viewId: 'admin-privacy' }
      ]
    },
    {
      title: 'Feedback',
      items: [
        { label: 'Welfare Support Feedback', icon: HeartHandshake, viewId: '', isAction: true, actionType: 'feedback' },
        { label: 'Counselor Feedback', icon: UserCheck, viewId: '', isAction: true, actionType: 'feedback' }
      ]
    }
  ];

  // Structured Navigation Groups for WELFARE OFFICER
  const officerGroups: SidebarNavGroup[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Welfare Dashboard', icon: Activity, viewId: 'welfare-intelligence' }
      ]
    },
    {
      title: 'Welfare Intelligence',
      items: [
        { label: 'Elevated Signals', icon: Zap, viewId: 'officer-cases' },
        { label: 'Monitor Cases', icon: Activity, viewId: 'officer-cases' },
        { label: 'Welfare Review', icon: FileSpreadsheet, viewId: 'officer-cases' },
        { label: 'Immediate Human Review', icon: AlertCircle, viewId: 'officer-cases' },
        { label: 'Risk Trends', icon: TrendingUp, viewId: 'welfare-intelligence' },
        { label: 'Contributing Factors', icon: LayersIcon, viewId: 'officer-cases' }
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Counseling Requests', icon: LifeBuoy, viewId: 'officer-counseling' },
        { label: 'Active Counseling', icon: CalendarCheck, viewId: 'officer-counseling' },
        { label: 'Follow-ups', icon: Clock, viewId: 'officer-followups' },
        { label: 'Welfare Recommendations', icon: CheckCircle2, viewId: 'officer-counseling' }
      ]
    },
    {
      title: 'Personnel Support',
      items: [
        { label: 'Authorized Personnel Cases', icon: Users, viewId: 'officer-cases' },
        { label: 'Wellness History', icon: TrendingUp, viewId: 'welfare-intelligence' },
        { label: 'Support Timeline', icon: Clock, viewId: 'officer-followups' }
      ]
    },
    {
      title: 'Analytics',
      items: [
        { label: 'Welfare Trends', icon: BarChart2, viewId: 'welfare-intelligence' },
        { label: 'Workload Trends', icon: Zap, viewId: 'welfare-intelligence' },
        { label: 'Leave Trends', icon: CalendarCheck, viewId: 'welfare-intelligence' },
        { label: 'Deployment Trends', icon: Building, viewId: 'welfare-intelligence' }
      ]
    },
    {
      title: 'Feedback',
      items: [
        { label: 'Personnel Feedback', icon: HeartHandshake, viewId: 'officer-counseling' },
        { label: 'Counseling Feedback', icon: UserCheck, viewId: 'officer-counseling' }
      ]
    },
    {
      title: 'Security',
      items: [
        { label: 'Access History', icon: ShieldCheck, viewId: 'admin-audit' }
      ]
    }
  ];

  // Structured Navigation Groups for COMMANDER
  const commanderGroups: SidebarNavGroup[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Commander Dashboard', icon: Building, viewId: 'commander-unit-welfare' }
      ]
    },
    {
      title: 'Unit Welfare',
      items: [
        { label: 'Unit Welfare Overview', icon: Building, viewId: 'commander-unit-welfare' },
        { label: 'Aggregate Wellness Trends', icon: PieChart, viewId: 'commander-trends' },
        { label: 'Welfare Risk Trends', icon: TrendingUp, viewId: 'commander-trends' },
        { label: 'Workload Distribution', icon: BarChart2, viewId: 'commander-workload' },
        { label: 'Deployment Distribution', icon: Building, viewId: 'commander-unit-welfare' },
        { label: 'Leave Utilization', icon: CalendarCheck, viewId: 'commander-workload' },
        { label: 'Training Load', icon: Zap, viewId: 'commander-workload' },
        { label: 'Transfer Trends', icon: Activity, viewId: 'commander-unit-welfare' }
      ]
    },
    {
      title: 'Insights',
      items: [
        { label: 'Welfare Intelligence', icon: Activity, viewId: 'commander-trends' },
        { label: 'Workload Concentration', icon: BarChart2, viewId: 'commander-workload' },
        { label: 'Resource Requirements', icon: CheckCircle2, viewId: 'commander-unit-welfare' },
        { label: 'Unit-Level Recommendations', icon: ShieldCheck, viewId: 'commander-unit-welfare' }
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Welfare Initiatives', icon: HeartHandshake, viewId: 'commander-unit-welfare' },
        { label: 'Follow-up Overview', icon: Clock, viewId: 'commander-trends' }
      ]
    },
    {
      title: 'Feedback',
      items: [
        { label: 'Welfare System Feedback', icon: MessageSquare, viewId: 'commander-unit-welfare' }
      ]
    }
  ];

  // Structured Navigation Groups for ADMIN
  const adminGroups: SidebarNavGroup[] = [
    {
      title: 'Administration',
      items: [
        { label: 'Admin Dashboard', icon: Activity, viewId: 'admin-users' },
        { label: 'User Management', icon: Users, viewId: 'admin-users' },
        { label: 'Personnel Management', icon: User, viewId: 'admin-users' },
        { label: 'Role Management', icon: ShieldAlert, viewId: 'admin-roles' },
        { label: 'Permission Management', icon: Lock, viewId: 'admin-roles' },
        { label: 'Unit Management', icon: Building, viewId: 'admin-users' }
      ]
    },
    {
      title: 'Security',
      items: [
        { label: 'Security Center', icon: ShieldAlert, viewId: 'admin-security' },
        { label: 'Authentication', icon: Lock, viewId: 'admin-security' },
        { label: 'Session Security', icon: KeyIcon, viewId: 'admin-security' },
        { label: 'Security Events', icon: AlertCircle, viewId: 'admin-security' },
        { label: 'Audit Logs', icon: FileText, viewId: 'admin-audit' },
        { label: 'Access History', icon: Clock, viewId: 'admin-audit' }
      ]
    },
    {
      title: 'Privacy',
      items: [
        { label: 'Privacy Center', icon: Lock, viewId: 'admin-privacy' },
        { label: 'Consent Management', icon: ShieldCheck, viewId: 'admin-privacy' },
        { label: 'Data Access Controls', icon: Shield, viewId: 'admin-privacy' },
        { label: 'Data Anonymization', icon: UserCheck, viewId: 'admin-privacy' },
        { label: 'Privacy Requests', icon: FileSpreadsheet, viewId: 'admin-privacy' },
        { label: 'Data Export', icon: Server, viewId: 'admin-privacy' }
      ]
    },
    {
      title: 'System',
      items: [
        { label: 'System Health', icon: Activity, viewId: 'admin-security' },
        { label: 'API Status', icon: Server, viewId: 'admin-security' },
        { label: 'Database Status', icon: Server, viewId: 'admin-security' },
        { label: 'AI Services', icon: Zap, viewId: 'admin-security' },
        { label: 'ML Services', icon: BarChart2, viewId: 'admin-security' },
        { label: 'Notifications', icon: Clock, viewId: 'admin-security' },
        { label: 'Configuration', icon: Settings, viewId: 'admin-security' }
      ]
    },
    {
      title: 'Documentation',
      items: [
        { label: 'Research Sources', icon: BookOpen, viewId: 'research-sources' },
        { label: 'AI Safety', icon: ShieldCheck, viewId: 'research-sources' },
        { label: 'Model Card', icon: FileText, viewId: 'research-sources' },
        { label: 'System Documentation', icon: BookOpen, viewId: 'research-sources' }
      ]
    }
  ];

  // Helper icons
  function LayersIcon(props: any) {
    return <Activity {...props} />;
  }
  function KeyIcon(props: any) {
    return <Lock {...props} />;
  }

  const getNavGroups = () => {
    switch (currentRole) {
      case 'personnel':
        return personnelGroups;
      case 'welfare_officer':
        return officerGroups;
      case 'commander':
        return commanderGroups;
      case 'admin':
        return adminGroups;
      default:
        return personnelGroups;
    }
  };

  const currentNavGroups = getNavGroups();

  return (
    <>
      {/* Mobile Backdrop Overlay (only on mobile when open) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-2xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Left Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-80 bg-white border-r border-slate-200 flex flex-col shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Global application navigation"
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => handleNavClick('personnel-dashboard')}
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              RW
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-sm tracking-tight">RakshaWell-AI</span>
                <span className="text-[9px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded">
                  v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Detect Early. Understand Clearly. Support Privately.
              </p>
            </div>
          </div>

          {/* Close Button with standard 44px touch target */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Close navigation"
            title="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert Toast */}
        {feedbackToast && (
          <div className="m-3 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{feedbackToast}</span>
          </div>
        )}

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-thin">
          {currentNavGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group.title}
              </h3>
              <div className="space-y-0.5">
                {group.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const isActive = !item.isAction && activeView === item.viewId;

                  return (
                    <button
                      key={itemIdx}
                      onClick={() => handleNavClick(item.viewId, item.isAction, item.actionType)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-xs rounded-lg font-medium transition-all text-left group ${
                        isActive
                          ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-white'
                            : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      />
                      <span className="truncate flex-1">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Compact User Profile & Logout Section at Bottom */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/70 shrink-0 relative">
          {/* Profile Dropdown Options */}
          {profileDropdownOpen && (
            <div className="absolute bottom-16 left-3 right-3 bg-white border border-slate-200 rounded-xl shadow-xl p-2 space-y-1 z-30 animate-fadeIn">
              <button
                onClick={() => {
                  setProfileModalOpen(true);
                  setProfileDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => {
                  setActiveView('admin-privacy');
                  setProfileDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Privacy Settings</span>
              </button>
              <button
                onClick={() => {
                  onOpenSupportModal();
                  setProfileDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2"
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>Help & Welfare Hotline</span>
              </button>
            </div>
          )}

          {/* User Card */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div
              className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
              onClick={() => setProfileDropdownOpen(prev => !prev)}
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {currentUser.name
                  .split(' ')
                  .map(n => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight truncate">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-slate-500 leading-tight truncate">
                  <span className="capitalize">{currentUser.role.replace('_', ' ')}</span> · {currentUser.unitName.split(' ')[0]}
                </p>
              </div>
            </div>

            {/* Quick Logout Button */}
            <button
              onClick={() => setConfirmLogoutModalOpen(true)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1"
              title="Logout session"
              aria-label="Logout session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
