'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

// Tipo para los datos de imagen
type ImageFormData = {
    name: string;
    description: string;
    alt: string;
    url: string;
};

// Crear una nueva imagen
export async function createImage(formData: ImageFormData) {
    try {
        // Crear la imagen en la base de datos
        await db.media.create({
            data: {
                name: formData.name,
                description: formData.description,
                alt: formData.alt,
                url: formData.url,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');

        // Redirigir a la página del dashboard
        redirect('/admin/dashboard');
    } catch (error) {
        console.error("Error creating image:", error);
        throw new Error("Failed to create image");
    }
}

// Actualizar una imagen existente
export async function updateImage(imageId: string, formData: ImageFormData) {
    try {
        // Actualizar la imagen en la base de datos
        await db.media.update({
            where: { id: imageId },
            data: {
                name: formData.name,
                description: formData.description,
                alt: formData.alt,
                url: formData.url,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');

        // Redirigir a la página del dashboard
        redirect('/admin/dashboard');
    } catch (error) {
        console.error("Error updating image:", error);
        throw new Error("Failed to update image");
    }
}

// Obtener todas las imágenes
export async function getAllImages() {
    try {
        return await db.media.findMany({
            orderBy: { name: 'asc' },
        });
    } catch (error) {
        console.error("Error fetching images:", error);
        throw new Error("Failed to fetch images");
    }
}

// Obtener una imagen por ID
export async function getImageById(imageId: string) {
    try {
        return await db.media.findUnique({
            where: { id: imageId },
        });
    } catch (error) {
        console.error(`Error fetching image with ID ${imageId}:`, error);
        throw new Error("Failed to fetch image");
    }
}

// Eliminar una imagen
export async function deleteImage(imageId: string) {
    try {
        await db.media.delete({
            where: { id: imageId },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error(`Error deleting image with ID ${imageId}:`, error);
        throw new Error("Failed to delete image");
    }
} 