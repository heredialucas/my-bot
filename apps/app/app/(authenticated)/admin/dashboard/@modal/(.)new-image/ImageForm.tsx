"use client";

import { Button } from "@repo/design-system/components/ui/button";
import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Image as ImageIcon } from "lucide-react";
import ModalActions from "../../components/ModalActions";
import { useState, useRef } from "react";
import { uploadImage, createImage } from "@repo/data-services";

export default function ImageForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [alt, setAlt] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            if (!selectedFile || !name || !alt) return;

            // Preparamos los datos para la acción de uploadImage
            const imageData = {
                name,
                description,
                alt,
                url: "", // Esta URL se obtendrá desde el servidor después de subir el archivo
                file: selectedFile,
                folder: "net-full"
            };

            // Subimos la imagen y obtenemos la URL
            const uploadResult = await uploadImage(imageData);

            if (!uploadResult || !uploadResult.url) {
                throw new Error("Error al subir la imagen");
            }

            // Creamos el registro en la base de datos con la URL obtenida
            await createImage({
                name,
                description,
                alt,
                url: uploadResult.url,
                file: selectedFile || new Blob(),
                folder: "net-full"
            });

            // La redirección la maneja automáticamente el sistema
        } catch (error) {
            console.error("Error saving image:", error);
        } finally {
            setIsLoading(false);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Subir Nueva Imagen</h2>

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
                                placeholder="Ej: Banner promocional"
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
                                placeholder="Describe para qué se usa esta imagen"
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
                                placeholder="Texto para accesibilidad"
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
                isDisabled={!isFormDirty || !selectedFile || !name || !alt}
            />
        </div>
    );
} 