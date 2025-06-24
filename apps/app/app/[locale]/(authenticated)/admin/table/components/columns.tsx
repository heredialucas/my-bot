'use client';

import { type ColumnDef, type CellContext } from '@tanstack/react-table';
import type { Order } from '@repo/data-services/src/types/barfer';
import { Badge } from '@repo/design-system/components/ui/badge';

const statusTranslations: Record<Order['status'], string> = {
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
};

const paymentMethodTranslations: Record<string, string> = {
    cash: 'Efectivo',
    transfer: 'Transferencia',
    'bank-transfer': 'Transferencia Bancaria',
    'mercado-pago': 'Mercado Pago',
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: 'createdAt',
        header: 'Fecha de entrega',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const date = new Date(row.getValue('createdAt') as string);
            return <div className="text-center">{date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}</div>;
        }
    },
    {
        accessorKey: 'deliveryArea.schedule',
        header: 'Rango Horario',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const deliveryArea = row.original.deliveryArea;
            return <div className="min-w-[120px]">{deliveryArea ? deliveryArea.schedule : 'N/A'}</div>;
        }
    },
    {
        accessorKey: 'user.name',
        header: 'Cliente',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const user = row.original.user as Order['user'];
            return <div className="min-w-[150px]">{user ? `${user.name} ${user.lastName}` : 'N/A'}</div>;
        },
    },
    {
        accessorKey: 'user.email',
        header: 'Mail',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const user = row.original.user as Order['user'];
            return <div>{user ? user.email : 'N/A'}</div>;
        }
    },
    {
        accessorKey: 'address.phone',
        header: 'Teléfono',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const address = row.original.address as Order['address'];
            return <div>{address ? address.phone : 'N/A'}</div>;
        }
    },
    {
        accessorKey: 'address.address',
        header: 'Dirección',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const address = row.original.address as Order['address'];
            return <div className="min-w-[200px]">{address ? `${address.address}, ${address.city}` : 'N/A'}</div>;
        }
    },
    {
        accessorKey: 'items',
        header: 'Items',
        enableSorting: false,
        cell: ({ row }: CellContext<Order, unknown>) => {
            const items = row.original.items as Order['items'];
            return (
                <div className="min-w-[250px]">
                    {items.map(item => (
                        <div key={item.id}>{item.name} x{(item.options[0] as any)?.quantity || 1}</div>
                    ))}
                </div>
            );
        }
    },
    {
        accessorKey: 'paymentMethod',
        header: 'Medio de pago',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const paymentMethod = row.original.paymentMethod || '';
            const translatedPaymentMethod = paymentMethodTranslations[paymentMethod.toLowerCase()] || paymentMethod;
            return <div>{translatedPaymentMethod}</div>;
        }
    },
    {
        accessorKey: 'notes',
        header: 'Notas',
        cell: ({ row }: CellContext<Order, unknown>) => {
            return <div className="min-w-[200px]">{row.original.notes || 'N/A'}</div>;
        }
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const status = row.getValue('status') as Order['status'];
            const translatedStatus = statusTranslations[status] || status;
            return <Badge variant={status === 'confirmed' ? 'default' : 'secondary'}>{translatedStatus}</Badge>;
        }
    },
    {
        accessorKey: 'total',
        header: () => <div className="w-full text-right">Total</div>,
        cell: ({ row }: CellContext<Order, unknown>) => {
            const amount = parseFloat(row.getValue('total') as string);
            const formatted = new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
            }).format(amount);
            return <div className="font-medium text-right">{formatted}</div>;
        }
    },
]; 