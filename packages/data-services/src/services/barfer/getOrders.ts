import 'server-only';
import { getCollection, ObjectId } from '@repo/database';
import type { Order } from '../../types/barfer';

interface GetOrdersParams {
    pageIndex?: number;
    pageSize?: number;
    search?: string;
    sorting?: { id: string; desc: boolean }[];
}

/**
 * Escapa caracteres especiales de una cadena de texto para usarla en una expresión regular.
 */
function escapeRegex(string: string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * Obtiene órdenes de forma paginada, filtrada y ordenada desde el servidor.
 * @returns Un objeto con las órdenes y el conteo total de páginas.
 */
export async function getOrders({
    pageIndex = 0,
    pageSize = 50,
    search = '',
    sorting = [{ id: 'createdAt', desc: true }],
}: GetOrdersParams): Promise<{ orders: Order[]; pageCount: number; total: number }> {
    try {
        const collection = await getCollection('orders');
        const baseFilter = { 'deliveryArea.sameDayDelivery': { $ne: true } };
        const searchFilter: any = {};

        if (search) {
            const searchWords = search.split(' ').filter(Boolean).map(escapeRegex);

            if (searchWords.length > 0) {
                searchFilter.$and = searchWords.map(word => ({
                    $or: [
                        { 'user.name': { $regex: word, $options: 'i' } },
                        { 'user.lastName': { $regex: word, $options: 'i' } },
                        { 'user.email': { $regex: word, $options: 'i' } },
                        { 'items.name': { $regex: word, $options: 'i' } },
                        { 'address.address': { $regex: word, $options: 'i' } },
                        { 'address.city': { $regex: word, $options: 'i' } },
                        { 'paymentMethod': { $regex: word, $options: 'i' } },
                        { 'status': { $regex: word, $options: 'i' } },
                        { 'notesOwn': { $regex: word, $options: 'i' } },
                    ]
                }));
            }

            const isObjectId = /^[0-9a-fA-F]{24}$/.test(search.trim());
            if (isObjectId) {
                if (searchFilter.$and) {
                    searchFilter.$or = [...searchFilter.$and, { _id: new ObjectId(search.trim()) }];
                    delete searchFilter.$and;
                } else {
                    searchFilter._id = new ObjectId(search.trim());
                }
            }
        }

        const finalAnd = [baseFilter];
        if (Object.keys(searchFilter).length > 0) {
            finalAnd.push(searchFilter);
        }
        const matchQuery = { $and: finalAnd };

        const sortQuery: { [key: string]: 1 | -1 } = {};
        sorting.forEach(sort => {
            sortQuery[sort.id] = sort.desc ? -1 : 1;
        });

        const skip = pageIndex * pageSize;
        const limit = pageSize;

        const total = await collection.countDocuments(matchQuery);
        const ordersFromDB = await collection.find(matchQuery).sort(sortQuery).skip(skip).limit(limit).toArray();

        const pageCount = Math.ceil(total / pageSize);

        // Medida de seguridad: Eliminar duplicados por _id antes de serializar.
        const uniqueOrdersMap = new Map();
        ordersFromDB.forEach(order => {
            uniqueOrdersMap.set(order._id.toString(), order);
        });
        const uniqueOrders = Array.from(uniqueOrdersMap.values());

        const serializedOrders = uniqueOrders.map(order => ({
            ...order,
            _id: order._id.toString(),
        })) as unknown as Order[];

        return {
            orders: serializedOrders,
            pageCount,
            total,
        };

    } catch (error) {
        console.error('Error fetching server-side paginated orders:', error);
        // El error de memoria puede volver a ocurrir si el conjunto de datos
        // que coincide con el filtro es muy grande para ordenar.
        // Un índice en `createdAt` es crucial.
        throw new Error('Could not fetch orders.');
    }
} 