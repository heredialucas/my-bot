'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@repo/design-system/components/ui/dialog';
import { Badge } from '@repo/design-system/components/ui/badge';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { getSellerInventoryAction } from '../actions';
import { type SellerData } from './columns';

type ViewProductsDialogProps = {
    seller: SellerData;
    children: React.ReactNode;
};

type InventoryItem = {
    productId: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        description: string | null;
        price: number;
        sku: string;
        quantityInStock: number;
    };
};

export function ViewProductsDialog({ seller, children }: ViewProductsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleDialogOpen = async () => {
        setIsLoading(true);
        try {
            const result = await getSellerInventoryAction(seller.id);
            if (result.success && result.inventory) {
                setInventory(result.inventory);
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'No se pudieron cargar los productos.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudieron cargar los productos del vendedor.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            handleDialogOpen();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Productos Asignados</DialogTitle>
                    <DialogDescription>
                        Productos asignados a {seller.name} {seller.lastName}
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[60vh] overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <p className="text-muted-foreground">Cargando productos...</p>
                        </div>
                    ) : inventory.length === 0 ? (
                        <div className="flex items-center justify-center p-8">
                            <p className="text-muted-foreground">
                                No hay productos asignados a este vendedor.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {inventory.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-medium">{item.product.name}</h3>
                                            <Badge variant="secondary">
                                                SKU: {item.product.sku}
                                            </Badge>
                                        </div>
                                        {item.product.description && (
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {item.product.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="font-medium">
                                                Precio: ${item.product.price.toFixed(2)}
                                            </span>
                                            <span className="text-muted-foreground">
                                                Stock Total: {item.product.quantityInStock}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-primary">
                                            {item.quantity}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Asignado
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
} 