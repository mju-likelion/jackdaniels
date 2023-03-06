import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type ManagerState = {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  removeAccessToken: () => void;
};

export const useManager = create<ManagerState>()(
  devtools(
    persist(
      set => ({
        // TODO: 일단 토큰만
        accessToken: null,
        setAccessToken: (accessToken: string) => set({ accessToken }),
        removeAccessToken: () => set({ accessToken: null }),
      }),
      { name: 'manager-storage' },
    ),
  ),
);
