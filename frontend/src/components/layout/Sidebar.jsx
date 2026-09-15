import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  FileCheck,
  MapPin,
  Bell,
  CheckSquare,
  Calendar,
  FileText,
  Building,
  Radio,
  X,
  ShieldAlert,
  Sparkles,
  WifiOff,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const STAFF_NAV_ITEMS = [
  { name: 'Staff Dashboard', path: '/staff/dashboard', icon: LayoutDashboard },
  { name: 'Partner NGOs', path: '/staff/ngos', icon: Building2 },
  { name: 'Project Monitoring', path: '/staff/projects', icon: FolderKanban },
  { name: 'Document Reviews', path: '/staff/documents', icon: FileCheck },
  { name: 'Field Visits', path: '/staff/field-visits', icon: MapPin },
  { name: 'Alerts & Notices', path: '/staff/notifications', icon: Bell },
];

const NGO_NAV_ITEMS = [
  { name: 'NGO Dashboard', path: '/ngo/dashboard', icon: LayoutDashboard },
  { name: 'My Tasks', path: '/ngo/tasks', icon: CheckSquare },
  { name: 'Project Timeline', path: '/ngo/projects', icon: Calendar },
  { name: 'Documents & Filing', path: '/ngo/documents', icon: FileText },
  { name: 'Field Visits', path: '/ngo/field-visits', icon: MapPin },
  { name: 'Notifications', path: '/ngo/notifications', icon: Bell },
  { name: 'NGO Profile', path: '/ngo/profile', icon: Building },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, role } = useAuth();
  const location = useLocation();

  const navItems = role === 'cry_staff' ? STAFF_NAV_ITEMS : NGO_NAV_ITEMS;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#E2E8F0] flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Mobile Sidebar Header */}
          <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between lg:hidden">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded bg-[#2E7D32] text-white flex items-center justify-center font-bold text-sm">
                C
              </div>
              <span className="font-bold text-sm text-[#172033]">NGO360 Menu</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Indicator Banner */}
          <div className="p-4 pb-2">
            <div
              className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center space-x-2 ${
                role === 'cry_staff'
                  ? 'bg-blue-50/80 border-blue-200 text-blue-900'
                  : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <div className="truncate">
                <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Current Role</div>
                <div className="truncate">{user?.roleLabel || 'Guest'}</div>
              </div>
            </div>
          </div>

          {/* Main Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 pt-2 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {role === 'cry_staff' ? 'Staff Operations' : 'NGO Workflows'}
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? role === 'cry_staff'
                        ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                        : 'bg-emerald-50 text-[#2E7D32] font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? role === 'cry_staff'
                          ? 'text-blue-600'
                          : 'text-[#2E7D32]'
                        : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              );
            })}

            {/* Offline Mode Feature Spotlight */}
            <div className="pt-4 px-1">
              <div className="px-2 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Remote Field Tool
              </div>
              <NavLink
                to="/field-visit/fv-101/offline"
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                  location.pathname.includes('/offline')
                    ? 'bg-teal-50 border-teal-300 text-teal-800'
                    : 'bg-teal-50/50 border-teal-200/70 text-teal-700 hover:bg-teal-100/60'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <WifiOff className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Offline Field Mode</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-teal-600 text-white">
                  PWA
                </span>
              </NavLink>
            </div>
          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-[#E2E8F0] bg-slate-50/50">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
            <span className="font-medium text-slate-600">CRY India Partner System</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Compliant with FCRA & 10B
          </div>
        </div>
      </aside>
    </>
  );
}
