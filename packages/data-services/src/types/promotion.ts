// Tipos para las promociones
export type PromotionFormData = {
    name: string;
    description?: string;
    discount: number;
    duration: number;
    active?: boolean;
    color?: string | null;
    serviceIds?: string[];
    planIds?: string[];
    addonIds?: string[];
}; 