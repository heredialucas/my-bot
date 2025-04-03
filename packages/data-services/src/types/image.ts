// Tipo para subir una imagen
export type ImageFormData = {
    name: string;
    description: string;
    alt: string;
    url: string;
    file: Blob;
    folder: string;
}; 