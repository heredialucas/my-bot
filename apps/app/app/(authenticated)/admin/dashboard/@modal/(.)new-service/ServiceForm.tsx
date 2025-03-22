"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import ModalActions from "../../components/ModalActions";
import { useState } from "react";
import { createService } from "../../../server/serviceActions";
import { useRouter } from "next/navigation";

export default function ServiceForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("Wifi");
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            setError(null);

            // Usar la Server Action para crear el servicio
            await createService({
                name,
                description,
                icon,
            });

            // La redirección la maneja la Server Action
        } catch (error) {
            console.error("Error creating service:", error);
            setError("Hubo un error al crear el servicio. Por favor intenta de nuevo.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Nuevo Tipo de Servicio</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre del servicio</Label>
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
                            <Label htmlFor="icon">Icono</Label>
                            <Select
                                value={icon}
                                onValueChange={(value) => {
                                    setIcon(value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger id="icon">
                                    <SelectValue placeholder="Seleccionar icono" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Wifi">Wifi</SelectItem>
                                    <SelectItem value="Monitor">Monitor</SelectItem>
                                    <SelectItem value="Package">Paquete</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <ModalActions
                onSave={handleSave}
                isDisabled={isSubmitting || !isFormDirty || !name || !description || !icon}
            />
        </div>
    );
} 