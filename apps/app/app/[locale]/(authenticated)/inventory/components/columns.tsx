'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@repo/design-system/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { type InventoryData } from '@repo/data-services/src/types/product';
import { type Dictionary } from '@repo/internationalization';

export const getInventoryColumns = (
    openDialog: (inventoryItem?: InventoryData) => void,
    dictionary: Dictionary['app']['admin']['inventory'],
): ColumnDef<InventoryData>[] => [
        {
            accessorKey: 'product.name',
            header: dictionary.table.product,
        },
        {
            accessorKey: 'product.sku',
            header: dictionary.table.sku,
        },
        {
            accessorKey: 'product.price',
            header: dictionary.table.price,
            cell: ({ row }) => {
                const price = row.original.product.price;
                const formatted = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(price as unknown as number);
                return <div className="font-medium">{formatted}</div>;
            },
        },
        {
            accessorKey: 'quantity',
            header: dictionary.table.stock,
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const inventoryItem = row.original;
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
                                <DropdownMenuItem onClick={() => openDialog(inventoryItem)}>
                                    {dictionary.table.editStock}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ]; 