import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DateRange {
    from: Date;
    to: Date;
    preset?: string;
}

interface AnalyticsDateFilter {
    current: DateRange;
    previous?: DateRange;
    compareEnabled: boolean;
}

interface InitStore {
    isInitialized: boolean;
    setIsInitialized: (isInitialized: boolean) => void;
    // Analytics tab persistence
    analyticsActiveTab: string;
    setAnalyticsActiveTab: (tab: string) => void;
    // Analytics date filter
    analyticsDateFilter: AnalyticsDateFilter;
    setAnalyticsDateFilter: (filter: AnalyticsDateFilter) => void;
    resetAnalyticsDateFilter: () => void;
}

// Helper function to get default date range (last 30 days)
const getDefaultDateRange = (): DateRange => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 29);

    return {
        from: thirtyDaysAgo,
        to: today,
        preset: 'last-30-days'
    };
};

// Helper function to get previous period for comparison
const getPreviousPeriod = (current: DateRange): DateRange => {
    const duration = current.to.getTime() - current.from.getTime();
    const previousEnd = new Date(current.from.getTime() - 1);
    const previousStart = new Date(previousEnd.getTime() - duration);

    return {
        from: previousStart,
        to: previousEnd
    };
};

const getDefaultAnalyticsDateFilter = (): AnalyticsDateFilter => {
    const defaultRange = getDefaultDateRange();
    return {
        current: defaultRange,
        compareEnabled: false,
        previous: undefined
    };
};

export const useInitStore = create<InitStore>()(
    persist(
        (set, get) => ({
            isInitialized: false,
            setIsInitialized: (isInitialized: boolean) => set({ isInitialized }),
            // Analytics tab persistence
            analyticsActiveTab: 'daily',
            setAnalyticsActiveTab: (tab: string) => set({ analyticsActiveTab: tab }),
            // Analytics date filter
            analyticsDateFilter: getDefaultAnalyticsDateFilter(),
            setAnalyticsDateFilter: (filter: AnalyticsDateFilter) => {
                // Auto-calculate previous period if compare is enabled
                const updatedFilter = {
                    ...filter,
                    previous: filter.compareEnabled ? getPreviousPeriod(filter.current) : undefined
                };
                set({ analyticsDateFilter: updatedFilter });
            },
            resetAnalyticsDateFilter: () => set({ analyticsDateFilter: getDefaultAnalyticsDateFilter() }),
        }),
        {
            name: 'init-store',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Export types for use in components
export type { DateRange, AnalyticsDateFilter };
