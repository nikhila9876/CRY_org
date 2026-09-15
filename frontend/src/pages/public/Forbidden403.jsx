import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Forbidden403() {
  const { role, user } = useAuth();
  const returnPath = role === 'cry_staff' ? '/staff/dashboard' : '/ngo/dashboard';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center mb-5 border border-rose-200 shadow-xs">
          <ShieldAlert className="w-9 h-9" />
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 mb-2">
          HTTP 403 Forbidden
        </span>
        <h1 className="text-2xl font-bold text-[#172033] mb-2">Access Restricted</h1>
        <p className="text-sm text-slate-500 mb-6">
          Your current account role (<span className="font-semibold text-slate-700">{user?.roleLabel || 'Guest'}</span>) does not have authorization to view this administrative resource.
        </p>

        <div className="space-y-3">
          <Link
            to={returnPath}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-semibold transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Your Dashboard</span>
          </Link>

          <Link
            to="/login"
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Switch User Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
