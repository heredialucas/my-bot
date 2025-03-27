"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import ModalActions from "../../../components/ModalActions";
import { useState } from "react";
import { updateService } from "@repo/data-services";
import { useRouter } from "next/navigation";
import { Button } from "@repo/design-system/components/ui/button";
import { PlusCircle, X, Gauge, FileText, Calendar, Clock, Wrench, CheckCircle, Wifi, Zap, Shield, Star, Award } from "lucide-react";
import ServicePreview from "../../../components/ServicePreview";
import { ServiceItem } from "../../../types";

// Mapeo de nombres de íconos a componentes de Lucide
const iconMap = {
    Gauge: <Gauge className="h-4 w-4" />,
    FileText: <FileText className="h-4 w-4" />,
    Calendar: <Calendar className="h-4 w-4" />,
    Clock: <Clock className="h-4 w-4" />,
    Wrench: <Wrench className="h-4 w-4" />,
    CheckCircle: <CheckCircle className="h-4 w-4" />,
    Wifi: <Wifi className="h-4 w-4" />,
    Zap: <Zap className="h-4 w-4" />,
    Shield: <Shield className="h-4 w-4" />,
    Star: <Star className="h-4 w-4" />,
    Award: <Award className="h-4 w-4" />
};

// Tipo que usa el formulario para representar ServiceItems
interface ServiceItemForm {
    id?: string;
    title: string;
    description: string | null;
    icon: string | null;
}

// Reutilizamos la interfaz para el formulario
interface ServiceData {
    id: string;
    name: string;
    icon?: string | null;
    serviceItems?: ServiceItemForm[];
    speed?: number | null;
    price?: number | null;
    regularPrice?: number | null;
    promoMonths?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
}

// Datos para la vista previa
interface ServicePreviewData {
    name: string;
    speed?: number | null;
    price?: number | null;
    regularPrice?: number | null;
    promoMonths?: number | null;
    serviceItems?: Array<{
        title: string;
        description?: string | null;
        icon?: string | null;
    }>;
}

