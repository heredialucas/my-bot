"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import ModalActions from "../../../components/ModalActions";
import { useState } from "react";
import { updateAddon } from "../../../../server/addonActions";

interface AddonData {
    id: string;
    name: string;
    description: string | null;
    price: number;
    icon: string | null;
    color: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export default function AddonForm({ initialData }: { initialData: AddonData }) {
    const [name, setName] = useState(initialData.name);
    const [description, setDescription] = useState(initialData.description || "");
    const [price, setPrice] = useState(initialData.price.toString());
    const [icon, setIcon] = useState(initialData.icon || "Package");
    const [color, setColor] = useState(initialData.color || "");
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            setError(null);

            // Convertir los valores numéricos
            const priceValue = parseFloat(price);

            // Usar la Server Action para actualizar el complemento
            await updateAddon(initialData.id, {
                name,
                description,
                price: priceValue,
                icon,
                color: color || null,
            });

            // La redirección la maneja la Server Action
        } catch (error) {
            console.error("Error updating addon:", error);
            setError("Hubo un error al actualizar el complemento. Por favor intenta de nuevo.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Editar Complemento</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre del complemento</Label>
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
                            <Label htmlFor="price">Precio</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
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
                                    <SelectItem value="Package">Paquete</SelectItem>
                                    <SelectItem value="Wifi">Wifi</SelectItem>
                                    <SelectItem value="Monitor">Monitor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="color">Color (opcional)</Label>
                            <Input
                                id="color"
                                value={color}
                                onChange={(e) => {
                                    setColor(e.target.value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ModalActions
                onSave={handleSave}
                isDisabled={isSubmitting || !isFormDirty || !name || !description || !price}
            />
        </div>
    );
} 