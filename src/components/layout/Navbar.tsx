import React from 'react';
import { useStore } from '../../services/storeContext';
import { Menu, Shield, Lock, PhoneCall, UserCheck, BookOpen, AlertCircle, User } from 'lucide-react';
import { UserRole } from '../../types';

interface NavbarProps {
  onOpenSupportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSupportModal }) => {
  const {
    currentUser,
    currentRole,
    setCurrentRole,
    activeView,
    setActiveView,
    toggleSidebar,
    isSidebarOpen,
    setProfileModalOpen
  } = useStore();

  const roleLabels: Record<UserRole, string> = {
    personnel: 'Personnel',
    welfare_officer: 'Welfare Officer',
    commander: 'Commander',
    admin: 'Admin'
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      <div className="w-full px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Leftmost Section: Hamburger Menu + Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hamburger Menu Button - Extreme Leftmost, 44x44px target */}
            <button
              onClick={toggleSidebar}
              className={`min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-slate-900 ${
                isSidebarOpen ? 'bg-slate-100 text-slate-900 font-bold' : ''
              }`}
              aria-label="Open navigation"
              title="Open navigation (☰)"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand & Tagline */}
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => setActiveView('personnel-dashboard')}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-2xs">
                RW
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-950 text-base tracking-tight">RakshaWell-AI</span>
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded hidden sm:inline">
                    Internal Welfare Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden md:block leading-none">
                  Detect Early. Understand Clearly. Support Privately.
                </p>
              </div>
            </div>
          </div>

          {/* Center / Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Research & Safety Links */}
            <button
              onClick={() => setActiveView('research-sources')}
              className={`text-xs font-medium px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeView === 'research-sources'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Research & References</span>
              <span className="md:hidden">Research</span>
            </button>

            {/* Quick Request Support button */}
            <button
              onClick={onOpenSupportModal}
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-slate-600" />
              <span>Request Support</span>
            </button>

            {/* Role Switcher for SIH/Demonstration */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
              <span className="text-xs text-slate-400 font-medium hidden xl:inline">Role:</span>
              <div className="flex items-center p-0.5 bg-slate-100 rounded-lg">
                {(['personnel', 'welfare_officer', 'commander', 'admin'] as UserRole[]).map(role => (
                  <button
                    key={role}
                    onClick={() => setCurrentRole(role)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                      currentRole === role
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {roleLabels[role]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active User Avatar / Label (clickable to open profile) */}
            <button
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-2 pl-2 hover:opacity-80 transition-opacity"
              title="View my profile"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                {currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-medium text-slate-900 leading-tight">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 leading-tight">{currentUser.rank}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
