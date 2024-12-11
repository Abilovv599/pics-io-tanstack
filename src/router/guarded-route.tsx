import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useGetRedirectPath } from './hooks/use-get-redirect-path';

interface IGuardedRoute {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
}

export function GuardedRoute({ isAllowed, redirectPath, children }: IGuardedRoute) {
  const redirectFullPath = useGetRedirectPath(redirectPath);
  if (!isAllowed) {
    return <Navigate to={redirectFullPath} replace />;
  }

  return <>{children}</>;
}
