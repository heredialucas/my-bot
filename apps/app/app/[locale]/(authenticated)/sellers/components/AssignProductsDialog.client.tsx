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
import { type Product } from '@repo/database';
import { type SellerData } from './columns';
import { ProductAssignmentForm } from './ProductAssignmentForm.client';

type AssignProductsDialogProps = {
    seller: SellerData;
    children: React.ReactNode;
    products: Product[];
    initialInventory: { productId: string; quantity: number }[];
};

export function AssignProductsDialog({ seller, children, products, initialInventory }: AssignProductsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Asignar Productos</DialogTitle>
                    <DialogDescription>
                        Define las cantidades de productos para {seller.name} {seller.lastName}.
                    </DialogDescription>
                </DialogHeader>
                <ProductAssignmentForm
                    seller={seller}
                    products={products}
                    initialInventory={initialInventory}
                    onClose={() => setIsOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
} 