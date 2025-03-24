"use client";

import { Button } from "@repo/design-system/components/ui/button";
import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import ModalActions from "../../../components/ModalActions";
import { useState, useRef } from "react";
import { uploadImage, updateImage } from "../../../../server/imageActions";
import Image from "next/image";
// Updated Image type to match the database schema
type Image = {
    id: string;
    name: string;
    description: string | null;
    url: string;
    alt: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    type?: any; // MediaType enum 
};

interface ImageFormProps {
    image?: Image;
    imageId: string;
}

export default function ImageForm({ image, imageId }: ImageFormProps) {
    const [name, setName] = useState(image?.name || "");
    const [description, setDescription] = useState(image?.description || "");
    const [alt, setAlt] = useState(image?.alt || "");
    const [url, setUrl] = useState(image?.url || "");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(image?.url || null);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setIsFormDirty(true);
        }
    };

    const handleSelectImage = () => {
        fileInputRef.current?.click();
    };

    const handleSave = async () => {
        try {
            if (!name || !alt) return;

            setIsLoading(true);
            let imageUrl = url;

            // Si se seleccionó un nuevo archivo, primero lo subimos
            if (selectedFile) {
                // Subir la imagen usando el archivo directamente
                const uploadResult = await uploadImage({
                    name,
                    description: description || '',
                    alt: alt || '',
                    url: '',
                    file: selectedFile,
                    folder: "net-full"
                });

                if (!uploadResult || !uploadResult.url) {
                    throw new Error("Error al subir la imagen");
                }

                imageUrl = uploadResult.url;
            }

            // Actualizar la imagen en la base de datos
            await updateImage(imageId, {
                name,
                description: description || '',
                alt: alt || '',
                url: imageUrl
            });

            // No necesitamos hacer router.back() aquí porque updateImage ya incluye redirección
        } catch (error) {
            console.error("Error saving image:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p>Procesando imagen...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Editar Imagen</h2>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={handleSelectImage}
                        >
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleFileChange}
                            />

                            {previewUrl ? (
                                <div className="w-full flex flex-col items-center">
                                    <Image
                                        src={previewUrl}
                                        alt="Vista previa"
                                        className="max-h-40 max-w-full mb-4 rounded-md"
                                        width={100}
                                        height={100}
                                    />
                                    <Button variant="outline" type="button" size="sm">
                                        Cambiar imagen
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
                                    <p className="text-sm text-gray-600 mb-1">Haz clic para seleccionar una imagen</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                                </>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre de la imagen</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setIsFormDirty(true);
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                id="description"
                                value={description || ''}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setIsFormDirty(true);
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="alt">Texto alternativo (alt)</Label>
                            <Input
                                id="alt"
                                value={alt || ''}
                                onChange={(e) => {
                                    setAlt(e.target.value);
                                    setIsFormDirty(true);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ModalActions
                onSave={handleSave}
                isDisabled={!isFormDirty || (!selectedFile && !url) || !name || !alt || isLoading}
                saveLabel={isLoading ? "Guardando..." : "Guardar"}
            />
        </div>
    );
} 