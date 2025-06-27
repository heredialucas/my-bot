'use server';
import { revalidatePath } from 'next/cache';
import { updateOrder } from '@repo/data-services/src/services/barfer/updateOrder';
import { deleteOrder } from '@repo/data-services/src/services/barfer/deleteOrder';
import { createOrder } from '@repo/data-services/src/services/barfer/createOrder';

export async function updateOrderAction(id: string, data: any) {
    try {
        const updated = await updateOrder(id, data);
        return { success: true, order: updated };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

export async function deleteOrderAction(id: string) {
    try {
        const result = await deleteOrder(id);
        if (!result.success) {
            return { success: false, error: result.error };
        }
        revalidatePath('/admin/table');
        return { success: true };
    } catch (error) {
        console.error('Error in deleteOrderAction:', error);
        return { success: false, error: 'Error al eliminar la orden' };
    }
}

export async function createOrderAction(data: any) {
    try {
        const result = await createOrder(data);
        if (!result.success) {
            return { success: false, error: result.error };
        }
        revalidatePath('/admin/table');
        return { success: true, order: result.order };
    } catch (error) {
        console.error('Error in createOrderAction:', error);
        return { success: false, error: 'Error al crear la orden' };
    }
} 