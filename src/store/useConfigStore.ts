import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Theme } from '../types/types';
import { getPreferedTheme } from '../helpers/utils';

interface ThemeState {
  theme: Theme,
  toggleTheme: () => void;
}

export const useConfigStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getPreferedTheme(),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    {
      name: 'config-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);