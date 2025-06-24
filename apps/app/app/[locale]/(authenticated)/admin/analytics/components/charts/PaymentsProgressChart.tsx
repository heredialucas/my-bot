'use client';

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';

interface PaymentProgressData {
    period: string;
    date: string;
    efectivoOrders: number;
    efectivoRevenue: number;
    transferenciaOrders: number;
    transferenciaRevenue: number;
    tarjetaOrders: number;
    tarjetaRevenue: number;
    totalOrders: number;
    totalRevenue: number;
}

interface PaymentsProgressChartProps {
    data: PaymentProgressData[];
    compareData?: PaymentProgressData[];
    isComparing?: boolean;
    periodType: 'daily' | 'weekly' | 'monthly';
    dateFilter?: { from: Date; to: Date };
    compareFilter?: { from: Date; to: Date };
}

export function PaymentsProgressChart({
    data,
    compareData,
    isComparing = false,
    periodType,
    dateFilter,
    compareFilter
}: PaymentsProgressChartProps) {

    // Preparar datos para el gráfico principal
    const chartData = useMemo(() => {
        return data.map(item => ({
            ...item,
            displayDate: periodType === 'monthly' ?
                item.date.split(' ')[0] : // Solo mes/año 
                periodType === 'weekly' ?
                    `S${item.period.split('-W')[1]}` : // Solo número de semana
                    item.date.split('/')[0] + '/' + item.date.split('/')[1] // Solo día/mes
        }));
    }, [data, periodType]);

    // Preparar datos para el gráfico de comparación
    const compareChartData = useMemo(() => {
        if (!isComparing || !compareData) {
            return [];
        }

        return compareData.map(item => ({
            ...item,
            displayDate: periodType === 'monthly' ?
                item.date.split(' ')[0] : // Solo mes/año 
                periodType === 'weekly' ?
                    `S${item.period.split('-W')[1]}` : // Solo número de semana
                    item.date.split('/')[0] + '/' + item.date.split('/')[1], // Solo día/mes
            // Renombrar para evitar conflictos
            compareEfectivoOrders: item.efectivoOrders,
            compareEfectivoRevenue: item.efectivoRevenue,
            compareTransferenciaOrders: item.transferenciaOrders,
            compareTransferenciaRevenue: item.transferenciaRevenue,
            compareTarjetaOrders: item.tarjetaOrders,
            compareTarjetaRevenue: item.tarjetaRevenue,
        }));
    }, [compareData, isComparing, periodType]);

    const formatCurrency = (value: number) => {
        return `$${value.toLocaleString()}`;
    };

    const formatDateRange = (from: Date, to: Date) => {
        return `${from.toLocaleDateString('es-ES')} - ${to.toLocaleDateString('es-ES')}`;
    };

    const getPeriodLabel = () => {
        switch (periodType) {
            case 'daily': return 'Día';
            case 'weekly': return 'Semana';
            case 'monthly': return 'Mes';
            default: return 'Período';
        }
    };

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Gráfico de Líneas - Evolución de Pagos por Método */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-lg">Evolución de Pagos por {getPeriodLabel()}</span>
                        {isComparing && (
                            <div className="flex flex-col sm:flex-row gap-2 text-xs">
                                <Badge variant="outline" className="text-blue-600 w-fit">
                                    Principal: {dateFilter && formatDateRange(dateFilter.from, dateFilter.to)}
                                </Badge>
                                <Badge variant="outline" className="text-orange-600 w-fit">
                                    Comparación: {compareFilter && formatDateRange(compareFilter.from, compareFilter.to)}
                                </Badge>
                            </div>
                        )}
                        {!isComparing && dateFilter && (
                            <Badge variant="outline" className="text-blue-600 w-fit">
                                {formatDateRange(dateFilter.from, dateFilter.to)}
                            </Badge>
                        )}
                    </CardTitle>
                    <CardDescription>
                        Número de órdenes por método de pago a lo largo del tiempo {isComparing ? 'con comparación' : ''}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className={`grid grid-cols-1 gap-6 ${isComparing ? 'xl:grid-cols-2' : ''}`}>
                        {/* Gráfico Principal */}
                        <div>
                            {isComparing && (
                                <h4 className="text-sm font-medium mb-3">
                                    Período Principal {dateFilter && `(${formatDateRange(dateFilter.from, dateFilter.to)})`}
                                </h4>
                            )}
                            <ResponsiveContainer width="100%" height={isComparing ? 320 : 400}>
                                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="displayDate"
                                        tick={{ fontSize: 10 }}
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis tick={{ fontSize: 10 }} />
                                    <Tooltip
                                        formatter={(value: number, name: string) => [
                                            `${value} pedidos`,
                                            name === 'efectivoOrders' ? '💵 Efectivo' :
                                                name === 'transferenciaOrders' ? '🏦 Transferencia Bancaria' :
                                                    name === 'tarjetaOrders' ? '💳 Mercado Pago' : name
                                        ]}
                                        labelFormatter={(label, payload) => {
                                            const point = payload?.[0]?.payload;
                                            if (point && point.date && periodType === 'daily') {
                                                try {
                                                    const date = new Date(point.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1T00:00:00'));
                                                    const dateString = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                                                    const dayString = date.toLocaleDateString('es-ES', { weekday: 'long' });
                                                    return (
                                                        <div>
                                                            <div>{dateString}</div>
                                                            <div style={{ textTransform: 'capitalize' }}>{dayString}</div>
                                                        </div>
                                                    );
                                                } catch (e) {
                                                    // fallback
                                                }
                                            }
                                            return `${getPeriodLabel()}: ${label}`;
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="efectivoOrders"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        name="💵 Efectivo"
                                        dot={{ r: 3 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="transferenciaOrders"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        name="🏦 Transferencia Bancaria"
                                        dot={{ r: 3 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="tarjetaOrders"
                                        stroke="#8b5cf6"
                                        strokeWidth={2}
                                        name="💳 Mercado Pago"
                                        dot={{ r: 3 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Gráfico de Comparación */}
                        {isComparing && compareChartData.length > 0 && (
                            <div>
                                <h4 className="text-sm font-medium mb-3">
                                    Período de Comparación {compareFilter && `(${formatDateRange(compareFilter.from, compareFilter.to)})`}
                                </h4>
                                <ResponsiveContainer width="100%" height={320}>
                                    <LineChart data={compareChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="displayDate"
                                            tick={{ fontSize: 10 }}
                                            angle={-45}
                                            textAnchor="end"
                                            height={80}
                                        />
                                        <YAxis tick={{ fontSize: 10 }} />
                                        <Tooltip
                                            formatter={(value: number, name: string) => [
                                                `${value} pedidos`,
                                                name === 'compareEfectivoOrders' ? '💵 Efectivo' :
                                                    name === 'compareTransferenciaOrders' ? '🏦 Transferencia Bancaria' :
                                                        name === 'compareTarjetaOrders' ? '💳 Mercado Pago' : name
                                            ]}
                                            labelFormatter={(label, payload) => {
                                                const point = payload?.[0]?.payload;
                                                if (point && point.date && periodType === 'daily') {
                                                    try {
                                                        const date = new Date(point.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1T00:00:00'));
                                                        const dateString = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                                                        const dayString = date.toLocaleDateString('es-ES', { weekday: 'long' });
                                                        return (
                                                            <div>
                                                                <div>{dateString}</div>
                                                                <div style={{ textTransform: 'capitalize' }}>{dayString}</div>
                                                            </div>
                                                        );
                                                    } catch (e) {
                                                        // fallback
                                                    }
                                                }
                                                return `${getPeriodLabel()}: ${label}`;
                                            }}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="compareEfectivoOrders"
                                            stroke="#ea580c"
                                            strokeWidth={2}
                                            name="💵 Efectivo"
                                            dot={{ r: 3 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="compareTransferenciaOrders"
                                            stroke="#dc2626"
                                            strokeWidth={2}
                                            name="🏦 Transferencia Bancaria"
                                            dot={{ r: 3 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="compareTarjetaOrders"
                                            stroke="#f59e0b"
                                            strokeWidth={2}
                                            name="💳 Mercado Pago"
                                            dot={{ r: 3 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Gráfico de Barras - Ingresos por Método de Pago */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-lg">Ingresos por Método de Pago</span>
                        {isComparing && (
                            <div className="flex flex-col sm:flex-row gap-2 text-xs">
                                <Badge variant="outline" className="text-purple-600 w-fit">Principal</Badge>
                                <Badge variant="outline" className="text-orange-600 w-fit">Comparación</Badge>
                            </div>
                        )}
                        {!isComparing && dateFilter && (
                            <Badge variant="outline" className="text-purple-600 w-fit">
                                {formatDateRange(dateFilter.from, dateFilter.to)}
                            </Badge>
                        )}
                    </CardTitle>
                    <CardDescription>
                        Evolución de ingresos por método de pago por {getPeriodLabel()} {isComparing ? 'con comparación' : ''}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className={`grid grid-cols-1 gap-6 ${isComparing ? 'xl:grid-cols-2' : ''}`}>
                        {/* Gráfico Principal */}
                        <div>
                            {isComparing && (
                                <h4 className="text-sm font-medium mb-3">
                                    Período Principal {dateFilter && `(${formatDateRange(dateFilter.from, dateFilter.to)})`}
                                </h4>
                            )}
                            <ResponsiveContainer width="100%" height={isComparing ? 320 : 400}>
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="displayDate"
                                        tick={{ fontSize: 10 }}
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 10 }}
                                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                    />
                                    <Tooltip
                                        formatter={(value: number, name: string) => [
                                            formatCurrency(value),
                                            name === 'efectivoRevenue' ? '💵 Efectivo' :
                                                name === 'transferenciaRevenue' ? '🏦 Transferencia Bancaria' :
                                                    name === 'tarjetaRevenue' ? '💳 Mercado Pago' : name
                                        ]}
                                        labelFormatter={(label, payload) => {
                                            const point = payload?.[0]?.payload;
                                            if (point && point.date && periodType === 'daily') {
                                                try {
                                                    const date = new Date(point.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1T00:00:00'));
                                                    const dateString = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                                                    const dayString = date.toLocaleDateString('es-ES', { weekday: 'long' });
                                                    return (
                                                        <div>
                                                            <div>{dateString}</div>
                                                            <div style={{ textTransform: 'capitalize' }}>{dayString}</div>
                                                        </div>
                                                    );
                                                } catch (e) {
                                                    // fallback
                                                }
                                            }
                                            return `${getPeriodLabel()}: ${label}`;
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="efectivoRevenue"
                                        name="💵 Efectivo"
                                        fill="#10b981"
                                        radius={[2, 2, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="transferenciaRevenue"
                                        name="🏦 Transferencia Bancaria"
                                        fill="#3b82f6"
                                        radius={[2, 2, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="tarjetaRevenue"
                                        name="💳 Mercado Pago"
                                        fill="#8b5cf6"
                                        radius={[2, 2, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Gráfico de Comparación */}
                        {isComparing && compareChartData.length > 0 && (
                            <div>
                                <h4 className="text-sm font-medium mb-3">
                                    Período de Comparación {compareFilter && `(${formatDateRange(compareFilter.from, compareFilter.to)})`}
                                </h4>
                                <ResponsiveContainer width="100%" height={320}>
                                    <BarChart data={compareChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="displayDate"
                                            tick={{ fontSize: 10 }}
                                            angle={-45}
                                            textAnchor="end"
                                            height={80}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 10 }}
                                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                        />
                                        <Tooltip
                                            formatter={(value: number, name: string) => [
                                                formatCurrency(value),
                                                name === 'compareEfectivoRevenue' ? '💵 Efectivo' :
                                                    name === 'compareTransferenciaRevenue' ? '🏦 Transferencia Bancaria' :
                                                        name === 'compareTarjetaRevenue' ? '💳 Mercado Pago' : name
                                            ]}
                                            labelFormatter={(label, payload) => {
                                                const point = payload?.[0]?.payload;
                                                if (point && point.date && periodType === 'daily') {
                                                    try {
                                                        const date = new Date(point.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1T00:00:00'));
                                                        const dateString = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                                                        const dayString = date.toLocaleDateString('es-ES', { weekday: 'long' });
                                                        return (
                                                            <div>
                                                                <div>{dateString}</div>
                                                                <div style={{ textTransform: 'capitalize' }}>{dayString}</div>
                                                            </div>
                                                        );
                                                    } catch (e) {
                                                        // fallback
                                                    }
                                                }
                                                return `${getPeriodLabel()}: ${label}`;
                                            }}
                                        />
                                        <Legend />
                                        <Bar
                                            dataKey="compareEfectivoRevenue"
                                            name="💵 Efectivo"
                                            fill="#ea580c"
                                            radius={[2, 2, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="compareTransferenciaRevenue"
                                            name="🏦 Transferencia Bancaria"
                                            fill="#dc2626"
                                            radius={[2, 2, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="compareTarjetaRevenue"
                                            name="💳 Mercado Pago"
                                            fill="#f59e0b"
                                            radius={[2, 2, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 