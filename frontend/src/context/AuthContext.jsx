import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../mock/data/mockUsers';

export const DEMO_USERS = {
  cry_staff: MOCK_USERS[0],
  ngo_member: MOCK_USERS[1],
  ngo_admin: MOCK_USERS[2],
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ngo360_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return DEMO_USERS.cry_staff;
  });

  const [token, setToken] = useState(() => localStorage.getItem('ngo360_token') || 'mock-jwt-token-12345');

  useEffect(() => {
    if (user) {
      localStorage.setItem('ngo360_user', JSON.stringify(user));
      localStorage.setItem('ngo360_role', user.role);
    } else {
      localStorage.removeItem('ngo360_user');
      localStorage.removeItem('ngo360_role');
    }
  }, [user]);

  const login = (roleKey = 'cry_staff') => {
    const selected = DEMO_USERS[roleKey] || DEMO_USERS.cry_staff;
    setUser(selected);
    const mockToken = `mock-jwt-${roleKey}-${Date.now()}`;
    setToken(mockToken);
    localStorage.setItem('ngo360_token', mockToken);
    return selected;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ngo360_token');
    localStorage.removeItem('ngo360_user');
    localStorage.removeItem('ngo360_role');
  };

  const switchRole = (newRoleKey) => {
    return login(newRoleKey);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        token,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * usePermissions: Granular access control hook for UI actions
 */
export function usePermissions() {
  const { role } = useAuth();

  return {
    isStaff: role === 'cry_staff',
    isNgo: role === 'ngo_member' || role === 'ngo_admin',
    isNgoAdmin: role === 'ngo_admin',
    canReviewDocuments: role === 'cry_staff',
    canScheduleVisits: role === 'cry_staff',
    canUploadDocuments: role === 'ngo_member' || role === 'ngo_admin',
    canSubmitFieldReports: true,
    canManageNgoUsers: role === 'ngo_admin',
    canAccessStaffControls: role === 'cry_staff',
  };
}
