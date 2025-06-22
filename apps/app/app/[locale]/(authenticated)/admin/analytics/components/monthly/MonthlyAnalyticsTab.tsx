import { getOrdersByMonth } from '@repo/data-services/src/services/barfer';
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
        // Datos del período principal
        const monthlyStats = await getOrdersByMonth(dateFilter.from, dateFilter.to);

        // Datos del período de comparación (si está habilitado)
        let compareMonthlyStats;
        if (compareFilter) {
            compareMonthlyStats = await getOrdersByMonth(compareFilter.from, compareFilter.to);
        }

        return (
            <MonthlyAnalyticsClient
                allOrdersData={monthlyStats}
                compareAllOrdersData={compareMonthlyStats}
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