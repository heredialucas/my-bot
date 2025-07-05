'use server';

import { database } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './authService';

/**
 * Obtiene el inventario de un vendedor específico por su ID.
 * Solo los administradores pueden realizar esta acción.
 */
export async function getInventoryBySellerId(sellerId: string) {
    const user = await getCurrentUser();
    if (user?.role !== 'admin') {
        throw new Error('No autorizado');
    }

    try {
        const inventory = await database.inventory.findMany({
            where: { sellerId },
            include: { product: true },
        });
        return inventory;
    } catch (error) {
        console.error('Error al obtener el inventario del vendedor:', error);
        return [];
    }
}

/**
 * Actualiza el inventario de un vendedor.
 * Recibe el estado final deseado del inventario y sincroniza la base de datos.
 * Valida que la cantidad asignada no supere el stock del producto.
 * Solo los administradores pueden realizar esta acción.
 */
export async function updateSellerInventory(
    sellerId: string,
    inventoryUpdates: { productId: string; quantity: number }[]
) {
    const user = await getCurrentUser();
    if (user?.role !== 'admin') {
        return { success: false, message: 'No autorizado' };
    }

    try {
        const productIds = inventoryUpdates.map(item => item.productId);

        const productsToUpdate = await database.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, quantityInStock: true },
        });

        const productStockMap = new Map(productsToUpdate.map(p => [p.id, p.quantityInStock]));

        for (const item of inventoryUpdates) {
            const stock = productStockMap.get(item.productId);
            if (stock === undefined || item.quantity > stock) {
                return {
                    success: false,
                    message: `La cantidad para el producto ID ${item.productId} excede el stock disponible (${stock ?? 0}).`
                };
            }
        }

        await database.$transaction(async (tx) => {
            // Productos a eliminar: aquellos en la BD que no están en la lista de updates
            await tx.inventory.deleteMany({
                where: {
                    sellerId: sellerId,
                    NOT: {
                        productId: { in: productIds },
                    },
                },
            });

            // Productos a actualizar o crear (upsert)
            for (const item of inventoryUpdates) {
                await tx.inventory.upsert({
                    where: {
                        productId_sellerId: {
                            productId: item.productId,
                            sellerId: sellerId,
                        },
                    },
                    update: { quantity: item.quantity },
                    create: {
                        productId: item.productId,
                        sellerId: sellerId,
                        quantity: item.quantity,
                    },
                });
            }
        });

        revalidatePath('/sellers');

        return { success: true, message: 'Inventario actualizado correctamente.' };
    } catch (error) {
        console.error('Error al actualizar el inventario del vendedor:', error);
        return { success: false, message: 'Error interno del servidor.' };
    }
} 