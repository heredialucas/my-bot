'use client';

import { useTransition } from 'react';
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
import { useToast } from '@repo/design-system/hooks/use-toast';
import { type InventoryData } from '@repo/data-services/src/types/product';
import { type Dictionary } from '@repo/internationalization';
import { updateInventoryQuantityAction } from '../actions';

const inventoryFormSchema = z.object({
    quantity: z.coerce.number().int().min(0, 'La cantidad no puede ser negativa'),
});

type InventoryFormSchema = z.infer<typeof inventoryFormSchema>;

interface InventoryFormProps {
    item: InventoryData;
    onSuccess: () => void;
    dictionary: Dictionary;
}

export function InventoryForm({ item, onSuccess, dictionary }: InventoryFormProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const inventoryDict = dictionary.app.admin.inventory;

    const form = useForm<InventoryFormSchema>({
        resolver: zodResolver(inventoryFormSchema),
        defaultValues: {
            quantity: item.quantity,
        },
    });

    const onSubmit = (values: InventoryFormSchema) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append('quantity', String(values.quantity));

            const result = await updateInventoryQuantityAction(
                item.productId,
                { success: false, message: '' },
                formData
            );

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
                <div className="space-y-2">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            {inventoryDict.form.product}
                        </p>
                        <p className="text-lg font-semibold">{item.product.name}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            {inventoryDict.form.currentStock}
                        </p>
                        <p className="text-base">{item.quantity} unidades</p>
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{inventoryDict.form.newStock}</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min="0"
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
                        {isPending ? 'Actualizando...' : inventoryDict.form.update}
                    </Button>
                    <Button type="button" variant="outline" onClick={onSuccess}>
                        {inventoryDict.form.cancel}
                    </Button>
                </div>
            </form>
        </Form>
    );
} 