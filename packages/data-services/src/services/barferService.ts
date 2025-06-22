import 'server-only';
import { ObjectId, getCollection } from '@repo/database';
import type {
    Product,
    Order,
    User,
    Category,
    DeliveryArea,
    Coupon,
    Address,
    Ally,
    BankInfo,
    Event,
    DashboardStats
} from '../types/barfer';

// PRODUCTS
export async function getProducts(): Promise<Product[]> {
    try {
        const collection = await getCollection('products');
        return await collection.find({}).toArray() as unknown as Product[];
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const collection = await getCollection('products');
        return await collection.findOne({ _id: new ObjectId(id) }) as unknown as Product | null;
    } catch (error) {
        console.error('Error fetching product by id:', error);
        throw error;
    }
}

export async function getTopProducts(limit = 5): Promise<Product[]> {
    try {
        const collection = await getCollection('products');
        return await collection
            .find({})
            .sort({ salesCount: -1 })
            .limit(limit)
            .toArray() as unknown as Product[];
    } catch (error) {
        console.error('Error fetching top products:', error);
        throw error;
    }
}

// CATEGORIES
export async function getCategories(): Promise<Category[]> {
    try {
        const collection = await getCollection('categories');
        return await collection.find({}).toArray() as unknown as Category[];
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

// ORDERS
export async function getOrders(limit?: number): Promise<Order[]> {
    try {
        const collection = await getCollection('orders');
        const query = collection.find({}).sort({ createdAt: -1 });
        if (limit) {
            query.limit(limit);
        }
        return await query.toArray() as unknown as Order[];
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}

export async function getOrderById(id: string): Promise<Order | null> {
    try {
        const collection = await getCollection('orders');
        return await collection.findOne({ _id: new ObjectId(id) }) as unknown as Order | null;
    } catch (error) {
        console.error('Error fetching order by id:', error);
        throw error;
    }
}

export async function getOrdersByStatus(status: string): Promise<Order[]> {
    try {
        const collection = await getCollection('orders');
        return await collection.find({ status }).toArray() as unknown as Order[];
    } catch (error) {
        console.error('Error fetching orders by status:', error);
        throw error;
    }
}

export async function getRecentOrders(limit = 10): Promise<Order[]> {
    try {
        const collection = await getCollection('orders');
        return await collection
            .find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .toArray() as unknown as Order[];
    } catch (error) {
        console.error('Error fetching recent orders:', error);
        throw error;
    }
}

// USERS
export async function getUsers(): Promise<User[]> {
    try {
        const collection = await getCollection('users');
        return await collection.find({}).toArray() as unknown as User[];
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export async function getUserById(id: string): Promise<User | null> {
    try {
        const collection = await getCollection('users');
        return await collection.findOne({ _id: new ObjectId(id) }) as unknown as User | null;
    } catch (error) {
        console.error('Error fetching user by id:', error);
        throw error;
    }
}

// DELIVERY AREAS
export async function getDeliveryAreas(): Promise<DeliveryArea[]> {
    try {
        const collection = await getCollection('deliveryareas');
        return await collection.find({}).toArray() as unknown as DeliveryArea[];
    } catch (error) {
        console.error('Error fetching delivery areas:', error);
        throw error;
    }
}

export async function getEnabledDeliveryAreas(): Promise<DeliveryArea[]> {
    try {
        const collection = await getCollection('deliveryareas');
        return await collection.find({ enabled: true }).toArray() as unknown as DeliveryArea[];
    } catch (error) {
        console.error('Error fetching enabled delivery areas:', error);
        throw error;
    }
}

// COUPONS
export async function getCoupons(): Promise<Coupon[]> {
    try {
        const collection = await getCollection('coupons');
        return await collection.find({}).toArray() as unknown as Coupon[];
    } catch (error) {
        console.error('Error fetching coupons:', error);
        throw error;
    }
}

export async function getActiveCoupons(): Promise<Coupon[]> {
    try {
        const collection = await getCollection('coupons');
        return await collection.find({ count: { $lt: '$limit' } }).toArray() as unknown as Coupon[];
    } catch (error) {
        console.error('Error fetching active coupons:', error);
        throw error;
    }
}

// ADDRESSES
export async function getAddresses(): Promise<Address[]> {
    try {
        const collection = await getCollection('addresses');
        return await collection.find({}).toArray() as unknown as Address[];
    } catch (error) {
        console.error('Error fetching addresses:', error);
        throw error;
    }
}

export async function getAddressesByUserId(userId: string): Promise<Address[]> {
    try {
        const collection = await getCollection('addresses');
        return await collection.find({ userId }).toArray() as unknown as Address[];
    } catch (error) {
        console.error('Error fetching addresses by user id:', error);
        throw error;
    }
}

// ALLIES
export async function getAllies(): Promise<Ally[]> {
    try {
        const collection = await getCollection('allies');
        return await collection.find({}).toArray() as unknown as Ally[];
    } catch (error) {
        console.error('Error fetching allies:', error);
        throw error;
    }
}

// BANK INFO
export async function getBankInfo(): Promise<BankInfo | null> {
    try {
        const collection = await getCollection('bankinfos');
        return await collection.findOne({}) as unknown as BankInfo | null;
    } catch (error) {
        console.error('Error fetching bank info:', error);
        throw error;
    }
}

// EVENTS
export async function getEvents(): Promise<Event[]> {
    try {
        const collection = await getCollection('events');
        return await collection.find({}).toArray() as unknown as Event[];
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

export async function getActiveEvents(): Promise<Event[]> {
    try {
        const collection = await getCollection('events');
        return await collection.find({ isActive: true }).toArray() as unknown as Event[];
    } catch (error) {
        console.error('Error fetching active events:', error);
        throw error;
    }
}

// DASHBOARD STATS
export async function getDashboardStats(): Promise<DashboardStats> {
    try {
        // Obtener estadísticas de cada colección
        const [
            products,
            orders,
            users,
            topProducts,
            recentOrders,
            pendingOrders,
            completedOrders
        ] = await Promise.all([
            getCollection('products').then(col => col.countDocuments()),
            getCollection('orders').then(col => col.countDocuments()),
            getCollection('users').then(col => col.countDocuments()),
            getTopProducts(5),
            getRecentOrders(10),
            getCollection('orders').then(col => col.countDocuments({ status: 'pending' })),
            getCollection('orders').then(col => col.countDocuments({ status: 'delivered' }))
        ]);

        // Calcular revenue total
        const ordersCollection = await getCollection('orders');
        const revenueResult = await ordersCollection.aggregate([
            { $match: { status: 'delivered' } },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]).toArray();

        const totalRevenue = revenueResult[0]?.total || 0;

        return {
            totalProducts: products,
            totalOrders: orders,
            totalUsers: users,
            totalRevenue: totalRevenue,
            pendingOrders: pendingOrders,
            completedOrders: completedOrders,
            topProducts: topProducts,
            recentOrders: recentOrders
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
}

// ANALYTICS FUNCTIONS
export async function getOrdersByDay(startDate?: Date, endDate?: Date) {
    try {
        const collection = await getCollection('orders');
        const pipeline: any[] = [];

        const matchCondition: any = {};
        if (startDate || endDate) {
            matchCondition.createdAt = {};
            if (startDate) matchCondition.createdAt.$gte = startDate;
            if (endDate) matchCondition.createdAt.$lte = endDate;
        }

        if (Object.keys(matchCondition).length > 0) {
            pipeline.push({ $match: matchCondition });
        }

        pipeline.push(
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' }
                    },
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$total' }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
        );

        const result = await collection.aggregate(pipeline).toArray();

        return result.map((item: any) => ({
            date: `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(item._id.day).padStart(2, '0')}`,
            orders: item.count,
            revenue: item.totalAmount
        }));
    } catch (error) {
        console.error('Error fetching orders by day:', error);
        throw error;
    }
}

export async function getRevenueByDay(startDate?: Date, endDate?: Date) {
    try {
        const collection = await getCollection('orders');
        const pipeline: any[] = [];

        const matchCondition: any = { status: 'delivered' };
        if (startDate || endDate) {
            matchCondition.createdAt = {};
            if (startDate) matchCondition.createdAt.$gte = startDate;
            if (endDate) matchCondition.createdAt.$lte = endDate;
        }

        pipeline.push({ $match: matchCondition });

        pipeline.push(
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' }
                    },
                    revenue: { $sum: '$total' },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
        );

        const result = await collection.aggregate(pipeline).toArray();

        return result.map((item: any) => ({
            date: `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(item._id.day).padStart(2, '0')}`,
            revenue: item.revenue,
            orders: item.orders
        }));
    } catch (error) {
        console.error('Error fetching revenue by day:', error);
        throw error;
    }
}

export async function getAverageOrderValue(): Promise<{
    averageValue: number;
    totalOrders: number;
    totalRevenue: number;
}> {
    try {
        const collection = await getCollection('orders');
        const result = await collection.aggregate([
            { $match: { status: 'delivered' } },
            {
                $group: {
                    _id: null,
                    averageValue: { $avg: '$total' },
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: '$total' }
                }
            }
        ]).toArray();

        return (result[0] as any) || { averageValue: 0, totalOrders: 0, totalRevenue: 0 };
    } catch (error) {
        console.error('Error fetching average order value:', error);
        throw error;
    }
}

export async function getCustomerFrequency(): Promise<{
    averageOrdersPerCustomer: number;
    totalCustomers: number;
    averageSpentPerCustomer: number;
}> {
    try {
        const collection = await getCollection('orders');
        const result = await collection.aggregate([
            { $match: { status: 'delivered' } },
            {
                $group: {
                    _id: { $ifNull: ['$user.email', '$user._id'] }, // Usar email o ID como fallback
                    orderCount: { $sum: 1 },
                    totalSpent: { $sum: '$total' },
                    firstOrder: { $min: '$createdAt' },
                    lastOrder: { $max: '$createdAt' }
                }
            },
            {
                $group: {
                    _id: null,
                    averageOrdersPerCustomer: { $avg: '$orderCount' },
                    totalCustomers: { $sum: 1 },
                    averageSpentPerCustomer: { $avg: '$totalSpent' }
                }
            }
        ]).toArray();

        return (result[0] as any) || { averageOrdersPerCustomer: 0, totalCustomers: 0, averageSpentPerCustomer: 0 };
    } catch (error) {
        console.error('Error fetching customer frequency:', error);
        throw error;
    }
}

export async function getOrdersByMonth() {
    try {
        const collection = await getCollection('orders');
        const result = await collection.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    totalOrders: { $sum: 1 },
                    uniqueCustomers: { $addToSet: { $ifNull: ['$user.email', '$user._id'] } },
                    revenue: { $sum: '$total' }
                }
            },
            {
                $project: {
                    _id: 1,
                    totalOrders: 1,
                    uniqueCustomers: { $size: '$uniqueCustomers' },
                    revenue: 1
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]).toArray();

        return result.map((item: any) => ({
            month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
            totalOrders: item.totalOrders,
            uniqueCustomers: item.uniqueCustomers,
            revenue: item.revenue
        }));
    } catch (error) {
        console.error('Error fetching orders by month:', error);
        throw error;
    }
}

export async function getProductSales() {
    try {
        const collection = await getCollection('orders');
        const result = await collection.aggregate([
            { $match: { status: 'delivered' } },
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items.id',
                    productName: { $first: '$items.name' },
                    totalSold: { $sum: 1 }, // Cada item cuenta como 1 unidad vendida
                    totalRevenue: { $sum: '$items.price' }
                }
            },
            { $sort: { totalSold: -1 } }
        ]).toArray();

        return result.map((item: any) => ({
            productId: item._id,
            productName: item.productName,
            totalSold: item.totalSold,
            totalRevenue: item.totalRevenue
        }));
    } catch (error) {
        console.error('Error fetching product sales:', error);
        throw error;
    }
}

export async function getCategorySales() {
    try {
        const collection = await getCollection('orders');
        const result = await collection.aggregate([
            { $match: { status: 'delivered' } },
            { $unwind: '$items' },
            {
                $group: {
                    _id: 'General', // Por ahora usamos una categoría general ya que no tenemos categoría en OrderItem
                    totalSold: { $sum: 1 },
                    totalRevenue: { $sum: '$items.price' },
                    uniqueProducts: { $addToSet: '$items.id' }
                }
            },
            {
                $project: {
                    _id: 1,
                    totalSold: 1,
                    totalRevenue: 1,
                    uniqueProducts: { $size: '$uniqueProducts' }
                }
            },
            { $sort: { totalRevenue: -1 } }
        ]).toArray();

        return result.map((item: any) => ({
            category: item._id,
            totalSold: item.totalSold,
            totalRevenue: item.totalRevenue,
            uniqueProducts: item.uniqueProducts
        }));
    } catch (error) {
        console.error('Error fetching category sales:', error);
        throw error;
    }
}

export async function getPaymentMethodStats() {
    try {
        const collection = await getCollection('orders');
        const result = await collection.aggregate([
            { $match: { status: 'delivered' } },
            {
                $group: {
                    _id: '$paymentMethod',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$total' }
                }
            },
            { $sort: { count: -1 } }
        ]).toArray();

        return result.map(item => ({
            paymentMethod: item._id,
            count: item.count,
            totalAmount: item.totalAmount,
            percentage: 0 // Se calculará en el frontend
        }));
    } catch (error) {
        console.error('Error fetching payment method stats:', error);
        throw error;
    }
} 