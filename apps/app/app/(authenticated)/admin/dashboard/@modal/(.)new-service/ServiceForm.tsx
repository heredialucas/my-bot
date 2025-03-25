"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import ModalActions from "../../components/ModalActions";
import { useState } from "react";
import { createService } from "@repo/data-services";
import { useRouter } from "next/navigation";
import { Button } from "@repo/design-system/components/ui/button";
import { PlusCircle, X } from "lucide-react";

export default function ServiceForm() {
    const router = useRouter();
    const [name, setName] = useState("");
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
        setIsSubmitting(true);
        setError(null);

        try {
            await createService({
                name,
                icon,
                speed: speed ? parseInt(speed) : null,
                price: price ? parseFloat(price) : null,
                regularPrice: regularPrice ? parseFloat(regularPrice) : null,
                promoMonths: promoMonths ? parseInt(promoMonths) : null,
                serviceItems: serviceItems.map(item => ({
                    title: item.title,
                    icon: item.icon || undefined
                }))
            });
        } catch (error) {
            console.error('Error creating service:', error);
        } finally {
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

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="price">Precio Promocional</Label>
                            <Input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="regularPrice">Precio Regular</Label>
                            <Input
                                id="regularPrice"
                                type="number"
                                value={regularPrice}
                                onChange={(e) => {
                                    setRegularPrice(e.target.value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            />
                        </div>
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
                                                <SelectItem value="Star">Estrella</SelectItem>
                                                <SelectItem value="Award">Premio</SelectItem>
                                                <SelectItem value="Cpu">CPU</SelectItem>
                                                <SelectItem value="Database">Base de datos</SelectItem>
                                                <SelectItem value="HardDrive">Disco duro</SelectItem>
                                                <SelectItem value="Monitor">Monitor</SelectItem>
                                                <SelectItem value="Package">Paquete</SelectItem>
                                                <SelectItem value="Phone">Teléfono</SelectItem>
                                                <SelectItem value="Radio">Radio</SelectItem>
                                                <SelectItem value="Tv">TV</SelectItem>
                                                <SelectItem value="Signal">Señal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <ModalActions
                onSave={handleSave}
                isDisabled={isSubmitting || !isFormDirty || !name || !icon || !speed || !price}
            />
        </div>
    );
} 