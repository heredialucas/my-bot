'use server';

import { revalidatePath } from 'next/cache';
import { createProduct, updateProduct, deleteProduct, setInventoryForSeller } from '@repo/data-services';
import { productFormSchema } from './lib/schemas';
import { z } from 'zod';

interface FormState {
    success: boolean;
    message: string;
}

export async function createProductAction(
    formData: FormData
): Promise<FormState> {
    const validatedFields = productFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }

    try {
        const result = await createProduct(validatedFields.data);
        if (!result.success) {
            return { success: false, message: result.message || 'Error al crear el producto.' };
        }
        revalidatePath('/products');
        return { success: true, message: 'Producto creado con éxito.' };
    } catch (error) {
        return { success: false, message: 'Error interno del servidor.' };
    }
}


export async function updateProductAction(
    productId: string,
    formData: FormData
): Promise<FormState> {
    const validatedFields = productFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }

    try {
        const result = await updateProduct(productId, validatedFields.data);
        if (!result.success) {
            return { success: false, message: result.message || 'Error al actualizar el producto.' };
        }
        revalidatePath('/products');
        return { success: true, message: 'Producto actualizado con éxito.' };
    } catch (error) {
        return { success: false, message: 'Error interno del servidor.' };
    }
}

export async function deleteProductAction(productId: string): Promise<FormState> {
    try {
        const result = await deleteProduct(productId);
        if (!result.success) {
            return { success: false, message: result.message || 'Error al eliminar el producto.' };
        }
        revalidatePath('/products');
        return { success: true, message: 'Producto eliminado con éxito.' };
    } catch (error) {
        return { success: false, message: 'Error interno del servidor.' };
    }
}

const setInventorySchema = z.object({
    quantity: z.coerce.number().int().min(0, 'La cantidad no puede ser negativa.'),
});

export async function setInventoryForSellerAction(
    productId: string,
    sellerId: string,
    quantity: number
): Promise<FormState> {
    const result = await setInventoryForSeller(productId, sellerId, quantity);

    if (result.success) {
        revalidatePath(`/products/${productId}`);
        return { success: true, message: 'Stock actualizado con éxito.' };
    } else {
        return { success: false, message: result.message || 'Error al asignar stock.' };
    }
} 