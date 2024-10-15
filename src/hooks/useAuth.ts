import { useAuthStore } from '@/store/auth.ts';
import { isAuthenticated as checkIsAuthenticated } from '@/utils/auth.ts';
import { useNavigate } from '@tanstack/react-router';

export const useAuth = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const resetStore = useAuthStore((state) => state.resetStore);
  const isAuthenticated = checkIsAuthenticated();
  const navigate = useNavigate();

  async function logout() {
    localStorage.removeItem('accessToken');
    resetStore();
    await navigate({ to: '/login' });
  }

  return { isAuthenticated, accessToken, user, logout };
};
