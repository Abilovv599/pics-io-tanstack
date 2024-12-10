import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

export function GuardedRoute({
  isAllowed,
  redirectPath,
  children,
}: {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
}) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
