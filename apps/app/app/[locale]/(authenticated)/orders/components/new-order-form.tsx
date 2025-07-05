'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/design-system/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/design-system/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Input } from '@repo/design-system/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/design-system/components/ui/table';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { type Dictionary } from '@repo/internationalization';
import { type ClientData, type InventoryWithProduct } from '@repo/data-services';
import { type UserData } from '@repo/data-services/src/types/user';
import { createOrderAction, getSellerDataForOrder } from '../actions';
import { TrashIcon } from 'lucide-react';

const newOrderSchema = z.object({
    clientId: z.string().min(1, 'Debes seleccionar un cliente.'),
    items: z.array(z.object({
        productId: z.string(),
        quantity: z.number().min(1, 'La cantidad debe ser al menos 1.'),
        price: z.number(),
        stock: z.number(),
    })).min(1, 'Debes agregar al menos un producto.'),
});

type NewOrderFormValues = z.infer<typeof newOrderSchema>;

interface NewOrderFormProps {
    user: UserData;
    sellers: UserData[];
    initialClients: ClientData[];
    initialInventory: InventoryWithProduct[];
    dictionary: Dictionary;
}

export function NewOrderForm({ user, sellers, initialClients, initialInventory, dictionary }: NewOrderFormProps) {
    const [selectedSellerId, setSelectedSellerId] = useState<string | null>(user.role === 'seller' ? user.id : null);
    const [clients, setClients] = useState<ClientData[]>(initialClients);
    const [inventory, setInventory] = useState<InventoryWithProduct[]>(initialInventory);
    const [isFetchingData, startDataTransition] = useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<NewOrderFormValues>({
        resolver: zodResolver(newOrderSchema),
        defaultValues: { clientId: '', items: [] },
    });
    const { fields, append, remove } = useFieldArray({ control: form.control, name: 'items' });

    const handleSellerChange = async (sellerId: string) => {
        setSelectedSellerId(sellerId);
        form.reset({ clientId: '', items: [] });
        setClients([]);
        setInventory([]);

        startDataTransition(async () => {
            const result = await getSellerDataForOrder(sellerId);
            if (result.success) {
                setClients(result.clients || []);
                setInventory(result.inventory || []);
            } else {
                toast({ title: 'Error', description: 'No se pudieron cargar los datos del vendedor.', variant: 'destructive' });
            }
        });
    };

    const addProductToOrder = (inventoryItem: InventoryWithProduct) => {
        const existingItem = fields.find(item => item.productId === inventoryItem.product.id);
        if (existingItem) {
            toast({ title: 'Producto ya agregado', description: 'Este producto ya está en el pedido.', variant: 'default' });
            return;
        }
        append({
            productId: inventoryItem.product.id,
            quantity: 1,
            price: inventoryItem.product.price,
            stock: inventoryItem.quantity,
        });
    };

    const onSubmit = async (values: NewOrderFormValues) => {
        if (!selectedSellerId) {
            toast({ title: 'Error', description: 'No se ha seleccionado un vendedor.', variant: 'destructive' });
            return;
        }

        const result = await createOrderAction({
            sellerId: selectedSellerId,
            clientId: values.clientId,
            items: values.items.map(item => ({ productId: item.productId, quantity: item.quantity })),
        });

        if (result.success) {
            toast({ title: 'Éxito', description: 'Pedido creado correctamente.' });
            router.push('/orders');
        } else {
            toast({ title: 'Error', description: result.message, variant: 'destructive' });
        }
    };

    const isFormDisabled = user.role === 'admin' && !selectedSellerId;
    const total = fields.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna Izquierda: Formulario y Pedido */}
            <div className="lg:col-span-2 space-y-6">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {user.role === 'admin' && (
                        <Card>
                            <CardHeader><CardTitle>1. Seleccionar Vendedor</CardTitle></CardHeader>
                            <CardContent>
                                <Select onValueChange={handleSellerChange} disabled={isFetchingData}>
                                    <SelectTrigger><SelectValue placeholder="Elige un vendedor..." /></SelectTrigger>
                                    <SelectContent>
                                        {sellers.map(s => <SelectItem key={s.id} value={s.id}>{s.name} {s.lastName}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader><CardTitle>{user.role === 'admin' ? '2. ' : ''}Seleccionar Cliente</CardTitle></CardHeader>
                        <CardContent>
                            <Select
                                onValueChange={(value) => form.setValue('clientId', value)}
                                disabled={isFormDisabled || isFetchingData}
                            >
                                <SelectTrigger><SelectValue placeholder="Elige un cliente..." /></SelectTrigger>
                                <SelectContent>
                                    {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.firstName} {c.lastName}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            {form.formState.errors.clientId && <p className="text-red-500 text-sm mt-1">{form.formState.errors.clientId.message}</p>}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Pedido Actual</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Producto</TableHead>
                                        <TableHead>Cantidad</TableHead>
                                        <TableHead>Precio Unit.</TableHead>
                                        <TableHead>Subtotal</TableHead>
                                        <TableHead />
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fields.map((item, index) => {
                                        const product = inventory.find(i => i.product.id === item.productId)?.product;
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell>{product?.name}</TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        {...form.register(`items.${index}.quantity`, { valueAsNumber: true })}
                                                        max={item.stock}
                                                        min={1}
                                                        className="w-20"
                                                    />
                                                </TableCell>
                                                <TableCell>${item.price}</TableCell>
                                                <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="icon" onClick={() => remove(index)}><TrashIcon className="w-4 h-4" /></Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            <div className="text-right font-bold text-lg mt-4">
                                Total: ${total.toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit" disabled={isFormDisabled || isFetchingData || fields.length === 0}>
                        Crear Pedido
                    </Button>
                </form>
            </div>

            {/* Columna Derecha: Inventario */}
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Inventario Disponible</CardTitle></CardHeader>
                    <CardContent>
                        {isFormDisabled ? <p className="text-muted-foreground">Selecciona un vendedor para ver su inventario.</p> :
                            inventory.length === 0 ? <p className="text-muted-foreground">No hay inventario disponible.</p> :
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {inventory.map(item => (
                                        <div key={item.id} className="flex justify-between items-center p-2 border rounded-md">
                                            <span>{item.product.name} ({item.quantity})</span>
                                            <Button size="sm" onClick={() => addProductToOrder(item)} disabled={fields.some(f => f.productId === item.product.id)}>+</Button>
                                        </div>
                                    ))}
                                </div>
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 