import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useInitStore = create(
    persist(
        (set) => ({
            isInitialized: false,
            setIsInitialized: (isInitialized: boolean) => set({ isInitialized }),
        }),
        {
            name: 'init-store',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
