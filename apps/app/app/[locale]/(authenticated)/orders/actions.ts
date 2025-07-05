'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@repo/data-services';
import { createOrder as createOrderInDb } from '@repo/data-services';
import { type Locale } from '@repo/internationalization';
import { getClientsBySellerId } from "@repo/data-services/src/services/clientService";
import { getInventoryBySellerId } from "@repo/data-services/src/services/inventoryService";

const itemSchema = z.object({
    productId: z.string(),
    quantity: z.coerce.number().min(1),
});

const createOrderSchema = z.object({
    clientId: z.string().min(1, 'Client is required'),
    items: z.array(itemSchema).min(1, 'Order must have at least one item'),
});

type State = {
    errors?: {
        clientId?: string[];
        items?: string[];
    };
    message?: string | null;
};

export async function createOrder(
    locale: Locale,
    prevState: State,
    formData: FormData
): Promise<State> {
    const user = await getCurrentUser();
    if (!user?.id) {
        return { message: 'Not authenticated' };
    }

    const itemsJSON = formData.get('items') as string;
    const items = JSON.parse(itemsJSON);

    const validatedFields = createOrderSchema.safeParse({
        clientId: formData.get('clientId'),
        items: items,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Order.',
        };
    }

    try {
        await createOrderInDb({
            ...validatedFields.data,
            sellerId: user.id,
        });
    } catch (error) {
        console.error(error);
        return { message: 'Database Error: Failed to Create Order.' };
    }

    revalidatePath(`/${locale}/orders`);
    redirect(`/${locale}/orders`);
}

export async function createOrderAction(data: {
    clientId: string;
    sellerId: string;
    items: { productId: string; quantity: number }[];
}) {
    try {
        const order = await createOrderInDb(data);
        return { success: true, orderId: order.id };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to create order." };
    }
}

export async function getSellerDataForOrder(sellerId: string) {
    try {
        const [clients, inventory] = await Promise.all([
            getClientsBySellerId(sellerId),
            getInventoryBySellerId(sellerId),
        ]);
        return { success: true, clients, inventory };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to fetch seller data." };
    }
} 