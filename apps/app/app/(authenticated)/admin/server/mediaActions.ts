'use server'

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

// Tipo para los datos del media
type MediaFormData = {
    name: string;
    description: string;
    url: string;
    alt: string | null;
    type: 'IMAGE' | 'VIDEO';
};

// Crear un nuevo media
export async function createMedia(formData: MediaFormData) {
    try {
        // Crear el media en la base de datos
        await db.media.create({
            data: {
                name: formData.name,
                description: formData.description,
                url: formData.url,
                alt: formData.alt,
                type: formData.type,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error("Error creating media:", error);
        throw new Error("Failed to create media");
    }
}

// Actualizar un media existente
export async function updateMedia(mediaId: string, formData: MediaFormData) {
    try {
        // Actualizar el media en la base de datos
        await db.media.update({
            where: { id: mediaId },
            data: {
                name: formData.name,
                description: formData.description,
                url: formData.url,
                alt: formData.alt,
                type: formData.type,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error("Error updating media:", error);
        throw new Error("Failed to update media");
    }
}

// Obtener todos los medias
export async function getAllMedia() {
    try {
        return await db.media.findMany({
            orderBy: { name: 'asc' },
        });

    } catch (error) {
        console.error("Error fetching media:", error);
        throw new Error("Failed to fetch media");
    }
}

// Obtener un media por ID
export async function getMediaById(mediaId: string) {
    try {
        return await db.media.findUnique({
            where: { id: mediaId },
        });
    } catch (error) {
        console.error(`Error fetching media with ID ${mediaId}:`, error);
        throw new Error("Failed to fetch media");
    }
}

// Eliminar un media
export async function deleteMedia(mediaId: string) {
    try {
        await db.media.delete({
            where: { id: mediaId },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error(`Error deleting media with ID ${mediaId}:`, error);
        throw new Error("Failed to delete media");
    }
} 