'use client';

import { DataTable } from '../../../../../components/data-table';
import { columns, type PaymentData } from './columns';

type PaymentsClientProps = {
    data: PaymentData[];
};

export function PaymentsClient({ data }: PaymentsClientProps) {
    return <DataTable columns={columns} data={data} />;
} 