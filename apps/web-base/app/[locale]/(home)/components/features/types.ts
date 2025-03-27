// Tipos compartidos para los componentes de features

import { Dictionary } from "@repo/internationalization";

// Tipo para los complementos/addons
export type AddOn = {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    icon?: string | null;
    color?: string | null;
    // Opcionales para compatibilidad con la API
    createdAt?: Date;
    updatedAt?: Date;
};

// Plan type from database schema
export type Plan = {
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

export type PricingCardProps = {
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
    serviceId?: string; // ID del servicio
};