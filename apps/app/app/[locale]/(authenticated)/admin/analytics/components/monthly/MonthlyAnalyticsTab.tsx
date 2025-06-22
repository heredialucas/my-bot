import { getOrdersByMonth } from '@repo/data-services/src/services/barfer';
import { MonthlyAnalyticsClient } from './MonthlyAnalyticsClient';

export async function MonthlyAnalyticsTab() {
    try {
        const monthlyStats = await getOrdersByMonth();

        return (
            <MonthlyAnalyticsClient
                allOrdersData={monthlyStats}
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