"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import ModalActions from "../../components/ModalActions";
import { useState } from "react";
import { createAddon } from "@repo/data-services";
import { Button } from "@repo/design-system/components/ui/button";

// Componente de vista previa
function AddonPreview({ name, price, isSelected = true }: {
    name: string;
    price: string | number;
    isSelected?: boolean;
}) {
    const displayName = name || "Complemento";
    const displayPrice = typeof price === 'string' ?
        (price ? parseFloat(price) : 0) : price;

    return (
        <div className="flex flex-col md:flex-row md:items-center max-w-2xl mx-auto md:justify-between md:px-5 px-4 md:py-5 py-3 md:border-4 border md:border-dashed border-gray-200 md:border-gray-300 rounded-lg md:rounded-3xl mb-3 md:mb-4 last:mb-0 relative">
            <div className="text-base text-center md:text-left md:text-lg font-medium mb-2 md:mb-0">
                ¿Quiere llevar un {displayName}?
            </div>
            <div className="flex md:hidden items-center justify-center">
                <div className="text-sm flex items-center gap-2">
                    Agregar por <span className="text-indigo-600 font-bold">${displayPrice.toLocaleString('es-CL')}</span>/mes
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="sr-only peer"
                        />
                        <div className="w-4 h-4 border-2 border-gray-400 rounded-sm peer-checked:bg-indigo-600 peer-checked:border-0 relative z-10 flex items-center justify-center after:content-['✓'] after:hidden peer-checked:after:block after:text-white after:text-xs"></div>
                    </label>
                </div>
            </div>
            <div className="hidden md:flex items-center mt-0">
                <div className="mr-4">
                    Agregar por <span className="text-indigo-600 font-bold">${displayPrice.toLocaleString('es-CL')}</span>/mes
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-sm peer-checked:bg-indigo-600 peer-checked:border-0 relative z-10 flex items-center justify-center after:content-['✓'] after:hidden peer-checked:after:block after:text-white after:text-xs"></div>
                </label>
            </div>
        </div>
    );
}

export default function AddonForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
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

            // Llamar directamente a la función createAddon del paquete @repo/data-services
            await createAddon({
                name,
                price: priceValue,
                icon: null,
                color: null
            });

            // La redirección la maneja automáticamente el sistema
        } catch (error) {
            console.error("Error creating addon:", error);
            setError("Hubo un error al crear el complemento. Por favor intenta de nuevo.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[80vh]">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Nuevo Complemento</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="space-y-4">
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
                    </div>

                    {/* Vista previa */}
                    <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-sm font-medium mb-2 text-gray-500">Vista previa</h3>
                        <div className="border rounded-lg overflow-hidden">
                            <AddonPreview
                                name={name}
                                price={price}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Vista previa de cómo se verá este complemento en la web pública
                        </p>
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