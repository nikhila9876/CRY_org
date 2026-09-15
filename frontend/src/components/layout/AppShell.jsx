import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNavigation from './MobileNavigation';
import OfflineBanner from '../common/OfflineBanner';

/**
 * AppShell: Top-level layout framing for desktop, tablet, and mobile.
 * Implements Section 11 & 12 of NGO360 specification.
 */
export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033] flex flex-col antialiased">
      {/* Network & Offline Status Banner */}
      <OfflineBanner />

      {/* Main App Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Role-Aware Desktop & Tablet Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Primary Content Column */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Navbar */}
          <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

          {/* Main Route View Outlet */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 md:pb-8">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
}
