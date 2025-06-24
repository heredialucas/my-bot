import { getOrdersByMonth, getDeliveryTypeStatsByMonth } from '@repo/data-services/src/services/barfer';
import { MonthlyAnalyticsClient } from './MonthlyAnalyticsClient';

interface MonthlyAnalyticsTabProps {
    dateFilter: {
        from: Date;
        to: Date;
    };
    compareFilter?: {
        from: Date;
        to: Date;
    };
}

export async function MonthlyAnalyticsTab({ dateFilter, compareFilter }: MonthlyAnalyticsTabProps) {
    try {
        const [allOrdersData, deliveryStats] = await Promise.all([
            getOrdersByMonth(dateFilter.from, dateFilter.to),
            getDeliveryTypeStatsByMonth(dateFilter.from, dateFilter.to)
        ]);

        let compareAllOrdersData;
        let compareDeliveryStats;
        if (compareFilter) {
            [compareAllOrdersData, compareDeliveryStats] = await Promise.all([
                getOrdersByMonth(compareFilter.from, compareFilter.to),
                getDeliveryTypeStatsByMonth(compareFilter.from, compareFilter.to)
            ]);
        }

        return (
            <MonthlyAnalyticsClient
                allOrdersData={allOrdersData}
                compareAllOrdersData={compareAllOrdersData}
                deliveryStats={deliveryStats}
                compareDeliveryStats={compareDeliveryStats}
                isComparing={!!compareFilter}
                dateFilter={dateFilter}
                compareFilter={compareFilter}
            />
        );
    } catch (error) {
        console.error('Error loading monthly analytics:', error);
        return (
            <div className="p-4 border rounded-lg">
                <p className="text-sm text-red-600">Error al cargar datos mensuales</p>
            </div>
        );
    }
} 