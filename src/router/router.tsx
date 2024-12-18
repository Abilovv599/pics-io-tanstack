import { Route, Routes } from 'react-router';

import { useAuth } from '@/modules/auth/hooks/use-auth';
import { GuardedRoute } from './guarded-route';

import { AuthLayout } from '@/modules/auth/layouts/auth';
import { LoginPage } from '@/modules/auth/pages/login';

import { BaseLayout } from '@/modules/dashboard/layouts/base/layout';
import { CommentPage } from '@/modules/comments/pages/comment';
import { CommentsPage } from '@/modules/comments/pages/comments';
import { HomePage } from '@/modules/dashboard/pages/home';

import { NotFound } from '@/pages/not-found';

export function AppRouter() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      {/* Non Auth only! Routes */}
      <Route
        path="/auth"
        element={
          <GuardedRoute isAllowed={!isAuthenticated} redirectPath="/">
            <AuthLayout />
          </GuardedRoute>
        }
      >
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Private Routes */}
      <Route
        path="/"
        element={
          <GuardedRoute isAllowed={isAuthenticated} redirectPath="/auth/login">
            <BaseLayout />
          </GuardedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="comments" element={<CommentsPage />} />
        <Route path="comments/:id" element={<CommentPage />} />
      </Route>

      {/* Fallback for Undefined Routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
