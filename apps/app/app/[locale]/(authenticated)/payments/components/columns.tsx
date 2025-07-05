'use client';

import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { Button } from '@repo/design-system/components/ui/button';
import { Badge } from '@repo/design-system/components/ui/badge';
import { MoreHorizontal, FileText, Eye } from 'lucide-react';
import { InvoiceDialog } from './InvoiceDialog.client';

export type PaymentData = {
    id: string;
    paymentDate: Date;
    amount: number;
    paymentMethod: 'CASH' | 'CREDIT_CARD' | 'BANK_TRANSFER' | 'OTHER';
    receiptNumber: string | null;
    notes: string | null;
    order: {
        id: string;
        orderDate: Date;
        totalAmount: number;
        items: {
            quantity: number;
            product: {
                name: string;
                sku: string;
            };
        }[];
        client: {
            firstName: string;
            lastName: string;
            email: string | null;
        };
        seller: {
            name: string;
            lastName: string;
        };
    };
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(amount);
};

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(date));
};

const paymentMethodLabels = {
    CASH: 'Efectivo',
    CREDIT_CARD: 'Tarjeta de Crédito',
    BANK_TRANSFER: 'Transferencia',
    OTHER: 'Otro'
};

const paymentMethodVariants = {
    CASH: 'default',
    CREDIT_CARD: 'secondary',
    BANK_TRANSFER: 'outline',
    OTHER: 'destructive'
} as const;

function ActionsCell({ payment }: { payment: PaymentData }) {
    const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsInvoiceDialogOpen(true)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Generar Factura
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Ver detalles', payment.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalles
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <InvoiceDialog
                payment={payment}
                isOpen={isInvoiceDialogOpen}
                onClose={() => setIsInvoiceDialogOpen(false)}
            />
        </>
    );
}

export const columns: ColumnDef<PaymentData>[] = [
    {
        accessorKey: 'paymentDate',
        header: 'Fecha',
        cell: ({ row }) => formatDate(row.original.paymentDate),
    },
    {
        accessorKey: 'receiptNumber',
        header: 'N° Recibo',
        cell: ({ row }) => row.original.receiptNumber || '-',
    },
    {
        accessorKey: 'client',
        header: 'Cliente',
        cell: ({ row }) => {
            const { client } = row.original.order;
            return `${client.firstName} ${client.lastName}`;
        },
    },
    {
        accessorKey: 'seller',
        header: 'Vendedor',
        cell: ({ row }) => {
            const { seller } = row.original.order;
            return `${seller.name} ${seller.lastName}`;
        },
    },
    {
        accessorKey: 'items',
        header: 'Productos',
        cell: ({ row }) => {
            const totalItems = row.original.order.items.reduce((sum, item) => sum + item.quantity, 0);
            return (
                <div className="text-sm">
                    <div className="font-medium">{totalItems} unidades</div>
                    <div className="text-muted-foreground">
                        {row.original.order.items.length} productos
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'amount',
        header: 'Monto',
        cell: ({ row }) => (
            <span className="font-medium">
                {formatCurrency(row.original.amount)}
            </span>
        ),
    },
    {
        accessorKey: 'paymentMethod',
        header: 'Método',
        cell: ({ row }) => (
            <Badge variant={paymentMethodVariants[row.original.paymentMethod]}>
                {paymentMethodLabels[row.original.paymentMethod]}
            </Badge>
        ),
    },
    {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => <ActionsCell payment={row.original} />,
    },
]; 