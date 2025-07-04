'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@repo/design-system/components/ui/form';
import { Input } from '@repo/design-system/components/ui/input';
import { Button } from '@repo/design-system/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@repo/design-system/components/ui/select';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { type ProductData } from '@repo/data-services/src/types/product';
import { type Dictionary } from '@repo/internationalization';
import { updateInventoryQuantityAction } from '../actions';

const addProductFormSchema = z.object({
    productId: z.string().min(1, 'Producto requerido'),
    quantity: z.coerce.number().int().min(1, 'La cantidad debe ser mayor a 0'),
});

type AddProductFormSchema = z.infer<typeof addProductFormSchema>;

interface AddProductFormProps {
    availableProducts: ProductData[];
    onSuccess: () => void;
    dictionary: Dictionary;
}

export function AddProductForm({ availableProducts, onSuccess, dictionary }: AddProductFormProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const inventoryDict = dictionary.app.admin.inventory;

    const form = useForm<AddProductFormSchema>({
        resolver: zodResolver(addProductFormSchema),
        defaultValues: {
            productId: '',
            quantity: 0,
        },
    });

    const onSubmit = (values: AddProductFormSchema) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append('quantity', String(values.quantity));

            const result = await updateInventoryQuantityAction(
                values.productId,
                { success: false, message: '' },
                formData
            );

            toast({
                title: result.success ? 'Éxito' : 'Error',
                description: result.message,
                variant: result.success ? 'default' : 'destructive',
            });

            if (result.success) {
                form.reset();
                onSuccess();
            }
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(amount);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="productId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Producto</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar producto del catálogo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {availableProducts.map((product) => (
                                        <SelectItem key={product.id} value={product.id}>
                                            {product.name} - {formatCurrency(product.price)} - Stock Central: {product.quantityInStock}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cantidad a Agregar</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min="1"
                                    placeholder="0"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-2">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Agregando...' : 'Agregar a Mi Inventario'}
                    </Button>
                    <Button type="button" variant="outline" onClick={onSuccess}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </Form>
    );
} 