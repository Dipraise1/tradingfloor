import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Entry {
  id: string;
  date: number; // timestamp
  pair: string;
  session: string;
  strategy: string;
  result: 'WIN' | 'LOSS' | 'BE';
  entryPrice?: number;
  sl?: number;
  tp?: number;
  notes?: string;
  images: string[];
}

interface JournalState {
  strategies: string[];
  sessions: string[];
  pairs: string[];
  entries: Entry[];
  maxRiskPerDay: number;
  addStrategy: (s: string) => void;
  addSession: (s: string) => void;
  addPair: (p: string) => void;
  setMaxRisk: (r: number) => void;
  addEntry: (e: Entry) => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      strategies: ["Pullback", "Breakout", "Reversal"],
      sessions: ["London", "New York", "Asian"],
      pairs: ["EURUSD", "GBPUSD", "XAUUSD"],
      entries: [],
      maxRiskPerDay: 2, // percent
      addStrategy: (s) => set((state) => ({ strategies: [...state.strategies, s] })),
      addSession: (s) => set((state) => ({ sessions: [...state.sessions, s] })),
      addPair: (p) => set((state) => ({ pairs: [...state.pairs, p] })),
      setMaxRisk: (r) => set({ maxRiskPerDay: r }),
      addEntry: (e) => set((state) => ({ entries: [e, ...state.entries] })),
    }),
    {
      name: 'journal-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
