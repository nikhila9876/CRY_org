import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Bell,
  Wifi,
  WifiOff,
  ChevronDown,
  User,
  LogOut,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import { useAuth, DEMO_USERS } from '../../context/AuthContext';

export default function Navbar({ onMenuClick }) {
  const { user, role, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);

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
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-20 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
      {/* Left: Mobile hamburger & Brand */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to={role === 'cry_staff' ? '/staff/dashboard' : '/ngo/dashboard'} className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2E7D32] text-white flex items-center justify-center font-black text-base shadow-xs">
            C
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-[#172033] leading-tight">
              NGO<span className="text-[#2E7D32]">360</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide">
              CRY Field & Compliance
            </span>
          </div>
        </Link>
      </div>

      {/* Right Actions: Role Switcher, Offline simulator, Notifications, Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Quick Role Switcher (Ideal for evaluators and pair-programming reviews) */}
        <div className="relative" ref={roleRef}>
          <button
            type="button"
            onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
            title="Switch demo role"
          >
            {role === 'cry_staff' ? (
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            ) : (
              <Building2 className="w-3.5 h-3.5 text-[#2E7D32]" />
            )}
            <span className="hidden md:inline">Role:</span>
            <span className="font-bold text-[#172033]">{user?.roleLabel || 'Select Role'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {roleSwitcherOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Switch Role Context
              </div>
              {Object.entries(DEMO_USERS).map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleRoleChange(key)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                    role === key ? 'bg-emerald-50/70 font-semibold text-emerald-900' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                      {config.avatar}
                    </span>
                    <div>
                      <div className="font-medium text-slate-800">{config.roleLabel}</div>
                      <div className="text-[10px] text-slate-400">{config.name}</div>
                    </div>
                  </div>
                  {role === key && <span className="text-xs text-emerald-600 font-bold">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <Link
          to={notificationsRoute}
          className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
        </Link>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            aria-label="User profile menu"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2E7D32] to-emerald-400 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {user?.avatar || 'U'}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#172033] leading-none">{user?.name}</span>
              <span className="text-[10px] text-slate-400 leading-none mt-1">{user?.ngoName}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-800">{user?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                <span className="mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {user?.roleLabel}
                </span>
              </div>
              <div className="py-1">
                {role === 'ngo_member' && (
                  <Link
                    to="/ngo/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>NGO Profile</span>
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
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
