'use client';

import type { Dictionary } from '@repo/internationalization';
import { PricingCard } from './pricing-card';
import { useState } from 'react';
import { useServiceStore } from '@/store';
import { InfoBoxes } from './infoBoxes';
import { AddOn } from './types';

// Definir tipos para las promociones
type Promotion = {
    id: string;
    name: string;
    discount: number;
    duration: number;
    active: boolean;
    color?: string | null;
    createdAt: Date;
    updatedAt: Date;
    services: Service[];
    plans: Plan[];
    addons: AddOn[];
};

type Service = {
    id: string;
    name: string;
    icon?: string | null;
    speed?: number | null;
    price?: number | null;
    regularPrice?: number | null;
    promoMonths?: number | null;
    serviceItems: any[];
};

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

type FeaturesClientProps = {
    dictionary: Dictionary;
    promotions: Promotion[]; // Promociones con sus servicios y planes
    addons: AddOn[]; // Addons independientes
};

export function FeaturesClient({ dictionary, promotions, addons }: FeaturesClientProps) {
    // Ahora usamos un objeto para rastrear qué addons están seleccionados por ID
    const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
    const { selectedOption } = useServiceStore();

    const includeInternetTV = selectedOption === 'internet-tv';

    // Función para alternar la selección de un addon
    const toggleAddon = (addonId: string) => {
        setSelectedAddons(prev => ({
            ...prev,
            [addonId]: !prev[addonId]
        }));
    };

    // Formatear precio para mostrar
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL').format(price);
    };

    // Usamos los addons pasados directamente desde el servidor
    const allAddons = addons;

    // Obtener solo planes de tipo ZAPPING para pasarlos a la tarjeta
    // Filtrando duplicados por ID ya que podrían venir de diferentes promociones
    const zappingPlans = [...new Map(
        promotions.flatMap(promo =>
            promo.plans.filter(plan => plan.planType === 'ZAPPING')
        ).map(plan => [plan.id, plan])
    ).values()];

    // Convertir los servicios de todas las promociones en datos para las tarjetas
    const pricingData = promotions.flatMap(promo =>
        promo.services.map(service => ({
            discount: promo.discount, // Usamos el descuento de la promoción
            months: promo.duration, // Usamos la duración de la promoción
            planType: service.name,
            speed: service.speed || 0,
            price: service.price || 0,
            originalPrice: service.regularPrice || 0,
            promotionId: promo.id,
            promotionName: promo.name,
            promotionColor: promo.color,
            serviceItems: service.serviceItems || []
        }))
    );

    // Ordenar los datos de precios por precio (menor a mayor)
    pricingData.sort((a, b) => a.price - b.price);

    // Obtener los addons seleccionados para pasar a las tarjetas de precios
    const getSelectedAddons = () => {
        return allAddons.filter(addon => selectedAddons[addon.id]);
    };

    return (
        <div className="w-full py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Mostrar todos los complementos disponibles */}
                {allAddons.length > 0 && (
                    <div className="max-w-2xl mx-auto mb-10">
                        {allAddons.map(addon => (
                            <div
                                key={addon.id}
                                className="flex flex-col md:flex-row md:items-center max-w-2xl mx-auto md:justify-between md:px-5 px-4 md:py-5 py-3 md:border-4 border md:border-dashed border-gray-200 md:border-gray-300 rounded-lg md:rounded-3xl mb-3 md:mb-4 last:mb-0 relative"
                            >
                                <div className="text-base text-center md:text-left md:text-lg font-medium mb-2 md:mb-0">
                                    ¿Quiere llevar un {addon.name}?
                                </div>
                                <div className="flex md:hidden items-center justify-center">
                                    <div className="text-sm flex items-center gap-2">
                                        Agregar por <span className="text-indigo-600 font-bold">${formatPrice(addon.price)}</span>/mes
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={!!selectedAddons[addon.id]}
                                                onChange={() => toggleAddon(addon.id)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-4 h-4 border-2 border-gray-400 rounded-sm peer-checked:bg-indigo-600 peer-checked:border-0 relative z-10 flex items-center justify-center after:content-['✓'] after:hidden peer-checked:after:block after:text-white after:text-xs"></div>
                                        </label>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center mt-0">
                                    <div className="mr-4">
                                        Agregar por <span className="text-indigo-600 font-bold">${formatPrice(addon.price)}</span>/mes
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={!!selectedAddons[addon.id]}
                                            onChange={() => toggleAddon(addon.id)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-5 h-5 border-2 border-gray-400 rounded-sm peer-checked:bg-indigo-600 peer-checked:border-0 relative z-10 flex items-center justify-center after:content-['✓'] after:hidden peer-checked:after:block after:text-white after:text-xs"></div>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {pricingData.map((plan, index) => (
                        <PricingCard
                            key={index}
                            discount={plan.discount}
                            months={plan.months}
                            planType={plan.planType}
                            speed={plan.speed}
                            price={plan.price}
                            originalPrice={plan.originalPrice}
                            includeAddons={getSelectedAddons().length > 0}
                            includeInternetTV={includeInternetTV}
                            showZappingButton={includeInternetTV}
                            dictionary={dictionary}
                            selectedAddons={getSelectedAddons()}
                            promotionColor={plan.promotionColor || undefined}
                            promotionName={plan.promotionName}
                            promotionId={plan.promotionId}
                            serviceItems={plan.serviceItems}
                            zappingPlans={zappingPlans}
                        />
                    ))}
                </div>

                <InfoBoxes dictionary={dictionary} />
            </div>
        </div>
    );
} 