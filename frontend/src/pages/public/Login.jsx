import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = (role) => {
    login(role);
    navigate(role === 'cry_staff' ? '/staff/dashboard' : '/ngo/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-[#172033] mb-4">NGO360 Login</h1>
        <p className="text-sm text-slate-500 mb-6">Select a demo role to access the workspace:</p>
        <div className="space-y-3">
          <button
            onClick={() => handleQuickLogin('cry_staff')}
            className="w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700"
          >
            Login as CRY Staff
          </button>
          <button
            onClick={() => handleQuickLogin('ngo_member')}
            className="w-full py-2.5 px-4 rounded-lg bg-[#2E7D32] text-white font-medium text-sm hover:bg-[#1B5E20]"
          >
            Login as Partner NGO Member
          </button>
        </div>
      </div>
    </div>
  );
}
