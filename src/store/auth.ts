import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IUser } from '@/models/user.ts';

type AuthState = {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthActions = {
  setAuthToken: (token: string) => void;
  setUser: (user: IUser) => void;
  resetStore: () => void;
};

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: null,
};

const useAuthStore = create<AuthState & AuthActions>()(
  devtools((set) => ({
    ...initialState,
    setAuthToken: (token) => set((state) => ({ ...state, accessToken: token })),
    setUser: (user) => set((state) => ({ ...state, user })),
    resetStore: () => set(initialState),
  })),
);

export { useAuthStore };
