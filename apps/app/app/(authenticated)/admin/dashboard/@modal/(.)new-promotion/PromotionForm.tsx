"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Switch } from "@repo/design-system/components/ui/switch";
import ModalActions from "../../components/ModalActions";
import { useState } from "react";
import { createPromotion } from "../../../server/promotionActions";

export default function PromotionForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [discount, setDiscount] = useState("");
    const [duration, setDuration] = useState("");
    const [active, setActive] = useState(true);
    const [color, setColor] = useState("");
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            setError(null);

            // Convertir los valores numéricos
            const discountValue = parseFloat(discount);
            const durationValue = parseInt(duration);

            // Usar la Server Action para crear la promoción
            await createPromotion({
                name,
                description,
                discount: discountValue,
                duration: durationValue,
                active,
                color: color || null,
            });

            // La redirección la maneja la Server Action
        } catch (error) {
            console.error("Error creating promotion:", error);
            setError("Hubo un error al crear la promoción. Por favor intenta de nuevo.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Nueva Promoción</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre de la promoción</Label>
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
                            <Label htmlFor="discount">Descuento (%)</Label>
                            <Input
                                id="discount"
                                type="number"
                                step="0.01"
                                value={discount}
                                onChange={(e) => {
                                    setDiscount(e.target.value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">Duración (meses)</Label>
                            <Input
                                id="duration"
                                type="number"
                                value={duration}
                                onChange={(e) => {
                                    setDuration(e.target.value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            />
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

                        <div className="flex items-center gap-2">
                            <Switch
                                id="active"
                                checked={active}
                                onCheckedChange={(checked) => {
                                    setActive(checked);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            />
                            <Label htmlFor="active">Activa</Label>
                        </div>
                    </div>
                </div>
            </div>

            <ModalActions
                onSave={handleSave}
                isDisabled={isSubmitting || !isFormDirty || !name || !description || !discount || !duration}
            />
        </div>
    );
} 