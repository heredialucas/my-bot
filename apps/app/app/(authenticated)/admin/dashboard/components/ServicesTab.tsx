"use client";

import { Button } from "@repo/design-system/components/ui/button"
import { PlusIcon, PencilIcon, TrashIcon, Wifi, Monitor, Package, CheckCircle, Gauge, FileText, Calendar, Clock, Wrench, Zap, Shield, Star, Award } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/design-system/components/ui/card"
import { useState } from "react";
import ServicePreview from "./ServicePreview";
import { ServiceData, ServiceItem } from "../types";

// Función para renderizar el ícono adecuado basado en el nombre
const renderIcon = (iconName: string | null) => {
    if (!iconName) return <CheckCircle className="h-4 w-4 mr-1" />;

    switch (iconName) {
        case 'Wifi': return <Wifi className="h-4 w-4 mr-1" />;
        case 'Monitor': return <Monitor className="h-4 w-4 mr-1" />;
        case 'Package': return <Package className="h-4 w-4 mr-1" />;
        case 'Gauge': return <Gauge className="h-4 w-4 mr-1" />;
        case 'FileText': return <FileText className="h-4 w-4 mr-1" />;
        case 'Calendar': return <Calendar className="h-4 w-4 mr-1" />;
        case 'Clock': return <Clock className="h-4 w-4 mr-1" />;
        case 'Wrench': return <Wrench className="h-4 w-4 mr-1" />;
        case 'Zap': return <Zap className="h-4 w-4 mr-1" />;
        case 'Shield': return <Shield className="h-4 w-4 mr-1" />;
        case 'Star': return <Star className="h-4 w-4 mr-1" />;
        case 'Award': return <Award className="h-4 w-4 mr-1" />;
        default: return <CheckCircle className="h-4 w-4 mr-1" />;
    }
};

// Para garantizar que nunca se pase undefined al renderIcon
const safeIconName = (icon: string | null | undefined): string | null => {
    return icon || null;
};

interface ServicesTabProps {
    services?: ServiceData[];
    onDeleteService?: (id: string) => Promise<void>;
}

export default function ServicesTab({ services = [], onDeleteService }: ServicesTabProps) {
    // Estado para el servicio seleccionado
    const [selectedServiceId, setSelectedServiceId] = useState(services.length > 0 ? services[0]?.id : null);
    // Estado para mostrar la vista previa en móvil
    const [showPreviewMobile, setShowPreviewMobile] = useState(false);

    // Encontrar el servicio seleccionado
    const selectedService = services.find(s => s.id === selectedServiceId) || (services.length > 0 ? services[0] : null);

    const handleDelete = async (id: string) => {
        if (!onDeleteService) return;

        if (window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
            await onDeleteService(id);
            // Si el servicio eliminado era el seleccionado, seleccionar otro
            if (id === selectedServiceId && services.length > 1) {
                const newSelectedId = services.find(s => s.id !== id)?.id;
                if (newSelectedId) {
                    setSelectedServiceId(newSelectedId);
                }
            }
        }
    };

    // Alternar la vista previa en móvil
    const toggleMobilePreview = () => {
        setShowPreviewMobile(!showPreviewMobile);
    };

    // Componente para renderizar un item de servicio
    const ServiceItemBadge = ({ item }: { item: ServiceItem }) => (
        <span
            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center"
            title={item.description || ''}
        >
            {renderIcon(item.icon || null)}
            {item.title}
        </span>
    );

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl font-bold">Tipos de Servicio</h2>
                <div className="flex gap-2">
                    {/* Botón para mostrar/ocultar vista previa en móvil */}
                    {selectedService && (
                        <Button
                            className="flex items-center gap-2 lg:hidden"
                            variant="outline"
                            onClick={toggleMobilePreview}
                        >
                            {showPreviewMobile ? 'Ocultar Vista' : 'Ver Vista Previa'}
                        </Button>
                    )}
                    <Link href="/admin/dashboard/new-service">
                        <Button className="flex items-center gap-2">
                            <PlusIcon className="h-4 w-4" />
                            Nuevo Servicio
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Vista previa móvil togglable */}
            {showPreviewMobile && selectedService && (
                <div className="lg:hidden mb-4">
                    <h3 className="text-sm font-medium mb-2 text-gray-500">Vista previa</h3>
                    <div className="border rounded-lg overflow-hidden h-[400px]">
                        <ServicePreview service={selectedService} />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Vista previa de cómo se verá este servicio en la web pública
                    </p>
                </div>
            )}

            {services.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No hay servicios registrados</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Columna izquierda y central - Lista de servicios */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map((service) => (
                            <Card
                                key={service.id}
                                className={`cursor-pointer transition-colors ${selectedServiceId === service.id ? 'ring-2 ring-primary' : 'hover:bg-gray-50'}`}
                                onClick={() => {
                                    setSelectedServiceId(service.id || '');
                                    // En móvil, mostrar automáticamente la vista previa al seleccionar
                                    if (!showPreviewMobile && window.innerWidth < 1024) {
                                        setShowPreviewMobile(true);
                                    }
                                }}
                            >
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">
                                            {service.name}
                                        </CardTitle>
                                        <div className="flex gap-1">
                                            <Link href={`/admin/dashboard/edit-service/${service.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <PencilIcon className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Evitar que el click se propague al Card
                                                    if (service.id) {
                                                        handleDelete(service.id);
                                                    }
                                                }}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    <div className="space-y-3">
                                        {/* Información básica del servicio */}
                                        {(service.speed || service.price || service.regularPrice) && (
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                {service.speed && (
                                                    <div>
                                                        <span className="font-medium">Velocidad:</span> {service.speed} Mbps
                                                    </div>
                                                )}
                                                {service.price && (
                                                    <div>
                                                        <span className="font-medium">Precio:</span> ${service.price.toLocaleString('es-CL')}
                                                    </div>
                                                )}
                                                {service.regularPrice && (
                                                    <div>
                                                        <span className="font-medium">Precio regular:</span> ${service.regularPrice.toLocaleString('es-CL')}
                                                    </div>
                                                )}
                                                {service.promoMonths && (
                                                    <div>
                                                        <span className="font-medium">Meses promo:</span> {service.promoMonths}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Mostrar items del servicio */}
                                        {service.serviceItems && service.serviceItems.length > 0 && (
                                            <div className="mt-2">
                                                <h4 className="text-xs font-medium text-gray-500 mb-1">Características:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {service.serviceItems.map((item, idx) => (
                                                        <ServiceItemBadge key={idx} item={item} />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Columna derecha - Vista previa (solo en desktop) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-4">
                            <h3 className="text-sm font-medium mb-2 text-gray-500">Vista previa</h3>
                            <div className="border rounded-lg overflow-hidden h-[500px]">
                                {selectedService ? (
                                    <ServicePreview service={selectedService} />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-50 text-gray-500">
                                        <p>Selecciona un servicio para ver la vista previa</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Vista previa de cómo se verá este servicio en la web pública
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 