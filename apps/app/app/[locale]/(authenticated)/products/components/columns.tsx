'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@repo/design-system/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { type ProductData } from '@repo/data-services';
import { type Dictionary } from '@repo/internationalization';

export const getProductColumns = (
    openDialog: (product?: ProductData) => void,
    dictionary: Dictionary['app']['admin']['products'],
): ColumnDef<ProductData>[] => [
        {
            accessorKey: 'name',
            header: dictionary.table.name,
        },
        {
            accessorKey: 'price',
            header: dictionary.table.price,
            cell: ({ row }) => {
                const price = parseFloat(row.getValue('price'));
                const formatted = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(price);
                return <div className="font-medium">{formatted}</div>;
            },
        },
        {
            accessorKey: 'stock',
            header: dictionary.table.stock,
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const product = row.original;
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
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
                                    {dictionary.table.copyId}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => openDialog(product)}>
                                    {dictionary.table.edit}
                                </DropdownMenuItem>
                                <DropdownMenuItem>{dictionary.table.viewDetails}</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ]; 