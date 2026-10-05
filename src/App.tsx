import React, { useState } from 'react';
import { StoreProvider, useStore } from './services/storeContext';
import { EthicalBanner } from './components/common/EthicalBanner';
import { Navbar } from './components/layout/Navbar';
import { RoleNavigation } from './components/layout/RoleNavigation';
import { AppSidebar } from './components/layout/AppSidebar';
import { Footer } from './components/layout/Footer';
import { OTPModal } from './components/common/OTPModal';
import { RequestSupportModal } from './components/common/RequestSupportModal';
import { ProfileModal } from './components/common/ProfileModal';
import { LogoutModal } from './components/common/LogoutModal';

import { StructuredDashboard } from './components/dashboard/StructuredDashboard';
import { PersonnelDashboard } from './components/personnel/PersonnelDashboard';
import { PersonalWelfareTwinView } from './components/personnel/PersonalWelfareTwinView';
import { SelfAssessmentView } from './components/personnel/SelfAssessmentView';
import { WellnessJourneyView } from './components/personnel/WellnessJourneyView';
import { TalkToTwinView } from './components/personnel/TalkToTwinView';

import { WelfareIntelligenceView } from './components/officer/WelfareIntelligenceView';
import { CasesView } from './components/officer/CasesView';
import { CounselingView } from './components/officer/CounselingView';
import { FollowUpsView } from './components/officer/FollowUpsView';

import { CommanderDashboard } from './components/commander/CommanderDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ResearchView } from './components/research/ResearchView';

const MainAppContent: React.FC = () => {
  const { activeView, setActiveView, currentRole, isSidebarOpen } = useStore();
  const [isSupportModalOpen, setIsSupportModalOpen] = useState<boolean>(false);

  const renderActiveView = () => {
    // Cross-cutting views
    if (activeView === 'research-sources') {
      return <ResearchView />;
    }

    // Role-specific view routing
    switch (currentRole) {
      case 'personnel':
        switch (activeView) {
          case 'personnel-checkin':
            return <SelfAssessmentView />;
          case 'personnel-journey':
            return <WellnessJourneyView />;
          case 'personnel-chat':
            return <TalkToTwinView onOpenSupportModal={() => setIsSupportModalOpen(true)} />;
          case 'personnel-welfare-twin':
            return <PersonalWelfareTwinView onOpenSupportModal={() => setIsSupportModalOpen(true)} />;
          case 'personnel-dashboard':
          default:
            return (
              <StructuredDashboard
                onOpenSupportModal={() => setIsSupportModalOpen(true)}
                onNavigateToTab={(tabId) => setActiveView(tabId)}
              />
            );
        }

      case 'welfare_officer':
        switch (activeView) {
          case 'officer-cases':
            return <CasesView />;
          case 'officer-counseling':
            return <CounselingView />;
          case 'officer-followups':
            return <FollowUpsView />;
          case 'welfare-intelligence':
          default:
            return <WelfareIntelligenceView />;
        }

      case 'commander':
        return <CommanderDashboard />;

      case 'admin':
        return <AdminDashboard />;

      default:
        return <PersonnelDashboard onOpenSupportModal={() => setIsSupportModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col text-slate-900 selection:bg-slate-200">
      {/* Global RBAC Sidebar */}
      <AppSidebar onOpenSupportModal={() => setIsSupportModalOpen(true)} />

      {/* Main Content Area that reflows naturally when sidebar opens on desktop */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:pl-72 sm:lg:pl-80' : 'lg:pl-0'
        }`}
      >
        <EthicalBanner />
        <Navbar onOpenSupportModal={() => setIsSupportModalOpen(true)} />
        <RoleNavigation onOpenSupportModal={() => setIsSupportModalOpen(true)} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderActiveView()}
        </main>

        <Footer />
      </div>

      {/* Modals */}
      <OTPModal />
      <ProfileModal />
      <LogoutModal />
      <RequestSupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
