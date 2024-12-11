import { useTokenStore } from '@/store/token';
import { useNavigate } from 'react-router';

export const useAuth = () => {
  const isAuthenticated = useTokenStore((state) => !!state.accessToken);
  const resetStore = useTokenStore((state) => state.resetStore);
  const navigate = useNavigate();

  function logout() {
    resetStore();
    navigate('/auth/login', { replace: true });
  }

  return { isAuthenticated, logout };
};
