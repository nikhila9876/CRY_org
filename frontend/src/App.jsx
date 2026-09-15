import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppShell from './components/layout/AppShell';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';

// Public pages
import Login from './pages/public/Login';
import Forbidden403 from './pages/public/Forbidden403';
import NotFound404 from './pages/public/NotFound404';

// Staff pages
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffNgoList from './pages/staff/StaffNgoList';
import StaffNgoDetail from './pages/staff/StaffNgoDetail';
import StaffProjects from './pages/staff/StaffProjects';
import StaffTimeline from './pages/staff/StaffTimeline';
import StaffDocuments from './pages/staff/StaffDocuments';
import StaffFieldVisits from './pages/staff/StaffFieldVisits';
import StaffNotifications from './pages/staff/StaffNotifications';

// NGO pages
import NgoDashboard from './pages/ngo/NgoDashboard';
import NgoTasks from './pages/ngo/NgoTasks';
import NgoProjects from './pages/ngo/NgoProjects';
import NgoDocuments from './pages/ngo/NgoDocuments';
import {
  NgoFieldVisits,
  NgoNotifications,
  NgoProfile,
} from './pages/ngo/NgoPagesBundle';

// Offline Field Visit
import OfflineFieldVisit from './pages/offline/OfflineFieldVisit';

function RootIndexRedirect() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role === 'cry_staff') return <Navigate to="/staff/dashboard" replace />;
  return <Navigate to="/ngo/dashboard" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/403" element={<Forbidden403 />} />

          {/* Authenticated Workspace wrapped in AppShell */}
          <Route
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            {/* Root smart redirect */}
            <Route index element={<RootIndexRedirect />} />

            {/* CRY Staff Routes (Guarded: CRY Staff only) */}
            <Route
              path="staff/dashboard"
              element={
                <RoleGuard allowedRoles={['cry_staff']}>
                  <StaffDashboard />
                </RoleGuard>
              }
            />
            <Route
              path="staff/ngos"
              element={
                <RoleGuard allowedRoles={['cry_staff']}>
                  <StaffNgoList />
                </RoleGuard>
              }
            />
            <Route
              path="staff/ngos/:id"
              element={
                <RoleGuard allowedRoles={['cry_staff']}>
                  <StaffNgoDetail />
                </RoleGuard>
              }
            />
            <Route
              path="staff/projects"
              element={
                <RoleGuard allowedRoles={['cry_staff']}>
                  <StaffProjects />
                </RoleGuard>
              }
            />
            <Route
              path="staff/timeline"
              element={
                <RoleGuard allowedRoles={['cry_staff']}>
                  <StaffTimeline />
                </RoleGuard>
              }
            />
            <Route
              path="staff/documents"
              element={
                <RoleGuard allowedRoles={['cry_staff']}>
                  <StaffDocuments />
                </RoleGuard>
              }
            />
            <Route
              path="staff/field-visits"
              element={
                <RoleGuard allowedRoles={['cry_staff']}>
                  <StaffFieldVisits />
                </RoleGuard>
              }
            />
            <Route
              path="staff/notifications"
              element={
                <RoleGuard allowedRoles={['cry_staff']}>
                  <StaffNotifications />
                </RoleGuard>
              }
            />

            {/* Partner NGO Routes (Guarded: NGO Member & NGO Admin only) */}
            <Route
              path="ngo/dashboard"
              element={
                <RoleGuard allowedRoles={['ngo_member', 'ngo_admin']}>
                  <NgoDashboard />
                </RoleGuard>
              }
            />
            <Route
              path="ngo/tasks"
              element={
                <RoleGuard allowedRoles={['ngo_member', 'ngo_admin']}>
                  <NgoTasks />
                </RoleGuard>
              }
            />
            <Route
              path="ngo/projects"
              element={
                <RoleGuard allowedRoles={['ngo_member', 'ngo_admin']}>
                  <NgoProjects />
                </RoleGuard>
              }
            />
            <Route
              path="ngo/documents"
              element={
                <RoleGuard allowedRoles={['ngo_member', 'ngo_admin']}>
                  <NgoDocuments />
                </RoleGuard>
              }
            />
            <Route
              path="ngo/field-visits"
              element={
                <RoleGuard allowedRoles={['ngo_member', 'ngo_admin']}>
                  <NgoFieldVisits />
                </RoleGuard>
              }
            />
            <Route
              path="ngo/notifications"
              element={
                <RoleGuard allowedRoles={['ngo_member', 'ngo_admin']}>
                  <NgoNotifications />
                </RoleGuard>
              }
            />
            <Route
              path="ngo/profile"
              element={
                <RoleGuard allowedRoles={['ngo_member', 'ngo_admin']}>
                  <NgoProfile />
                </RoleGuard>
              }
            />

            {/* Offline Field Visit Mode (Accessible by both Staff and NGO field workers) */}
            <Route path="field-visit/:id/offline" element={<OfflineFieldVisit />} />
          </Route>

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
