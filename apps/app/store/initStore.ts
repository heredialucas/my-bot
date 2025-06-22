import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface InitStore {
    isInitialized: boolean;
    setIsInitialized: (isInitialized: boolean) => void;
    // Analytics tab persistence
    analyticsActiveTab: string;
    setAnalyticsActiveTab: (tab: string) => void;
}

export const useInitStore = create<InitStore>()(
    persist(
        (set) => ({
            isInitialized: false,
            setIsInitialized: (isInitialized: boolean) => set({ isInitialized }),
            // Analytics tab persistence
            analyticsActiveTab: 'daily',
            setAnalyticsActiveTab: (tab: string) => set({ analyticsActiveTab: tab }),
        }),
        {
            name: 'init-store',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
