"use client";

import { Check, Wrench, X } from "lucide-react";
import { Button } from "@repo/design-system/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AddOn } from "../../../../components/features/types";

// Tipos para la promoción
type Promotion = {
    id: string;
    name: string;
    description?: string | null;
    discount: number;
    duration: number;
    active: boolean;
    color?: string | null;
    createdAt: Date;
    updatedAt: Date;
    services: Array<{
        id: string;
        name: string;
        description?: string | null;
        icon?: string | null;
        speed?: number | null;
        price?: number | null;
        regularPrice?: number | null;
        promoMonths?: number | null;
        serviceItems: Array<{
            id: string;
            title: string;
            description?: string | null;
        }>;
    }>;
    plans: Array<{
        id: string;
        name: string;
        description?: string | null;
        price: number;
        regularPrice?: number | null;
        promoMonths?: number | null;
        channelCount?: number | null;
        premiumContent?: boolean | null;
        noAds?: boolean | null;
        planType: string;
    }>;
    addons: Array<{
        id: string;
        name: string;
        description?: string | null;
        price: number;
        icon?: string | null;
        color?: string | null;
    }>;
};

type DetailProps = {
    promotion: Promotion;
    selectedAddonsFromLanding?: AddOn[]; // Addons seleccionados desde la landing
    allAddons: AddOn[]; // Todos los addons disponibles
};

