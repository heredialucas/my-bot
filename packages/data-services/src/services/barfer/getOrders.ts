import 'server-only';
import { getCollection } from '@repo/database';
import type { Order } from '../../types/barfer';

const DEFAULT_PAGE_SIZE = 20;

/**
 * Obtiene las órdenes de la base de datos con paginación, asumiendo que los datos del
 * usuario están embebidos en cada documento de orden.
 * @param {number} page - El número de página a obtener (1-indexed).
 * @param {number} pageSize - El número de órdenes por página.
 * @returns {Promise<{orders: Order[], total: number}>} Un objeto con las órdenes y el conteo total.
 */
export async function getOrders(
    page: number = 1,
    pageSize: number = DEFAULT_PAGE_SIZE,
): Promise<{ orders: Order[]; total: number }> {
    try {
        const collection = await getCollection('orders');
        const skip = (page - 1) * pageSize;

        const ordersQuery = collection.find({}).sort({ createdAt: -1 }).skip(skip).limit(pageSize);
        const totalQuery = collection.countDocuments({});

        const [ordersFromDB, total] = await Promise.all([
            ordersQuery.toArray(),
            totalQuery,
        ]);

        const serializedOrders = ordersFromDB.map(order => {
            return {
                ...order,
                _id: order._id.toString(),
            };
        }) as unknown as Order[];

        return {
            orders: serializedOrders,
            total,
        };
    } catch (error) {
        console.error('Error fetching paginated orders:', error);
        throw new Error('Could not fetch orders.');
    }
} 