'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { createClient, updateClient } from '@repo/data-services';
import { clientFormSchema } from './lib/schemas';

type FormState = {
    success: boolean;
    message: string;
};

export async function createClientAction(
    formData: FormData
): Promise<FormState> {
    const user = await getCurrentUser();
    if (!user) {
        return { success: false, message: 'Usuario no autenticado.' };
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = clientFormSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Error de validación. Por favor, revisa los campos.',
        };
    }

    // Admins must select a seller. If not, default to something or throw error.
    // For simplicity, let's ensure they select one via form validation (which should be improved).
    // If user is a seller, they can't choose, so we assign them as the seller.
    const sellerId = user.role === 'admin'
        ? validatedFields.data.sellerId
        : user.id;

    if (!sellerId) {
        return { success: false, message: 'Como administrador, debes seleccionar un vendedor.' };
    }

    const result = await createClient({ ...validatedFields.data, sellerId });

    if (result.success) {
        revalidatePath('/clients');
        return { success: true, message: 'Cliente creado con éxito.' };
    }

    return { success: false, message: result.message || 'No se pudo crear el cliente.' };
}


export async function updateClientAction(
    clientId: string,
    formData: FormData
): Promise<FormState> {
    const user = await getCurrentUser();
    if (!user) {
        return { success: false, message: 'Usuario no autenticado.' };
    }

    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = clientFormSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Error de validación. Por favor, revisa los campos.',
        };
    }

    // For updates, the sellerId might be changed by an admin.
    // A seller cannot change the owner of the client.
    const dataToUpdate: Partial<typeof validatedFields.data> = {
        ...validatedFields.data
    };

    if (user.role !== 'admin') {
        delete dataToUpdate.sellerId; // Sellers can't re-assign clients
    }


    const result = await updateClient(clientId, dataToUpdate);

    if (result.success) {
        revalidatePath('/clients');
        revalidatePath(`/clients/${clientId}`);
        return { success: true, message: 'Cliente actualizado con éxito.' };
    }

    return { success: false, message: result.message || 'No se pudo actualizar el cliente.' };
} 