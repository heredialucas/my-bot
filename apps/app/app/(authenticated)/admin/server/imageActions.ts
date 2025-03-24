'use server'

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

type CreateImageFormData = {
    name: string;
    description: string;
    alt: string;
    url: string;
};
// Tipo para los datos de imagen
type ImageFormData = {
    name: string;
    description: string;
    alt: string;
    url: string;
    file: Blob;
    folder: string;
};

// Subir una imagen
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

// Crear una nueva imagen
export async function createImage(formData: CreateImageFormData) {
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

    } catch (error) {
        console.error("Error creating image:", error);
        throw new Error("Failed to create image");
    }
}

// Actualizar una imagen existente
export async function updateImage(imageId: string, formData: CreateImageFormData) {
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