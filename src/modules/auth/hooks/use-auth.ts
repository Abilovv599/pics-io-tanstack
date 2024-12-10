import { useTokenStore } from '@/store/token';

export const useAuth = () => {
  const accessToken = useTokenStore((state) => state.accessToken);
  const resetStore = useTokenStore((state) => state.resetStore);

  const isAuthenticated = () => Boolean(accessToken);

  function logout() {
    resetStore();
    window.location.href = '/auth/login';
  }

  return { isAuthenticated, accessToken, logout };
};
