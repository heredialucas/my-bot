"use client";

import { Gauge, FileText, Clock, Wrench, CheckCircle, Wifi, Shield, Star, Award, Zap } from "lucide-react";

// Función para renderizar el ícono adecuado basado en el nombre de ícono
const renderServiceItemIcon = (iconName: string | null) => {
    if (!iconName) return <CheckCircle className="h-5 w-5 text-cyan-300" />;

    switch (iconName) {
        case 'Gauge':
            return <Gauge className="h-5 w-5 text-cyan-300" />;
        case 'FileText':
            return <FileText className="h-5 w-5 text-cyan-300" />;
        case 'Calendar':
            return <Clock className="h-5 w-5 text-cyan-300" />;
        case 'Clock':
            return <Clock className="h-5 w-5 text-cyan-300" />;
        case 'Wrench':
            return <Wrench className="h-5 w-5 text-cyan-300" />;
        case 'CheckCircle':
            return <CheckCircle className="h-5 w-5 text-cyan-300" />;
        case 'Wifi':
            return <Wifi className="h-5 w-5 text-cyan-300" />;
        case 'Zap':
            return <Zap className="h-5 w-5 text-cyan-300" />;
        case 'Shield':
            return <Shield className="h-5 w-5 text-cyan-300" />;
        case 'Star':
            return <Star className="h-5 w-5 text-cyan-300" />;
        case 'Award':
            return <Award className="h-5 w-5 text-cyan-300" />;
        default:
            return <CheckCircle className="h-5 w-5 text-cyan-300" />;
    }
};

interface ServicePreviewProps {
    service: {
        name: string;
        speed?: number | null;
        price?: number | null;
        serviceItems?: Array<{
            title: string;
            description?: string | null;
            icon?: string | null;
        }>;
    };
}

export default function ServicePreview({ service }: ServicePreviewProps) {
    const {
        name,
        speed = 300,
        price = 14990,
        serviceItems = []
    } = service;

    return (
        <div className="text-white p-5 h-full rounded-lg relative overflow-hidden"
            style={{
                background: 'linear-gradient(90deg, #4900FF 70%, #00FFF9 100%)'
            }}>
            <div className="flex flex-col h-full">
                <div>
                    <h2 className="text-lg font-medium mb-2">{name || 'Plan internet fibra'}</h2>
                    <h1 className="text-3xl font-bold mb-4 text-cyan-300">{speed} <span className="text-white">Mbps</span></h1>

                    <p className="mb-4 text-sm">contrata este plan y tendrás</p>

                    <div className="flex flex-col gap-y-4 mb-6">
                        {serviceItems && serviceItems.length > 0 ? (
                            // Mostrar items de servicio personalizados si existen
                            serviceItems.map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="bg-blue-400/30 p-2 rounded-full mr-3 mt-1">
                                        {renderServiceItemIcon(item.icon || null)}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-cyan-300 text-sm">{item.title}</h3>
                                        <p className="text-xs mt-1">{item.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Mostrar items por defecto si no hay personalizados
                            <>
                                <div className="flex items-start">
                                    <div className="bg-blue-400/30 p-2 rounded-full mr-3 mt-1">
                                        <Gauge className="h-5 w-5 text-cyan-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-cyan-300 text-sm">Velocidad semétrica</h3>
                                        <p className="text-xs mt-1">Hasta {speed} Mbps de subida y bajada</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-400/30 p-2 rounded-full mr-3 mt-1">
                                        <FileText className="h-5 w-5 text-cyan-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-cyan-300 text-sm">Sin letra chica</h3>
                                        <p className="text-xs mt-1">Cobros y boletas transparentes</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="pt-4 border-t border-white/20 mt-auto">
                    <p className="text-xs text-center">Cliente cancela plan a contratar al momento de instalar</p>
                    <h2 className="text-2xl font-bold mt-1 text-center">${price?.toLocaleString('es-CL')}</h2>
                    <p className="text-xs text-center">El precio podría variar con promociones</p>
                </div>
            </div>
        </div>
    );
} 