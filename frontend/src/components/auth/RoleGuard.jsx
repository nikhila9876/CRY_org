import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * RoleGuard: Enforces role boundaries between CRY Staff and Partner NGOs.
 * Strictly prevents unauthorized cross-role access (e.g., NGO accessing staff admin).
 */
export default function RoleGuard({ allowedRoles, children }) {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
