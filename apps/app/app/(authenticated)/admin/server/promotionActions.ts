'use server'

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

// Tipo para los datos de la promoción
type PromotionFormData = {
    name: string;
    description: string;
    discount: number;
    duration: number;
    active: boolean;
    color: string | null;
};

// Crear una nueva promoción
export async function createPromotion(formData: PromotionFormData) {
    try {
        // Crear la promoción en la base de datos
        await db.promotion.create({
            data: {
                name: formData.name,
                description: formData.description,
                discount: formData.discount,
                duration: formData.duration,
                active: formData.active,
                color: formData.color,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');

    } catch (error) {
        console.error("Error creating promotion:", error);
        throw new Error("Failed to create promotion");
    }
}

// Actualizar una promoción existente
export async function updatePromotion(promotionId: string, formData: PromotionFormData) {
    try {
        // Actualizar la promoción en la base de datos
        await db.promotion.update({
            where: { id: promotionId },
            data: {
                name: formData.name,
                description: formData.description,
                discount: formData.discount,
                duration: formData.duration,
                active: formData.active,
                color: formData.color,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');

    } catch (error) {
        console.error("Error updating promotion:", error);
        throw new Error("Failed to update promotion");
    }
}

// Obtener todas las promociones
export async function getAllPromotions() {
    try {
        return await db.promotion.findMany({
            orderBy: { name: 'asc' },
        });
    } catch (error) {
        console.error("Error fetching promotions:", error);
        throw new Error("Failed to fetch promotions");
    }
}

// Obtener una promoción por ID
export async function getPromotionById(promotionId: string) {
    try {
        return await db.promotion.findUnique({
            where: { id: promotionId },
        });
    } catch (error) {
        console.error(`Error fetching promotion with ID ${promotionId}:`, error);
        throw new Error("Failed to fetch promotion");
    }
}

// Eliminar una promoción
export async function deletePromotion(promotionId: string) {
    try {
        await db.promotion.delete({
            where: { id: promotionId },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error(`Error deleting promotion with ID ${promotionId}:`, error);
        throw new Error("Failed to delete promotion");
    }
} 