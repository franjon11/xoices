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
  name: 'Francisco',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
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