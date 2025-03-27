export interface ServiceItem {
    id?: string;
    title: string;
    description?: string | null;
    icon?: string | null;
}

export interface ServiceData {
    id?: string;
    name: string;
    icon?: string | null;
    speed?: number | null;
    price?: number | null;
    regularPrice?: number | null;
    promoMonths?: number | null;
    serviceItems?: ServiceItem[];
    createdAt?: Date;
    updatedAt?: Date;
} 