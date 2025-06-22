import { getPaymentMethodStats } from '@repo/data-services/src/services/barfer';
import { PaymentsAnalyticsClient } from './PaymentsAnalyticsClient';

interface PaymentsAnalyticsTabProps {
    dateFilter: {
        from: Date;
        to: Date;
    };
    compareFilter?: {
        from: Date;
        to: Date;
    };
}

export async function PaymentsAnalyticsTab({ dateFilter, compareFilter }: PaymentsAnalyticsTabProps) {
    try {
        const paymentStats = await getPaymentMethodStats(dateFilter.from, dateFilter.to);

        // Datos del período de comparación (si está habilitado)
        let comparePaymentStats;
        if (compareFilter) {
            comparePaymentStats = await getPaymentMethodStats(compareFilter.from, compareFilter.to);
        }

        return (
            <PaymentsAnalyticsClient
                paymentStats={paymentStats}
                comparePaymentStats={comparePaymentStats}
                isComparing={!!compareFilter}
                dateFilter={dateFilter}
                compareFilter={compareFilter}
            />
        );
    } catch (error) {
        console.error('Error loading payment analytics:', error);
        return (
            <div className="p-4 border rounded-lg">
                <p className="text-sm text-red-600">Error al cargar datos de pagos</p>
            </div>
        );
    }
} 