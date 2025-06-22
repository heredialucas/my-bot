import { getPaymentMethodStats } from '@repo/data-services/src/services/barfer';
import { PaymentsAnalyticsClient } from './PaymentsAnalyticsClient';

export async function PaymentsAnalyticsTab() {
    try {
        const paymentStats = await getPaymentMethodStats();

        return <PaymentsAnalyticsClient paymentStats={paymentStats} />;
    } catch (error) {
        console.error('Error loading payment stats:', error);
        return (
            <div className="p-4 border rounded-lg">
                <p className="text-sm text-red-600">Error al cargar datos de métodos de pago</p>
            </div>
        );
    }
} 