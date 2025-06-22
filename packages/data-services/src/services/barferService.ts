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