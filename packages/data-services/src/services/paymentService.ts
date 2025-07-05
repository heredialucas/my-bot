import { database } from '@repo/database';
import { getCurrentUser } from './authService';

/**
 * Obtener todos los pagos según los permisos del usuario
 * - Admin: ve todos los pagos
 * - Vendedor: ve solo sus pagos
 */
export async function getAllPayments() {
    const user = await getCurrentUser();
    if (!user) {
        return [];
    }

    try {
        const payments = await database.payment.findMany({
            where: user.role === 'admin' ? {} : {
                order: {
                    sellerId: user.id
                }
            },
            include: {
                order: {
                    include: {
                        client: {
                            select: {
                                firstName: true,
                                lastName: true,
                                email: true
                            }
                        },
                        seller: {
                            select: {
                                name: true,
                                lastName: true
                            }
                        },
                        items: {
                            include: {
                                product: {
                                    select: {
                                        name: true,
                                        sku: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                paymentDate: 'desc'
            }
        });

        return payments;
    } catch (error) {
        console.error('Error fetching payments:', error);
        return [];
    }
}

/**
 * Obtener detalles de un pago específico
 */
export async function getPaymentById(paymentId: string) {
    const user = await getCurrentUser();
    if (!user) {
        return null;
    }

    try {
        const payment = await database.payment.findUnique({
            where: { id: paymentId },
            include: {
                order: {
                    include: {
                        client: true,
                        seller: {
                            select: {
                                name: true,
                                lastName: true,
                                email: true
                            }
                        },
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        });

        if (!payment) {
            return null;
        }

        // Verificar permisos
        if (user.role !== 'admin' && payment.order.sellerId !== user.id) {
            return null;
        }

        return payment;
    } catch (error) {
        console.error('Error fetching payment:', error);
        return null;
    }
}

/**
 * Crear un nuevo pago
 */
export async function createPayment(data: {
    orderId: string;
    amount: number;
    paymentMethod: 'CASH' | 'CREDIT_CARD' | 'BANK_TRANSFER' | 'OTHER';
    receiptNumber?: string;
    notes?: string;
}) {
    const user = await getCurrentUser();
    if (!user) {
        return { success: false, message: 'Usuario no autenticado.' };
    }

    try {
        // Verificar que el pedido existe y pertenece al usuario (si no es admin)
        const order = await database.order.findUnique({
            where: { id: data.orderId },
            include: {
                payments: true
            }
        });

        if (!order) {
            return { success: false, message: 'Pedido no encontrado.' };
        }

        if (user.role !== 'admin' && order.sellerId !== user.id) {
            return { success: false, message: 'No tienes permisos para agregar pagos a este pedido.' };
        }

        // Verificar que el receipt number no esté duplicado (si se proporciona)
        if (data.receiptNumber) {
            const existingPayment = await database.payment.findUnique({
                where: { receiptNumber: data.receiptNumber }
            });

            if (existingPayment) {
                return { success: false, message: 'El número de recibo ya existe.' };
            }
        }

        // Crear el pago
        const payment = await database.payment.create({
            data: {
                orderId: data.orderId,
                amount: data.amount,
                paymentMethod: data.paymentMethod,
                receiptNumber: data.receiptNumber,
                notes: data.notes
            }
        });

        return { success: true, payment };
    } catch (error) {
        console.error('Error creating payment:', error);
        return { success: false, message: 'Error al crear el pago.' };
    }
}

/**
 * Obtener estadísticas de pagos
 */
export async function getPaymentStats() {
    const user = await getCurrentUser();
    if (!user) {
        return null;
    }

    try {
        const whereClause = user.role === 'admin' ? {} : {
            order: {
                sellerId: user.id
            }
        };

        const [totalPayments, totalAmount, paymentsByMethod] = await Promise.all([
            database.payment.count({ where: whereClause }),
            database.payment.aggregate({
                where: whereClause,
                _sum: { amount: true }
            }),
            database.payment.groupBy({
                by: ['paymentMethod'],
                where: whereClause,
                _count: { id: true },
                _sum: { amount: true }
            })
        ]);

        return {
            totalPayments,
            totalAmount: totalAmount._sum.amount || 0,
            paymentsByMethod
        };
    } catch (error) {
        console.error('Error fetching payment stats:', error);
        return null;
    }
} 