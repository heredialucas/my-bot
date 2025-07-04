'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@repo/design-system/components/ui/button';
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

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    PENDING: 'secondary',
    PROCESSING: 'default',
    SHIPPED: 'outline',
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
            accessorKey: 'totalAmount',
            header: dictionary.table.total,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue('totalAmount'));
                const formatted = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
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
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ]; 