import { z } from 'zod';

export const clientFormSchema = z.object({
    firstName: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
    lastName: z.string().min(2, { message: 'El apellido debe tener al menos 2 caracteres.' }),
    email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
    phone: z.string().optional(),
    address: z.string().optional(),
    sellerId: z.string().optional(),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>; 