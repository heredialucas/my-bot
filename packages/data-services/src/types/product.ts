export type ProductData = {
    id: string;
    name: string;
    description: string | null;
    sku: string;
    price: number;
    quantityInStock: number;
    createdAt: Date;
    updatedAt: Date;
};

export type ProductFormData = {
    name: string;
    description?: string;
    sku: string;
    price: number;
    quantityInStock: number;
};

export type InventoryWithProduct = {
    id: string;
    quantity: number;
    updatedAt: Date;
    productId: string;
    sellerId: string;
    product: ProductData;
} 