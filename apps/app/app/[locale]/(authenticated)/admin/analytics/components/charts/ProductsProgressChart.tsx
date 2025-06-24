'use client';

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';

interface ProductProgressData {
    period: string;
    date: string;
    perroQuantity: number;
    perroRevenue: number;
    gatoQuantity: number;
    gatoRevenue: number;
    huesosQuantity: number;
    huesosRevenue: number;
    complementosQuantity: number;
    complementosRevenue: number;
    totalQuantity: number;
    totalRevenue: number;
}

interface ProductsProgressChartProps {
    data: ProductProgressData[];
    compareData?: ProductProgressData[];
    isComparing?: boolean;
    periodType: 'daily' | 'weekly' | 'monthly';
    dateFilter?: { from: Date; to: Date };
    compareFilter?: { from: Date; to: Date };
}

export function ProductsProgressChart({
    data,
    compareData,
    isComparing = false,
    periodType,
    dateFilter,
    compareFilter
}: ProductsProgressChartProps) {

    // Preparar datos para el gráfico principal
    const chartData = useMemo(() => {
        return data.map(item => ({
            ...item,
            displayDate: periodType === 'monthly' ? item.date : // Usar la fecha completa para meses (ej: "Enero 2025")
                periodType === 'weekly' ? `S${item.period.split('-W')[1]}` : // Solo número de semana
                    item.date // Usar la fecha completa para días (ej: "1/6/2025")
        }));
    }, [data, periodType]);

    // Preparar datos para el gráfico de comparación
    const compareChartData = useMemo(() => {
        if (!isComparing || !compareData) {
            return [];
        }

        return compareData.map(item => ({
            ...item,
            displayDate: periodType === 'monthly' ? item.date :
                periodType === 'weekly' ? `S${item.period.split('-W')[1]}` :
                    item.date,
            // Renombrar para evitar conflictos
            comparePerroQuantity: item.perroQuantity,
            comparePerroRevenue: item.perroRevenue,
            compareGatoQuantity: item.gatoQuantity,
            compareGatoRevenue: item.gatoRevenue,
            compareHuesosQuantity: item.huesosQuantity,
            compareHuesosRevenue: item.huesosRevenue,
            compareComplementosQuantity: item.complementosQuantity,
            compareComplementosRevenue: item.complementosRevenue,
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
            {/* Gráfico de Líneas - Evolución de Productos por Categoría */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-lg">Evolución de Productos por {getPeriodLabel()}</span>
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
                        Número de unidades por categoría de producto a lo largo del tiempo {isComparing ? 'con comparación' : ''}
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
                                            `${value} unidades`,
                                            name === 'perroQuantity' ? '🐶 Perro' :
                                                name === 'gatoQuantity' ? '🐱 Gato' :
                                                    name === 'huesosQuantity' ? '🦴 Huesos' :
                                                        name === 'complementosQuantity' ? '🔧 Complementos' : name
                                        ]}
                                        labelFormatter={(label) => `${getPeriodLabel()}: ${label}`}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="perroQuantity"
                                        stroke="#f59e0b"
                                        strokeWidth={2}
                                        name="🐶 Perro"
                                        dot={{ r: 3 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="gatoQuantity"
                                        stroke="#8b5cf6"
                                        strokeWidth={2}
                                        name="🐱 Gato"
                                        dot={{ r: 3 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="huesosQuantity"
                                        stroke="#06b6d4"
                                        strokeWidth={2}
                                        name="🦴 Huesos"
                                        dot={{ r: 3 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="complementosQuantity"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        name="🔧 Complementos"
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
                                                `${value} unidades`,
                                                name === 'comparePerroQuantity' ? '🐶 Perro' :
                                                    name === 'compareGatoQuantity' ? '🐱 Gato' :
                                                        name === 'compareHuesosQuantity' ? '🦴 Huesos' :
                                                            name === 'compareComplementosQuantity' ? '🔧 Complementos' : name
                                            ]}
                                            labelFormatter={(label) => `${getPeriodLabel()}: ${label}`}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="comparePerroQuantity"
                                            stroke="#ea580c"
                                            strokeWidth={2}
                                            name="🐶 Perro"
                                            dot={{ r: 3 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="compareGatoQuantity"
                                            stroke="#dc2626"
                                            strokeWidth={2}
                                            name="🐱 Gato"
                                            dot={{ r: 3 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="compareHuesosQuantity"
                                            stroke="#0891b2"
                                            strokeWidth={2}
                                            name="🦴 Huesos"
                                            dot={{ r: 3 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="compareComplementosQuantity"
                                            stroke="#059669"
                                            strokeWidth={2}
                                            name="🔧 Complementos"
                                            dot={{ r: 3 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Gráfico de Barras - Ingresos por Categoría de Producto */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-lg">Ingresos por Categoría de Producto</span>
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
                        Evolución de ingresos por categoría de producto por {getPeriodLabel()} {isComparing ? 'con comparación' : ''}
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
                                            name === 'perroRevenue' ? '🐶 Perro' :
                                                name === 'gatoRevenue' ? '🐱 Gato' :
                                                    name === 'huesosRevenue' ? '🦴 Huesos' :
                                                        name === 'complementosRevenue' ? '🔧 Complementos' : name
                                        ]}
                                        labelFormatter={(label) => `${getPeriodLabel()}: ${label}`}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="perroRevenue"
                                        name="🐶 Perro"
                                        fill="#f59e0b"
                                        radius={[2, 2, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="gatoRevenue"
                                        name="🐱 Gato"
                                        fill="#8b5cf6"
                                        radius={[2, 2, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="huesosRevenue"
                                        name="🦴 Huesos"
                                        fill="#06b6d4"
                                        radius={[2, 2, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="complementosRevenue"
                                        name="🔧 Complementos"
                                        fill="#10b981"
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
                                                name === 'comparePerroRevenue' ? '🐶 Perro' :
                                                    name === 'compareGatoRevenue' ? '🐱 Gato' :
                                                        name === 'compareHuesosRevenue' ? '🦴 Huesos' :
                                                            name === 'compareComplementosRevenue' ? '🔧 Complementos' : name
                                            ]}
                                            labelFormatter={(label) => `${getPeriodLabel()}: ${label}`}
                                        />
                                        <Legend />
                                        <Bar
                                            dataKey="comparePerroRevenue"
                                            name="🐶 Perro"
                                            fill="#ea580c"
                                            radius={[2, 2, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="compareGatoRevenue"
                                            name="🐱 Gato"
                                            fill="#dc2626"
                                            radius={[2, 2, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="compareHuesosRevenue"
                                            name="🦴 Huesos"
                                            fill="#0891b2"
                                            radius={[2, 2, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="compareComplementosRevenue"
                                            name="🔧 Complementos"
                                            fill="#059669"
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