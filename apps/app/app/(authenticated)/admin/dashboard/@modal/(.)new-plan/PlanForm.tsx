"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Switch } from "@repo/design-system/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import ModalActions from "../../components/ModalActions";
import { useState } from "react";
import { createPlan } from "@repo/data-services";
import { Button } from "@repo/design-system/components/ui/button";
import { PlusCircle, X, ArrowRight, Check } from "lucide-react";

export default function PlanForm() {
    const [name, setName] = useState("Plan básico");
    const [price, setPrice] = useState("6990");
    const [regularPrice, setRegularPrice] = useState("9990");
    const [promoMonths, setPromoMonths] = useState("3");
    const [channelCount, setChannelCount] = useState("65");
    const [planType, setPlanType] = useState("Standard");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Estado para mostrar vista previa en móvil
    const [showPreviewMobile, setShowPreviewMobile] = useState(false);
    // Estado para características del plan
    const [planCharacteristics, setPlanCharacteristics] = useState<Array<{
        key: string;
        value: boolean;
    }>>([{ key: '', value: true }]);

    // Alternar la vista previa en móvil
    const toggleMobilePreview = () => {
        setShowPreviewMobile(!showPreviewMobile);
    };

    // Añadir nueva característica
    const addCharacteristic = () => {
        setPlanCharacteristics([...planCharacteristics, { key: '', value: true }]);
    };

    // Remover una característica
    const removeCharacteristic = (index: number) => {
        const updatedCharacteristics = [...planCharacteristics];
        updatedCharacteristics.splice(index, 1);
        setPlanCharacteristics(updatedCharacteristics);
    };

    // Actualizar una característica
    const updateCharacteristic = (index: number, field: 'key' | 'value', value: string | boolean) => {
        const updatedCharacteristics = [...planCharacteristics];
        updatedCharacteristics[index] = {
            ...updatedCharacteristics[index],
            [field]: value
        };
        setPlanCharacteristics(updatedCharacteristics);
    };

    const handleSave = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            setError(null);

            // Convertir los valores numéricos
            const priceValue = parseFloat(price);
            const regularPriceValue = regularPrice ? parseFloat(regularPrice) : null;
            const promoMonthsValue = promoMonths ? parseInt(promoMonths) : null;
            const channelCountValue = channelCount ? parseInt(channelCount) : null;

            // Filter out empty characteristics
            const filteredCharacteristics = planCharacteristics.filter(
                char => char.key.trim() !== ''
            );

            await createPlan({
                name,
                price: priceValue,
                regularPrice: regularPriceValue,
                promoMonths: promoMonthsValue,
                channelCount: channelCountValue,
                planType,
                characteristics: filteredCharacteristics.length > 0 ? filteredCharacteristics : []
            });

            // La redirección la maneja automáticamente el sistema
        } catch (error) {
            console.error("Error creating plan:", error);
            setError("Hubo un error al crear el plan. Por favor intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Componente de vista previa personalizado
    const PlanPreviewContent = () => (
        <div className="h-full flex flex-col text-sm">
            {/* Header */}
            <div className="bg-rose-600 text-white py-2 px-3 text-center">
                <h3 className="font-bold text-base">Elegí tu plan Zapping</h3>
            </div>

            {/* Plan content with black background */}
            <div className="bg-gray-900 text-white flex-1 p-3">
                {/* Back button */}
                <div className="flex items-center mb-3 text-xs">
                    <span className="mr-1">❮</span>
                    <span>Volver a mi plan</span>
                </div>

                {/* Plan radio selection */}
                <div className="mt-2">
                    <div className="flex items-center mb-1">
                        <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center mr-2">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                        <span className="font-medium text-sm">{name}</span>
                    </div>

                    {/* Price section */}
                    <div className="ml-6 mb-2">
                        <p className="text-xl font-bold">${parseFloat(price).toLocaleString('es-CL')}<span className="text-xs font-normal ml-1">primer mes</span></p>
                        <p className="text-xs text-gray-400">luego ${(regularPrice ? parseFloat(regularPrice) : parseFloat(price) + 2000).toLocaleString('es-CL')} /mes</p>
                    </div>

                    {/* Includes section */}
                    <div className="ml-6 mb-2">
                        <p className="text-xs uppercase text-gray-400">Incluye</p>
                        <div className="flex items-center">
                            <p className="text-xs font-medium">Zapping con <span className="text-rose-400">+{channelCount || 65} canales</span></p>
                            <ArrowRight className="h-3 w-3 text-white ml-1" />
                        </div>
                    </div>

                    {/* Características del plan */}
                    {planCharacteristics.length > 0 && (
                        <div className="ml-6 mb-3">
                            <p className="text-xs uppercase text-gray-400 mb-1">Características:</p>
                            <div className="space-y-1">
                                {planCharacteristics.map((char, idx) => (
                                    char.key && (
                                        <div key={idx} className="flex items-center text-xs">
                                            {char.value ? (
                                                <Check className="h-3 w-3 text-green-400 mr-1.5" />
                                            ) : (
                                                <X className="h-3 w-3 text-red-400 mr-1.5" />
                                            )}
                                            <span className={!char.value ? 'line-through text-gray-400' : ''}>
                                                {char.key}
                                            </span>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Zapping button */}
                    <div className="ml-6 mb-3">
                        <button className="bg-rose-600 text-white text-xs font-medium px-3 py-1 rounded">
                            ZAPPING
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full max-h-[80vh]">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Crear Nuevo Plan</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                {/* Botón para mostrar/ocultar vista previa en móvil */}
                <div className="flex justify-end mb-4 lg:hidden">
                    <Button
                        variant="outline"
                        onClick={toggleMobilePreview}
                    >
                        {showPreviewMobile ? 'Ocultar Vista Previa' : 'Ver Vista Previa'}
                    </Button>
                </div>

                {/* Vista previa móvil */}
                {showPreviewMobile && (
                    <div className="lg:hidden mb-6">
                        <h3 className="text-sm font-medium mb-2 text-gray-500">Vista previa</h3>
                        <div className="border rounded-lg overflow-hidden h-[350px]">
                            <PlanPreviewContent />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Vista previa de cómo se verá este plan en la web pública
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Columna izquierda - Formulario */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre del plan</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Precios en una fila */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Precio Promocional</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            disabled={isSubmitting}
                                            className="pl-7"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="regularPrice">Precio regular</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                                        <Input
                                            id="regularPrice"
                                            type="number"
                                            value={regularPrice}
                                            onChange={(e) => setRegularPrice(e.target.value)}
                                            disabled={isSubmitting}
                                            className="pl-7"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="promoMonths">Duración (meses)</Label>
                                <Input
                                    id="promoMonths"
                                    type="number"
                                    value={promoMonths}
                                    onChange={(e) => setPromoMonths(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="channelCount">Cantidad de canales</Label>
                                <Input
                                    id="channelCount"
                                    type="number"
                                    value={channelCount}
                                    onChange={(e) => setChannelCount(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="planType">Tipo de plan</Label>
                                <Select
                                    value={planType}
                                    onValueChange={(value) => setPlanType(value)}
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger id="planType">
                                        <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Basic">Básico</SelectItem>
                                        <SelectItem value="Standard">Estándar</SelectItem>
                                        <SelectItem value="Premium">Premium</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4 mt-2">
                                <div className="flex justify-between items-center">
                                    <Label>Características del plan</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addCharacteristic}
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
                                                    onChange={(e) => updateCharacteristic(index, 'key', e.target.value)}
                                                    disabled={isSubmitting}
                                                    className="h-8 text-sm mb-2"
                                                />
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id={`characteristic-value-${index}`}
                                                        checked={characteristic.value}
                                                        onCheckedChange={(checked) => updateCharacteristic(index, 'value', checked)}
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
                                                onClick={() => removeCharacteristic(index)}
                                                disabled={isSubmitting || planCharacteristics.length <= 1}
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

                    {/* Columna derecha - Vista previa (solo desktop) */}
                    <div className="hidden lg:block">
                        <h3 className="text-sm font-medium mb-2 text-gray-500">Vista previa</h3>
                        <div className="border rounded-lg overflow-hidden h-[450px]">
                            <PlanPreviewContent />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Vista previa de cómo se verá este plan en la web pública
                        </p>
                    </div>
                </div>
            </div>

            <ModalActions
                onCancel={() => window.history.back()}
                onSave={handleSave}
                isDisabled={isSubmitting || !name || !price}
            />
        </div>
    );
} 