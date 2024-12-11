import type { useLocation } from 'react-router';

export function getRedirectPath(
  location: ReturnType<typeof useLocation>,
  redirectPath: string,
  searchParams: URLSearchParams,
) {
  // Check if the `redirect` query parameter already exists
  const existingRedirectPath = searchParams.get('redirect');
  if (existingRedirectPath) {
    return existingRedirectPath;
  }

  // Construct the redirect path dynamically
  const redirectParam = new URLSearchParams({
    // location.search is for different search params
    redirect: `${location.pathname}${location.search || ''}`,
  }).toString();
  const redirectFullPath = `${redirectPath}?${redirectParam}`;

  return redirectFullPath;
}