export default function ServiceForm({ initialData }: { initialData: ServiceData }) {
    const router = useRouter();
    const [name, setName] = useState(initialData.name);
    const [speed, setSpeed] = useState(initialData.speed ? initialData.speed.toString() : "");
    const [price, setPrice] = useState(initialData.price ? initialData.price.toString() : "");
    const [regularPrice, setRegularPrice] = useState(initialData.regularPrice ? initialData.regularPrice.toString() : "");
    const [promoMonths, setPromoMonths] = useState(initialData.promoMonths ? initialData.promoMonths.toString() : "");
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Nuevo estado para controlar la visibilidad de la vista previa en móvil
    const [showPreviewMobile, setShowPreviewMobile] = useState(false);

    // Service items (benefits)
    const [serviceItems, setServiceItems] = useState<ServiceItemForm[]>(
        initialData.serviceItems || []
    );

    // Datos actuales para la vista previa
    const previewData: ServicePreviewData = {
        name,
        speed: speed ? parseInt(speed) : null,
        price: price ? parseFloat(price) : null,
        regularPrice: regularPrice ? parseFloat(regularPrice) : null,
        promoMonths: promoMonths ? parseInt(promoMonths) : null,
        serviceItems: serviceItems
    };

    const handleAddServiceItem = () => {
        setServiceItems([
            ...serviceItems,
            { title: "", description: null, icon: "CheckCircle" }
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
                icon: null, // Ya no usamos icon
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

    // Función para alternar la visibilidad de la vista previa en móvil
    const toggleMobilePreview = () => {
        setShowPreviewMobile(!showPreviewMobile);
    };

    return (
        <div className="flex flex-col h-full max-h-[80vh]">
            <div className="p-4 md:p-6 overflow-y-auto flex-1">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Editar Servicio de Internet</h2>

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
                        className="mb-2"
                    >
                        {showPreviewMobile ? 'Ocultar Vista Previa' : 'Ver Vista Previa'}
                    </Button>
                </div>

                {/* Vista previa para móvil */}
                {showPreviewMobile && (
                    <div className="lg:hidden mb-6">
                        <h3 className="text-sm font-medium mb-2 text-gray-500">Vista previa</h3>
                        <div className="border rounded-lg overflow-hidden h-[400px]">
                            <ServicePreview service={previewData} />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Vista previa de cómo se verá este servicio en la web pública
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Columna del formulario */}
                    <div className="space-y-4 md:space-y-6">
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
                                className="h-10"
                            />
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
                                className="h-10"
                            />
                        </div>

                        {/* Precios alineados en grid de dos columnas */}
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="price">Precio Promocional</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={price}
                                        onChange={(e) => {
                                            setPrice(e.target.value);
                                            setIsFormDirty(true);
                                        }}
                                        disabled={isSubmitting}
                                        className="h-10 pl-7"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="regularPrice">Precio Regular</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                                    <Input
                                        id="regularPrice"
                                        type="number"
                                        value={regularPrice}
                                        onChange={(e) => {
                                            setRegularPrice(e.target.value);
                                            setIsFormDirty(true);
                                        }}
                                        disabled={isSubmitting}
                                        className="h-10 pl-7"
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
                                onChange={(e) => {
                                    setPromoMonths(e.target.value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                                className="h-10"
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
                                    <div key={index} className="border rounded-md bg-gray-50 p-3">
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
                                        <div className="grid grid-cols-1 gap-2">
                                            <Input
                                                id={`item-title-${index}`}
                                                value={item.title}
                                                onChange={(e) => handleServiceItemChange(index, 'title', e.target.value)}
                                                disabled={isSubmitting}
                                                className="h-9"
                                                placeholder="Título del beneficio"
                                            />
                                            <div className="flex flex-wrap md:flex-nowrap gap-2">
                                                <div className="w-full md:w-3/4">
                                                    <Label htmlFor={`item-description-${index}`} className="text-xs mb-1 block">Descripción</Label>
                                                    <Input
                                                        id={`item-description-${index}`}
                                                        value={item.description || ''}
                                                        onChange={(e) => handleServiceItemChange(index, 'description', e.target.value)}
                                                        disabled={isSubmitting}
                                                        className="h-9"
                                                        placeholder="Descripción breve"
                                                    />
                                                </div>
                                                <div className="w-full md:w-1/4">
                                                    <Label htmlFor={`item-icon-${index}`} className="text-xs mb-1 block">Icono</Label>
                                                    <Select
                                                        value={item.icon || ''}
                                                        onValueChange={(value) => handleServiceItemChange(index, 'icon', value)}
                                                        disabled={isSubmitting}
                                                    >
                                                        <SelectTrigger id={`item-icon-${index}`} className="h-9">
                                                            <SelectValue placeholder="Icono">
                                                                {item.icon && (
                                                                    <div className="flex items-center gap-1">
                                                                        {iconMap[item.icon as keyof typeof iconMap] || <CheckCircle className="h-4 w-4" />}
                                                                    </div>
                                                                )}
                                                            </SelectValue>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Gauge">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-blue-100 p-1 rounded-full">
                                                                        <Gauge className="h-4 w-4 text-blue-600" />
                                                                    </div>
                                                                    <span>Velocímetro</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="FileText">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-gray-100 p-1 rounded-full">
                                                                        <FileText className="h-4 w-4 text-gray-600" />
                                                                    </div>
                                                                    <span>Documento</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="Calendar">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-green-100 p-1 rounded-full">
                                                                        <Calendar className="h-4 w-4 text-green-600" />
                                                                    </div>
                                                                    <span>Calendario</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="Clock">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-orange-100 p-1 rounded-full">
                                                                        <Clock className="h-4 w-4 text-orange-600" />
                                                                    </div>
                                                                    <span>Reloj</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="Wrench">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-purple-100 p-1 rounded-full">
                                                                        <Wrench className="h-4 w-4 text-purple-600" />
                                                                    </div>
                                                                    <span>Herramientas</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="CheckCircle">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-green-100 p-1 rounded-full">
                                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                                    </div>
                                                                    <span>Check</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="Wifi">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-blue-100 p-1 rounded-full">
                                                                        <Wifi className="h-4 w-4 text-blue-600" />
                                                                    </div>
                                                                    <span>Wifi</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="Zap">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-yellow-100 p-1 rounded-full">
                                                                        <Zap className="h-4 w-4 text-yellow-600" />
                                                                    </div>
                                                                    <span>Rayo</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="Shield">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-indigo-100 p-1 rounded-full">
                                                                        <Shield className="h-4 w-4 text-indigo-600" />
                                                                    </div>
                                                                    <span>Escudo</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="Star">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-yellow-100 p-1 rounded-full">
                                                                        <Star className="h-4 w-4 text-yellow-600" />
                                                                    </div>
                                                                    <span>Estrella</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="Award">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-red-100 p-1 rounded-full">
                                                                        <Award className="h-4 w-4 text-red-600" />
                                                                    </div>
                                                                    <span>Premio</span>
                                                                </div>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Columna de la vista previa */}
                    <div className="hidden lg:block">
                        <div className="sticky top-0">
                            <h3 className="text-sm font-medium mb-2 text-gray-500">Vista previa</h3>
                            <div className="border rounded-lg overflow-hidden h-[500px]">
                                <ServicePreview service={previewData} />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Vista previa de cómo se verá este servicio en la web pública
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ModalActions
                onCancel={() => router.back()}
                onSave={handleSave}
                isDisabled={!isFormDirty || isSubmitting}
            />
        </div>
    );
} 