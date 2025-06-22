import { getOrdersByDay, getRevenueByDay } from '@repo/data-services/src/services/barfer';
import { DailyAnalyticsClient } from './DailyAnalyticsClient';

export async function DailyAnalyticsTab() {
    try {
        const [allOrdersData, confirmedOrdersData] = await Promise.all([
            getOrdersByDay(),
            getRevenueByDay()
        ]);

        return (
            <DailyAnalyticsClient
                allOrdersData={allOrdersData}
                confirmedOrdersData={confirmedOrdersData}
            />
        );
    } catch (error) {
        console.error('Error loading daily analytics:', error);
        return (
            <div className="p-4 border rounded-lg">
                <p className="text-sm text-red-600">Error al cargar datos diarios</p>
            </div>
        );
    }
} 