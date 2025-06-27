import { getCollection, ObjectId } from '@repo/database';
import { z } from 'zod';

const updateOrderSchema = z.object({
    status: z.string().optional(),
    notes: z.string().optional(),
    address: z.any().optional(),
    user: z.any().optional(),
    notesOwn: z.string().optional(),
    paymentMethod: z.string().optional(),
    coupon: z.any().optional(),
    deliveryArea: z.any().optional(),
    items: z.any().optional(),
    total: z.number().optional(),
    subTotal: z.number().optional(),
    shippingPrice: z.number().optional(),
    updatedAt: z.string().optional(),
    // Agrega aquí otros campos editables si es necesario
});

export async function updateOrder(id: string, data: any) {
    console.log('data', data);
    console.log('id', id);
    const updateData = updateOrderSchema.parse(data);
    updateData.updatedAt = new Date().toISOString();
    const collection = await getCollection('orders');
    console.log('updateData', updateData);
    const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: 'after' }
    );
    console.log('result', result);
    if (!result) throw new Error('Order not found');
    return result.value;
} 