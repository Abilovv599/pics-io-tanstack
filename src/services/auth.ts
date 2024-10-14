import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ILoginRequest, ILoginResponse, IUser } from '@/models/user';
import { useAuthStore } from '@/store/auth';
import { isApiError } from '@/utils/is-api-error';
import axios from 'axios';

// Base URL for authentication API
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Axios instance with the base URL
const apiClient = axios.create({
  baseURL: `${BASE_URL}/auth`,
});

// Helper to add Authorization header if token exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login Mutation
export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ILoginResponse, unknown, ILoginRequest>({
    mutationKey: ['login'],
    mutationFn: async (credentials: ILoginRequest) => {
      const { data } = await apiClient.post('/login', credentials);
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
  return useQuery<IUser>({
    queryKey: ['getMe'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get('/me');
        setUser(data);
        return data;
      } catch (error) {
        // Handle error, check if the error is a 401 Unauthorized
        if (isApiError(error)) {
          const { status } = error.error;
          if (status === 401) {
            // Token expired, reset the store and redirect to login
            resetStore(); // Clear token in Redux or state
            localStorage.removeItem('accessToken'); // Remove token from localStorage
            window.location.href = '/login'; // Redirect to login page
          }
        }
      }
    },
  });
};
