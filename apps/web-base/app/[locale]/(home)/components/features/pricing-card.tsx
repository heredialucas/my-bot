"use client";

import { Button } from '@repo/design-system/components/ui/button';
import type { Dictionary } from '@repo/internationalization';
import { ArrowRight, Check, ChevronLeft, Tv } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { AddOn } from './types';

// Plan type from database schema
type Plan = {
    id: string;
    name: string;
    price: number;
    regularPrice?: number | null;
    promoMonths?: number | null;
    channelCount?: number | null;
    planType: string;
    characteristics: Array<{
        id?: string;
        key: string;
        value: boolean;
        planId?: string;
    }>;
};

type PricingCardProps = {
    discount: number;
    months: number;
    planType: string;
    speed: number;
    price: number;
    originalPrice: number;
    isNewCustomer?: boolean;
    includeAddons?: boolean;
    includeInternetTV?: boolean;
    showZappingButton?: boolean;
    dictionary: Dictionary;
    selectedAddons?: AddOn[]; // Lista de complementos seleccionados
    promotionColor?: string; // Color de la promoción
    promotionName?: string; // Nombre de la promoción
    promotionId?: string; // ID de la promoción
    promotionDescription?: string; // Descripción de la promoción
    serviceItems?: any[]; // Elementos del servicio
    zappingPlans?: Plan[]; // Los planes de Zapping desde la DB
};

