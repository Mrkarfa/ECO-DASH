import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  },
  isAuthenticated: true,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
