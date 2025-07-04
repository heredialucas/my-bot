'use server';

import { revalidatePath } from 'next/cache';
import { createClient, updateClient } from '@repo/data-services';
import { clientFormSchema } from './lib/schemas';

interface FormState {
    success: boolean;
    message: string;
}

export async function createClientAction(
    formData: FormData
): Promise<FormState> {
    const validatedFields = clientFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }

    try {
        const result = await createClient(validatedFields.data);
        if (!result.success) {
            return { success: false, message: result.message || 'Error al crear el cliente.' };
        }
        revalidatePath('/clients');
        return { success: true, message: 'Cliente creado con éxito.' };
    } catch (error) {
        return { success: false, message: 'Error interno del servidor.' };
    }
}


export async function updateClientAction(
    clientId: string,
    formData: FormData
): Promise<FormState> {
    const validatedFields = clientFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Error de validación. Por favor, revise los campos.',
        };
    }

    try {
        const result = await updateClient(clientId, validatedFields.data);
        if (!result.success) {
            return { success: false, message: result.message || 'Error al actualizar el cliente.' };
        }
        revalidatePath('/clients');
        revalidatePath(`/clients/${clientId}`);
        return { success: true, message: 'Cliente actualizado con éxito.' };
    } catch (error) {
        return { success: false, message: 'Error interno del servidor.' };
    }
} 