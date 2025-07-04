'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@repo/data-services';
import { createOrder as createOrderInDb } from '@repo/data-services';
import { type Locale } from '@repo/internationalization';

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