// Tipos para los planes
export type PlanFormData = {
    name: string;
    description?: string;
    price: number;
    regularPrice?: number | null;
    promoMonths?: number | null;
    channelCount?: number | null;
    premiumContent?: boolean;
    noAds?: boolean;
    planType: string;
}; 