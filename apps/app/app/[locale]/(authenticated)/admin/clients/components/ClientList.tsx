'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@repo/design-system/components/ui/table';
import { Badge } from '@repo/design-system/components/ui/badge';
import type { Client as PrismaClient } from '@repo/database';

// Tipo para el componente cliente con el campo Decimal serializado a string
type ClientForList = Omit<PrismaClient, 'accountBalance'> & {
    accountBalance: string;
};

interface ClientListProps {
    clients: ClientForList[];
}

const formatCurrency = (amount: number | string) => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(numericAmount);
};

export function ClientList({ clients }: ClientListProps) {
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead className="text-right">Saldo</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center h-24">
                                No hay clientes para mostrar.
                            </TableCell>
                        </TableRow>
                    ) : (
                        clients.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell className="font-medium">{`${client.firstName} ${client.lastName}`}</TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell>{client.phone}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={Number(client.accountBalance) > 0 ? 'destructive' : 'secondary'}>
                                        {formatCurrency(client.accountBalance)}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
} 