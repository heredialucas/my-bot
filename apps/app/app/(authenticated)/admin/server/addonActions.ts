'use server'

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

// Tipo para los datos del complemento
type AddonFormData = {
    name: string;
    description: string;
    price: number;
    icon: string | null;
    color: string | null;
};

// Crear un nuevo complemento
export async function createAddon(formData: AddonFormData) {
    try {
        // Crear el complemento en la base de datos
        await db.addOn.create({
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
        return await db.addOn.findMany({
            orderBy: { name: 'asc' },
        });
    } catch (error) {
        console.error("Error fetching addons:", error);
        throw new Error("Failed to fetch addons");
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