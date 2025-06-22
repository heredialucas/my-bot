'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { ShoppingCart, DollarSign, Users, RefreshCw, TrendingUp, Target } from 'lucide-react';

interface CustomerInsights {
    averageOrderValue: number;
    averageOrdersPerCustomer: number;
    totalCustomers: number;
    totalOrders: number;
    totalRevenue: number;
    averageSpentPerCustomer: number;
    repeatCustomerRate: number;
    customersWithMultipleOrders?: number;
}

interface FrequencyAnalyticsClientProps {
    customerInsights: CustomerInsights;
}

export function FrequencyAnalyticsClient({ customerInsights }: FrequencyAnalyticsClientProps) {
    return (
        <div className="space-y-4 md:space-y-6">
            {/* Métricas principales solicitadas */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            Gasto Promedio por Compra
                        </CardTitle>
                        <CardDescription>
                            Compra promedio de todas las órdenes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-2 break-words overflow-hidden">
                            ${customerInsights.averageOrderValue.toLocaleString()}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Basado en {customerInsights.totalOrders.toLocaleString()} órdenes totales
                        </p>
                        <div className="mt-3 p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-xs text-green-700">
                                <strong>Cálculo:</strong> Suma total de revenue ÷ cantidad de órdenes totales
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <RefreshCw className="h-5 w-5 text-blue-600" />
                            Frecuencia Promedio de Compra
                        </CardTitle>
                        <CardDescription>
                            Órdenes promedio por cliente
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-2 break-words overflow-hidden">
                            {customerInsights.averageOrdersPerCustomer} órdenes
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Por cliente activo
                        </p>
                        <div className="mt-3 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-xs text-blue-700">
                                <strong>Cálculo:</strong> Total de órdenes ÷ cantidad de clientes únicos
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Métricas de contexto adicionales */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Métricas de Comportamiento de Clientes
                    </CardTitle>
                    <CardDescription>
                        Análisis detallado del comportamiento de compra y gastos
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                        <div className="p-3 sm:p-4 border rounded-lg text-center">
                            <Users className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-blue-500" />
                            <div className="text-sm sm:text-lg font-bold text-blue-600 mb-1 break-words overflow-hidden">
                                {customerInsights.totalCustomers.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Clientes únicos
                            </p>
                        </div>

                        <div className="p-3 sm:p-4 border rounded-lg text-center">
                            <Target className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-green-500" />
                            <div className="text-sm sm:text-lg font-bold text-green-600 mb-1 break-words overflow-hidden">
                                ${customerInsights.averageSpentPerCustomer.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Gasto promedio por cliente
                            </p>
                            <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                                (Revenue total ÷ clientes únicos)
                            </p>
                        </div>

                        <div className="p-3 sm:p-4 border rounded-lg text-center">
                            <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-purple-500" />
                            <div className="text-sm sm:text-lg font-bold text-purple-600 mb-1 break-words overflow-hidden">
                                {customerInsights.repeatCustomerRate}%
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Tasa de repetición
                            </p>
                            <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                                (Clientes con +1 orden ÷ total clientes)
                            </p>
                        </div>

                        <div className="p-3 sm:p-4 border rounded-lg text-center">
                            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-orange-500" />
                            <div className="text-sm sm:text-lg font-bold text-orange-600 mb-1 break-words overflow-hidden">
                                ${Math.round(customerInsights.totalRevenue / 1000000)}M
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Revenue total
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 