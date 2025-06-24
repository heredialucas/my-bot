import 'server-only';
import { getCollection } from '@repo/database';

interface ProductTimelinePoint {
    period: string;
    totalQuantity: number;
    totalRevenue: number;
    confirmedQuantity: number;
    confirmedRevenue: number;
}

export async function getProductTimeline(
    startDate: Date,
    endDate: Date
): Promise<ProductTimelinePoint[]> {
    try {
        const collection = await getCollection('orders');

        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let periodFormat: string;
        if (diffDays <= 31) periodFormat = '%Y-%m-%d';
        else if (diffDays <= 90) periodFormat = '%Y-%U';
        else periodFormat = '%Y-%m';

        const pipeline = [
            { $match: { createdAt: { $gte: startDate, $lte: endDate }, status: { $in: ['confirmed', 'pending'] } } },
            { $unwind: '$items' },
            { $unwind: '$items.options' },
            {
                $group: {
                    _id: {
                        period: { $dateToString: { format: periodFormat, date: '$createdAt' } },
                    },
                    totalQuantity: { $sum: '$items.options.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$items.options.price', '$items.options.quantity'] } },
                    confirmedQuantity: {
                        $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, '$items.options.quantity', 0] }
                    },
                    confirmedRevenue: {
                        $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, { $multiply: ['$items.options.price', '$items.options.quantity'] }, 0] }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    period: '$_id.period',
                    totalQuantity: 1,
                    totalRevenue: 1,
                    confirmedQuantity: 1,
                    confirmedRevenue: 1
                }
            },
            { $sort: { period: 1 } }
        ];

        const result = await collection.aggregate(pipeline).toArray();
        return result as ProductTimelinePoint[];

    } catch (error) {
        console.error('Error fetching product timeline:', error);
        throw error;
    }
} 