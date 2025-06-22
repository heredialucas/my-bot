'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Input } from '@repo/design-system/components/ui/input';
import { Button } from '@repo/design-system/components/ui/button';
import { ShoppingCart, DollarSign, Calendar, Users, AlertCircle } from 'lucide-react';

interface MonthlyData {
    month: string;
    orders: number;
    uniqueCustomers: number;
    revenue: number;
}

interface MonthlyAnalyticsClientProps {
    allOrdersData: MonthlyData[];   // Todos los pedidos (pending + confirmed)
}

export function MonthlyAnalyticsClient({ allOrdersData }: MonthlyAnalyticsClientProps) {
    const [selectedMonth, setSelectedMonth] = useState<string>('');

    // Ordenar datos de más reciente a más viejo
    const sortedAllOrders = [...allOrdersData].sort((a, b) => {
        return b.month.localeCompare(a.month); // Orden descendente
    });

    // Filtrar por mes específico si se selecciona
    const filteredAllOrders = selectedMonth
        ? sortedAllOrders.filter(month => month.month === selectedMonth)
        : sortedAllOrders.slice(0, 12); // Últimos 12 meses por defecto

    const clearFilter = () => setSelectedMonth('');

    // Formatear nombre del mes para mostrar
    const formatMonthName = (monthStr: string) => {
        const [year, month] = monthStr.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long'
        });
    };

    return (
        <div className="space-y-4">
            {/* Filtro de mes */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Filtro por mes
                    </CardTitle>
                    <CardDescription>
                        Busca un mes específico o deja vacío para ver los últimos 12 meses
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 sm:max-w-[200px] min-w-[140px]">
                            <Input
                                type="month"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="w-full text-sm"
                            />
                        </div>
                        <Button
                            variant="outline"
                            onClick={clearFilter}
                            disabled={!selectedMonth}
                            className="w-full sm:w-auto whitespace-nowrap text-sm"
                        >
                            Limpiar
                        </Button>
                    </div>
                    {selectedMonth && (
                        <p className="text-sm text-muted-foreground mt-2">
                            Mostrando datos para: {formatMonthName(selectedMonth)}
                        </p>
                    )}
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Tabla 1: Pedidos mensuales */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            Pedidos por mes
                        </CardTitle>
                        <CardDescription>
                            Todos los pedidos e ingresos mensuales
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {filteredAllOrders.length > 0 ? (
                                filteredAllOrders.map((month) => (
                                    <div key={month.month} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded gap-2">
                                        <span className="text-sm font-medium">{formatMonthName(month.month)}</span>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge variant="secondary">
                                                {month.orders} pedidos
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">
                                                ${month.revenue.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                                    <p>No hay datos para el mes seleccionado</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Tabla 2: Clientes únicos mensuales */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Clientes por mes
                        </CardTitle>
                        <CardDescription>
                            Total de pedidos vs clientes únicos
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {filteredAllOrders.length > 0 ? (
                                filteredAllOrders.map((month) => (
                                    <div key={month.month} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded gap-2">
                                        <span className="text-sm font-medium">{formatMonthName(month.month)}</span>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge variant="outline" className="flex items-center gap-1">
                                                <ShoppingCart className="h-3 w-3" />
                                                {month.orders} pedidos
                                            </Badge>
                                            <Badge variant="default" className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                {month.uniqueCustomers} únicos
                                            </Badge>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                                    <p>No hay datos para el mes seleccionado</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 