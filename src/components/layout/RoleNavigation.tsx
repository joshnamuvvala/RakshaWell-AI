import React from 'react';
import { useStore } from '../../services/storeContext';
import {
  User,
  HeartPulse,
  TrendingUp,
  MessageSquare,
  LifeBuoy,
  FileSpreadsheet,
  CalendarCheck,
  Building,
  BarChart2,
  PieChart,
  Users,
  ShieldAlert,
  Lock,
  FileText,
  Activity
} from 'lucide-react';
import { UserRole } from '../../types';

interface RoleNavProps {
  onOpenSupportModal: () => void;
}

interface NavTab {
  id: string;
  label: string;
  icon: any;
  isAction?: boolean;
}

export const RoleNavigation: React.FC<RoleNavProps> = ({ onOpenSupportModal }) => {
  const { currentRole, setCurrentRole, activeView, setActiveView } = useStore();

  const personnelTabs: NavTab[] = [
    { id: 'personnel-dashboard', label: 'Command Dashboard (All Features)', icon: Activity },
    { id: 'personnel-welfare-twin', label: 'My Welfare Twin', icon: User },
    { id: 'personnel-checkin', label: 'Wellness Check', icon: HeartPulse },
    { id: 'personnel-journey', label: 'My Wellness Journey', icon: TrendingUp },
    { id: 'personnel-chat', label: 'Talk to My Twin', icon: MessageSquare },
    { id: 'request-support-action', label: 'Request Support', icon: LifeBuoy, isAction: true }
  ];

  const officerTabs: NavTab[] = [
    { id: 'personnel-dashboard', label: 'Personnel Perspective', icon: User },
    { id: 'welfare-intelligence', label: 'Welfare Intelligence', icon: Activity },
    { id: 'officer-cases', label: 'Cases', icon: FileSpreadsheet },
    { id: 'officer-counseling', label: 'Counseling', icon: CalendarCheck },
    { id: 'officer-followups', label: 'Follow-ups', icon: TrendingUp }
  ];

  const commanderTabs: NavTab[] = [
    { id: 'personnel-dashboard', label: 'Unit Master View', icon: Activity },
    { id: 'commander-unit-welfare', label: 'Unit Welfare', icon: Building },
    { id: 'commander-workload', label: 'Workload Intelligence', icon: BarChart2 },
    { id: 'commander-trends', label: 'Aggregate Trends', icon: PieChart }
  ];

  const adminTabs: NavTab[] = [
    { id: 'personnel-dashboard', label: 'Master Console', icon: Activity },
    { id: 'admin-users', label: 'Users', icon: Users },
    { id: 'admin-roles', label: 'Roles', icon: ShieldAlert },
    { id: 'admin-security', label: 'Security', icon: Lock },
    { id: 'admin-privacy', label: 'Privacy', icon: Lock },
    { id: 'admin-audit', label: 'Audit Logs', icon: FileText }
  ];

  const getActiveTabs = (): { label: string; tabs: NavTab[]; badgeColor: string } => {
    switch (currentRole) {
      case 'personnel':
        return { label: 'Personnel', tabs: personnelTabs, badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'welfare_officer':
        return { label: 'Welfare Officer', tabs: officerTabs, badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'commander':
        return { label: 'Commander', tabs: commanderTabs, badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'admin':
        return { label: 'Admin', tabs: adminTabs, badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' };
      default:
        return { label: 'Personnel', tabs: personnelTabs, badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    }
  };

  const { label: roleHeader, tabs, badgeColor } = getActiveTabs();

  const handleTabClick = (tab: NavTab) => {
    if (tab.isAction) {
      onOpenSupportModal();
    } else {
      setActiveView(tab.id);
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-2.5 gap-3">
          {/* Active Section Pillar Badge */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Module:
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
              {roleHeader}
            </span>
          </div>

          {/* Sub Navigation Bar Tabs */}
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none" aria-label="Role Navigation">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : tab.isAction
                      ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.isAction ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
