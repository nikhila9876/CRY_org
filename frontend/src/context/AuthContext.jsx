import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEMO_USERS = {
  cry_staff: {
    id: 'user-staff-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@cry.org',
    role: 'cry_staff',
    roleLabel: 'CRY Staff / Frontliner',
    ngoName: 'CRY India - Regional Office',
    avatar: 'PS',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  ngo_member: {
    id: 'user-ngo-1',
    name: 'Aarav Patel',
    email: 'aarav@bachpanngo.org',
    role: 'ngo_member',
    roleLabel: 'Partner NGO Member',
    ngoName: 'Bachpan Bachao Trust',
    avatar: 'AP',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  ngo_admin: {
    id: 'user-admin-1',
    name: 'Sunita Roy',
    email: 'sunita@bachpanngo.org',
    role: 'ngo_admin',
    roleLabel: 'NGO Admin',
    ngoName: 'Bachpan Bachao Trust',
    avatar: 'SR',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
  },
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
    // Default to CRY Staff for initial preview
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
