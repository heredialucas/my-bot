'use client';

import { useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@repo/design-system/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@repo/design-system/components/ui/select';
import { Trash2, Plus } from 'lucide-react';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { type ClientData } from '@repo/data-services/src/types';
import { type InventoryData } from '@repo/data-services/src/types/product';
import { type Dictionary, type Locale } from '@repo/internationalization';
import { createOrder } from '../actions';

interface NewOrderFormProps {
    clients: ClientData[];
    inventory: InventoryData[];
    dictionary: Dictionary;
}

const orderItemSchema = z.object({
    productId: z.string().min(1, 'Producto requerido'),
    quantity: z.coerce.number().min(1, 'Cantidad debe ser mayor a 0'),
});

const formSchema = z.object({
    clientId: z.string().min(1, 'Cliente requerido'),
    items: z.array(orderItemSchema).min(1, 'Debe agregar al menos un producto'),
});

type FormData = z.infer<typeof formSchema>;

export function NewOrderForm({ clients, inventory, dictionary }: NewOrderFormProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientId: '',
            items: [{ productId: '', quantity: 1 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'items',
    });

    const watchedItems = form.watch('items');

    const calculateTotal = () => {
        return watchedItems.reduce((total, item) => {
            const product = inventory.find(inv => inv.productId === item.productId);
            if (product && item.quantity) {
                return total + (product.product.price * item.quantity);
            }
            return total;
        }, 0);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(amount);
    };

    function onSubmit(values: FormData) {
        startTransition(async () => {
            const formData = new FormData();
            formData.append('clientId', values.clientId);
            formData.append('items', JSON.stringify(values.items));

            const result = await createOrder('es', { errors: {}, message: null }, formData);

            toast({
                title: result.message ? 'Error' : 'Éxito',
                description: result.message || 'Pedido creado exitosamente',
                variant: result.message ? 'destructive' : 'default',
            });

            if (!result.message) {
                form.reset();
            }
        });
    }

    return (
        <div className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Selección de Cliente */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Información del Cliente</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="clientId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cliente</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar cliente" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {clients.map((client) => (
                                                    <SelectItem key={client.id} value={client.id}>
                                                        {client.firstName} {client.lastName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Productos */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Productos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-4 items-end">
                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.productId`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Producto</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Seleccionar producto" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {inventory.map((item) => (
                                                            <SelectItem key={item.productId} value={item.productId}>
                                                                {item.product.name} - Stock: {item.quantity} - {formatCurrency(item.product.price)}
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
                                        name={`items.${index}.quantity`}
                                        render={({ field }) => (
                                            <FormItem className="w-24">
                                                <FormLabel>Cantidad</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => remove(index)}
                                        disabled={fields.length === 1}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => append({ productId: '', quantity: 1 })}
                                className="w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Agregar Producto
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Resumen */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Resumen del Pedido</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {watchedItems.map((item, index) => {
                                    const inventoryItem = inventory.find(inv => inv.productId === item.productId);
                                    if (!inventoryItem || !item.quantity) return null;

                                    const subtotal = inventoryItem.product.price * item.quantity;
                                    return (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span>
                                                {inventoryItem.product.name} x {item.quantity}
                                            </span>
                                            <span>{formatCurrency(subtotal)}</span>
                                        </div>
                                    );
                                })}
                                <div className="border-t pt-2 flex justify-between font-bold">
                                    <span>Total:</span>
                                    <span>{formatCurrency(calculateTotal())}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit" disabled={isPending} className="w-full">
                        {isPending ? 'Creando pedido...' : 'Crear Pedido'}
                    </Button>
                </form>
            </Form>
        </div>
    );
} 