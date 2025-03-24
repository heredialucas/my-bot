"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Switch } from "@repo/design-system/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import ModalActions from "../../components/ModalActions";
import { useState } from "react";
import { createPlan } from "@repo/data-services";

export default function PlanForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [regularPrice, setRegularPrice] = useState("");
    const [promoMonths, setPromoMonths] = useState("");
    const [channelCount, setChannelCount] = useState("");
    const [premiumContent, setPremiumContent] = useState(false);
    const [noAds, setNoAds] = useState(false);
    const [icon, setIcon] = useState("");
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
            const regularPriceValue = regularPrice ? parseFloat(regularPrice) : null;
            const promoMonthsValue = promoMonths ? parseInt(promoMonths) : null;
            const channelCountValue = channelCount ? parseInt(channelCount) : null;

            // Usar la función del paquete directamente pero sin enviar el icon
            await createPlan({
                name,
                description,
                price: priceValue,
                regularPrice: regularPriceValue,
                promoMonths: promoMonthsValue,
                channelCount: channelCountValue,
                premiumContent,
                noAds,
                planType: "ZAPPING", // Fixed as Zapping
            });

            // La redirección la maneja automáticamente el sistema
        } catch (error) {
            console.error("Error creating zapping plan:", error);
            setError("Hubo un error al crear el plan. Por favor intenta de nuevo.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[80vh]">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Nuevo Plan</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre del plan</Label>
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
                                className="h-20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="channelCount">Cantidad de canales</Label>
                            <Input
                                id="channelCount"
                                type="number"
                                value={channelCount}
                                onChange={(e) => {
                                    setChannelCount(e.target.value);
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
                                        <SelectItem value="Basic">
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 mr-2 flex items-center justify-center bg-blue-100 rounded-full">🔵</div>
                                                Básico
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="Standard">
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 mr-2 flex items-center justify-center bg-green-100 rounded-full">🟢</div>
                                                Estándar
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="Premium">
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 mr-2 flex items-center justify-center bg-purple-100 rounded-full">⭐</div>
                                                Premium
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="text-xs text-gray-500 mt-1">
                                    El icono se mostrará junto al nombre del plan.
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Precio promocional</Label>
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
                                <Label htmlFor="regularPrice">Precio regular</Label>
                                <Input
                                    id="regularPrice"
                                    type="number"
                                    step="0.01"
                                    value={regularPrice}
                                    onChange={(e) => {
                                        setRegularPrice(e.target.value);
                                        setIsFormDirty(true);
                                    }}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="promoMonths">Duración (meses)</Label>
                                <Input
                                    id="promoMonths"
                                    type="number"
                                    value={promoMonths}
                                    onChange={(e) => {
                                        setPromoMonths(e.target.value);
                                        setIsFormDirty(true);
                                    }}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="space-y-4 mt-4">
                            <h3 className="text-sm font-medium">Características del plan</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="premiumContent"
                                        checked={premiumContent}
                                        onCheckedChange={(checked) => {
                                            setPremiumContent(checked);
                                            setIsFormDirty(true);
                                        }}
                                        disabled={isSubmitting}
                                    />
                                    <Label htmlFor="premiumContent" className="cursor-pointer">Incluye contenido premium</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="noAds"
                                        checked={noAds}
                                        onCheckedChange={(checked) => {
                                            setNoAds(checked);
                                            setIsFormDirty(true);
                                        }}
                                        disabled={isSubmitting}
                                    />
                                    <Label htmlFor="noAds" className="cursor-pointer">Sin anuncios</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalActions
                onSave={handleSave}
                isDisabled={isSubmitting || !isFormDirty || !name || !description || !price || !channelCount}
            />
        </div>
    );
} 