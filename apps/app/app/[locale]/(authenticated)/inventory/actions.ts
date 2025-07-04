'use server';

import { revalidatePath } from 'next/cache';
import { updateInventoryQuantity } from '@repo/data-services';
import { z } from 'zod';

const updateQuantitySchema = z.object({
    quantity: z.coerce.number().int().min(0, 'La cantidad no puede ser negativa'),
});

interface FormState {
    success: boolean;
    message: string;
}

export async function updateInventoryQuantityAction(
    productId: string,
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const validatedFields = updateQuantitySchema.safeParse({
        quantity: formData.get('quantity'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Cantidad inválida.',
        };
    }

    try {
        const result = await updateInventoryQuantity(productId, validatedFields.data.quantity);
        if (!result.success) {
            return { success: false, message: result.message || 'Error al actualizar el inventario.' };
        }
        revalidatePath('/inventory');
        return { success: true, message: 'Inventario actualizado.' };
    } catch (error) {
        return { success: false, message: 'Error interno del servidor.' };
    }
} 