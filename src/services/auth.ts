import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ILoginRequest, ILoginResponse, IUser } from '@/models/user';
import { useAuthStore } from '@/store/auth';
import { HttpClient } from '@/api/http-client';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import type { HttpBodyOrParams } from '@/api/types';

// Login Mutation
export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const setAuthToken = useAuthStore((state) => state.setAuthToken);

  const navigate = useNavigate();

  return useMutation<ILoginResponse, AxiosError, HttpBodyOrParams<ILoginRequest>>({
    mutationKey: ['login'],
    mutationFn: async (credentials) => {
      const { data } = await HttpClient.getInstance().post<ILoginResponse>(
        'auth/login',
        credentials,
      );
      return data;
    },
    onSuccess: async ({ accessToken }) => {
      // Store the token in local storage and update Redux (or any state management)
      localStorage.setItem('accessToken', accessToken);
      queryClient.setQueryData(['accessToken'], accessToken);
      setAuthToken(accessToken);
      await navigate({ to: '/' });
    },
    onError: (error) => {
      console.error('Login error:', error.message);
    },
  });
};

// Get Me Query
export const useGetMeQuery = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const resetStore = useAuthStore((state) => state.resetStore);

  const navigate = useNavigate();

  return useQuery<IUser | undefined, AxiosError>({
    queryKey: ['getMe'],
    queryFn: async () => {
      try {
        const { data } = await HttpClient.getInstance().get<IUser>('auth/me');
        setUser(data);
        return data;
      } catch (error) {
        const { status } = error as AxiosError;
        // Handle error, check if the error is a 401 Unauthorized
        if (status === 401) {
          // Token expired, reset the store and redirect to log in
          resetStore(); // Clear token in Redux or state
          localStorage.removeItem('accessToken'); // Remove token from localStorage
          await navigate({ to: '/login' }); // Redirect to login page
        }
      }
    },
  });
};
