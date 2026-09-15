import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function NotFound404() {
  const { role } = useAuth();
  const returnPath = role === 'cry_staff' ? '/staff/dashboard' : '/ngo/dashboard';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-5 border border-blue-200 shadow-xs">
          <HelpCircle className="w-9 h-9" />
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-2">
          HTTP 404
        </span>
        <h1 className="text-2xl font-bold text-[#172033] mb-2">Page Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">
          The requested address could not be found or has been relocated within the NGO360 workspace.
        </p>

        <Link
          to={returnPath}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-semibold transition-colors shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
