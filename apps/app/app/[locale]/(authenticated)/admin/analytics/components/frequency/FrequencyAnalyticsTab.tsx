import { getCustomerInsights } from '@repo/data-services/src/services/barfer';
import { FrequencyAnalyticsClient } from './FrequencyAnalyticsClient';

interface FrequencyAnalyticsTabProps {
    dateFilter: {
        from: Date;
        to: Date;
    };
    compareFilter?: {
        from: Date;
        to: Date;
    };
}

export async function FrequencyAnalyticsTab({ dateFilter, compareFilter }: FrequencyAnalyticsTabProps) {
    try {
        const customerInsights = await getCustomerInsights(dateFilter.from, dateFilter.to);

        // Datos del período de comparación (si está habilitado)
        let compareCustomerInsights;
        if (compareFilter) {
            compareCustomerInsights = await getCustomerInsights(compareFilter.from, compareFilter.to);
        }

        return (
            <FrequencyAnalyticsClient
                customerInsights={customerInsights}
                compareCustomerInsights={compareCustomerInsights}
                isComparing={!!compareFilter}
                dateFilter={dateFilter}
                compareFilter={compareFilter}
            />
        );
    } catch (error) {
        console.error('Error loading frequency analytics:', error);
        return (
            <div className="p-4 border rounded-lg">
                <p className="text-sm text-red-600">Error al cargar datos de métricas</p>
            </div>
        );
    }
} 