'use server'

import { database as db } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { AddonFormData } from '../types/addon';

/**
 * Obtener todos los complementos
 */
export async function getAllAddons() {
    try {
        const addons = await db.addOn.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                icon: true,
                color: true,
            },
            orderBy: {
                name: 'asc'
            }
        });
        return addons;
    } catch (error) {
        console.error("Error fetching addons:", error);
        throw new Error("Failed to fetch addons");
    }
}

/**
 * Obtener un complemento por ID
 */
export async function getAddonById(addonId: string) {
    try {
        const addon = await db.addOn.findUnique({
            where: { id: addonId },
        });
        return addon;
    } catch (error) {
        console.error(`Error fetching addon with ID ${addonId}:`, error);
        throw new Error("Failed to fetch addon");
    }
}

/**
 * Crear un nuevo complemento
 */
export async function createAddon(data: AddonFormData) {
    "use server";
    try {
        const { name, description, price, icon, color } = data;

        // Crear el complemento en la base de datos
        const addon = await db.addOn.create({
            data: {
                name,
                price,
                icon: icon || null,
                color: color || null,
            },
        });
        revalidatePath('/admin/dashboard');
        return addon;
    } catch (error) {
        console.error("Error creating addon:", error);
        throw new Error("Failed to create addon");
    }
}

/**
 * Actualizar un complemento existente
 */
export async function updateAddon(addonId: string, data: AddonFormData) {
    "use server";
    try {
        // Actualizar el complemento en la base de datos
        const addon = await db.addOn.update({
            where: { id: addonId },
            data: {
                name: data.name,
                price: data.price,
                icon: data.icon || null,
                color: data.color || null,
            },
        });
        revalidatePath('/admin/dashboard');
        return addon;
    } catch (error) {
        console.error("Error updating addon:", error);
        throw new Error("Failed to update addon");
    }
}

/**
 * Eliminar un complemento
 */
export async function deleteAddon(addonId: string) {
    "use server";
    try {
        await db.addOn.delete({
            where: { id: addonId },
        });
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error(`Error deleting addon with ID ${addonId}:`, error);
        throw new Error("Failed to delete addon");
    }
} 