'use client';

import { useState } from 'react';
import type { User, Product } from '@repo/database';
import type { ColumnDef } from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { Button } from '@repo/design-system/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { AssignProductsDialog } from './AssignProductsDialog.client';
import { getSellerInventoryAction } from '../actions';
import { useToast } from '@repo/design-system/hooks/use-toast';

export type SellerData = Pick<User, 'id' | 'name' | 'lastName' | 'email'> & {
    _count: {
        inventory: number;
    };
};

function ActionsCell({ seller, products }: { seller: SellerData; products: Product[] }) {
    const [isLoading, setIsLoading] = useState(false);
    const [inventory, setInventory] = useState<{ productId: string; quantity: number }[]>([]);
    const { toast } = useToast();

    const handleDialogOpen = async () => {
        setIsLoading(true);
        try {
            const result = await getSellerInventoryAction(seller.id);
            if (result.success && result.inventory) {
                setInventory(result.inventory.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                })));
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'No se pudieron cargar los datos.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudieron cargar los datos del inventario.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <AssignProductsDialog
                    seller={seller}
                    products={products}
                    initialInventory={inventory}
                >
                    <DropdownMenuItem onSelect={(e) => {
                        e.preventDefault();
                        handleDialogOpen();
                    }}>
                        {isLoading ? 'Cargando...' : 'Asignar Productos'}
                    </DropdownMenuItem>
                </AssignProductsDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function createColumns(products: Product[]): ColumnDef<SellerData>[] {
    return [
        {
            accessorKey: 'name',
            header: 'Nombre',
            cell: ({ row }) => `${row.original.name} ${row.original.lastName}`,
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: '_count.inventory',
            header: 'Productos Asignados',
        },
        {
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => <ActionsCell seller={row.original} products={products} />,
        },
    ];
} 