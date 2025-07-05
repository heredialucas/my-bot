'use client';

import { useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { Badge } from '@repo/design-system/components/ui/badge';
import { type FullOrderData } from '@repo/data-services/src/types';
import { type Dictionary } from '@repo/internationalization';
import { deleteOrderAction } from '../actions';

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    PENDING: 'secondary',
    DELIVERED: 'default',
    CANCELLED: 'destructive',
};


export const getOrderColumns = (
    dictionary: Dictionary['app']['admin']['orders'],
    locale: string,
): ColumnDef<FullOrderData>[] => [
        {
            accessorKey: 'id',
            header: dictionary.table.id,
            cell: ({ row }) => <div className="w-20 truncate">{row.getValue('id')}</div>,
        },
        {
            accessorKey: 'client',
            header: dictionary.table.client,
            cell: ({ row }) => {
                const client = row.original.client;
                return `${client.firstName} ${client.lastName}`;
            },
        },
        {
            accessorKey: 'orderDate',
            header: dictionary.table.date,
            cell: ({ row }) => new Date(row.getValue('orderDate')).toLocaleDateString(),
        },
        {
            accessorKey: 'items',
            header: 'Productos',
            cell: ({ row }) => {
                const totalItems = row.original.items.reduce((sum, item) => sum + item.quantity, 0);
                return (
                    <div className="text-sm">
                        <div className="font-medium">{totalItems} unidades</div>
                        <div className="text-muted-foreground">
                            {row.original.items.length} productos
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'totalAmount',
            header: dictionary.table.total,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue('totalAmount'));
                const formatted = new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                }).format(amount);
                return <div className="font-medium">{formatted}</div>;
            },
        },
        {
            accessorKey: 'status',
            header: dictionary.table.status,
            cell: ({ row }) => {
                const status = row.getValue('status') as string;
                return <Badge variant={statusVariantMap[status] || 'default'}>{status}</Badge>;
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const order = row.original;
                const router = useRouter();
                const { toast } = useToast();
                const [isDeleting, setIsDeleting] = useState(false);

                const handleDelete = async () => {
                    if (!confirm(`¿Estás seguro de que quieres eliminar el pedido #${order.id}?`)) {
                        return;
                    }

                    setIsDeleting(true);
                    try {
                        const result = await deleteOrderAction(order.id);
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
                            description: 'No se pudo eliminar el pedido.',
                            variant: 'destructive',
                        });
                    } finally {
                        setIsDeleting(false);
                    }
                };

                return (
                    <div className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{dictionary.table.actions}</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link href={`/${locale}/orders/${order.id}`}>
                                        {dictionary.table.viewDetails}
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleDelete}
                                    className="text-red-600 focus:text-red-600"
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Eliminando...' : 'Eliminar Pedido'}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ]; 