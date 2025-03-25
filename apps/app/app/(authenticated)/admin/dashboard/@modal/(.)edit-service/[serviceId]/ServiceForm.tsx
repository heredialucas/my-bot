"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import ModalActions from "../../../components/ModalActions";
import { useState } from "react";
import { updateService } from "@repo/data-services";
import { useRouter } from "next/navigation";
import { Button } from "@repo/design-system/components/ui/button";
import { PlusCircle, X } from "lucide-react";

// Tipo que usa el formulario para representar ServiceItems
interface ServiceItemForm {
    id?: string;
    title: string;
    description: string | null;
    icon: string | null;
}

// Tipo que espera la API (server action)
type ServiceItemAPI = {
    title: string;
    description?: string;
    icon?: string;
};

interface ServiceData {
    id: string;
    name: string;
    icon: string | null;
    serviceItems?: ServiceItemForm[];
    speed?: number | null;
    price?: number | null;
    regularPrice?: number | null;
    promoMonths?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export default function ServiceForm({ initialData }: { initialData: ServiceData }) {
    const router = useRouter();
    const [name, setName] = useState(initialData.name);
    const [icon, setIcon] = useState(initialData.icon || "Wifi");
    const [speed, setSpeed] = useState(initialData.speed ? initialData.speed.toString() : "");
    const [price, setPrice] = useState(initialData.price ? initialData.price.toString() : "");
    const [regularPrice, setRegularPrice] = useState(initialData.regularPrice ? initialData.regularPrice.toString() : "");
    const [promoMonths, setPromoMonths] = useState(initialData.promoMonths ? initialData.promoMonths.toString() : "");
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Service items (benefits)
    const [serviceItems, setServiceItems] = useState<ServiceItemForm[]>(
        initialData.serviceItems || []
    );

    const handleAddServiceItem = () => {
        setServiceItems([
            ...serviceItems,
            { title: "", description: null, icon: null }
        ]);
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

        setIsSubmitting(true);
        setError(null);

        try {
            const serviceData = {
                id: initialData.id,
                name,
                icon,
                speed: speed ? parseInt(speed) : null,
                price: price ? parseFloat(price) : null,
                regularPrice: regularPrice ? parseFloat(regularPrice) : null,
                promoMonths: promoMonths ? parseInt(promoMonths) : null,
                serviceItems: serviceItems.map(item => ({
                    id: item.id,
                    title: item.title,
                    description: item.description || undefined,
                    icon: item.icon || undefined
                }))
            };

            await updateService(initialData.id, serviceData);
        } catch (error) {
            console.error('Error updating service:', error);
            setError("Hubo un error al actualizar el servicio. Por favor intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[80vh]">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Editar Servicio de Internet</h2>

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
                                <SelectItem value="Package">
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 mr-2 flex items-center justify-center bg-orange-100 rounded-full">📦</div>
                                        Paquete
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="text-xs text-gray-500 mt-1">
                            El icono se mostrará junto al nombre del servicio.
                        </div>
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
                                <div key={index} className="flex flex-col space-y-4 p-4 border rounded-md relative mb-4">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-2"
                                        onClick={() => handleRemoveServiceItem(index)}
                                        disabled={isSubmitting}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor={`item-title-${index}`}>Título</Label>
                                            <Input
                                                id={`item-title-${index}`}
                                                value={item.title}
                                                onChange={(e) => handleServiceItemChange(index, 'title', e.target.value)}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`item-description-${index}`}>Descripción</Label>
                                            <Input
                                                id={`item-description-${index}`}
                                                value={item.description || ""}
                                                onChange={(e) => handleServiceItemChange(index, 'description', e.target.value)}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`item-icon-${index}`}>Icono</Label>
                                            <Select
                                                value={item.icon || ""}
                                                onValueChange={(value) => handleServiceItemChange(index, 'icon', value)}
                                                disabled={isSubmitting}
                                            >
                                                <SelectTrigger id={`item-icon-${index}`}>
                                                    <SelectValue placeholder="Seleccionar icono" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Gauge">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-cyan-100 rounded-full">🔄</div>
                                                            Velocímetro
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="FileText">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-cyan-100 rounded-full">📄</div>
                                                            Documento
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="Calendar">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-cyan-100 rounded-full">📅</div>
                                                            Calendario
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="Clock">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-cyan-100 rounded-full">⏰</div>
                                                            Reloj
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="Wrench">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-cyan-100 rounded-full">🔧</div>
                                                            Herramientas
                                                        </div>
                                                    </SelectItem>
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
                                                    <SelectItem value="Package">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-orange-100 rounded-full">📦</div>
                                                            Paquete
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="Star">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-yellow-100 rounded-full">⭐</div>
                                                            Estrella
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="Award">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-green-100 rounded-full">🏆</div>
                                                            Premio
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="Cpu">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-gray-100 rounded-full">💻</div>
                                                            CPU
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="Database">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-blue-100 rounded-full">🗄️</div>
                                                            Base de datos
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="HardDrive">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-gray-100 rounded-full">💽</div>
                                                            Disco duro
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="Phone">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-green-100 rounded-full">📱</div>
                                                            Teléfono
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="Tv">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-red-100 rounded-full">📺</div>
                                                            TV
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="Signal">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 mr-2 flex items-center justify-center bg-blue-100 rounded-full">📡</div>
                                                            Señal
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <div className="text-xs text-gray-500 mt-1">
                                                El icono se mostrará junto al nombre del elemento.
                                            </div>
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
                isDisabled={isSubmitting || !isFormDirty || !name || !icon}
            />
        </div>
    );
} 