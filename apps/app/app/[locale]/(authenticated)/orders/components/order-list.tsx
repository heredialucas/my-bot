'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/design-system/components/ui/button';
import { type FullOrderData } from '@repo/data-services/src/types';
import { type Dictionary, type Locale } from '@repo/internationalization';
import { getOrderColumns } from './columns';
import { DataTable } from '@/components/data-table';

interface OrderListProps {
    orders: FullOrderData[];
    dictionary: Dictionary;
    locale: Locale;
}

export function OrderList({ orders, dictionary, locale }: OrderListProps) {
    const router = useRouter();
    const columns = useMemo(() => getOrderColumns(dictionary.app.admin.orders, locale), [dictionary, locale]);

    const handleNewOrder = () => {
        router.push(`/${locale}/orders/new`);
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button onClick={handleNewOrder}>
                    {dictionary.app.admin.orders.newOrder}
                </Button>
            </div>
            <DataTable columns={columns} data={orders} />
        </div>
    );
} 