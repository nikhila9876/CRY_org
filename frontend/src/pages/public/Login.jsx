import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  WifiOff,
} from 'lucide-react';
import { useAuth, DEMO_USERS } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedRole, setSelectedRole] = useState('cry_staff');
  const [email, setEmail] = useState(DEMO_USERS.cry_staff.email);
  const [password, setPassword] = useState('CRY@compliance2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setEmail(DEMO_USERS[roleKey].email);
    setPassword(roleKey === 'cry_staff' ? 'CRY@staff2026' : 'NGO@partner2026');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(selectedRole);
      setIsLoading(false);
      const destination = selectedRole === 'cry_staff' ? '/staff/dashboard' : '/ngo/dashboard';
      const redirectTarget = location.state?.from?.pathname || destination;
      navigate(redirectTarget, { replace: true });
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2E7D32] to-emerald-500 text-white flex items-center justify-center font-black text-2xl mx-auto shadow-md mb-3">
          C
        </div>
        <h2 className="text-3xl font-black tracking-tight text-[#172033]">
          NGO<span className="text-[#2E7D32]">360</span>
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          CRY Project Monitoring, Compliance & Field Operations
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-[#E2E8F0] shadow-sm">
          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Select Your Role Context
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => handleRoleSelect('cry_staff')}
                className={`flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === 'cry_staff'
                    ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>CRY Staff</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('ngo_member')}
                className={`flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === 'ngo_member'
                    ? 'bg-white text-[#2E7D32] shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>Partner NGO</span>
              </button>
            </div>

            {/* Quick Helper Pill */}
            <div className="mt-2.5 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-center justify-between">
              <span>Demo Account:</span>
              <span className="font-semibold text-slate-800">
                {DEMO_USERS[selectedRole]?.name} ({DEMO_USERS[selectedRole]?.ngoName})
              </span>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {errorMessage}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent text-slate-900"
                  placeholder="name@organization.org"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-10 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#2E7D32] focus:ring-[#2E7D32] w-3.5 h-3.5"
                />
                <span className="ml-2">Remember credentials</span>
              </label>
              <span className="text-xs text-slate-400 cursor-not-allowed">Forgot password?</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg font-semibold text-sm text-white transition-all shadow-xs ${
                selectedRole === 'cry_staff'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-[#2E7D32] hover:bg-[#1B5E20]'
              }`}
            >
              {isLoading ? (
                <span className="inline-block animate-spin mr-2">⟳</span>
              ) : (
                <>
                  <span>Sign In as {selectedRole === 'cry_staff' ? 'Staff' : 'Partner NGO'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-seed Access Box */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Quick Role Switch (Instant Demo Access)
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  login('cry_staff');
                  navigate('/staff/dashboard');
                }}
                className="p-2 rounded-lg border border-blue-200 bg-blue-50/70 text-blue-800 text-left hover:bg-blue-100 transition-colors"
              >
                <div className="font-bold">🛡️ CRY Staff</div>
                <div className="text-[10px] text-blue-600 truncate">Priya Sharma</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  login('ngo_member');
                  navigate('/ngo/dashboard');
                }}
                className="p-2 rounded-lg border border-emerald-200 bg-emerald-50/70 text-emerald-800 text-left hover:bg-emerald-100 transition-colors"
              >
                <div className="font-bold">🤝 Partner NGO</div>
                <div className="text-[10px] text-emerald-600 truncate">Bachpan Bachao</div>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Footer */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <span className="text-[10px] font-semibold text-slate-700 block">Compliance Tracker</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <WifiOff className="w-4 h-4 text-teal-600 mx-auto mb-1" />
            <span className="text-[10px] font-semibold text-slate-700 block">Offline Field Visits</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <Sparkles className="w-4 h-4 text-purple-600 mx-auto mb-1" />
            <span className="text-[10px] font-semibold text-slate-700 block">AI Document Check</span>
          </div>
        </div>
      </div>
    </div>
  );
}
