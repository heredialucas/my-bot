'use client';

import { type Product } from '@repo/database';
import { DataTable } from '../../../../../components/data-table';
import { createColumns, type SellerData } from './columns';

type SellersClientProps = {
    data: SellerData[];
    products: Product[];
};

export function SellersClient({ data, products }: SellersClientProps) {
    const columns = createColumns(products);
    return <DataTable columns={columns} data={data} />;
} 