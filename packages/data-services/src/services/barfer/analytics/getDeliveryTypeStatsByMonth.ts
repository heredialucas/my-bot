import 'server-only';
import { getCollection } from '@repo/database';

interface DeliveryTypeStats {
    month: string;
    sameDayOrders: number;
    normalOrders: number;
    sameDayRevenue: number;
    normalRevenue: number;
}

export async function getDeliveryTypeStatsByMonth(startDate?: Date, endDate?: Date): Promise<DeliveryTypeStats[]> {
    try {
        const collection = await getCollection('orders');

        const pipeline: any[] = [];

        if (startDate || endDate) {
            const matchCondition: any = {};
            matchCondition.createdAt = {};
            if (startDate) matchCondition.createdAt.$gte = startDate;
            if (endDate) matchCondition.createdAt.$lte = endDate;
            pipeline.push({ $match: matchCondition });
        }

        pipeline.push(
            {
                $addFields: {
                    isSameDayDelivery: {
                        $or: [
                            { $eq: ["$deliveryArea.sameDayDelivery", true] },
                            {
                                $gt: [{
                                    $size: {
                                        $filter: {
                                            input: "$items",
                                            as: "item",
                                            cond: { $eq: ["$$item.sameDayDelivery", true] }
                                        }
                                    }
                                }, 0]
                            }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    sameDayOrders: {
                        $sum: { $cond: ["$isSameDayDelivery", 1, 0] }
                    },
                    normalOrders: {
                        $sum: { $cond: ["$isSameDayDelivery", 0, 1] }
                    },
                    sameDayRevenue: {
                        $sum: { $cond: ["$isSameDayDelivery", "$total", 0] }
                    },
                    normalRevenue: {
                        $sum: { $cond: ["$isSameDayDelivery", 0, "$total"] }
                    }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            },
            {
                $project: {
                    _id: 0,
                    month: {
                        $concat: [
                            { $toString: "$_id.year" },
                            "-",
                            { $toString: { $cond: { if: { $lt: ["$_id.month", 10] }, then: { $concat: ["0", { $toString: "$_id.month" }] }, else: { $toString: "$_id.month" } } } }
                        ]
                    },
                    sameDayOrders: 1,
                    normalOrders: 1,
                    sameDayRevenue: 1,
                    normalRevenue: 1
                }
            }
        );

        const result = await collection.aggregate(pipeline).toArray();
        return result as DeliveryTypeStats[];

    } catch (error) {
        console.error('Error fetching delivery type stats by month:', error);
        throw error;
    }
} 