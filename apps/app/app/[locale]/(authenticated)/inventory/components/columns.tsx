'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { type InventoryWithProduct } from '@repo/data-services';
import { type Dictionary } from '@repo/internationalization';

export const getInventoryColumns = (
    dictionary: Dictionary['app']['admin']['inventory'],
): ColumnDef<InventoryWithProduct>[] => [
        {
            accessorKey: 'product.name',
            header: dictionary.table.product,
        },
        {
            accessorKey: 'product.sku',
            header: 'Código',
        },
        {
            accessorKey: 'product.price',
            header: dictionary.table.price,
            cell: ({ row }) => {
                const price = row.original.product.price;
                const formatted = new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                }).format(price);
                return <div className="font-medium">{formatted}</div>;
            },
        },
        {
            accessorKey: 'quantity',
            header: dictionary.table.stock,
            cell: ({ row }) => {
                const stock = row.getValue('quantity') as number;
                return (
                    <div className={`font-medium ${stock <= 0 ? 'text-red-600' : stock <= 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {stock}
                    </div>
                );
            },
        },
    ]; 