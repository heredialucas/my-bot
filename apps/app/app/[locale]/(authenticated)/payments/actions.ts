'use server';

import { revalidatePath } from 'next/cache';
import {
    getAllPayments,
    getPaymentById,
    createPayment,
    getPaymentStats
} from '@repo/data-services/src/services/paymentService';

/**
 * Server action para obtener todos los pagos
 */
export async function getAllPaymentsAction() {
    try {
        const payments = await getAllPayments();
        return { success: true, payments };
    } catch (error) {
        console.error('Error fetching payments:', error);
        return { success: false, error: 'Error al obtener los pagos.' };
    }
}

/**
 * Server action para obtener un pago específico
 */
export async function getPaymentByIdAction(paymentId: string) {
    try {
        const payment = await getPaymentById(paymentId);
        return { success: true, payment };
    } catch (error) {
        console.error('Error fetching payment:', error);
        return { success: false, error: 'Error al obtener el pago.' };
    }
}

/**
 * Server action para crear un nuevo pago
 */
export async function createPaymentAction(data: {
    orderId: string;
    amount: number;
    paymentMethod: 'CASH' | 'CREDIT_CARD' | 'BANK_TRANSFER' | 'OTHER';
    receiptNumber?: string;
    notes?: string;
}) {
    try {
        const result = await createPayment(data);
        if (result.success) {
            revalidatePath('/payments');
            revalidatePath('/orders');
        }
        return result;
    } catch (error) {
        console.error('Error creating payment:', error);
        return { success: false, message: 'Error al crear el pago.' };
    }
}

/**
 * Server action para obtener estadísticas de pagos
 */
export async function getPaymentStatsAction() {
    try {
        const stats = await getPaymentStats();
        return { success: true, stats };
    } catch (error) {
        console.error('Error fetching payment stats:', error);
        return { success: false, error: 'Error al obtener las estadísticas.' };
    }
} 