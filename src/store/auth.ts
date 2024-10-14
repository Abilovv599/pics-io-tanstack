import { create } from 'zustand';
import type { IUser } from '@/models/user.ts';
import { devtools, persist } from 'zustand/middleware';

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

const initialState: AuthState = { user: null, accessToken: null, refreshToken: null };

const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setAuthToken: (token) => set((state) => ({ ...state, accessToken: token })),
        setUser: (user) => set((state) => ({ ...state, user })),
        resetStore: () => set(initialState),
      }),
      {
        name: 'auth', // name of the item in the storage (must be unique)
      },
    ),
  ),
);

export { useAuthStore };
