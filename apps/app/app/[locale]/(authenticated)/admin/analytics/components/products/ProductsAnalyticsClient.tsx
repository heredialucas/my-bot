'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import { Separator } from '@repo/design-system/components/ui/separator';
import { Package, Filter } from 'lucide-react';
import { ProductsChart } from '../charts/ProductsChart';

interface ProductSale {
    productId: string;
    productName: string;
    optionName: string;
    quantity: number;
    revenue: number;
    orders: number;
    avgPrice: number;
    statuses: string[];
    statusFilter: string;
}

interface ProductsAnalyticsClientProps {
    allProducts: ProductSale[];
    pendingProducts: ProductSale[];
    confirmedProducts: ProductSale[];
    compareAllProducts?: ProductSale[];
    comparePendingProducts?: ProductSale[];
    compareConfirmedProducts?: ProductSale[];
    isComparing?: boolean;
    dateFilter?: { from: Date; to: Date };
    compareFilter?: { from: Date; to: Date };
}

export function ProductsAnalyticsClient({
    allProducts,
    pendingProducts,
    confirmedProducts,
    compareAllProducts,
    comparePendingProducts,
    compareConfirmedProducts,
    isComparing = false,
    dateFilter,
    compareFilter
}: ProductsAnalyticsClientProps) {
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed'>('all');

    // Seleccionar los datos correctos basado en el filtro
    const getCurrentProducts = () => {
        let products;
        switch (statusFilter) {
            case 'all': products = allProducts; break;
            case 'pending': products = pendingProducts; break;
            case 'confirmed': products = confirmedProducts; break;
            default: products = allProducts; break;
        }

        // Reordenar por cantidad (descendente) para que el ranking sea correcto para cada filtro
        return [...products].sort((a, b) => b.quantity - a.quantity);
    };

    const getCompareProducts = () => {
        if (!isComparing) return [];

        let products;
        switch (statusFilter) {
            case 'all': products = compareAllProducts || []; break;
            case 'pending': products = comparePendingProducts || []; break;
            case 'confirmed': products = compareConfirmedProducts || []; break;
            default: products = compareAllProducts || []; break;
        }

        return [...products].sort((a, b) => b.quantity - a.quantity);
    };

    const currentProducts = getCurrentProducts();
    const compareProducts = getCompareProducts();

    // Calcular totales para comparación
    const totals = useMemo(() => {
        const currentTotal = currentProducts.reduce((acc, p) => ({
            quantity: acc.quantity + p.quantity,
            revenue: acc.revenue + p.revenue,
            orders: acc.orders + p.orders
        }), { quantity: 0, revenue: 0, orders: 0 });

        const compareTotal = compareProducts.reduce((acc, p) => ({
            quantity: acc.quantity + p.quantity,
            revenue: acc.revenue + p.revenue,
            orders: acc.orders + p.orders
        }), { quantity: 0, revenue: 0, orders: 0 });

        return { current: currentTotal, compare: compareTotal };
    }, [currentProducts, compareProducts]);

    // Función para calcular porcentaje de cambio (de fecha antigua a reciente)
    const calculateChange = (primaryValue: number, compareValue: number, primaryDate: Date, compareDate: Date) => {
        // Determinar cuál es el período anterior y cuál el actual basándose en fechas
        const isPrimaryNewer = primaryDate > compareDate;
        const oldValue = isPrimaryNewer ? compareValue : primaryValue;
        const newValue = isPrimaryNewer ? primaryValue : compareValue;

        if (oldValue === 0) return newValue > 0 ? 100 : 0;
        return ((newValue - oldValue) / oldValue) * 100;
    };

    const formatChange = (change: number) => {
        const isPositive = change >= 0;
        return (
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{change.toFixed(1)}%
            </span>
        );
    };

    const formatDateRange = (from: Date, to: Date) => {
        return `${from.toLocaleDateString('es-ES')} - ${to.toLocaleDateString('es-ES')}`;
    };

    // Determinar cuál período es más reciente para las etiquetas
    const isPrimaryNewer = dateFilter && compareFilter ? dateFilter.from > compareFilter.from : true;
    const newerLabel = isPrimaryNewer ? 'Principal' : 'Comparación';
    const olderLabel = isPrimaryNewer ? 'Comparación' : 'Principal';

    // Obtener estadísticas del filtro actual
    const getFilterStats = () => {
        const total = currentProducts.length;
        const totalQuantity = currentProducts.reduce((sum, p) => sum + p.quantity, 0);
        const totalRevenue = currentProducts.reduce((sum, p) => sum + p.revenue, 0);
        return { total, totalQuantity, totalRevenue };
    };

    const stats = getFilterStats();

    const getFilterLabel = (filter: string) => {
        switch (filter) {
            case 'all': return 'Todas';
            case 'pending': return 'Pendientes';
            case 'confirmed': return 'Confirmadas';
            default: return 'Todas';
        }
    };

    const getFilterColor = (filter: string) => {
        switch (filter) {
            case 'all': return 'text-blue-600';
            case 'pending': return 'text-orange-600';
            case 'confirmed': return 'text-green-600';
            default: return 'text-blue-600';
        }
    };

    return (
        <div className="space-y-4" key={`products-filter-${statusFilter}`}>
            {/* Resumen de comparación */}
            {isComparing && (
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Resumen - Unidades Vendidas</CardTitle>
                            {dateFilter && (
                                <p className="text-xs text-muted-foreground">
                                    Principal: {formatDateRange(dateFilter.from, dateFilter.to)}
                                    {compareFilter && (
                                        <><br />Comparación: {formatDateRange(compareFilter.from, compareFilter.to)}</>
                                    )}
                                </p>
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">{olderLabel} (anterior):</span>
                                    <span className="font-medium">{(isPrimaryNewer ? totals.compare.quantity : totals.current.quantity).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">{newerLabel} (más reciente):</span>
                                    <span className="font-medium">{(isPrimaryNewer ? totals.current.quantity : totals.compare.quantity).toLocaleString()}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Cambio:</span>
                                    {formatChange(calculateChange(totals.current.quantity, totals.compare.quantity, dateFilter?.from || new Date(), compareFilter?.from || new Date()))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Resumen - Ingresos</CardTitle>
                            {dateFilter && (
                                <p className="text-xs text-muted-foreground">
                                    Principal: {formatDateRange(dateFilter.from, dateFilter.to)}
                                    {compareFilter && (
                                        <><br />Comparación: {formatDateRange(compareFilter.from, compareFilter.to)}</>
                                    )}
                                </p>
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">{olderLabel} (anterior):</span>
                                    <span className="font-medium">${(isPrimaryNewer ? totals.compare.revenue : totals.current.revenue).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">{newerLabel} (más reciente):</span>
                                    <span className="font-medium">${(isPrimaryNewer ? totals.current.revenue : totals.compare.revenue).toLocaleString()}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Cambio:</span>
                                    {formatChange(calculateChange(totals.current.revenue, totals.compare.revenue, dateFilter?.from || new Date(), compareFilter?.from || new Date()))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Resumen - Órdenes</CardTitle>
                            {dateFilter && (
                                <p className="text-xs text-muted-foreground">
                                    Principal: {formatDateRange(dateFilter.from, dateFilter.to)}
                                    {compareFilter && (
                                        <><br />Comparación: {formatDateRange(compareFilter.from, compareFilter.to)}</>
                                    )}
                                </p>
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">{olderLabel} (anterior):</span>
                                    <span className="font-medium">{(isPrimaryNewer ? totals.compare.orders : totals.current.orders).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">{newerLabel} (más reciente):</span>
                                    <span className="font-medium">{(isPrimaryNewer ? totals.current.orders : totals.compare.orders).toLocaleString()}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Cambio:</span>
                                    {formatChange(calculateChange(totals.current.orders, totals.compare.orders, dateFilter?.from || new Date(), compareFilter?.from || new Date()))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Filtro de estado */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filtra productos por estado de órdenes
                    </CardTitle>
                    <CardDescription>
                        Filtra productos por estado de órdenes
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={statusFilter === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setStatusFilter('all')}
                        >
                            Todas las órdenes
                        </Button>
                        <Button
                            variant={statusFilter === 'pending' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setStatusFilter('pending')}
                        >
                            Solo pendientes
                        </Button>
                        <Button
                            variant={statusFilter === 'confirmed' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setStatusFilter('confirmed')}
                        >
                            Solo confirmadas
                        </Button>
                    </div>
                    <div className={`mt-3 text-sm font-medium ${getFilterColor(statusFilter)}`}>
                        Mostrando: {stats.total} productos • {stats.totalQuantity.toLocaleString()} unidades • ${stats.totalRevenue.toLocaleString()}
                    </div>
                </CardContent>
            </Card>

            {/* Lista de productos */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Ventas por producto {isComparing ? `(${newerLabel})` : ''}
                    </CardTitle>
                    <CardDescription>
                        {dateFilter && `${formatDateRange(dateFilter.from, dateFilter.to)} • `}
                        Ranking de productos más vendidos ({getFilterLabel(statusFilter)}) • {currentProducts.length} resultados
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {currentProducts.slice(0, 20).map((product, index) => (
                            <div key={`${statusFilter}-${product.productId}-${product.optionName}-${product.quantity}`} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="text-xs">
                                        #{index + 1}
                                    </Badge>
                                    <div>
                                        <p className="font-medium text-sm">{product.productName} {product.optionName}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {product.orders} órdenes • ${product.avgPrice.toLocaleString()} promedio
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold text-sm ${getFilterColor(statusFilter)}`}>
                                        {product.quantity} unidades
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        ${product.revenue.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {currentProducts.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                <Package className="h-8 w-8 mx-auto mb-2" />
                                <p>No hay productos con el filtro seleccionado</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Lista de productos de comparación */}
            {isComparing && compareProducts.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Ventas por producto ({olderLabel})
                        </CardTitle>
                        <CardDescription>
                            {compareFilter && `${formatDateRange(compareFilter.from, compareFilter.to)} • `}
                            Ranking de productos más vendidos del período de comparación ({getFilterLabel(statusFilter)}) • {compareProducts.length} resultados
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {compareProducts.slice(0, 20).map((product, index) => (
                                <div key={`compare-${statusFilter}-${product.productId}-${product.optionName}-${product.quantity}`} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className="text-xs">
                                            #{index + 1}
                                        </Badge>
                                        <div>
                                            <p className="font-medium text-sm">{product.productName} {product.optionName}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {product.orders} órdenes • ${product.avgPrice.toLocaleString()} promedio
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm text-blue-600">
                                            {product.quantity} unidades
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            ${product.revenue.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Gráficos */}
            <ProductsChart
                currentProducts={currentProducts}
                compareProducts={compareProducts}
                isComparing={isComparing}
                statusFilter={statusFilter}
                dateFilter={dateFilter}
                compareFilter={compareFilter}
            />
        </div>
    );
} 