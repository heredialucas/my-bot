'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Input } from '@repo/design-system/components/ui/input';
import { Button } from '@repo/design-system/components/ui/button';
import { ShoppingCart, DollarSign, Calendar, AlertCircle } from 'lucide-react';

interface DailyData {
    date: string;
    orders: number;
    revenue: number;
}

interface DailyAnalyticsClientProps {
    allOrdersData: DailyData[];   // Todos los pedidos (pending + confirmed)
    confirmedOrdersData: DailyData[]; // Solo pedidos confirmados
}

export function DailyAnalyticsClient({ allOrdersData, confirmedOrdersData }: DailyAnalyticsClientProps) {
    const [selectedDate, setSelectedDate] = useState<string>('');

    // Ordenar de más reciente a más viejo
    const sortedAllOrders = [...allOrdersData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const sortedConfirmedOrders = [...confirmedOrdersData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Filtrar por fecha específica si se selecciona
    const filteredAllOrders = selectedDate
        ? sortedAllOrders.filter(day => day.date === selectedDate)
        : sortedAllOrders.slice(0, 30); // Últimos 30 días por defecto

    const filteredConfirmedOrders = selectedDate
        ? sortedConfirmedOrders.filter(day => day.date === selectedDate)
        : sortedConfirmedOrders.slice(0, 30); // Últimos 30 días por defecto

    const clearFilter = () => setSelectedDate('');

    return (
        <div className="space-y-4">
            {/* Filtro de fecha */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Filtro por Fecha
                    </CardTitle>
                    <CardDescription>
                        Busca datos de un día específico o deja vacío para ver los últimos 30 días
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="flex-1 sm:max-w-xs"
                        />
                        <Button
                            variant="outline"
                            onClick={clearFilter}
                            disabled={!selectedDate}
                            className="w-full sm:w-auto"
                        >
                            Limpiar filtro
                        </Button>
                    </div>
                    {selectedDate && (
                        <p className="text-sm text-muted-foreground mt-2">
                            Mostrando datos para: {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    )}
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Tabla 1: Todos los pedidos */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            Todos los Pedidos ({selectedDate ? 'Día específico' : 'Últimos 30 días'})
                        </CardTitle>
                        <CardDescription>
                            Incluye pedidos pendientes + confirmados • Total histórico: ~18,691 pedidos
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {filteredAllOrders.length > 0 ? (
                                filteredAllOrders.map((day) => (
                                    <div key={day.date} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded gap-2">
                                        <span className="text-sm font-medium">{day.date}</span>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge variant="secondary">
                                                {day.orders} pedidos
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">
                                                ${day.revenue.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                                    <p>No hay datos para la fecha seleccionada</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Tabla 2: Solo pedidos confirmados (revenue real) */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            Ingresos Reales ({selectedDate ? 'Día específico' : 'Últimos 30 días'})
                        </CardTitle>
                        <CardDescription>
                            Solo pedidos confirmados • Total histórico: ~5,755 pedidos confirmados
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {filteredConfirmedOrders.length > 0 ? (
                                filteredConfirmedOrders.map((day) => (
                                    <div key={day.date} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded gap-2">
                                        <span className="text-sm font-medium">{day.date}</span>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge variant="default">
                                                {day.orders} confirmados
                                            </Badge>
                                            <span className="text-sm font-semibold text-green-600">
                                                ${day.revenue.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                                    <p>No hay ventas confirmadas para la fecha seleccionada</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 