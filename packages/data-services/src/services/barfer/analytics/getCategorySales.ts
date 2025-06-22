import 'server-only';
import { getCollection } from '@repo/database';

/**
 * Obtiene estadísticas de ventas por categoría de producto
 */
export async function getCategorySales(statusFilter?: 'pending' | 'confirmed' | 'all', limit: number = 50) {
    try {
        const collection = await getCollection('orders');

        // Construir el match condition basado en el filtro
        const matchCondition: any = {};
        if (statusFilter && statusFilter !== 'all') {
            matchCondition.status = statusFilter;
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
                $addFields: {
                    // Extraer categoría basada en las palabras más comunes y útiles
                    category: {
                        $switch: {
                            branches: [
                                // Categorías por animal (más específicas)
                                {
                                    case: { $regexMatch: { input: '$items.name', regex: /perro.*pollo/i } },
                                    then: 'PERRO POLLO'
                                },
                                {
                                    case: { $regexMatch: { input: '$items.name', regex: /perro.*vaca/i } },
                                    then: 'PERRO VACA'
                                },
                                {
                                    case: { $regexMatch: { input: '$items.name', regex: /perro.*cerdo/i } },
                                    then: 'PERRO CERDO'
                                },
                                {
                                    case: { $regexMatch: { input: '$items.name', regex: /perro.*cordero/i } },
                                    then: 'PERRO CORDERO'
                                },
                                {
                                    case: { $regexMatch: { input: '$items.name', regex: /gato.*pollo/i } },
                                    then: 'GATO POLLO'
                                },
                                {
                                    case: { $regexMatch: { input: '$items.name', regex: /gato.*vaca/i } },
                                    then: 'GATO VACA'
                                },
                                {
                                    case: { $regexMatch: { input: '$items.name', regex: /gato.*cordero/i } },
                                    then: 'GATO CORDERO'
                                },
                                // Productos especiales
                                {
                                    case: { $regexMatch: { input: '$items.name', regex: /huesos/i } },
                                    then: 'HUESOS CARNOSOS'
                                },
                                {
                                    case: { $regexMatch: { input: '$items.name', regex: /complement/i } },
                                    then: 'COMPLEMENTOS'
                                },
                                {
                                    case: { $regexMatch: { input: '$items.name', regex: /big.*dog/i } },
                                    then: 'BIG DOG'
                                },
                                // Fallback para perros y gatos sin proteína específica
                                {
                                    case: { $regexMatch: { input: '$items.name', regex: /perro/i } },
                                    then: 'PERRO OTROS'
                                },
                                {
                                    case: { $regexMatch: { input: '$items.name', regex: /gato/i } },
                                    then: 'GATO OTROS'
                                }
                            ],
                            default: 'OTROS'
                        }
                    }
                }
            },
            {
                $group: {
                    _id: '$category',
                    totalQuantity: { $sum: '$items.options.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$items.options.quantity', '$items.options.price'] } },
                    orderCount: { $sum: 1 },
                    uniqueProducts: { $addToSet: '$items.name' },
                    avgPrice: { $avg: '$items.options.price' }
                }
            },
            {
                $project: {
                    _id: 1,
                    totalQuantity: 1,
                    totalRevenue: 1,
                    orderCount: 1,
                    uniqueProducts: { $size: '$uniqueProducts' },
                    avgPrice: 1
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: limit }
        );

        const result = await collection.aggregate(pipeline).toArray();

        const formattedResult = result.map((item: any) => ({
            categoryName: item._id,
            quantity: item.totalQuantity,
            revenue: item.totalRevenue,
            orders: item.orderCount,
            uniqueProducts: item.uniqueProducts,
            avgPrice: Math.round(item.avgPrice),
            statusFilter: statusFilter || 'all'
        }));

        return formattedResult;

    } catch (error) {
        console.error('Error fetching category sales:', error);
        throw error;
    }
} 