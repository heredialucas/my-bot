'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@repo/design-system/components/ui/form';
import { Input } from '@repo/design-system/components/ui/input';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { setInventoryForSellerAction } from '../actions';

const setInventorySchema = z.object({
    quantity: z.coerce.number().int().min(0),
});
type SetInventorySchema = z.infer<typeof setInventorySchema>;

interface SellerStockFormProps {
    productId: string;
    sellerId: string;
    sellerName: string;
    currentStock: number;
}

export function SellerStockForm({ productId, sellerId, sellerName, currentStock }: SellerStockFormProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const form = useForm<SetInventorySchema>({
        resolver: zodResolver(setInventorySchema),
        defaultValues: {
            quantity: currentStock,
        },
    });

    const onSubmit = (values: SetInventorySchema) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append('quantity', String(values.quantity));

            const result = await setInventoryForSellerAction(productId, sellerId, values.quantity);

            toast({
                title: result.success ? 'Éxito' : 'Error',
                description: result.message,
                variant: result.success ? 'default' : 'destructive',
            });
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-between gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                    <p className="font-medium">{sellerName}</p>
                    <p className="text-sm text-muted-foreground">Stock actual: {currentStock}</p>
                </div>
                <div className="flex items-start gap-2">
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="number" className="w-24" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </form>
        </Form>
    );
} 