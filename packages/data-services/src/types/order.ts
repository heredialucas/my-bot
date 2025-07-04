import { Prisma } from "@repo/database";
import { ClientData } from "./client";
import { ProductData } from "./product";

export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type PaymentMethod = "CASH" | "CREDIT_CARD" | "BANK_TRANSFER" | "OTHER";

export type OrderItemData = {
    id: string;
    quantity: number;
    price: Prisma.Decimal;
    productId: string;
    orderId: string;
    product: ProductData;
};

export type PaymentData = {
    id: string;
    paymentDate: Date;
    amount: Prisma.Decimal;
    paymentMethod: PaymentMethod;
    receiptNumber: string | null;
    notes: string | null;
    orderId: string;
};

export type OrderData = {
    id: string;
    orderDate: Date;
    status: OrderStatus;
    totalAmount: Prisma.Decimal;
    clientId: string;
    sellerId: string;
};

export type FullOrderData = OrderData & {
    client: ClientData;
    items: OrderItemData[];
    payments: PaymentData[];
}; 