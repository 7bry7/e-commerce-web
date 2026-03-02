import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email) => set({
    isAuthenticated: true,
    user: {
      id: 'usr_123',
      name: 'Indie Dev',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    }
  }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
