'use server';

import { database } from '@repo/database';
import { getCurrentUser } from './authService';
import { ProductFormData } from '../types';

/**
 * Get all products from the central catalog.
 * Accessible to admins and sellers (sellers need it to add products to their inventory).
 */
export async function getAllProducts() {
    const user = await getCurrentUser();
    if (user?.role !== 'admin' && user?.role !== 'seller') {
        return [];
    }

    try {
        const products = await database.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return products;
    } catch (error) {
        console.error("Error fetching all products:", error);
        return [];
    }
}

/**
 * Get a single product by its ID.
 * Only accessible to admins.
 */
export async function getProductById(productId: string) {
    const user = await getCurrentUser();
    if (user?.role !== 'admin') {
        return null;
    }

    try {
        const product = await database.product.findUnique({
            where: { id: productId },
        });
        return product;
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        return null;
    }
}

/**
 * Get the inventory for a specific seller.
 * It includes the product details from the central catalog.
 */
export async function getInventoryBySeller() {
    const user = await getCurrentUser();
    if (!user?.id) {
        return [];
    }

    try {
        const inventory = await database.inventory.findMany({
            where: { sellerId: user.id },
            include: {
                product: true, // Include the full product details
            },
            orderBy: { updatedAt: 'desc' },
        });
        return inventory;
    } catch (error) {
        console.error("Error fetching inventory for seller:", error);
        return [];
    }
}

/**
 * Create a new product in the central catalog.
 * Only accessible to admins.
 */
export async function createProduct(data: ProductFormData) {
    const user = await getCurrentUser();
    if (user?.role !== 'admin') {
        return { success: false, message: 'No autorizado' };
    }
    try {
        const product = await database.product.create({
            data: {
                name: data.name,
                description: data.description || null,
                sku: data.sku,
                price: data.price,
                quantityInStock: data.quantityInStock,
            }
        });
        return { success: true, product };
    } catch (error) {
        console.error("Error creating product:", error);
        return { success: false, message: 'Error interno del servidor' };
    }
}

/**
 * Update a product in the central catalog.
 * Only accessible to admins.
 */
export async function updateProduct(productId: string, data: Partial<ProductFormData>) {
    const user = await getCurrentUser();
    if (user?.role !== 'admin') {
        return { success: false, message: 'No autorizado' };
    }
    try {
        const product = await database.product.update({
            where: { id: productId },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.description !== undefined && { description: data.description || null }),
                ...(data.sku && { sku: data.sku }),
                ...(data.price !== undefined && { price: data.price }),
                ...(data.quantityInStock !== undefined && { quantityInStock: data.quantityInStock }),
            }
        });
        return { success: true, product };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, message: 'Error interno del servidor' };
    }
}

/**
 * Delete a product from the central catalog.
 * Only accessible to admins.
 */
export async function deleteProduct(productId: string) {
    const user = await getCurrentUser();
    if (user?.role !== 'admin') {
        return { success: false, message: 'No autorizado' };
    }
    try {
        await database.product.delete({ where: { id: productId } });
        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, message: 'Error interno del servidor' };
    }
}

/**
 * Update the quantity of a product in a seller's inventory.
 * If the product is not in the inventory, it will be added.
 */
export async function updateInventoryQuantity(productId: string, quantity: number) {
    const user = await getCurrentUser();
    if (!user?.id) {
        return { success: false, message: 'Usuario no autenticado' };
    }

    try {
        const updatedInventoryItem = await database.inventory.upsert({
            where: {
                productId_sellerId: {
                    productId,
                    sellerId: user.id,
                },
            },
            update: {
                quantity,
            },
            create: {
                productId,
                sellerId: user.id,
                quantity,
            },
            include: { product: true },
        });
        return { success: true, inventoryItem: updatedInventoryItem };
    } catch (error) {
        console.error("Error updating inventory quantity:", error);
        return { success: false, message: 'Error interno del servidor' };
    }
} 