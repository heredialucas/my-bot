"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import ModalActions from "../../components/ModalActions";
import { useState } from "react";
import { createService } from "../../../server/serviceActions";
import { useRouter } from "next/navigation";
import { Button } from "@repo/design-system/components/ui/button";
import { PlusCircle, X } from "lucide-react";

export default function ServiceForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("Wifi");
    const [speed, setSpeed] = useState("");
    const [price, setPrice] = useState("");
    const [regularPrice, setRegularPrice] = useState("");
    const [promoMonths, setPromoMonths] = useState("");
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Service items (benefits)
    const [serviceItems, setServiceItems] = useState<Array<{
        title: string;
        description?: string;
        icon?: string;
    }>>([]);

    const handleAddServiceItem = () => {
        setServiceItems([...serviceItems, { title: "", icon: "CheckCircle" }]);
        setIsFormDirty(true);
    };

    const handleRemoveServiceItem = (index: number) => {
        const newItems = [...serviceItems];
        newItems.splice(index, 1);
        setServiceItems(newItems);
        setIsFormDirty(true);
    };

    const handleServiceItemChange = (index: number, field: string, value: string) => {
        const newItems = [...serviceItems];
        newItems[index] = { ...newItems[index], [field]: value };
        setServiceItems(newItems);
        setIsFormDirty(true);
    };

    const handleSave = async () => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            setError(null);

            // Convertir los valores numéricos
            const speedValue = speed ? parseInt(speed) : null;
            const priceValue = price ? parseFloat(price) : null;
            const regularPriceValue = regularPrice ? parseFloat(regularPrice) : null;
            const promoMonthsValue = promoMonths ? parseInt(promoMonths) : null;

            // Usar la Server Action para crear el servicio
            await createService({
                name,
                description,
                icon,
                serviceItems,
                speed: speedValue,
                price: priceValue,
                regularPrice: regularPriceValue,
                promoMonths: promoMonthsValue
            });

            // La redirección la maneja la Server Action
        } catch (error) {
            console.error("Error creating service:", error);
            setError("Hubo un error al crear el servicio. Por favor intenta de nuevo.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[80vh]">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Nuevo Servicio de Internet</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
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

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="speed">Velocidad (Mbps)</Label>
                            <Input
                                id="speed"
                                type="number"
                                value={speed}
                                onChange={(e) => {
                                    setSpeed(e.target.value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            />
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

                    {/* Service Items Section */}
                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center">
                            <Label>Características del servicio</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAddServiceItem}
                                disabled={isSubmitting}
                            >
                                <PlusCircle className="mr-1 h-4 w-4" />
                                Agregar
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {serviceItems.map((item, index) => (
                                <div key={index} className="border rounded-md bg-gray-50 p-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <Label htmlFor={`item-title-${index}`} className="text-xs font-medium">Título</Label>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveServiceItem(index)}
                                            disabled={isSubmitting}
                                            className="h-6 w-6"
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <Input
                                        id={`item-title-${index}`}
                                        value={item.title}
                                        onChange={(e) => handleServiceItemChange(index, 'title', e.target.value)}
                                        disabled={isSubmitting}
                                        className="h-7 text-sm mb-2"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                            <Label htmlFor={`item-description-${index}`} className="text-xs">Descripción</Label>
                                            <Input
                                                id={`item-description-${index}`}
                                                value={item.description || ''}
                                                onChange={(e) => handleServiceItemChange(index, 'description', e.target.value)}
                                                disabled={isSubmitting}
                                                className="h-7 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor={`item-icon-${index}`} className="text-xs">Icono</Label>
                                            <Select
                                                value={item.icon}
                                                onValueChange={(value) => handleServiceItemChange(index, 'icon', value)}
                                                disabled={isSubmitting}
                                            >
                                                <SelectTrigger id={`item-icon-${index}`} className="h-7 text-sm">
                                                    <SelectValue placeholder="Icono" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="CheckCircle">Check</SelectItem>
                                                    <SelectItem value="Wifi">Wifi</SelectItem>
                                                    <SelectItem value="Clock">Reloj</SelectItem>
                                                    <SelectItem value="Zap">Rayo</SelectItem>
                                                    <SelectItem value="Shield">Escudo</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <ModalActions
                onSave={handleSave}
                isDisabled={isSubmitting || !isFormDirty || !name || !description || !icon || !speed || !price}
            />
        </div>
    );
} 