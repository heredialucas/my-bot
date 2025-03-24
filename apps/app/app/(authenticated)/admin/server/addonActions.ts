'use server'

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

// Tipo para los datos del complemento
export type AddonFormData = {
    name: string;
    description?: string;
    price: number;
    icon?: string;
    color?: string | null;
};

// Crear un nuevo complemento
export async function createAddon(data: AddonFormData) {
    try {
        const { name, description, price, icon, color } = data;

        // Crear el complemento en la base de datos
        await db.addOn.create({
            data: {
                name,
                description: description || null,
                price,
                icon: icon || null,
                color: color || null,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error("Error creating addon:", error);
        throw new Error("Failed to create addon");
    }
}

// Actualizar un complemento existente
export async function updateAddon(addonId: string, formData: AddonFormData) {
    try {
        // Actualizar el complemento en la base de datos
        await db.addOn.update({
            where: { id: addonId },
            data: {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                icon: formData.icon,
                color: formData.color,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');

    } catch (error) {
        console.error("Error updating addon:", error);
        throw new Error("Failed to update addon");
    }
}

// Obtener todos los complementos
export async function getAllAddons() {
    try {
        const addons = await db.addOn.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                icon: true,
                description: true
            },
            orderBy: {
                name: 'asc'
            }
        });

        return addons;
    } catch (error) {
        console.error("Error fetching add-ons:", error);
        throw new Error("Failed to fetch add-ons");
    }
}

// Obtener un complemento por ID
export async function getAddonById(addonId: string) {
    try {
        return await db.addOn.findUnique({
            where: { id: addonId },
        });
    } catch (error) {
        console.error(`Error fetching addon with ID ${addonId}:`, error);
        throw new Error("Failed to fetch addon");
    }
}

// Eliminar un complemento
export async function deleteAddon(addonId: string) {
    try {
        await db.addOn.delete({
            where: { id: addonId },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error(`Error deleting addon with ID ${addonId}:`, error);
        throw new Error("Failed to delete addon");
    }
}