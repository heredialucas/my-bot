"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import ModalActions from "../../../components/ModalActions";
import { useState } from "react";
import { updateAddon } from "@repo/data-services";

interface AddonData {
    id: string;
    name: string;
    price: number;
    icon: string | null;
    color: string | null;
}

export default function AddonForm({ initialData }: { initialData: AddonData }) {
    const [name, setName] = useState(initialData.name);
    const [price, setPrice] = useState(initialData.price.toString());
    const [icon, setIcon] = useState(initialData.icon || "");
    const [color, setColor] = useState(initialData.color || "");
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await updateAddon(initialData.id, {
                name,
                price: parseFloat(price),
                icon: icon || null,
                color: color || null,
            });
        } catch (error) {
            console.error("Error updating addon:", error);
            setError("Hubo un error al actualizar el complemento. Por favor intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[80vh]">
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

                        <div className="grid grid-cols-2 gap-3">
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
                                        <SelectItem value="Wifi">
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 mr-2 flex items-center justify-center bg-blue-100 rounded-full">📶</div>
                                                Wifi
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="Monitor">
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 mr-2 flex items-center justify-center bg-purple-100 rounded-full">🖥️</div>
                                                Monitor
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="text-xs text-gray-500 mt-1">
                                    El icono se mostrará junto al nombre del complemento.
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="color">Color</Label>
                                <Input
                                    id="color"
                                    value={color}
                                    onChange={(e) => {
                                        setColor(e.target.value);
                                        setIsFormDirty(true);
                                    }}
                                    disabled={isSubmitting}
                                />
                                <div className="text-xs text-gray-500 mt-1">
                                    Color para resaltar el complemento.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalActions
                onSave={handleSave}
                isDisabled={isSubmitting || !isFormDirty || !name || !price}
            />
        </div>
    );
} 