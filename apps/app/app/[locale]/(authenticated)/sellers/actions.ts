'use server';

import { getAllProducts } from '@repo/data-services/src/services/productService';
import { getInventoryBySellerId, updateSellerInventory } from '@repo/data-services/src/services/inventoryService';
import { deleteUser } from '@repo/data-services/src/services/userService';

/**
 * Obtiene todos los datos necesarios para el diálogo de asignación de productos.
 * @param sellerId - El ID del vendedor.
 */
export async function getAssignProductsDialogData(sellerId: string) {
    try {
        const [products, inventory] = await Promise.all([
            getAllProducts(),
            getInventoryBySellerId(sellerId),
        ]);
        return { success: true, products, inventory };
    } catch (error) {
        console.error('Error al obtener los datos para el diálogo:', error);
        return { success: false, error: 'No se pudieron cargar los datos.' };
    }
}

/**
 * Server action para obtener solo el inventario de un vendedor.
 * @param sellerId - El ID del vendedor.
 */
export async function getSellerInventoryAction(sellerId: string) {
    try {
        const inventory = await getInventoryBySellerId(sellerId);
        return { success: true, inventory };
    } catch (error) {
        console.error('Error al obtener el inventario:', error);
        return { success: false, error: 'No se pudo cargar el inventario.' };
    }
}

/**
 * Server action para actualizar el inventario de un vendedor.
 * @param sellerId - El ID del vendedor.
 * @param updates - Un array con los productos y sus nuevas cantidades.
 */
export async function updateSellerInventoryAction(
    sellerId: string,
    updates: { productId: string; quantity: number }[]
) {
    return await updateSellerInventory(sellerId, updates);
}

/**
 * Server action para eliminar un vendedor.
 * @param sellerId - El ID del vendedor a eliminar.
 */
export async function deleteSellerAction(sellerId: string) {
    try {
        await deleteUser(sellerId);
        return { success: true, message: 'Vendedor eliminado correctamente.' };
    } catch (error) {
        console.error('Error al eliminar vendedor:', error);
        return { success: false, message: 'Error al eliminar el vendedor.' };
    }
}