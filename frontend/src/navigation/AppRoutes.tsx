import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../contexts/AuthContext';
import RequireAuth from '../components/auth/RequireAuth';

// Pages
import LoginScreen from '../screens/LoginScreen';
import AdminDashboard from '../screens/admin/AdminDashboard';
import UsersPage from '../screens/admin/UsersPage';
import ToursPage from '../screens/admin/ToursPage';
import TicketsPage from '../screens/admin/TicketsPage';
import PaymentsPage from '../screens/admin/PaymentsPage';
import ReportsPage from '../screens/admin/ReportsPage';

const AppRoutes: React.FC = () => {
  const auth = useRecoilValue(authState);

  if (auth.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAuth allowedRoles={['admin']}>
            <AdminDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireAuth allowedRoles={['admin']}>
            <UsersPage />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/tours"
        element={
          <RequireAuth allowedRoles={['admin']}>
            <ToursPage />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/tickets"
        element={
          <RequireAuth allowedRoles={['admin']}>
            <TicketsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/payments"
        element={
          <RequireAuth allowedRoles={['admin']}>
            <PaymentsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <RequireAuth allowedRoles={['admin']}>
            <ReportsPage />
          </RequireAuth>
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes; 