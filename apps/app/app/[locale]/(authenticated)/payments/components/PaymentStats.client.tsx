'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { CreditCard, TrendingUp, Receipt, DollarSign } from 'lucide-react';
import { getPaymentStatsAction } from '../actions';

type PaymentStatsData = {
    totalPayments: number;
    totalAmount: number;
    paymentsByMethod: {
        paymentMethod: string;
        _count: { id: number };
        _sum: { amount: number | null };
    }[];
};

export function PaymentStats() {
    const [stats, setStats] = useState<PaymentStatsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const result = await getPaymentStatsAction();
                if (result.success && result.stats) {
                    setStats(result.stats);
                }
            } catch (error) {
                console.error('Error fetching payment stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(amount);
    };

    const paymentMethodLabels = {
        CASH: 'Efectivo',
        CREDIT_CARD: 'Tarjeta',
        BANK_TRANSFER: 'Transferencia',
        OTHER: 'Otro'
    };

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 bg-gray-200 rounded animate-pulse" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No se pudieron cargar las estadísticas.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Pagos
                    </CardTitle>
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalPayments}</div>
                    <p className="text-xs text-muted-foreground">
                        pagos registrados
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Monto Total
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(stats.totalAmount)}</div>
                    <p className="text-xs text-muted-foreground">
                        en pagos recibidos
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Método Principal
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.paymentsByMethod.length > 0
                            ? paymentMethodLabels[stats.paymentsByMethod[0].paymentMethod as keyof typeof paymentMethodLabels]
                            : 'N/A'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        más utilizado
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Promedio por Pago
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.totalPayments > 0
                            ? formatCurrency(stats.totalAmount / stats.totalPayments)
                            : formatCurrency(0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        por transacción
                    </p>
                </CardContent>
            </Card>
        </div>
    );
} 