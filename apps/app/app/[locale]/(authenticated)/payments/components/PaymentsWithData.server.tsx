import { getAllPayments } from '@repo/data-services/src/services/paymentService';
import { PaymentsClient } from './PaymentsClient.client';

export default async function PaymentsWithData() {
    const payments = await getAllPayments();

    return <PaymentsClient data={payments} />;
} 