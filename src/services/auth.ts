import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ILoginRequest, ILoginResponse, IUser } from '@/models/user';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/api';
import { AxiosError } from 'axios';
import { useNavigate } from '@tanstack/react-router';

// Login Mutation
export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ILoginResponse, unknown, ILoginRequest>({
    mutationKey: ['login'],
    mutationFn: async (credentials: ILoginRequest) => {
      const { data } = await apiClient.post('auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      // Store the token in local storage and update Redux (or any state management)
      localStorage.setItem('accessToken', data.accessToken);
      queryClient.setQueryData(['accessToken'], data.accessToken);
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};

// Get Me Query
export const useGetMeQuery = () => {
  const resetStore = useAuthStore((state) => state.resetStore);
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  return useQuery<IUser>({
    queryKey: ['getMe'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get('auth/me');
        setUser(data);
        return data;
      } catch (error) {
        const { status } = error as AxiosError;
        // Handle error, check if the error is a 401 Unauthorized
        if (status === 401) {
          // Token expired, reset the store and redirect to login
          resetStore(); // Clear token in Redux or state
          localStorage.removeItem('accessToken'); // Remove token from localStorage
          await navigate({ to: 'login' }); // Redirect to login page
        }
      }
    },
  });
};
