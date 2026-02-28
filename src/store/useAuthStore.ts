import { create } from "zustand";
import type { User } from "../types/types";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

const initialUser: User = {
  id: '1',
  name: 'Dalma',
  avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Dalma&backgroundColor=ffd5dc,d81b60&backgroundType=gradientLinear&backgroundRotation=-290&'
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: initialUser,
      isAuthenticated: true,
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }), {
      name: 'auth',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);