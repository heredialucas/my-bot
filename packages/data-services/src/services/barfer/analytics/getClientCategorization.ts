import 'server-only';
import { getCollection } from '@repo/database';
import type {
    ClientCategorization,
    ClientBehaviorCategory,
    ClientSpendingCategory,
    ClientAnalytics,
    ClientCategoryStats
} from '../../../types/barfer';

/**
 * Categoriza clientes basado en su comportamiento de compra y gasto mensual
 */
export async function getClientCategorization(): Promise<ClientAnalytics> {
    try {
        const collection = await getCollection('orders');

        // Pipeline para obtener datos de clientes con sus estadísticas
        const pipeline = [
            { $match: { status: { $in: ['confirmed', 'delivered'] } } },
            {
                $group: {
                    _id: { $ifNull: ['$user.id', '$user.email'] }, // Prioritize user.id, fallback to email
                    user: { $first: '$user' },
                    totalOrders: { $sum: 1 },
                    totalSpent: { $sum: '$total' },
                    firstOrderDate: { $min: '$createdAt' },
                    lastOrderDate: { $max: '$createdAt' },
                    orders: { $push: { date: '$createdAt', total: '$total' } }
                }
            },
            {
                $addFields: {
                    averageOrderValue: { $divide: ['$totalSpent', '$totalOrders'] },
                    daysSinceFirstOrder: {
                        $divide: [
                            { $subtract: [new Date(), '$firstOrderDate'] },
                            1000 * 60 * 60 * 24
                        ]
                    },
                    daysSinceLastOrder: {
                        $divide: [
                            { $subtract: [new Date(), '$lastOrderDate'] },
                            1000 * 60 * 60 * 24
                        ]
                    }
                }
            }
        ];

        const clientsData = await collection.aggregate(pipeline).toArray();

        // Procesar cada cliente para asignar categorías
        const categorizedClients: ClientCategorization[] = clientsData.map(client => {
            const behaviorCategory = categorizeBehavior(client);
            const spendingCategory = categorizeSpending(client.totalSpent, client.totalOrders, client.daysSinceFirstOrder);
            const monthlySpending = calculateMonthlySpending(client.totalSpent, client.daysSinceFirstOrder);

            return {
                _id: client._id,
                user: client.user,
                behaviorCategory,
                spendingCategory,
                totalOrders: client.totalOrders,
                totalSpent: client.totalSpent,
                monthlySpending,
                firstOrderDate: client.firstOrderDate,
                lastOrderDate: client.lastOrderDate,
                daysSinceFirstOrder: Math.round(client.daysSinceFirstOrder),
                daysSinceLastOrder: Math.round(client.daysSinceLastOrder),
                averageOrderValue: Math.round(client.averageOrderValue)
            };
        });

        // Calcular estadísticas por categoría
        const behaviorStats = calculateCategoryStats(categorizedClients, 'behavior');
        const spendingStats = calculateCategoryStats(categorizedClients, 'spending');

        // Calcular resumen general
        const summary = {
            averageOrderValue: Math.round(
                categorizedClients.reduce((sum, c) => sum + c.averageOrderValue, 0) / categorizedClients.length
            ),
            repeatCustomerRate: (categorizedClients.filter(c => c.totalOrders > 1).length / categorizedClients.length) * 100,
            averageOrdersPerCustomer: categorizedClients.reduce((sum, c) => sum + c.totalOrders, 0) / categorizedClients.length,
            averageMonthlySpending: Math.round(
                categorizedClients.reduce((sum, c) => sum + c.monthlySpending, 0) / categorizedClients.length
            )
        };

        return {
            totalClients: categorizedClients.length,
            behaviorCategories: behaviorStats,
            spendingCategories: spendingStats,
            clients: categorizedClients,
            summary
        };

    } catch (error) {
        console.error('Error categorizing clients:', error);
        throw error;
    }
}

/**
 * Categoriza el comportamiento de compra del cliente
 */
function categorizeBehavior(client: any): ClientBehaviorCategory {
    const { daysSinceLastOrder, orders, totalOrders } = client;

    // Un cliente es "recuperado" si su última compra fue en los últimos 3 meses,
    // pero hubo un lapso de más de 4 meses entre la última y la penúltima compra.
    if (totalOrders > 1) {
        const sortedOrders = [...orders].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const lastOrderDate = new Date(sortedOrders[0].date);
        const secondLastOrderDate = new Date(sortedOrders[1].date);
        const diffTime = lastOrderDate.getTime() - secondLastOrderDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays > 120 && daysSinceLastOrder <= 90) {
            return 'recovered';
        }
    }

    // Perdido: no compra hace mas de 4 meses
    if (daysSinceLastOrder > 120) {
        return 'lost';
    }

    // Posible Inactivo: no compra hace mas de 3 meses
    if (daysSinceLastOrder > 90) {
        return 'possible-inactive';
    }

    // Activo: al menos 1 compra en los ultimos 3 meses
    return 'active';
}

/**
 * Categoriza el nivel de gasto del cliente
 */
function categorizeSpending(totalSpent: number, totalOrders: number, daysSinceFirstOrder: number): ClientSpendingCategory {
    // Calcular gasto mensual real
    const monthsSinceFirstOrder = Math.max(daysSinceFirstOrder / 30, 1);
    const monthlySpending = totalSpent / monthsSinceFirstOrder;

    // Categorías basadas en gasto mensual real
    // Premium: >$63,000 mensuales (>10kg, ~$6,300 por kg)
    if (monthlySpending > 63000) return 'premium';

    // Standard: $39,000-$63,000 mensuales (5-10kg)
    if (monthlySpending > 39000) return 'standard';

    // Basic: hasta $39,000 mensuales (hasta 5kg)
    return 'basic';
}

/**
 * Calcula el gasto mensual promedio
 */
function calculateMonthlySpending(totalSpent: number, daysSinceFirstOrder: number): number {
    const monthsSinceFirstOrder = Math.max(daysSinceFirstOrder / 30, 1);
    return Math.round(totalSpent / monthsSinceFirstOrder);
}

/**
 * Calcula estadísticas por categoría
 */
function calculateCategoryStats(
    clients: ClientCategorization[],
    type: 'behavior' | 'spending'
): ClientCategoryStats[] {
    const categoryField = type === 'behavior' ? 'behaviorCategory' : 'spendingCategory';
    const categoryMap = new Map<string, { count: number; totalSpent: number }>();

    clients.forEach(client => {
        const category = client[categoryField];
        if (!categoryMap.has(category)) {
            categoryMap.set(category, { count: 0, totalSpent: 0 });
        }
        const stats = categoryMap.get(category)!;
        stats.count++;
        stats.totalSpent += client.totalSpent;
    });

    return Array.from(categoryMap.entries()).map(([category, stats]) => ({
        category: category as ClientBehaviorCategory | ClientSpendingCategory,
        count: stats.count,
        totalSpent: stats.totalSpent,
        averageSpending: Math.round(stats.totalSpent / stats.count),
        percentage: Math.round((stats.count / clients.length) * 100)
    }));
} 