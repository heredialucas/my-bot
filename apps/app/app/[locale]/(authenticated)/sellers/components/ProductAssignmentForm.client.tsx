'use client';

import { useState, useTransition } from 'react';
import { type Product } from '@repo/database';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { DialogFooter, DialogClose } from '@repo/design-system/components/ui/dialog';
import { updateSellerInventoryAction } from '../actions';
import type { SellerData } from './columns';

type InventoryState = Record<string, number>;

type ProductAssignmentFormProps = {
    seller: SellerData;
    products: Product[];
    initialInventory: { productId: string; quantity: number }[];
    onClose: () => void;
};

export function ProductAssignmentForm({
    seller,
    products,
    initialInventory,
    onClose,
}: ProductAssignmentFormProps) {
    const [inventory, setInventory] = useState<InventoryState>(() =>
        initialInventory.reduce((acc, inv) => {
            acc[inv.productId] = inv.quantity;
            return acc;
        }, {} as InventoryState)
    );
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleQuantityChange = (productId: string, quantity: number, maxStock: number) => {
        const newQuantity = Math.max(0, Math.min(quantity, maxStock));
        setInventory((prev) => ({
            ...prev,
            [productId]: newQuantity,
        }));
    };

    const handleSave = () => {
        const updates = Object.entries(inventory)
            .filter(([, quantity]) => quantity > 0)
            .map(([productId, quantity]) => ({ productId, quantity }));

        startTransition(async () => {
            const result = await updateSellerInventoryAction(seller.id, updates);
            if (result.success) {
                toast({
                    title: 'Éxito',
                    description: 'Inventario actualizado correctamente.',
                });
                onClose();
            } else {
                toast({
                    title: 'Error',
                    description: result.message || 'No se pudo actualizar el inventario.',
                    variant: 'destructive',
                });
            }
        });
    };

    return (
        <>
            <div className="max-h-[60vh] overflow-y-auto pr-4">
                <div className="grid grid-cols-1 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor={product.id} className="col-span-1 text-sm font-medium">
                                {product.name}
                                <span className="text-xs text-muted-foreground ml-2">
                                    (Stock: {product.quantityInStock})
                                </span>
                            </label>
                            <Input
                                id={product.id}
                                type="number"
                                min="0"
                                max={product.quantityInStock}
                                value={inventory[product.id] || 0}
                                onChange={(e) =>
                                    handleQuantityChange(
                                        product.id,
                                        parseInt(e.target.value, 10) || 0,
                                        product.quantityInStock
                                    )
                                }
                                className="col-span-2"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button onClick={handleSave} disabled={isPending}>
                    {isPending ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
            </DialogFooter>
        </>
    );
} 