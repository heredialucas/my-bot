"use client";

import { Check, Wrench, X, FileText, Calendar, Clock, Gauge } from "lucide-react";
import { Button } from "@repo/design-system/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddOn } from "../../../../components/features/types";
import { CallToActionBtn } from "@/app/[locale]/components/callToActionBtn";
import { DetailProps } from "./types";

// Función para renderizar el ícono adecuado basado en el nombre de ícono
const renderServiceItemIcon = (iconName: string) => {
    switch (iconName) {
        case 'Gauge':
            return <Gauge className="h-5 w-5 text-white" />;
        case 'FileText':
            return <FileText className="h-5 w-5 text-white" />;
        case 'Calendar':
            return <Calendar className="h-5 w-5 text-white" />;
        case 'Clock':
            return <Clock className="h-5 w-5 text-white" />;
        case 'Wrench':
            return <Wrench className="h-5 w-5 text-white" />;
        default:
            return <Wrench className="h-5 w-5 text-white" />;
    }
};

export default function Detail({ promotion, selectedAddonsFromLanding = [], allAddons = [] }: DetailProps) {
    const router = useRouter();

    // Ordenar los planes por precio (menor a mayor)
    const sortedPlans = [...promotion.plans].sort((a, b) => a.price - b.price);

    // Obtener el primer servicio de la promoción
    const service = promotion.services[0] || {};
    const speed = service.speed || 0;
    const price = service.price || 0;
    const regularPrice = service.price || 0;

    // Estado local para el plan seleccionado
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
        null // Ya no seleccionamos un plan por defecto
    );

    // Estado local para addons
    const [localAddons, setLocalAddons] = useState<AddOn[]>(selectedAddonsFromLanding);

    // Función para cerrar el modal
    const handleClose = () => {
        router.back();
    };

    // Manejar selección de plan
    const handlePlanSelection = (planId: string) => {
        setSelectedPlanId(planId);
    };

    // Manejar selección de addon
    const handleToggleAddon = (addon: AddOn) => {
        setLocalAddons(current => {
            // Verificar si el addon ya está seleccionado
            const isSelected = current.some(a => a.id === addon.id);

            if (isSelected) {
                // Si está seleccionado, lo eliminamos
                return current.filter(a => a.id !== addon.id);
            } else {
                // Si no está seleccionado, lo agregamos
                return [...current, addon];
            }
        });
    };

    // Encontrar el plan seleccionado por ID
    const displayPlan = selectedPlanId ? promotion.plans.find(plan => plan.id === selectedPlanId) : null;
    const selectedPlanPrice = displayPlan?.price || 0;

    // Calcular el total de addons
    const addonsTotal = localAddons.reduce((total, addon) => total + addon.price, 0);

    // Calcular el precio con descuento aplicando el porcentaje de la promoción
    // Solo se aplica descuento al servicio principal (fibra), no a los planes de Zapping
    const discountedPrice = price * (1 - promotion.discount / 100);

    // El precio total incluye: precio con descuento del servicio + precio SIN descuento del plan Zapping + addons
    const totalPrice = discountedPrice + selectedPlanPrice + addonsTotal;

    // El precio regular (después de la promoción) es el precio regular del servicio + precio del plan + addons
    const regularTotalPrice = regularPrice + selectedPlanPrice + addonsTotal;

    // Generar mensaje personalizado para esta selección específica
    const getDetailFormattedText = () => {
        const parts = ['Hola, me gustaría contratar:'];

        // Agregar información del plan de internet
        parts.push(`- Plan Fibra ${speed} Mbps por $${discountedPrice.toLocaleString('es-CL')}`);

        // Agregar plan de TV si está seleccionado
        if (displayPlan) {
            const channels = displayPlan.channelCount
                ? `con ${displayPlan.channelCount} canales`
                : '';
            parts.push(`- Plan ${displayPlan.name} ${channels} por $${selectedPlanPrice.toLocaleString('es-CL')}`);
        }

        // Agregar complementos seleccionados
        if (localAddons.length > 0) {
            const addonsList = localAddons.map(addon =>
                `${addon.name} por $${addon.price.toLocaleString('es-CL')}`
            ).join(', ');
            parts.push(`- Complementos: ${addonsList}`);
        }

        // Agregar precio total mensual
        parts.push(`\nPrecio total mensual: $${totalPrice.toLocaleString('es-CL')}`);

        // Agregar información sobre el precio después de la promoción
        parts.push(`Después del mes ${promotion.duration}, el precio será $${regularTotalPrice.toLocaleString('es-CL')}`);

        return parts.join('\n');
    };

    return (
        <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden relative w-full">
            {/* Botón para cerrar el modal */}
            <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 p-1 bg-white/70 hover:bg-white/90 rounded-full transition-colors"
                aria-label="Cerrar"
            >
                <X className="h-5 w-5 text-black" />
            </button>

            {/* Left Section - Blue gradient with diagonal cut */}
            <div
                className="text-white p-7 lg:w-[48%] relative"
                style={{
                    background: 'linear-gradient(90deg, #4900FF 70%, #00FFF9 100%)'
                }}
            >
                {/* Diagonal divider - moved more towards the right */}
                <div className="hidden lg:block absolute top-0 right-0 h-full w-16"
                    style={{
                        background: 'linear-gradient(90deg, #4900FF 0%, #00FFF9 100%)',
                        clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
                    }}>
                </div>
                <div className="hidden lg:block absolute top-0 right-0 h-full w-16 bg-white"
                    style={{
                        clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                    }}>
                </div>

                <div className="flex flex-col h-full justify-between">
                    <div>
                        <h2 className="text-lg font-medium mb-2">Plan internet fibra</h2>
                        <h1 className="text-5xl font-bold mb-4 text-cyan-300">{speed} <span className="text-white">Mbps</span></h1>

                        <p className="mb-6 text-base">contrata este plan y tendrás</p>

                        <div className="flex flex-col gap-y-6 mb-8">
                            {/* Velocidad semétrica */}
                            <div className="flex items-start">
                                <div className="bg-blue-400/30 p-2 rounded-full mr-3 mt-1">
                                    <Gauge className="h-5 w-5 text-cyan-300" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-cyan-300 text-base">Velocidad semétrica</h3>
                                    <p className="text-sm mt-1">Hasta {speed} Mbps de subida y bajada</p>
                                </div>
                            </div>

                            {/* Sin letra chica */}
                            <div className="flex items-start">
                                <div className="bg-blue-400/30 p-2 rounded-full mr-3 mt-1">
                                    <FileText className="h-5 w-5 text-cyan-300" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-cyan-300 text-base">Sin letra chica</h3>
                                    <p className="text-sm mt-1">Cobros y boletas transparentes</p>
                                </div>
                            </div>

                            {/* Contact center */}
                            <div className="flex items-start">
                                <div className="bg-blue-400/30 p-2 rounded-full mr-3 mt-1">
                                    <Clock className="h-5 w-5 text-cyan-300" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-cyan-300 text-base">Contact center</h3>
                                    <p className="text-sm mt-1">Lunes a viernes 9:00 a 20:00 hs</p>
                                    <p className="text-sm">Sábados de 9:00 a 14:00 hs</p>
                                </div>
                            </div>

                            {/* Incluye */}
                            <div className="flex items-start">
                                <div className="bg-blue-400/30 p-2 rounded-full mr-3 mt-1">
                                    <Wrench className="h-5 w-5 text-cyan-300" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-cyan-300 text-base">Incluye</h3>
                                    <p className="text-sm mt-1">La activación y habilitación. ¡Agendá tu instalación!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/20">
                        <p className="text-sm text-center">Cliente cancela plan a contratar al momento de instalar</p>
                        <h2 className="text-4xl font-bold mt-2 text-center">${(discountedPrice + (selectedPlanPrice > 0 ? selectedPlanPrice : 0) + addonsTotal).toLocaleString('es-CL')}</h2>
                        <p className="text-sm text-center">¡Mes {promotion.duration} pagas ${(regularPrice + (selectedPlanPrice > 0 ? selectedPlanPrice : 0) + addonsTotal).toLocaleString('es-CL')}</p>

                        <div className="flex justify-center mt-6">
                            <CallToActionBtn options={[getDetailFormattedText()]} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - White with plan details */}
            <div className="bg-white p-7 lg:w-[52%]">
                <div className="text-center mb-8">
                    <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#4900FF] to-[#00FFF9] bg-clip-text text-transparent">
                        ${totalPrice.toLocaleString('es-CL')}
                    </h2>
                    <p className="text-gray-700 mt-1">Mensual / mes {promotion.duration} pagás ${regularTotalPrice.toLocaleString('es-CL')}</p>
                </div>

                <div className="mb-8">
                    <h3 className="font-medium text-gray-800 mb-3">Detalles del servicio</h3>
                    <div className="flex flex-col gap-y-3">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span>Fibra {speed}</span>
                            <span className="font-medium">${discountedPrice.toLocaleString('es-CL')}</span>
                        </div>

                        {/* Mostrar el plan seleccionado si hay uno */}
                        {displayPlan && (
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                <span>Plan {displayPlan.name}</span>
                                <span className="font-medium">${selectedPlanPrice.toLocaleString('es-CL')}</span>
                            </div>
                        )}

                        {/* Mostrar los addons seleccionados */}
                        {localAddons.map((addon, index) => (
                            <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                                <span>{addon.name}</span>
                                <span className="font-medium">${addon.price.toLocaleString('es-CL')}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mb-8">
                    <CallToActionBtn options={[getDetailFormattedText()]} />
                </div>

                {/* Sección de selección de plan Zapping con fondo oscuro */}
                {promotion.plans.length > 0 && (
                    <div>
                        <div className="bg-rose-500 text-white p-3 text-center rounded-t-lg">
                            <h3 className="font-medium">TV Online. Elige tu plan ZAPPING</h3>
                        </div>
                        <div className="bg-gray-900 text-white rounded-b-lg max-h-[220px] overflow-y-auto custom-scrollbar">
                            {sortedPlans.length > 0 && (
                                <div className="flex flex-col">
                                    {sortedPlans.map((plan) => (
                                        <div
                                            key={plan.id}
                                            className="flex items-center justify-between px-4 py-3 border-b border-gray-700 cursor-pointer"
                                            onClick={() => handlePlanSelection(plan.id)}
                                        >
                                            {/* Columna izquierda: Checkbox y nombre */}
                                            <div className="flex items-center gap-2 w-[25%]">
                                                <div className={`w-5 h-5 rounded-full border ${selectedPlanId === plan.id ? 'border-blue-400 bg-blue-400' : 'border-gray-400'} flex items-center justify-center`}>
                                                    <div className={`w-2.5 h-2.5 rounded-full ${selectedPlanId === plan.id ? 'bg-white' : ''}`}></div>
                                                </div>
                                                <span className="font-medium text-white">{plan.name}</span>
                                            </div>

                                            {/* Columna media: Características del plan */}
                                            <div className="w-[45%]">
                                                {plan.characteristics && plan.characteristics.length > 0 && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {plan.characteristics
                                                            .filter(char => char.value)
                                                            .map((char, idx) => (
                                                                <span key={idx} className="text-xs bg-rose-800 text-white px-2 py-0.5 rounded">
                                                                    {char.key}
                                                                </span>
                                                            ))
                                                        }
                                                    </div>
                                                )}
                                                {plan.channelCount && (
                                                    <div className="w-fit mt-1 text-xs text-white font-medium bg-rose-800 px-2 py-0.5 rounded">
                                                        {plan.channelCount} canales
                                                    </div>
                                                )}
                                            </div>

                                            {/* Columna derecha: Precios */}
                                            <div className="text-right w-[30%]">
                                                <p className="font-bold text-white">${plan.price.toLocaleString('es-CL')}</p>
                                                <p className="text-xs text-gray-400">{`${plan.promoMonths} meses`}</p>
                                                <p className="text-xs text-gray-400">luego ${(plan.regularPrice || plan.price).toLocaleString('es-CL')} /mes</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer con addons como en la imagen de referencia */}
                {allAddons.length > 0 && (
                    <div className="mt-6 pt-3 border-t border-gray-200">
                        {allAddons.map((addon, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center p-3 mx-auto border border-dashed border-gray-300 rounded-lg cursor-pointer mb-2.5"
                                onClick={() => handleToggleAddon(addon)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-5 h-5 border-2 ${localAddons.some(a => a.id === addon.id) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400'} rounded-sm flex items-center justify-center`}>
                                        {localAddons.some(a => a.id === addon.id) && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                    <span className="text-base">Agregar {addon.name} por <span className="text-[#4900FF]">${addon.price.toLocaleString('es-CL')}</span>/mes</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 