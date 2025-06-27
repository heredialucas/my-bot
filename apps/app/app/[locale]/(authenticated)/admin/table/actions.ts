'use server';
import { updateOrder } from '@repo/data-services/src/services/barfer/updateOrder';

export async function updateOrderAction(id: string, data: any) {
    try {
        const updated = await updateOrder(id, data);
        return { success: true, order: updated };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
} 