export default function Detail({ promotion, selectedAddonsFromLanding = [], allAddons = [] }: DetailProps) {
    const router = useRouter();
    // Ordenar los planes por precio (menor a mayor)
    const sortedPlans = [...promotion.plans].sort((a, b) => a.price - b.price);

    // Ahora usamos el ID del plan como referencia en lugar del índice
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
        sortedPlans.length > 0 ? sortedPlans[0].id : null
    );

    // Inicializar directamente los addons seleccionados 
    const initialAddonState: Record<string, boolean> = {};
    selectedAddonsFromLanding.forEach(addon => {
        initialAddonState[addon.id] = true;
    });

    const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>(initialAddonState);

    // Función para cerrar el modal
    const handleClose = () => {
        // Usar router.back() en lugar de router.push
        router.back();
    };

    // Obtener el primer servicio de la promoción
    const service = promotion.services[0] || {};
    const speed = service.speed || 300;
    const price = service.price || 14990;
    const regularPrice = service.regularPrice || 16990;

    // Obtener los items del servicio para mostrar como características
    const serviceItems = service.serviceItems || [];

    // Manejar selección de plan
    const handlePlanSelection = (planId: string) => {
        setSelectedPlanId(planId);
    };

    // Manejar selección de addon
    const toggleAddon = (addonId: string) => {
        setSelectedAddons(prev => ({
            ...prev,
            [addonId]: !prev[addonId]
        }));
    };

    // Encontrar el plan seleccionado por ID
    const selectedPlan = promotion.plans.find(plan => plan.id === selectedPlanId) || sortedPlans[0];
    const selectedPlanPrice = selectedPlan?.price || 0;

    // Usar los addons generales en lugar de los de la promoción
    const addonsTotal = allAddons
        .filter(addon => selectedAddons[addon.id])
        .reduce((total, addon) => total + addon.price, 0);

    const totalPrice = price + selectedPlanPrice + addonsTotal;

    return (
        <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden relative">
            {/* Botón para cerrar el modal */}
            <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 p-1 bg-white/30 hover:bg-white/50 rounded-full transition-colors"
                aria-label="Cerrar"
            >
                <X className="h-5 w-5 text-white" />
            </button>

            {/* Left Section - Blue gradient */}
            <div
                className="text-white p-8 lg:w-5/12"
                style={{
                    background: promotion.color
                        ? `linear-gradient(90deg, ${promotion.color} 0%, #33ccff 100%)`
                        : 'linear-gradient(90deg, #4646ff 0%, #33ccff 100%)'
                }}
            >
                <h2 className="text-xl font-medium mb-1">{promotion.name}</h2>
                <h1 className="text-5xl font-bold mb-6">{speed} Mbps</h1>

                <p className="mb-8">{promotion.description || 'Contrata este plan y tendrás'}</p>

                <div className="space-y-6">
                    {/* Mostrar solo items del servicio en esta sección */}
                    {serviceItems.length > 0 && (
                        <div className="flex items-start">
                            <div className="bg-blue-400/30 p-2 rounded-full mr-4 mt-1">
                                <Wrench className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-medium">Incluye</h3>
                                {serviceItems.map((item, index) => (
                                    <p key={index} className="text-sm">{item.title}</p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-16 border-t border-white/20 pt-4">
                    <p className="text-sm">Cliente cancela plan a contratar al momento de instalar</p>
                    <h2 className="text-4xl font-bold mt-2">${price.toLocaleString('es-CL')}</h2>
                    <p className="text-sm">¡Mes {promotion.duration} pagas ${regularPrice.toLocaleString('es-CL')}</p>

                    <Button className="w-full mt-4 bg-cyan-300 text-black hover:bg-cyan-400 rounded-full py-2">
                        Lo quiero!
                    </Button>
                </div>
            </div>

            {/* Right Section - White with plan details */}
            <div className="bg-white p-8 lg:w-7/12">
                <div className="text-center mb-8">
                    <h2 className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-6xl font-bold">${totalPrice.toLocaleString('es-CL')}</h2>
                    <p className="text-gray-700">Mensual / mes {promotion.duration} pagás ${(regularPrice + selectedPlanPrice + addonsTotal).toLocaleString('es-CL')}</p>
                </div>

                <div className="mb-8">
                    <h3 className="font-medium text-gray-800 mb-2">Detalles del servicio</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Fibra {speed}</span>
                            <span className="font-medium">${price.toLocaleString('es-CL')}</span>
                        </div>

                        {/* Mostrar el plan seleccionado si hay uno */}
                        {selectedPlan && (
                            <div className="flex justify-between">
                                <span>Plan {selectedPlan.name}</span>
                                <span className="font-medium">${selectedPlan.price.toLocaleString('es-CL')}</span>
                            </div>
                        )}

                        {/* Mostrar los addons seleccionados (usando allAddons) */}
                        {allAddons.map((addon, index) => (
                            selectedAddons[addon.id] && (
                                <div key={index} className="flex justify-between">
                                    <span>{addon.name}</span>
                                    <span className="font-medium">${addon.price.toLocaleString('es-CL')}</span>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                <Button className="w-full bg-cyan-300 text-black hover:bg-cyan-400 rounded-full py-2 mb-8">
                    ¡Lo quiero!
                </Button>

                {/* Sección de selección de plan Zapping */}
                {promotion.plans.length > 0 && (
                    <div className="bg-rose-500 text-white p-4 text-center rounded-lg mb-6">
                        <h3 className="font-medium">TV Online. Elige tu plan ZAPPING</h3>
                    </div>
                )}

                {sortedPlans.length > 0 && (
                    <div className="space-y-4">
                        {sortedPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className="flex items-center justify-between border-b pb-4 cursor-pointer"
                                onClick={() => handlePlanSelection(plan.id)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-5 h-5 rounded-full border ${selectedPlanId === plan.id ? 'border-blue-600 bg-blue-600' : 'border-gray-400'} flex items-center justify-center`}>
                                        <div className={`w-2.5 h-2.5 rounded-full ${selectedPlanId === plan.id ? 'bg-white' : ''}`}></div>
                                    </div>
                                    <span className="font-medium">{plan.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">${plan.price.toLocaleString('es-CL')}</p>
                                    <p className="text-xs text-gray-500">primer mes</p>
                                    <p className="text-xs text-gray-500">luego ${(plan.regularPrice || plan.price + 2000).toLocaleString('es-CL')} /mes</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer con addons como en la imagen de referencia (usando allAddons) */}
                {allAddons.length > 0 && (
                    <div className="mt-8 pt-4 border-t">
                        {allAddons.map((addon, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center p-3 mx-auto border border-dashed border-gray-300 rounded-xl cursor-pointer"
                                onClick={() => toggleAddon(addon.id)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-5 h-5 border-2 ${selectedAddons[addon.id] ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400'} rounded-sm flex items-center justify-center`}>
                                        {selectedAddons[addon.id] && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                    <span className="text-gray-700">Agregar {addon.name} por ${addon.price.toLocaleString('es-CL')}/mes</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 