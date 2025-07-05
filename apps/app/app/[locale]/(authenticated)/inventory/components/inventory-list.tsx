'use client';

import { useMemo } from 'react';
import { type InventoryWithProduct } from '@repo/data-services';
import { type Dictionary } from '@repo/internationalization';
import { getInventoryColumns } from './columns';
import { DataTable } from '@/components/data-table';

interface InventoryListProps {
    inventory: InventoryWithProduct[];
    dictionary: Dictionary;
}

export function InventoryList({ inventory, dictionary }: InventoryListProps) {
    const columns = useMemo(() => getInventoryColumns(dictionary.app.admin.inventory), [dictionary]);

    return (
        <div>
            <DataTable columns={columns} data={inventory} />
        </div>
    );
} 