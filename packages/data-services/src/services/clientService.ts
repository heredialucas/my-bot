'use server'

import { revalidatePath } from 'next/cache';
import { database } from '@repo/database';
import { ClientFormData } from '../types/client';
import { getCurrentUser } from './authService';

export async function createClient(data: ClientFormData) {
    const user = await getCurrentUser()
    if (!user?.id) {
        return {
            success: false,
            message: 'Usuario no autenticado',
        }
    }
    try {
        const client = await database.client.create({
            data: {
                ...data,
                sellerId: user.id,
            },
        });

        revalidatePath('/clients');

        return {
            success: true,
            client,
        };
    } catch (error) {
        console.error('Error al crear cliente:', error);
        return {
            success: false,
            message: 'Error interno del servidor al crear el cliente',
        };
    }
}

export async function getClientsBySeller() {
    const user = await getCurrentUser()
    if (!user?.id) {
        return [];
    }

    try {
        const clients = await database.client.findMany({
            where: {
                sellerId: user.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return clients;
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        return [];
    }
}

export async function getAllClients() {
    const user = await getCurrentUser();
    if (user?.role !== 'admin') {
        return [];
    }
    try {
        const clients = await database.client.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return clients;
    } catch (error) {
        console.error("Error al obtener todos los clientes:", error);
        return [];
    }
}

export async function getClientById(clientId: string) {
    const user = await getCurrentUser();
    if (!user?.id) {
        return null;
    }

    try {
        const client = await database.client.findFirst({
            where: {
                id: clientId,
                // Admin can see any client, sellers only their own
                ...(user.role !== 'admin' && { sellerId: user.id }),
            },
        });
        return client;
    } catch (error) {
        console.error("Error al obtener cliente por ID:", error);
        return null;
    }
}

export async function updateClient(clientId: string, data: ClientFormData) {
    const user = await getCurrentUser();
    if (!user?.id) {
        return { success: false, message: 'Usuario no autenticado' };
    }

    try {
        // Ensure the client exists and belongs to the seller (or user is admin)
        const existingClient = await database.client.findFirst({
            where: {
                id: clientId,
                ...(user.role !== 'admin' && { sellerId: user.id }),
            }
        });

        if (!existingClient) {
            return { success: false, message: 'Cliente no encontrado o sin permisos para editar' };
        }

        const updatedClient = await database.client.update({
            where: {
                id: clientId,
            },
            data,
        });

        revalidatePath('/clients');
        // Also revalidate the specific client page if it exists
        revalidatePath(`/clients/${clientId}`);

        return {
            success: true,
            client: updatedClient,
        };
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        return { success: false, message: 'Error interno del servidor' };
    }
}

export async function deleteClient(clientId: string) {
    const user = await getCurrentUser();
    if (!user?.id) {
        return { success: false, message: 'Usuario no autenticado' };
    }

    try {
        // Ensure the client exists and belongs to the seller (or user is admin)
        const existingClient = await database.client.findFirst({
            where: {
                id: clientId,
                ...(user.role !== 'admin' && { sellerId: user.id }),
            }
        });

        if (!existingClient) {
            return { success: false, message: 'Cliente no encontrado o sin permisos para eliminar' };
        }

        await database.client.delete({
            where: {
                id: clientId,
            },
        });

        revalidatePath('/clients');

        return { success: true };
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        return { success: false, message: 'Error interno del servidor' };
    }
} 