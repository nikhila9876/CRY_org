import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import AppShell from './components/layout/AppShell';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';
import SkeletonLoader from './components/common/SkeletonLoader';

// Public pages - code-split with lazy loading
const Login = lazy(() => import('./pages/public/Login'));
const Forbidden403 = lazy(() => import('./pages/public/Forbidden403'));
const NotFound404 = lazy(() => import('./pages/public/NotFound404'));

// Staff pages - code-split with lazy loading
const StaffDashboard = lazy(() => import('./pages/staff/StaffDashboard'));
const StaffNgoList = lazy(() => import('./pages/staff/StaffNgoList'));
const StaffNgoDetail = lazy(() => import('./pages/staff/StaffNgoDetail'));
const StaffProjects = lazy(() => import('./pages/staff/StaffProjects'));
const StaffTimeline = lazy(() => import('./pages/staff/StaffTimeline'));
const StaffDocuments = lazy(() => import('./pages/staff/StaffDocuments'));
const StaffFieldVisits = lazy(() => import('./pages/staff/StaffFieldVisits'));
const StaffNotifications = lazy(() => import('./pages/staff/StaffNotifications'));

// NGO pages - code-split with lazy loading
const NgoDashboard = lazy(() => import('./pages/ngo/NgoDashboard'));
const NgoTasks = lazy(() => import('./pages/ngo/NgoTasks'));
const NgoProjects = lazy(() => import('./pages/ngo/NgoProjects'));
const NgoDocuments = lazy(() => import('./pages/ngo/NgoDocuments'));
const NgoFieldVisits = lazy(() => import('./pages/ngo/NgoFieldVisits'));
const NgoNotifications = lazy(() => import('./pages/ngo/NgoNotifications'));
const NgoProfile = lazy(() => import('./pages/ngo/NgoProfile'));

// Offline Field Visit Mode
const OfflineFieldVisit = lazy(() => import('./pages/offline/OfflineFieldVisit'));

function RouteLoadingFallback() {
  return (
    <div className="space-y-4 max-w-6xl mx-auto p-4 sm:p-6" role="status" aria-label="Loading page">
      <SkeletonLoader variant="metric" count={1} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonLoader variant="card" count={2} />
      </div>
    </div>
  );
}

function RootIndexRedirect() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role === 'cry_staff') return <Navigate to="/staff/dashboard" replace />;
  return <Navigate to="/ngo/dashboard" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteLoadingFallback />}>
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

                {/* Offline Field Visit Mode (Accessible by Staff and NGO field workers) */}
                <Route path="field-visit/:id/offline" element={<OfflineFieldVisit />} />
              </Route>

              {/* 404 Catch-all */}
              <Route path="*" element={<NotFound404 />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
