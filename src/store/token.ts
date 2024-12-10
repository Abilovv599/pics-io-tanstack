import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type TokenState = {
  accessToken: string | null;
  refreshToken: string | null;
};

type TokenActions = {
  setToken: (token: string) => void;
  resetStore: () => void;
};

const initialState: TokenState = {
  accessToken: null,
  refreshToken: null,
};

export const useTokenStore = create<TokenState & TokenActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setToken: (token) => set((state) => ({ ...state, accessToken: token })),
        resetStore: () => set(initialState),
      }),
      {
        name: 'token-store',
        partialize: (state) => ({ accessToken: state.accessToken }),
      },
    ),
  ),
);
