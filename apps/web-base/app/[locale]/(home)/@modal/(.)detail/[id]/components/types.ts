import { AddOn } from "@/app/[locale]/(home)/components/features/types";

// Tipos para la promoción
export type Promotion = {
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
            icon?: string | null;
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
        planType: string;
        characteristics: Array<{
            id?: string;
            key: string;
            value: boolean;
            planId?: string;
        }>;
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

export type DetailProps = {
    promotion: Promotion;
    selectedAddonsFromLanding?: AddOn[]; // Addons seleccionados desde la landing
    allAddons: AddOn[]; // Todos los addons disponibles
};