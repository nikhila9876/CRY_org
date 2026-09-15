import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Bell,
  ChevronDown,
  User,
  LogOut,
  ShieldCheck,
  Building2,
  Sparkles,
  WifiOff,
  CheckCircle2,
} from 'lucide-react';
import { useAuth, DEMO_USERS } from '../../context/AuthContext';

export default function Navbar({ onMenuClick }) {
  const { user, role, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const profileRef = useRef(null);
  const roleRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setRoleSwitcherOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleChange = (roleKey) => {
    switchRole(roleKey);
    setRoleSwitcherOpen(false);
    if (roleKey === 'cry_staff') {
      navigate('/staff/dashboard');
    } else {
      navigate('/ngo/dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notificationsRoute = role === 'cry_staff' ? '/staff/notifications' : '/ngo/notifications';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
      {/* Left: Mobile hamburger & Brand */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link
          to={role === 'cry_staff' ? '/staff/dashboard' : '/ngo/dashboard'}
          className="flex items-center space-x-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center font-black text-lg shadow-xs group-hover:scale-105 transition-transform">
            C
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base tracking-tight text-[#172033] leading-none">
                NGO<span className="text-[#2E7D32]">360</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 hidden sm:inline">
                CRY India
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide mt-0.5">
              Operations & Compliance Platform
            </span>
          </div>
        </Link>
      </div>

      {/* Right Actions: Role Switcher, Notifications, Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Offline Quick Link Pill */}
        <Link
          to="/field-visit/fv-101/offline"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100/80 text-teal-800 border border-teal-200 text-xs font-bold transition-colors shadow-2xs"
          title="Open Offline Field Visit Mode"
        >
          <WifiOff className="w-3.5 h-3.5 text-[#0F766E]" />
          <span>Offline Field Mode</span>
        </Link>

        {/* Quick Role Switcher */}
        <div className="relative" ref={roleRef}>
          <button
            type="button"
            onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shadow-2xs ${
              role === 'cry_staff'
                ? 'bg-blue-50/70 border-blue-200 text-blue-900 hover:bg-blue-100'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
            }`}
            title="Switch demo role context"
          >
            {role === 'cry_staff' ? (
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            ) : (
              <Building2 className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
            )}
            <span className="font-black truncate max-w-[120px] sm:max-w-none">
              {user?.roleLabel || 'Select Role'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {roleSwitcherOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3.5 py-2 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Select Active User Context
              </div>
              {Object.entries(DEMO_USERS).map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleRoleChange(key)}
                  className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    role === key ? 'bg-emerald-50/70 font-semibold text-emerald-900' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                      {config.avatar}
                    </span>
                    <div>
                      <div className="font-bold text-slate-800">{config.roleLabel}</div>
                      <div className="text-[11px] text-slate-400">{config.name}</div>
                    </div>
                  </div>
                  {role === key && <span className="text-xs text-emerald-600 font-black">✓ Active</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Icon with Unread Indicator */}
        <Link
          to={notificationsRoute}
          className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Notifications & alerts"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
        </Link>

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center space-x-2 p-1 pl-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              {user?.avatar || 'U'}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-[#172033]">{user?.name || 'User'}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email || 'email@cry.org'}</p>
                <div className="mt-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {user?.organization || 'Child Rights and You'}
                  </span>
                </div>
              </div>

              <div className="py-1">
                <Link
                  to={role === 'cry_staff' ? '/staff/dashboard' : '/ngo/profile'}
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Profile & Preferences</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
