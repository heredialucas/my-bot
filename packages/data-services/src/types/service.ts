// Tipos para servicios
export type ServiceItemData = {
    title: string;
    icon?: string;
};

export type ServiceFormData = {
    name: string;
    icon?: string | null;
    serviceItems?: ServiceItemData[];
    speed?: number | null;
    price?: number | null;
    regularPrice?: number | null;
    promoMonths?: number | null;
}; 