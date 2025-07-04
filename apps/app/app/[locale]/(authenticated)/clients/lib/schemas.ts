import { z } from 'zod';

export const clientFormSchema = z.object({
    firstName: z.string().min(1, 'El nombre es requerido'),
    lastName: z.string().min(1, 'El apellido es requerido'),
    email: z.string().email('Email inválido').optional().or(z.literal('')),
    phone: z.string().optional(),
    address: z.string().optional(),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>; 