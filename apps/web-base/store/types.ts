// Tipos para el store de servicios

export type ServiceOption = 'internet-hogar' | 'internet-tv';

export type Plan = {
    id: string;
    name: string;
    price: number;
    regularPrice?: number | null;
    promoMonths?: number | null;
    channelCount?: number | null;
    planType: string;
    characteristics?: Array<{
        id?: string;
        key: string;
        value: boolean;
        planId?: string;
    }>;
};

export type ServiceItem = {
    id: string;
    title: string;
    description?: string | null;
    icon?: string | null;
};

export type Service = {
    id: string;
    name: string;
    speed?: number | null;
    price?: number | null;
    regularPrice?: number | null;
    serviceItems?: ServiceItem[];
};

export type Promotion = {
    id: string;
    name: string;
    discount: number;
    duration: number;
};

export type AddOn = {
    id: string;
    name: string;
    price: number;
    description?: string | null;
    icon?: string | null;
    color?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface ServiceStore {
    // Opción básica (internet-hogar o internet-tv)
    selectedOption: ServiceOption;
    setSelectedOption: (option: ServiceOption) => void;

    // Selecciones detalladas
    selectedPromotion: Promotion | null;
    setSelectedPromotion: (promotion: Promotion | null) => void;

    selectedService: Service | null;
    setSelectedService: (service: Service | null) => void;

    selectedPlan: Plan | null;
    setSelectedPlan: (plan: Plan | null) => void;

    selectedAddons: AddOn[];
    setSelectedAddons: (addons: AddOn[]) => void;
    addAddon: (addon: AddOn) => void;
    removeAddon: (addonId: string) => void;
    toggleAddon: (addon: AddOn) => void;

    // Método para limpiar todas las selecciones
    clearSelections: () => void;

    // Método para generar el texto descriptivo para WhatsApp
    getFormattedSelectionText: () => string;
}