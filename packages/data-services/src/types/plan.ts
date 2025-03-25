// Tipos para los planes
export type PlanFormData = {
    name: string;
    price: number;
    regularPrice?: number | null;
    promoMonths?: number | null;
    channelCount?: number | null;
    planType: string;
    characteristics: Array<{
        key: string;
        value: boolean;
    }>;
}; 