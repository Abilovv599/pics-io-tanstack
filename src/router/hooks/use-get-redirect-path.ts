import { useSearchParams } from 'react-router';

export function useGetRedirectPath(redirectPath: string) {
  const [searchParams] = useSearchParams();

  // Check if the `redirect` query parameter already exists
  const existingRedirectPath = searchParams.get('redirect');
  if (existingRedirectPath) {
    return existingRedirectPath;
  }

  if (location.pathname === redirectPath) {
    return `${redirectPath}${location.search}`;
  }

  // Construct the redirect path dynamically
  const redirectParam = new URLSearchParams({
    // location.search is for different search params
    redirect: `${location.pathname}${location.search || ''}`,
  }).toString();

  const redirectFullPath = `${redirectPath}?${redirectParam}`;

  return redirectFullPath;
}
