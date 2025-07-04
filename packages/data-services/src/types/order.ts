import { ClientData } from "./client";
import { ProductData } from "./product";

export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export type OrderItemData = {
    id: string;
    quantity: number;
    price: number;
    productId: string;
    orderId: string;
    product: ProductData;
};

export type PaymentMethod = "CASH" | "CREDIT_CARD" | "BANK_TRANSFER" | "OTHER";

export type PaymentData = {
    id: string;
    paymentDate: Date;
    amount: number;
    paymentMethod: PaymentMethod;
    receiptNumber: string | null;
    notes: string | null;
    orderId: string;
};

export type OrderData = {
    id: string;
    orderDate: Date;
    status: OrderStatus;
    totalAmount: number;
    clientId: string;
    sellerId: string;
};

export type FullOrderData = OrderData & {
    client: ClientData;
    items: OrderItemData[];
    payments: PaymentData[];
}; 