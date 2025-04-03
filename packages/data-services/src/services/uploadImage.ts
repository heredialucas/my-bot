import { ImageFormData } from "../types/image";

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