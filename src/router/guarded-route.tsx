import type { ReactNode } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router';
import { getRedirectPath } from './utils/get-redirect-path';

interface IGuardedRoute {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
}

export function GuardedRoute({ isAllowed, redirectPath, children }: IGuardedRoute) {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  if (!isAllowed) {
    const redirectFullPath = getRedirectPath(location, redirectPath, searchParams);

    return <Navigate to={redirectFullPath} replace />;
  }

  return <>{children}</>;
}
