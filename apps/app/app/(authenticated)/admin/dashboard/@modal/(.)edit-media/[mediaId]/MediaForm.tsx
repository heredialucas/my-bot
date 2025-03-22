"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import ModalActions from "../../../components/ModalActions";
import { useState } from "react";
import { updateMedia } from "../../../../server/mediaActions";

interface MediaData {
    id: string;
    name: string;
    description: string | null;
    url: string;
    alt: string | null;
    type: 'IMAGE' | 'VIDEO';
    createdAt?: Date;
    updatedAt?: Date;
}

export default function MediaForm({ initialData }: { initialData: MediaData }) {
    const [name, setName] = useState(initialData.name);
    const [description, setDescription] = useState(initialData.description || "");
    const [url, setUrl] = useState(initialData.url);
    const [alt, setAlt] = useState(initialData.alt || "");
    const [type, setType] = useState<"IMAGE" | "VIDEO">(initialData.type);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            setError(null);

            // Usar la Server Action para actualizar el medio
            await updateMedia(initialData.id, {
                name,
                description,
                url,
                alt: alt || null,
                type,
            });

            // La redirección la maneja la Server Action
        } catch (error) {
            console.error("Error updating media:", error);
            setError("Hubo un error al actualizar el medio. Por favor intenta de nuevo.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Editar Medio</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="url">URL</Label>
                            <Input
                                id="url"
                                value={url}
                                onChange={(e) => {
                                    setUrl(e.target.value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="alt">Texto alternativo (opcional)</Label>
                            <Input
                                id="alt"
                                value={alt}
                                onChange={(e) => {
                                    setAlt(e.target.value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo</Label>
                            <Select
                                value={type}
                                onValueChange={(value: "IMAGE" | "VIDEO") => {
                                    setType(value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Seleccionar tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="IMAGE">Imagen</SelectItem>
                                    <SelectItem value="VIDEO">Video</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <ModalActions
                onSave={handleSave}
                isDisabled={isSubmitting || !isFormDirty || !name || !url || !type}
            />
        </div>
    );
} 