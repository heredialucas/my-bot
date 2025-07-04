'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@repo/design-system/components/ui/form';
import { Input } from '@repo/design-system/components/ui/input';
import { Textarea } from '@repo/design-system/components/ui/textarea';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { ProductData } from '@repo/data-services';
import { type Dictionary } from '@repo/internationalization';
import { productFormSchema, ProductFormSchema } from '../lib/schemas';
import { createProductAction, updateProductAction } from '../actions';

interface ProductFormProps {
    product?: ProductData;
    onSuccess: () => void;
    dictionary: Dictionary;
}

export function ProductForm({ product, onSuccess, dictionary }: ProductFormProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const productDict = dictionary.app.admin.products;

    const form = useForm<ProductFormSchema>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: product?.name || '',
            description: product?.description || '',
            sku: product?.sku || '',
            price: product?.price ? Number(product.price) : 0,
            quantityInStock: product?.quantityInStock || 0,
        },
    });

    const onSubmit = (values: ProductFormSchema) => {
        startTransition(async () => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, String(value));
                }
            });

            const action = product
                ? updateProductAction.bind(null, product.id)
                : createProductAction;

            const result = await action(formData);

            toast({
                title: result.success ? 'Éxito' : 'Error',
                description: result.message,
                variant: result.success ? 'default' : 'destructive',
            });

            if (result.success) {
                onSuccess();
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{productDict.form.name}</FormLabel>
                            <FormControl>
                                <Input placeholder="Producto de ejemplo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{productDict.form.description}</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe el producto" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código</FormLabel>
                            <FormControl>
                                <Input placeholder="PROD-001" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{productDict.form.price}</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" placeholder="99.99" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantityInStock"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{productDict.form.stock}</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="100" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Guardando...' : product ? productDict.form.update : productDict.form.create}
                </Button>
            </form>
        </Form>
    );
} 