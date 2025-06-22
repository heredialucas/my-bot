import { getCustomerInsights } from '@repo/data-services/src/services/barfer';
import { FrequencyAnalyticsClient } from './FrequencyAnalyticsClient';

export async function FrequencyAnalyticsTab() {
    try {
        const customerInsights = await getCustomerInsights();

        return <FrequencyAnalyticsClient customerInsights={customerInsights} />;
    } catch (error) {
        console.error('Error loading customer insights:', error);
        return (
            <div className="p-4 border rounded-lg">
                <p className="text-sm text-red-600">Error al cargar datos de insights de clientes</p>
            </div>
        );
    }
} 