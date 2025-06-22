import 'server-only';
import { getCollection } from '@repo/database';

/**
 * Obtiene estadísticas de ventas por producto
 * 
 * Raw MongoDB result:
 * {
 *   "_id": {
 *     "productId": "66cf6c25a2cc94fdeb2ad0c6",
 *     "productName": "BOX GATO POLLO",
 *     "optionName": "5KG"
 *   },
 *   "totalQuantity": 1461,
 *   "totalRevenue": 48686865,
 *   "orderCount": 1265,
 *   "avgPrice": 33356.129644268774,
 *   "statuses": ["confirmed", "pending"]
 * }
 * 
 * Formatted result:
 * {
 *   "productId": "66cf6c25a2cc94fdeb2ad0c6",
 *   "productName": "BOX GATO POLLO",
 *   "optionName": "5KG",
 *   "quantity": 1461,
 *   "revenue": 48686865,
 *   "orders": 1265,
 *   "avgPrice": 33356,
 *   "statuses": ["confirmed", "pending"],
 *   "statusFilter": "all"
 * }
 */
export async function getProductSales(statusFilter?: 'pending' | 'confirmed' | 'all', limit: number = 50, startDate?: Date, endDate?: Date) {
    try {
        const collection = await getCollection('orders');

        // Construir el match condition basado en el filtro
        const matchCondition: any = {};
        if (statusFilter && statusFilter !== 'all') {
            matchCondition.status = statusFilter;
        }

        // Agregar filtro de fechas si se proporciona
        if (startDate || endDate) {
            matchCondition.createdAt = {};
            if (startDate) matchCondition.createdAt.$gte = startDate;
            if (endDate) matchCondition.createdAt.$lte = endDate;
        }

        const pipeline: any[] = [];

        // Solo agregar match si hay condiciones
        if (Object.keys(matchCondition).length > 0) {
            pipeline.push({ $match: matchCondition });
        }

        pipeline.push(
            { $unwind: '$items' },
            { $unwind: '$items.options' },
            {
                $group: {
                    _id: {
                        productId: '$items.id',
                        productName: '$items.name',
                        optionName: '$items.options.name'
                    },
                    totalQuantity: { $sum: '$items.options.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$items.options.quantity', '$items.options.price'] } },
                    orderCount: { $sum: 1 },
                    avgPrice: { $avg: '$items.options.price' },
                    statuses: { $addToSet: '$status' } // Para saber qué estados incluye
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: limit }
        );

        const result = await collection.aggregate(pipeline).toArray();

        const formattedResult = result.map((item: any) => ({
            productId: item._id.productId,
            productName: item._id.productName,
            optionName: item._id.optionName,
            quantity: item.totalQuantity,
            revenue: item.totalRevenue,
            orders: item.orderCount,
            avgPrice: Math.round(item.avgPrice),
            statuses: item.statuses, // Array de estados incluidos
            statusFilter: statusFilter || 'all'
        }));

        return formattedResult;

    } catch (error) {
        console.error('Error fetching product sales:', error);
        throw error;
    }
} 