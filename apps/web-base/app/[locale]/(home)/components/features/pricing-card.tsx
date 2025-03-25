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
        <div className="flex flex-col rounded-lg bg-white shadow-md overflow-hidden h-full relative">
            <div className="w-full h-full relative">
                {/* Contenedor principal con transición de slide */}
                <div
                    className="transition-all duration-500 ease-in-out flex flex-col"
                    style={{
                        transform: showZappingPlans ? 'translateX(-100%)' : 'translateX(0)',
                        height: '100%',
                    }}
                >
                    {/* Vista principal (frontal) */}
                    <div
                        className="py-4 px-4 text-center text-white font-medium"
                        style={{
                            background: 'linear-gradient(90deg, #4900FF 25%, #00FFF9 100%)'
                        }}
                    >
                        <div className="text-2xl font-bold">{discount}% {dictionary.web.home.cases.pricing.discount}</div>
                        <div className="text-xl">X {months} {dictionary.web.home.cases.pricing.months}</div>
                        {isNewCustomer && <div className="text-sm mt-1">{dictionary.web.home.cases.pricing.newCustomerPromo}</div>}
                        {promotionName && <div className="text-sm font-bold mt-1">{promotionName}</div>}
                    </div>

                    <div className="flex flex-col items-center p-6 pt-4 flex-grow">
                        <div className="text-center mb-3">
                            <div className="text-gray-800 text-lg">{dictionary.web.home.cases.pricing.plan} {planType}</div>
                            <div className="text-indigo-600 text-3xl font-bold">{dictionary.web.home.cases.pricing.fiber} {speed}</div>
                        </div>

                        <div className="text-center mb-2">
                            <div className="text-gray-700">{dictionary.web.home.cases.pricing.monthly}</div>
                            <div className="text-indigo-600 text-4xl font-bold">${totalPrice.toLocaleString('es-CL')}</div>
                            <div className="text-xs text-gray-500">
                                {dictionary.web.home.cases.pricing.laterMonthPrice.replace('{months}', months.toString())}
                                ${(originalPrice + (selectedZappingPlan ? selectedZappingPlan.regularPrice || selectedZappingPlan.price : 0)).toLocaleString('es-CL')}
                            </div>
                        </div>

                        {/* Service details section - only show when addons are included or Zapping plan is selected */}
                        {(includeAddons && selectedAddons.length > 0) || selectedZappingPlan ? (
                            <div className="w-full mt-3 mb-6">
                                <div className="text-gray-600 text-sm font-medium mb-1">{dictionary.web.home.cases.pricing.serviceDetails}</div>
                                <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                                    <span className="text-gray-500">• {dictionary.web.home.cases.pricing.fiber} {speed}</span>
                                    <span className="text-gray-700">${price.toLocaleString('es-CL')}</span>
                                </div>

                                {/* Mostrar el plan de Zapping seleccionado */}
                                {selectedZappingPlan && (
                                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                                        <span className="text-gray-500">• Plan {selectedZappingPlan.name}</span>
                                        <span className="text-gray-700">${selectedZappingPlan.price.toLocaleString('es-CL')}</span>
                                    </div>
                                )}

                                {/* Mostrar todos los addons seleccionados */}
                                {selectedAddons.map(addon => (
                                    <div key={addon.id} className="flex justify-between text-sm py-1 border-b border-gray-100 last:border-0">
                                        <span className="text-gray-500">• {addon.name}</span>
                                        <span className="text-gray-700">${addon.price.toLocaleString('es-CL')}</span>
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        <div className="flex flex-col items-center mt-auto w-full space-y-3">
                            <Button className="w-fit rounded-lg bg-cyan-300 text-black hover:bg-cyan-400 font-medium text-sm py-2 px-4 h-auto">
                                {dictionary.web.home.cases.pricing.checkAvailability}
                            </Button>

                            <Link
                                href={detailUrl}
                                className="flex items-center justify-center text-indigo-600 text-sm px-4 py-2 rounded-lg border border-indigo-600 w-fit"
                            >
                                {dictionary.web.home.cases.pricing.viewInclusions} <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>

                            {showZappingButton && sortedZappingPlans.length > 0 && (
                                <button
                                    onClick={handleToggleZappingPlans}
                                    className="w-fit flex items-center justify-center rounded-lg bg-rose-500 text-white hover:bg-rose-600 font-medium text-sm py-2 px-4 h-auto transition-transform active:scale-95"
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
                    className="absolute top-0 left-full w-full h-full transition-all duration-500 ease-in-out"
                    style={{
                        transform: showZappingPlans ? 'translateX(-100%)' : 'translateX(0)',
                    }}
                >
                    <div className="bg-rose-500 py-4 px-4 text-center text-white">
                        <h3 className="text-xl font-bold">Elige tu plan ZAPPING</h3>
                        <p className="text-sm mt-1">TV Online con los mejores canales</p>
                    </div>

                    <div className="p-6 flex flex-col h-[calc(100%-68px)]">
                        <button
                            onClick={handleToggleZappingPlans}
                            className="flex items-center text-rose-500 mb-4 text-sm font-medium transition-transform active:scale-95"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" /> Volver a mi plan
                        </button>

                        <div className="space-y-3 flex-grow overflow-auto">
                            {sortedZappingPlans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${selectedZappingPlan?.id === plan.id ? 'border-rose-500 bg-rose-50' : 'border-gray-200 hover:border-rose-300'
                                        }`}
                                    onClick={() => handleZappingPlanSelect(plan)}
                                >
                                    <div className="flex justify-between mb-1">
                                        <div className="flex items-center">
                                            <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${selectedZappingPlan?.id === plan.id ? 'border-rose-500 bg-rose-500' : 'border-gray-400'
                                                }`}>
                                                {selectedZappingPlan?.id === plan.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                            </div>
                                            <span className="font-medium">{plan.name}</span>
                                        </div>
                                        <span className="font-bold">${plan.price.toLocaleString('es-CL')}</span>
                                    </div>
                                    <div className="pl-6 text-xs text-gray-500">
                                        {/* Mostrar número de canales si está disponible */}
                                        {plan.channelCount && (
                                            <div className="flex items-center mb-1">
                                                <Check className="h-3 w-3 mr-1 text-rose-500" />+ {plan.channelCount} canales
                                            </div>
                                        )}

                                        {/* Mostrar características dinámicas */}
                                        {plan.characteristics && plan.characteristics.length > 0 &&
                                            plan.characteristics
                                                .filter(char => char.value)
                                                .map((characteristic, index) => (
                                                    <div key={index} className="flex items-center mb-1">
                                                        <Check className="h-3 w-3 mr-1 text-rose-500" /> {characteristic.key}
                                                    </div>
                                                ))
                                        }

                                        <div>Luego ${(plan.regularPrice || plan.price).toLocaleString('es-CL')}/mes</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={() => selectedZappingPlan ? handleZappingPlanSelect(selectedZappingPlan) : setShowZappingPlans(false)}
                            className="mx-auto mt-4 w-fit rounded-lg bg-rose-500 text-white hover:bg-rose-600 font-medium text-sm py-2 h-auto transition-transform active:scale-95"
                        >
                            {selectedZappingPlan ? 'Seleccionar plan' : 'Volver sin seleccionar'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}; 