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
import { ViewProductsDialog } from './ViewProductsDialog.client';
import { getSellerInventoryAction, deleteSellerAction } from '../actions';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { useRouter } from 'next/navigation';

export type SellerData = Pick<User, 'id' | 'name' | 'lastName' | 'email'> & {
    _count: {
        inventory: number;
    };
};

function ActionsCell({ seller, products }: { seller: SellerData; products: Product[] }) {
    const [isLoading, setIsLoading] = useState(false);
    const [inventory, setInventory] = useState<{ productId: string; quantity: number }[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

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

    const handleDelete = async () => {
        if (!confirm(`¿Estás seguro de que quieres eliminar al vendedor ${seller.name} ${seller.lastName}?`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await deleteSellerAction(seller.id);
            if (result.success) {
                toast({
                    title: 'Éxito',
                    description: result.message,
                });
                router.refresh();
            } else {
                toast({
                    title: 'Error',
                    description: result.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudo eliminar el vendedor.',
                variant: 'destructive',
            });
        } finally {
            setIsDeleting(false);
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
                <ViewProductsDialog seller={seller}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Ver Productos Asignados
                    </DropdownMenuItem>
                </ViewProductsDialog>
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
                <DropdownMenuItem
                    onSelect={handleDelete}
                    className="text-red-600 focus:text-red-600"
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Eliminando...' : 'Eliminar Vendedor'}
                </DropdownMenuItem>
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