export const PricingCard = ({
    discount,
    months,
    planType,
    speed,
    price,
    originalPrice,
    isNewCustomer = true,
    includeAddons = false,
    includeInternetTV = false,
    showZappingButton = false,
    dictionary,
    selectedAddons = [],
    promotionColor,
    promotionName,
    promotionId,
    promotionDescription,
    serviceItems = [],
    zappingPlans = []
}: PricingCardProps) => {
    const params = useParams();
    const locale = params.locale as string;

    // Estado para controlar la vista de planes de Zapping
    const [showZappingPlans, setShowZappingPlans] = useState(false);

    // Estado para el plan de Zapping seleccionado
    const [selectedZappingPlan, setSelectedZappingPlan] = useState<Plan | null>(null);

    // Calcular el precio total con todos los addons seleccionados
    const addonsTotal = selectedAddons.reduce((total, addon) => total + addon.price, 0);
    // Agregar el precio del plan de Zapping seleccionado
    const zappingPrice = selectedZappingPlan ? selectedZappingPlan.price : 0;
    const totalPrice = price + (includeAddons ? addonsTotal : 0) + zappingPrice;

    // Construir la URL con los IDs de los addons seleccionados
    const selectedAddonIds = selectedAddons.map(addon => addon.id).join(',');
    const detailUrl = `/${locale}/detail/${promotionId}${selectedAddonIds ? `?selectedAddons=${selectedAddonIds}` : ''}`;

    // Manejar la selección de un plan de Zapping
    const handleZappingPlanSelect = (plan: Plan) => {
        setSelectedZappingPlan(plan);
        setShowZappingPlans(false);
    };

    // Función para mostrar la vista de planes de Zapping
    const handleToggleZappingPlans = () => {
        setShowZappingPlans(!showZappingPlans);
    };

    // Filtrar los planes de Zapping para eliminar duplicados basados en ID
    const uniqueZappingPlans = [...new Map(zappingPlans.map(plan => [plan.id, plan])).values()];

    // Ordenar los planes de Zapping por precio
    const sortedZappingPlans = uniqueZappingPlans.sort((a, b) => a.price - b.price);

    return (
        <div className="flex flex-col rounded-lg bg-white overflow-hidden h-auto sm:h-[650px] relative" style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
            <div className="w-full h-full relative">
                {/* Contenedor principal con transición de slide */}
                <div
                    className="transition-all duration-500 ease-in-out flex flex-col h-full"
                    style={{
                        transform: showZappingPlans ? 'translateX(-100%)' : 'translateX(0)',
                    }}
                >
                    {/* Vista principal (frontal) */}
                    <div
                        className="py-3 sm:py-4 px-3 sm:px-4 text-center text-white font-medium sticky sm:static top-0 z-10"
                        style={{
                            background: 'linear-gradient(90deg, #4900FF 25%, #00FFF9 100%)'
                        }}
                    >
                        <div className="text-xl sm:text-2xl font-bold">{discount}% {dictionary.web.home.cases.pricing.discount}</div>
                        <div className="text-lg sm:text-xl">X {months} {dictionary.web.home.cases.pricing.months}</div>
                        {isNewCustomer && <div className="text-xs sm:text-sm mt-1">{dictionary.web.home.cases.pricing.newCustomerPromo}</div>}
                        {promotionName && <div className="text-xs sm:text-sm font-bold mt-1">{promotionName}</div>}
                    </div>

                    <div className="flex flex-col flex-grow p-4 sm:p-6 overflow-y-auto sm:overflow-visible">
                        <div className="text-center mb-4 sm:mb-6">
                            <div className="text-lg text-gray-800">{dictionary.web.home.cases.pricing.plan} {planType}</div>
                            <div className="hidden sm:block text-indigo-600 text-4xl font-bold mb-4">{dictionary.web.home.cases.pricing.fiber} {speed}</div>
                            <div className="block sm:hidden text-indigo-600 text-2xl font-bold">{dictionary.web.home.cases.pricing.fiber} {speed}</div>
                            <div className="text-gray-700">{dictionary.web.home.cases.pricing.monthly}</div>
                            <div className="text-indigo-600 text-4xl sm:text-5xl font-bold mb-2">${totalPrice.toLocaleString('es-CL')}</div>
                            <div className="text-sm text-gray-500">
                                {dictionary.web.home.cases.pricing.laterMonthPrice.replace('{months}', months.toString())}
                                ${(originalPrice + (selectedZappingPlan ? selectedZappingPlan.regularPrice || selectedZappingPlan.price : 0)).toLocaleString('es-CL')}
                            </div>
                        </div>

                        {/* Service details section - only show when addons are included or Zapping plan is selected */}
                        {(includeAddons && selectedAddons.length > 0) || selectedZappingPlan ? (
                            <div className="w-full mb-4 sm:mb-auto">
                                <div className="text-gray-600 text-sm font-medium mb-1">{dictionary.web.home.cases.pricing.serviceDetails}</div>
                                <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                                    <span className="text-gray-500">• {dictionary.web.home.cases.pricing.fiber} {speed}</span>
                                    <span className="text-gray-700">${price.toLocaleString('es-CL')}</span>
                                </div>

                                {selectedZappingPlan && (
                                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                                        <span className="text-gray-500">• Plan {selectedZappingPlan.name}</span>
                                        <span className="text-gray-700">${selectedZappingPlan.price.toLocaleString('es-CL')}</span>
                                    </div>
                                )}

                                {selectedAddons.map(addon => (
                                    <div key={addon.id} className="flex justify-between text-sm py-1 border-b border-gray-100 last:border-0">
                                        <span className="text-gray-500">• {addon.name}</span>
                                        <span className="text-gray-700">${addon.price.toLocaleString('es-CL')}</span>
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        <div className="flex flex-col items-center mt-auto w-full space-y-3 sm:space-y-4">
                            <Button className="w-full max-w-[280px] rounded-lg bg-cyan-300 text-black hover:bg-cyan-400 font-medium text-sm py-2 px-4 h-auto">
                                {dictionary.web.home.cases.pricing.checkAvailability}
                            </Button>

                            <Link
                                href={detailUrl}
                                className="flex items-center justify-center text-indigo-600 text-sm px-4 py-2 rounded-lg border border-indigo-600 w-full max-w-[280px]"
                            >
                                {dictionary.web.home.cases.pricing.viewInclusions} <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>

                            {showZappingButton && sortedZappingPlans.length > 0 && (
                                <button
                                    onClick={handleToggleZappingPlans}
                                    className="w-full max-w-[280px] flex items-center justify-center rounded-lg bg-[#F0436E] text-white hover:bg-rose-600 font-medium text-sm py-2 px-4 h-auto transition-transform active:scale-95"
                                >
                                    <Tv className="h-4 w-4 mr-2" />
                                    {selectedZappingPlan ? `Cambiar plan ${selectedZappingPlan.name}` : dictionary.web.home.cases.pricing.chooseTVPlan}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Vista de selección de planes de Zapping (slide a la derecha) */}
                <div
                    className="absolute top-0 left-full w-full h-full transition-all duration-500 ease-in-out bg-gray-900"
                    style={{
                        transform: showZappingPlans ? 'translateX(-100%)' : 'translateX(0)',
                    }}
                >
                    <div className="bg-[#F0436E] py-3 sm:py-4 px-3 sm:px-4 text-center text-white sticky top-0 z-10">
                        <h3 className="text-lg sm:text-xl font-bold">Elegí tu plan Zapping</h3>
                    </div>

                    <button
                        onClick={handleToggleZappingPlans}
                        className="absolute right-4 top-20 flex items-center text-white text-sm font-medium transition-transform active:scale-95 z-20"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Volver a mi plan
                    </button>

                    <div
                        className="px-4 pt-8 pb-4 h-[calc(100%-68px)] overflow-y-auto custom-scrollbar"
                    >
                        <div className="space-y-6">
                            {sortedZappingPlans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className="cursor-pointer hover:bg-gray-800 rounded-lg p-4 transition-colors"
                                    onClick={() => handleZappingPlanSelect(plan)}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 ${selectedZappingPlan?.id === plan.id ? 'border-white bg-transparent' : 'border-gray-400'} flex items-center justify-center`}>
                                            {selectedZappingPlan?.id === plan.id && <div className="w-3 h-3 bg-white rounded-full"></div>}
                                        </div>
                                        <span className="text-white font-medium text-lg">{plan.name}</span>
                                    </div>

                                    <div className="ml-8">
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-white text-xl font-bold">${plan.price.toLocaleString('es-CL')}</span>
                                            <span className="text-[#F0436E] text-xs">primer mes</span>
                                        </div>
                                        <div className="text-gray-400 text-xs mb-2">
                                            luego ${(plan.regularPrice || plan.price + 2000).toLocaleString('es-CL')} /mes
                                        </div>

                                        <div className="text-xs text-gray-400 uppercase mb-1">INCLUYE</div>
                                        <div className="flex items-center gap-2 mb-2 text-sm">
                                            <span className="text-white">Zapping con</span>
                                            <span className="text-[#F0436E]">+{plan.channelCount} canales</span>
                                            <ArrowRight className="h-4 w-4 text-white" />
                                        </div>

                                        {plan.characteristics && plan.characteristics.length > 0 && (
                                            <div className="space-y-1">
                                                {plan.characteristics
                                                    .filter(char => char.value)
                                                    .map((char, idx) => (
                                                        <div key={idx} className="text-sm text-white">
                                                            {char.key}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )}

                                        <div className="mt-2">
                                            <span className="bg-[#F0436E] text-xs text-white px-2 py-1 rounded-md">
                                                ZAPPING
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 