'use client';

import { useState } from 'react';
import { setInventoryForSellerAction } from '../../actions';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { type Dictionary } from '@repo/internationalization';

interface SellerStockFormProps {
    productId: string;
    sellers: { id: string; name: string | null }[];
    inventoryBySeller: { sellerId: string; quantity: number }[];
    dictionary: Dictionary;
}

export function SellerStockForm({
    productId,
    sellers,
    inventoryBySeller,
    dictionary,
}: SellerStockFormProps) {
    const { toast } = useToast();
    const [stockValues, setStockValues] = useState<Record<string, number>>(() => {
        const initialStock: Record<string, number> = {};
        inventoryBySeller.forEach(item => {
            initialStock[item.sellerId] = item.quantity;
        });
        return initialStock;
    });

    const handleStockChange = (sellerId: string, value: string) => {
        const quantity = Number(value);
        setStockValues(prev => ({ ...prev, [sellerId]: isNaN(quantity) ? 0 : quantity }));
    };

    const handleSubmit = async (sellerId: string) => {
        const quantity = stockValues[sellerId] ?? 0;
        const result = await setInventoryForSellerAction(productId, sellerId, quantity);

        if (result.success) {
            toast({
                title: 'Éxito',
                description: 'Stock actualizado correctamente.',
            });
        } else {
            toast({
                title: 'Error',
                description: result.message || 'No se pudo actualizar el stock.',
                variant: 'destructive',
            });
        }
    };

    const inventoryMap = new Map(inventoryBySeller.map(item => [item.sellerId, item.quantity]));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Asignar Stock a Vendedores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {sellers.map(seller => (
                    <div key={seller.id} className="flex items-center justify-between p-2 border rounded-md">
                        <span className="font-medium">{seller.name || 'Vendedor sin nombre'}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                Stock actual: {inventoryMap.get(seller.id) || 0}
                            </span>
                            <Input
                                type="number"
                                value={stockValues[seller.id] ?? ''}
                                onChange={(e) => handleStockChange(seller.id, e.target.value)}
                                className="w-24"
                                placeholder="Cantidad"
                            />
                            <Button onClick={() => handleSubmit(seller.id)}>Guardar</Button>
                        </div>
                    </div>
                ))}
                {sellers.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center">
                        No hay vendedores disponibles para asignar stock.
                    </p>
                )}
            </CardContent>
        </Card>
    );
} 