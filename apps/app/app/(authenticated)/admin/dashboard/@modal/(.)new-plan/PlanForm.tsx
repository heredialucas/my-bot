"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Switch } from "@repo/design-system/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import ModalActions from "../../components/ModalActions";
import { useState } from "react";
import { createPlan } from "@repo/data-services";
import { Button } from "@repo/design-system/components/ui/button";
import { PlusCircle, X } from "lucide-react";

export default function PlanForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [regularPrice, setRegularPrice] = useState("");
    const [promoMonths, setPromoMonths] = useState("");
    const [channelCount, setChannelCount] = useState("");
    const [icon, setIcon] = useState("");
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Dynamic characteristics
    const [planCharacteristics, setPlanCharacteristics] = useState<Array<{
        key: string;
        value: boolean;
    }>>([
        { key: "Contenido Premium", value: false },
        { key: "Sin Anuncios", value: false }
    ]);

    const handleAddCharacteristic = () => {
        setPlanCharacteristics([...planCharacteristics, { key: "", value: false }]);
        setIsFormDirty(true);
    };

    const handleRemoveCharacteristic = (index: number) => {
        const newItems = [...planCharacteristics];
        newItems.splice(index, 1);
        setPlanCharacteristics(newItems);
        setIsFormDirty(true);
    };

    const handleCharacteristicChange = (index: number, field: string, value: string | boolean) => {
        const newItems = [...planCharacteristics];
        newItems[index] = { ...newItems[index], [field]: value };
        setPlanCharacteristics(newItems);
        setIsFormDirty(true);
    };

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

            // Extract premium content and no ads values from characteristics
            const premiumContent = planCharacteristics.find(c => c.key === "Contenido Premium")?.value || false;
            const noAds = planCharacteristics.find(c => c.key === "Sin Anuncios")?.value || false;

            // Usar la función del paquete directamente pero sin enviar el icon
            await createPlan({
                name,
                price: priceValue,
                regularPrice: regularPriceValue,
                promoMonths: promoMonthsValue,
                channelCount: channelCountValue,
                premiumContent,
                noAds,
                planType: "ZAPPING"
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
                            <Label htmlFor="price">Precio Promocional</Label>
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
                        </div>

                        <div className="space-y-4 mt-4">
                            <div className="flex justify-between items-center">
                                <Label>Características del plan</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAddCharacteristic}
                                    disabled={isSubmitting}
                                >
                                    <PlusCircle className="mr-1 h-4 w-4" />
                                    Agregar
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {planCharacteristics.map((characteristic, index) => (
                                    <div key={index} className="border rounded-md bg-gray-50 p-3 flex items-center gap-3">
                                        <div className="flex-grow">
                                            <Input
                                                placeholder="Nombre de la característica"
                                                value={characteristic.key}
                                                onChange={(e) => handleCharacteristicChange(index, 'key', e.target.value)}
                                                disabled={isSubmitting}
                                                className="h-8 text-sm mb-2"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id={`characteristic-value-${index}`}
                                                    checked={characteristic.value}
                                                    onCheckedChange={(checked) => handleCharacteristicChange(index, 'value', checked)}
                                                    disabled={isSubmitting}
                                                />
                                                <Label
                                                    htmlFor={`characteristic-value-${index}`}
                                                    className="text-xs"
                                                >
                                                    {characteristic.value ? 'Activado' : 'Desactivado'}
                                                </Label>
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveCharacteristic(index)}
                                            disabled={isSubmitting}
                                            className="h-6 w-6 text-red-500 hover:text-red-600"
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalActions
                onSave={handleSave}
                isDisabled={isSubmitting || !isFormDirty || !name || !price || !channelCount}
            />
        </div>
    );
} 