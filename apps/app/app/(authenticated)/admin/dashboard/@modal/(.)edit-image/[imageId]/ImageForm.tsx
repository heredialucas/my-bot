"use client";

import { Button } from "@repo/design-system/components/ui/button";
import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Image as ImageIcon } from "lucide-react";
import ModalActions from "../../../components/ModalActions";
import { useState, useRef, useEffect } from "react";

type Image = {
    id: string;
    name: string;
    description: string;
    url: string;
    alt: string;
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
    const [isLoading, setIsLoading] = useState(!image);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!image && imageId) {
            async function fetchImage() {
                try {
                    // Simulación de llamada a API
                    // Aquí iría la llamada real
                    const imageData = {
                        id: imageId,
                        name: "Banner promoción 16%",
                        description: "Imagen para la promoción de 16% de descuento",
                        url: "",
                        alt: "Banner promoción 16%"
                    };

                    setName(imageData.name);
                    setDescription(imageData.description);
                    setAlt(imageData.alt);
                    setUrl(imageData.url);
                    setPreviewUrl(imageData.url);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching image:", error);
                    setIsLoading(false);
                }
            }

            fetchImage();
        }
    }, [image, imageId]);

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
            const formData = new FormData();

            if (selectedFile) {
                formData.append('file', selectedFile);
            }

            formData.append('name', name);
            formData.append('description', description);
            formData.append('alt', alt);

            // Aquí iría la lógica para guardar en Prisma
            const response = await fetch(`/api/media/${imageId}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error al guardar la imagen");
            }
        } catch (error) {
            console.error("Error saving image:", error);
            throw error;
        }
    };

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center">
                Cargando...
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
                                    <img
                                        src={previewUrl}
                                        alt="Vista previa"
                                        className="max-h-40 max-w-full mb-4 rounded-md"
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
                                value={description}
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
                                value={alt}
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
                isDisabled={!isFormDirty || (!selectedFile && !url) || !name || !alt}
            />
        </div>
    );
} 