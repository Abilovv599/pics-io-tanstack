import { useTokenStore } from '@/store/token';

export const useAuth = () => {
  const isAuthenticated = useTokenStore((state) => !!state.accessToken);
  const resetStore = useTokenStore((state) => state.resetStore);

  function logout() {
    resetStore();
    location.href = '/auth/login';
  }

  return { isAuthenticated, logout };
};
