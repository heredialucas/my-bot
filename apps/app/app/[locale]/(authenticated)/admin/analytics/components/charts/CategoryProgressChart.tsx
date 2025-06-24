'use client';

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';

interface DataPoint {
    period: string;
    date: string;
    [key: string]: any;
}

interface CategoryProgressChartProps {
    data: DataPoint[];
    isComparing: boolean;
    dateFilter?: { from: Date; to: Date };
}

const CATEGORY_KEYS = {
    Perros: { quantity: 'perroQuantity', revenue: 'perroRevenue', color: '#3498db' },
    Gatos: { quantity: 'gatoQuantity', revenue: 'gatoRevenue', color: '#e74c3c' },
    Huesos: { quantity: 'huesosQuantity', revenue: 'huesosRevenue', color: '#2ecc71' },
    Complementos: { quantity: 'complementosQuantity', revenue: 'complementosRevenue', color: '#f1c40f' }
};

export function CategoryProgressChart({
    data,
    isComparing,
    dateFilter,
}: CategoryProgressChartProps) {
    const diffDays = dateFilter ? Math.ceil(Math.abs(dateFilter.to.getTime() - dateFilter.from.getTime()) / (1000 * 60 * 60 * 24)) : 0;
    const periodType = diffDays <= 31 ? 'daily' : diffDays <= 90 ? 'weekly' : 'monthly';

    const chartData = useMemo(() => data.map(item => ({ ...item, displayDate: periodType === 'monthly' ? item.date : periodType === 'weekly' ? `S${item.period.split('-W')[1]}` : item.date.split('-')[2] })), [data, periodType]);

    const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Unidades por Categoría</CardTitle>
                    <CardDescription>Unidades vendidas por categoría a lo largo del tiempo.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="displayDate" fontSize={12} />
                            <YAxis fontSize={12} />
                            <Tooltip
                                formatter={(value: number) => `${Number(value).toLocaleString()} un.`}
                                labelFormatter={(label, payload) => {
                                    const point = payload?.[0]?.payload;
                                    if (point && point.date && periodType === 'daily') {
                                        try {
                                            const dateString = point.date;
                                            let date;
                                            if (dateString.includes('/')) {
                                                // Asumir formato DD/MM/YYYY
                                                date = new Date(dateString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1T00:00:00'));
                                            } else {
                                                // Asumir formato YYYY-MM-DD
                                                date = new Date(`${dateString}T00:00:00`);
                                            }

                                            if (!isNaN(date.getTime())) {
                                                const formattedDate = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                                                const dayString = date.toLocaleDateString('es-ES', { weekday: 'long' });
                                                return (
                                                    <div>
                                                        <div>{formattedDate}</div>
                                                        <div style={{ textTransform: 'capitalize' }}>{dayString}</div>
                                                    </div>
                                                );
                                            }
                                        } catch (e) {
                                            // fallback to original label
                                        }
                                    }
                                    return label;
                                }}
                            />
                            <Legend />
                            {Object.entries(CATEGORY_KEYS).map(([name, keys]) => (<Line key={name} type="monotone" dataKey={keys.quantity} name={name} stroke={keys.color} strokeWidth={2} dot={false} />))}
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Ingresos por Categoría</CardTitle>
                    <CardDescription>Ingresos generados por categoría a lo largo del tiempo.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="displayDate" fontSize={12} />
                            <YAxis tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`} fontSize={12} />
                            <Tooltip
                                formatter={(value: number) => formatCurrency(value)}
                                labelFormatter={(label, payload) => {
                                    const point = payload?.[0]?.payload;
                                    if (point && point.date && periodType === 'daily') {
                                        try {
                                            const dateString = point.date;
                                            let date;
                                            if (dateString.includes('/')) {
                                                // Asumir formato DD/MM/YYYY
                                                date = new Date(dateString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1T00:00:00'));
                                            } else {
                                                // Asumir formato YYYY-MM-DD
                                                date = new Date(`${dateString}T00:00:00`);
                                            }

                                            if (!isNaN(date.getTime())) {
                                                const formattedDate = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                                                const dayString = date.toLocaleDateString('es-ES', { weekday: 'long' });
                                                return (
                                                    <div>
                                                        <div>{formattedDate}</div>
                                                        <div style={{ textTransform: 'capitalize' }}>{dayString}</div>
                                                    </div>
                                                );
                                            }
                                        } catch (e) {
                                            // fallback to original label
                                        }
                                    }
                                    return label;
                                }}
                            />
                            <Legend />
                            {Object.entries(CATEGORY_KEYS).map(([name, keys]) => (<Bar key={name} dataKey={keys.revenue} name={name} fill={keys.color} />))}
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
} 