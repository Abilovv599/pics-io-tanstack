import { useQuery } from '@tanstack/react-query';
import type { IUser } from '@/models/user';
import { AuthService } from '@/modules/auth/services/auth';
import type { AxiosError } from 'axios';

export const useGetUserQuery = () => {
  return useQuery<IUser, AxiosError>({
    queryKey: ['getUser'],
    queryFn: () => AuthService.getInstance().getUser(),
  });
};
