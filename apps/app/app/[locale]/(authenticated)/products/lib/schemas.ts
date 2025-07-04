import { z } from 'zod';

export const productFormSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    description: z.string().optional(),
    sku: z.string().min(1, 'El SKU es requerido'),
    price: z.coerce.number().min(0.01, 'El precio debe ser mayor a 0'),
    quantityInStock: z.coerce.number().int().min(0, 'El stock no puede ser negativo'),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>; 