'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';
import { CreditCard } from 'lucide-react';

interface PaymentMethod {
    paymentMethod: string;
    count: number;
    percentage: number;
    totalRevenue: number;
    revenuePercentage: number;
    // Nuevos campos detallados
    totalCount: number;
    totalPercentage: number;
    confirmedCount: number;
    confirmedRevenue: number;
    confirmedPercentage: number;
    pendingCount: number;
    pendingRevenue: number;
}

interface PaymentStats {
    paymentMethods: PaymentMethod[];
    totalOrders: number;
    totalRevenue: number;
    totalConfirmedOrders: number;
    totalConfirmedRevenue: number;
}

interface PaymentsAnalyticsClientProps {
    paymentStats: PaymentStats;
}

export function PaymentsAnalyticsClient({ paymentStats }: PaymentsAnalyticsClientProps) {
    const paymentMethods = paymentStats.paymentMethods || [];

    const getPaymentIcon = (method: string) => {
        switch (method) {
            case 'mercado-pago': return '💳';
            case 'cash': return '💵';
            case 'bank-transfer': return '🏦';
            default: return '💳';
        }
    };

    const getPaymentName = (method: string) => {
        switch (method) {
            case 'mercado-pago': return 'Mercado Pago';
            case 'cash': return 'Efectivo';
            case 'bank-transfer': return 'Transferencia';
            default: return method;
        }
    };

    const getPaymentColor = (method: string) => {
        switch (method) {
            case 'mercado-pago': return 'text-blue-600';
            case 'cash': return 'text-green-600';
            case 'bank-transfer': return 'text-purple-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="space-y-4">
            {/* Resumen general */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Métodos de Pago
                    </CardTitle>
                    <CardDescription>
                        Distribución de pagos en órdenes confirmadas • {paymentStats.totalOrders.toLocaleString()} transacciones
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {paymentMethods.map((method) => (
                            <div key={method.paymentMethod} className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{getPaymentIcon(method.paymentMethod)}</span>
                                        <h3 className="font-medium">{getPaymentName(method.paymentMethod)}</h3>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {method.percentage.toFixed(1)}%
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs sm:text-sm text-muted-foreground">Total órdenes</span>
                                        <span className={`font-bold text-sm ${getPaymentColor(method.paymentMethod)}`}>
                                            {method.totalCount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs sm:text-sm text-green-600">✅ Confirmadas</span>
                                        <span className="text-xs sm:text-sm text-green-600 font-medium">
                                            {method.confirmedCount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs sm:text-sm text-orange-600">⏳ Pendientes</span>
                                        <span className="text-xs sm:text-sm text-orange-600 font-medium">
                                            {method.pendingCount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs sm:text-sm text-muted-foreground">Ingresos totales</span>
                                        <span className={`font-bold text-sm ${getPaymentColor(method.paymentMethod)}`}>
                                            ${method.totalRevenue.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Resumen rápido */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Resumen de Pagos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                                ${paymentStats.totalRevenue.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Ingresos totales</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                                {paymentStats.totalOrders.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Órdenes confirmadas</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 