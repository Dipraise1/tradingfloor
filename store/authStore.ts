import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      login: async (email, password) => {
        set({ isLoading: true });
        // MOCK NETWORK REQUEST
        return new Promise((resolve) => {
          setTimeout(() => {
            if (email.includes("@")) {
              set({ 
                user: { id: '123', email, name: email.split('@')[0] }, 
                isLoading: false 
              });
              resolve(true);
            } else {
              set({ isLoading: false });
              resolve(false);
            }
          }, 1500); // 1.5s delay
        });
      },
      signup: async (email, password) => {
        set({ isLoading: true });
        // MOCK NETWORK REQUEST
        return new Promise((resolve) => {
          setTimeout(() => {
            set({ 
              user: { id: '123', email, name: email.split('@')[0] }, 
              isLoading: false 
            });
            resolve(true);
          }, 1500);
        });
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
