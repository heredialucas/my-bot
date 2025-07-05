'use server';

import { database } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './authService';
import type { OrderStatus } from '@repo/database';

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
 * Get all orders from all sellers. Only for admins.
 */
export async function getAllOrders() {
    const user = await getCurrentUser();
    if (user?.role !== 'admin') {
        return [];
    }

    try {
        const orders = await database.order.findMany({
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
        console.error("Error fetching all orders:", error);
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

/**
 * Delete an order by its ID.
 * Ensures the order belongs to the seller or the user is an admin.
 * Also restores the inventory that was decremented when the order was created.
 */
export async function deleteOrder(orderId: string) {
    const user = await getCurrentUser();
    if (!user?.id) {
        return { success: false, message: 'Usuario no autenticado.' };
    }

    try {
        const order = await database.order.findFirst({
            where: {
                id: orderId,
                ...(user.role !== 'admin' && { sellerId: user.id }),
            },
            include: {
                items: true,
            },
        });

        if (!order) {
            return { success: false, message: 'Pedido no encontrado o sin permisos para eliminar.' };
        }

        await database.$transaction(async (tx) => {
            // Restore inventory
            for (const item of order.items) {
                await tx.inventory.updateMany({
                    where: {
                        productId: item.productId,
                        sellerId: order.sellerId,
                    },
                    data: {
                        quantity: {
                            increment: item.quantity,
                        },
                    },
                });
            }

            // Delete the order (this will cascade to delete order items)
            await tx.order.delete({
                where: { id: orderId },
            });
        });

        revalidatePath('/orders');
        return { success: true, message: 'Pedido eliminado correctamente.' };
    } catch (error) {
        console.error(`Error deleting order with ID ${orderId}:`, error);
        return { success: false, message: 'Error interno del servidor.' };
    }
}

/**
 * Actualizar el estado de un pedido y generar pago automático si se marca como entregado
 */
export async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    const user = await getCurrentUser();
    if (!user) {
        return { success: false, message: 'Usuario no autenticado.' };
    }

    try {
        // Obtener el pedido actual
        const currentOrder = await database.order.findUnique({
            where: { id: orderId },
            include: {
                payments: true
            }
        });

        if (!currentOrder) {
            return { success: false, message: 'Pedido no encontrado.' };
        }

        // Verificar permisos
        if (user.role !== 'admin' && currentOrder.sellerId !== user.id) {
            return { success: false, message: 'No tienes permisos para modificar este pedido.' };
        }

        // Actualizar el estado del pedido
        const updatedOrder = await database.order.update({
            where: { id: orderId },
            data: { status: newStatus }
        });

        // Si el estado cambió a DELIVERED y no hay pagos registrados, generar pago automático
        if (newStatus === 'DELIVERED' && currentOrder.payments.length === 0) {
            await database.payment.create({
                data: {
                    orderId: orderId,
                    amount: currentOrder.totalAmount,
                    paymentMethod: 'CASH', // Método por defecto
                    receiptNumber: `AUTO-${Date.now()}`, // Número de recibo automático
                    notes: 'Pago automático generado al marcar como entregado'
                }
            });
        }

        return { success: true, order: updatedOrder };
    } catch (error) {
        console.error('Error updating order status:', error);
        return { success: false, message: 'Error al actualizar el estado del pedido.' };
    }
} 