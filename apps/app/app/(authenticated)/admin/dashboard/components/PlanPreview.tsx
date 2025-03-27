"use client";

import { ArrowRight, Check, X } from "lucide-react";

interface Plan {
    name: string;
    price: number;
    regularPrice?: number;
    promoMonths?: number;
    channelCount?: number;
    characteristics?: Array<{ key: string; value: boolean }>;
    expiresAt?: Date | string;
}

export default function PlanPreview({ plan }: { plan: Plan }) {
    const {
        name = 'Nacional',
        price = 5900,
        regularPrice = 7900,
        promoMonths = 6,
        channelCount = 65,
        characteristics = []
    } = plan;

    // Filtrar características activas
    const activeCharacteristics = characteristics.filter(char => char.value && char.key);

    // Asegurar que price y regularPrice siempre sean números para cálculos
    const safePrice = price || 5900;
    const safeRegularPrice = regularPrice || 7900;

    return (
        <div className="h-full flex flex-col text-sm">
            {/* Header - reducido en altura */}
            <div className="bg-rose-600 text-white py-2 px-3 text-center">
                <h3 className="font-bold text-base">Elegí tu plan Zapping</h3>
            </div>

            {/* Plan content with black background - espaciado reducido */}
            <div className="bg-gray-900 text-white flex-1 p-3">
                {/* Back button - más pequeño */}
                <div className="flex items-center mb-3 text-xs">
                    <span className="mr-1">❮</span>
                    <span>Volver a mi plan</span>
                </div>

                {/* Plan radio selection - más compacto */}
                <div className="mt-2">
                    <div className="flex items-center mb-1">
                        <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center mr-2">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                        <span className="font-medium text-sm">{name}</span>
                    </div>

                    {/* Price section - tamaño de texto reducido */}
                    <div className="ml-6 mb-2">
                        <p className="text-xl font-bold">${safePrice.toLocaleString('es-CL')}<span className="text-xs font-normal ml-1">primer mes</span></p>
                        <p className="text-xs text-gray-400">luego ${safeRegularPrice.toLocaleString('es-CL')} /mes</p>
                    </div>

                    {/* Includes section - más compacto */}
                    <div className="ml-6 mb-2">
                        <p className="text-xs uppercase text-gray-400">Incluye</p>
                        <div className="flex items-center">
                            <p className="text-xs font-medium">Zapping con <span className="text-rose-400">+{channelCount} canales</span></p>
                            <ArrowRight className="h-3 w-3 text-white ml-1" />
                        </div>
                    </div>

                    {/* Características del plan */}
                    {characteristics.length > 0 && (
                        <div className="ml-6 mb-3">
                            <p className="text-xs uppercase text-gray-400 mb-1">Características:</p>
                            <div className="space-y-1">
                                {characteristics.map((char, idx) => (
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

                    {/* Zapping button - más pequeño */}
                    <div className="ml-6 mb-3">
                        <button className="bg-rose-600 text-white text-xs font-medium px-3 py-1 rounded">
                            ZAPPING
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 