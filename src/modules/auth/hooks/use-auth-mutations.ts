import { useMutation } from '@tanstack/react-query';
import { useTokenStore } from '@/store/token';
import { useNavigate } from 'react-router';
import { AuthService } from '@/modules/auth/services/auth';
import type { HttpBodyOrParams } from '@/lib/http-client';
import type { ILoginRequest, ILoginResponse } from '@/app/models/user';
import type { AxiosError } from 'axios';

export function useLoginMutation() {
  const setToken = useTokenStore((state) => state.setToken);

  const navigate = useNavigate();

  return useMutation<ILoginResponse, AxiosError, HttpBodyOrParams<ILoginRequest>>({
    mutationKey: ['login'],
    mutationFn: (credentials) => AuthService.getInstance().login(credentials),
    onSuccess: async ({ accessToken }) => {
      setToken(accessToken);
      await navigate('/');
    },
    onError: (error) => {
      console.error('Login error:', error.message);
    },
  });
}
