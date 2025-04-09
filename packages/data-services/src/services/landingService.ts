'use server';

import { database as db } from '@repo/database';
import { revalidatePath } from 'next/cache';

// Tipo para los datos del formulario de producto
export interface ProductFormData {
    title: string;
    description: string;
    images: string[];
    status: string;
    size: string;
    detailedDescription: string;
    features: string[];
    technologies: string[];
    status_description: string;
}

/**
 * Obtener todos los productos
 */
export async function getAllProducts() {
    try {
        const products = await db.landing.findMany({
            orderBy: { title: 'asc' }
        });
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
}

/**
 * Obtener un producto por ID
 */
export async function getProductById(id: string) {
    try {
        const product = await db.landing.findUnique({
            where: { id }
        });
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw new Error('Failed to fetch product');
    }
}

/**
 * Crear un nuevo producto
 */
export async function createProduct(data: ProductFormData) {
    try {
        const product = await db.landing.create({
            data: {
                title: data.title,
                description: data.description,
                images: data.images,
                status: data.status,
                size: data.size,
                detailedDescription: data.detailedDescription,
                features: data.features,
                technologies: data.technologies,
                status_description: data.status_description
            }
        });
        revalidatePath('/admin/dashboard');
        return product;
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product');
    }
}

/**
 * Actualizar un producto existente
 */
export async function updateProduct(id: string, data: ProductFormData) {
    try {
        const product = await db.landing.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                images: data.images,
                status: data.status,
                size: data.size,
                detailedDescription: data.detailedDescription,
                features: data.features,
                technologies: data.technologies,
                status_description: data.status_description
            }
        });
        revalidatePath('/admin/dashboard');
        return product;
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Failed to update product');
    }
}

/**
 * Eliminar un producto
 */
export async function deleteProduct(id: string) {
    try {
        await db.landing.delete({
            where: { id }
        });
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Failed to delete product');
    }
} 