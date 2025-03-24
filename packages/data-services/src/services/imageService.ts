'use server'

import { database as db } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { ImageFormData, CreateImageFormData } from '../types/image';

/**
 * Obtener todas las imágenes
 */
export async function getAllImages() {
    try {
        const images = await db.media.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return images;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw new Error("Failed to fetch images");
    }
}

/**
 * Obtener una imagen por ID
 */
export async function getImageById(imageId: string) {
    try {
        const image = await db.media.findUnique({
            where: { id: imageId },
        });
        return image;
    } catch (error) {
        console.error("Error fetching image:", error);
        throw new Error("Failed to fetch image");
    }
}

/**
 * Crear una nueva imagen
 */
export async function createImage(data: ImageFormData) {
    "use server";
    try {
        const image = await db.media.create({
            data: {
                name: data.name,
                description: data.description || null,
                alt: data.alt || null,
                url: data.url,
                type: 'IMAGE',
            },
        });
        revalidatePath('/admin/dashboard');
        return image;
    } catch (error) {
        console.error("Error creating image:", error);
        throw new Error("Failed to create image");
    }
}

/**
 * Actualizar una imagen existente
 */
export async function updateImage(imageId: string, data: ImageFormData) {
    "use server";
    try {
        const image = await db.media.update({
            where: { id: imageId },
            data: {
                name: data.name,
                description: data.description || null,
                alt: data.alt || null,
                url: data.url,
            },
        });
        revalidatePath('/admin/dashboard');
        return image;
    } catch (error) {
        console.error("Error updating image:", error);
        throw new Error("Failed to update image");
    }
}

/**
 * Eliminar una imagen
 */
export async function deleteImage(imageId: string) {
    "use server";
    try {
        await db.media.delete({
            where: { id: imageId },
        });
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error("Error deleting image:", error);
        throw new Error("Failed to delete image");
    }
}

/**
 * Subir una imagen a un servicio externo
 */
export async function uploadImage(formData: ImageFormData) {
    try {
        const form = new FormData();

        if (formData.file) {
            form.append('file', formData.file);
        } else if (formData.url.startsWith('data:')) {
            // Convertir base64 a blob y adjuntar como archivo
            const res = await fetch(formData.url);
            const blob = await res.blob();
            form.append('file', blob, `${formData.name.replace(/\s+/g, '-').toLowerCase()}.jpg`);
        }

        form.append('folder', formData.folder);

        const response = await fetch('https://upload-images.api.appwiseinnovations.com/image/upload', {
            method: 'POST',
            body: form,
        });

        if (!response.ok) {
            throw new Error(`Error uploading image: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Failed to upload image");
    }
} 