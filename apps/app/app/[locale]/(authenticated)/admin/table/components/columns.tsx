'use client';

import { type ColumnDef, type CellContext } from '@tanstack/react-table';
import type { Order } from '@repo/data-services/src/types/barfer';
import { Badge } from '@repo/design-system/components/ui/badge';

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: 'user.name',
        header: 'Cliente',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const user = row.original.user as Order['user'];
            return <div>{user ? `${user.name} ${user.lastName}` : 'N/A'}</div>;
        },
    },
    {
        accessorKey: 'address.address',
        header: 'Dirección',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const address = row.original.address as Order['address'];
            return <div>{address ? `${address.address}, ${address.city}` : 'N/A'}</div>;
        }
    },
    {
        accessorKey: 'items',
        header: 'Items',
        enableSorting: false,
        cell: ({ row }: CellContext<Order, unknown>) => {
            const items = row.original.items as Order['items'];
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>{item.name} x {(item.options[0] as any)?.quantity || 1}</li>
                    ))}
                </ul>
            );
        }
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const status = row.getValue('status') as Order['status'];
            return <Badge variant={status === 'confirmed' ? 'default' : 'secondary'}>{status}</Badge>;
        }
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const amount = parseFloat(row.getValue('total') as string);
            const formatted = new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
            }).format(amount);
            return <div className="font-medium text-right">{formatted}</div>;
        }
    },
    {
        accessorKey: 'createdAt',
        header: 'Fecha de Orden',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const date = new Date(row.getValue('createdAt') as string);
            return <div>{date.toLocaleDateString('es-AR')}</div>;
        }
    }
]; 