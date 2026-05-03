import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TasteProfile {
  acid: number;
  sweet: number;
  body: number;
  roast: 'light' | 'medium' | 'dark' | 'any';
}

interface UserState {
  hasCompletedOnboarding: boolean;
  tasteProfile: TasteProfile | null;
  completeOnboarding: (profile: TasteProfile) => void;
  resetOnboarding: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      tasteProfile: null,
      completeOnboarding: (profile) => set({ hasCompletedOnboarding: true, tasteProfile: profile }),
      resetOnboarding: () => set({ hasCompletedOnboarding: false, tasteProfile: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);
