import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
  ShieldCheck,
  Sparkles,
  WifiOff,
  ArrowUpRight,
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
  const isStaff = role === 'cry_staff';
  const navItems = isStaff ? STAFF_NAV_ITEMS : NGO_NAV_ITEMS;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Mobile close header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between lg:hidden">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Workspace Menu
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Context Banner Card */}
          <div className="p-4 mx-3 mt-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1 shadow-2xs">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isStaff ? 'bg-blue-600' : 'bg-[#2E7D32]'
                }`}
              />
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                {isStaff ? 'CRY National Portfolio' : 'Grassroots Partner'}
              </span>
            </div>
            <div className="font-bold text-xs text-[#172033] truncate">
              {user?.organization || (isStaff ? 'Child Rights and You' : 'Partner NGO')}
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              Role: <strong>{user?.roleLabel || (isStaff ? 'CRY Staff' : 'Partner NGO')}</strong>
            </div>
          </div>

          {/* Nav Items List */}
          <div className="p-3 space-y-1 mt-2">
            <span className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
              Main Navigation
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? isStaff
                          ? 'bg-blue-50 text-blue-800 shadow-2xs border-l-4 border-blue-600'
                          : 'bg-emerald-50 text-emerald-800 shadow-2xs border-l-4 border-[#2E7D32]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Offline Spotlight Footer Card */}
        <div className="p-3 border-t border-slate-100">
          <div className="p-3.5 rounded-2xl bg-teal-50/90 border border-teal-200/90 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 flex items-center gap-1">
                <WifiOff className="w-3.5 h-3.5 text-[#0F766E]" /> Field Mode
              </span>
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-teal-900 leading-snug">
              Inspect bridge schools & vouchers offline with IndexedDB.
            </p>
            <Link
              to="/field-visit/fv-101/offline"
              onClick={() => onClose && onClose()}
              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold shadow-2xs transition-colors"
            >
              <span>Launch Field Mode</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
