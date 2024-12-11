import type { ReactNode } from 'react';
import { Navigate, useSearchParams } from 'react-router';

export function GuardedRoute({
  isAllowed,
  redirectPath,
  children,
}: {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
}) {
  const [searchParams] = useSearchParams();
  if (!isAllowed) {
    // Check if the `redirect` query parameter already exists
    const existingRedirectPath = searchParams.get('redirect');
    if (existingRedirectPath) {
      return <Navigate to={existingRedirectPath} replace />;
    }

    // Construct the redirect path dynamically
    const redirectParam = new URLSearchParams({
      // location.search is for different search params
      redirect: `${location.pathname}${location.search || ''}`,
    }).toString();
    const redirectFullPath = `${redirectPath}?${redirectParam}`;

    return <Navigate to={redirectFullPath} replace />;
  }

  return <>{children}</>;
}
