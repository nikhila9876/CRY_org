import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNavigation from './MobileNavigation';
import OfflineBanner from '../common/OfflineBanner';
import AIAssistantDrawer from '../ai/AIAssistantDrawer';
import { Sparkles } from 'lucide-react';

/**
 * AppShell: Top-level layout framing for desktop, tablet, and mobile.
 * Implements Section 11 & 12 of NGO360 specification.
 */
export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033] flex flex-col antialiased">
      {/* Accessible Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

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
          <main
            id="main-content"
            tabIndex="-1"
            className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 md:pb-8 focus:outline-none"
          >
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation />

      {/* Floating AI Assistant Trigger */}
      <button
        type="button"
        onClick={() => setAiDrawerOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-700 hover:bg-purple-800 text-white shadow-lg hover:shadow-purple-500/25 text-xs font-bold transition-all animate-in zoom-in-95 cursor-pointer"
        aria-label="Open AI Compliance Assistant"
      >
        <Sparkles className="w-4 h-4 text-purple-200" />
        <span className="hidden sm:inline">AI Compliance Copilot</span>
        <span className="sm:hidden">AI</span>
      </button>

      {/* Global AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
      />
    </div>
  );
}
