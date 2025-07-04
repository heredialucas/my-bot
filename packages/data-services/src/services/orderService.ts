'use server';

import { database } from '@repo/database';
import { getCurrentUser } from './authService';

/**
 * Get all orders for a specific seller, including details.
 */
export async function getOrdersBySeller() {
    const user = await getCurrentUser();
    if (!user?.id) {
        return [];
    }

    try {
        const orders = await database.order.findMany({
            where: { sellerId: user.id },
            include: {
                client: true,
                items: {
                    include: {
                        product: true,
                    },
                },
                payments: true,
            },
            orderBy: { orderDate: 'desc' },
        });
        return orders;
    } catch (error) {
        console.error("Error fetching orders for seller:", error);
        return [];
    }
}

/**
 * Get a single order by its ID.
 * Ensures the order belongs to the seller or the user is an admin.
 */
export async function getOrderById(orderId: string) {
    const user = await getCurrentUser();
    if (!user?.id) {
        return null;
    }

    try {
        const order = await database.order.findFirst({
            where: {
                id: orderId,
                ...(user.role !== 'admin' && { sellerId: user.id }),
            },
            include: {
                client: true,
                items: {
                    include: {
                        product: true,
                    },
                },
                payments: true,
            },
        });
        return order;
    } catch (error) {
        console.error(`Error fetching order with ID ${orderId}:`, error);
        return null;
    }
}

/**
 * Creates a new order, its items, and updates inventory in a transaction.
 */
export async function createOrder(data: {
    clientId: string;
    sellerId: string;
    items: { productId: string; quantity: number }[];
}) {
    const productIds = data.items.map((item) => item.productId);
    const products = await database.product.findMany({
        where: { id: { in: productIds } },
    });

    const productPriceMap = new Map(products.map((p) => [p.id, p.price]));
    let totalAmount = 0;

    const orderItemsData = data.items.map((item) => {
        const price = productPriceMap.get(item.productId);
        if (!price) {
            throw new Error(`Product with ID ${item.productId} not found or has no price.`);
        }
        const itemTotal = price * item.quantity;
        totalAmount += itemTotal;
        return {
            productId: item.productId,
            quantity: item.quantity,
            price,
        };
    });

    return database.$transaction(async (tx) => {
        const order = await tx.order.create({
            data: {
                clientId: data.clientId,
                sellerId: data.sellerId,
                totalAmount,
                items: {
                    create: orderItemsData,
                },
            },
        });

        for (const item of data.items) {
            await tx.inventory.updateMany({
                where: {
                    productId: item.productId,
                    sellerId: data.sellerId,
                },
                data: {
                    quantity: {
                        decrement: item.quantity,
                    },
                },
            });
        }

        return order;
    });
} 