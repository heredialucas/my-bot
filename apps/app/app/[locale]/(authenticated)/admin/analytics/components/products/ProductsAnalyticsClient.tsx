'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import { Filter, Package } from 'lucide-react';
import { ProductTimelineChart } from '../charts/ProductTimelineChart';

// Duplicating interfaces to avoid import issues in this context
interface ProductSale {
    productId: string;
    productName: string;
    optionName: string;
    quantity: number;
    revenue: number;
    orders: number;
}

interface ProductTimelinePoint {
    period: string;
    totalQuantity: number;
    totalRevenue: number;
    confirmedQuantity: number;
    confirmedRevenue: number;
}

interface ProductsAnalyticsClientProps {
    allProducts: ProductSale[];
    pendingProducts: ProductSale[];
    confirmedProducts: ProductSale[];
    compareAllProducts?: ProductSale[];
    comparePendingProducts?: ProductSale[];
    compareConfirmedProducts?: ProductSale[];
    timelineData: ProductTimelinePoint[];
    compareTimelineData?: ProductTimelinePoint[];
    isComparing?: boolean;
    dateFilter?: { from: Date; to: Date };
    compareFilter?: { from: Date; to: Date };
}

const currencyFormatter = (value: number) => `$${value.toLocaleString('es-AR')}`;

export function ProductsAnalyticsClient({
    allProducts,
    pendingProducts,
    confirmedProducts,
    compareAllProducts,
    comparePendingProducts,
    compareConfirmedProducts,
    timelineData,
    compareTimelineData,
    isComparing = false,
}: ProductsAnalyticsClientProps) {
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed'>('all');

    const productsMap = { all: allProducts, pending: pendingProducts, confirmed: confirmedProducts };
    const compareProductsMap = { all: compareAllProducts, pending: comparePendingProducts, confirmed: compareConfirmedProducts };

    const currentProducts = productsMap[statusFilter] || [];
    const compareProducts = compareProductsMap[statusFilter] || [];

    return (
        <div className="space-y-8">
            {/* Gráficos de Línea de Tiempo */}
            <div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Evolución General (Período Actual)</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader><CardTitle>Unidades Vendidas</CardTitle></CardHeader>
                        <CardContent><ProductTimelineChart data={timelineData} yKey1="totalQuantity" name1="Total" yKey2="confirmedQuantity" name2="Confirmadas" /></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Ingresos</CardTitle></CardHeader>
                        <CardContent><ProductTimelineChart data={timelineData} yKey1="totalRevenue" name1="Total" yKey2="confirmedRevenue" name2="Confirmados" yAxisFormatter={currencyFormatter} /></CardContent>
                    </Card>
                </div>
            </div>

            {isComparing && compareTimelineData && (
                <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4">Evolución General (Período de Comparación)</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader><CardTitle>Unidades Vendidas</CardTitle></CardHeader>
                            <CardContent><ProductTimelineChart data={compareTimelineData} yKey1="totalQuantity" name1="Total" yKey2="confirmedQuantity" name2="Confirmadas" /></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Ingresos</CardTitle></CardHeader>
                            <CardContent><ProductTimelineChart data={compareTimelineData} yKey1="totalRevenue" name1="Total" yKey2="confirmedRevenue" name2="Confirmados" yAxisFormatter={currencyFormatter} /></CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* Filtros y Listas de Productos */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5" /> Filtro de Productos</CardTitle>
                    <CardDescription>Filtra los rankings de productos por estado de la orden.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Button variant={statusFilter === 'all' ? 'default' : 'outline'} onClick={() => setStatusFilter('all')}>Todas</Button>
                        <Button variant={statusFilter === 'pending' ? 'default' : 'outline'} onClick={() => setStatusFilter('pending')}>Pendientes</Button>
                        <Button variant={statusFilter === 'confirmed' ? 'default' : 'outline'} onClick={() => setStatusFilter('confirmed')}>Confirmadas</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Package className="h-5 w-5" /> Ranking (Período Actual)</CardTitle></CardHeader>
                    <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
                        {currentProducts.map((p, i) => (
                            <div key={`${p.productId}-${p.optionName}`} className="flex items-center justify-between p-2 border rounded-md"><div className="flex items-center gap-3"><Badge variant="outline">#{i + 1}</Badge><div><p className="font-medium text-sm">{p.productName} ({p.optionName})</p><p className="text-xs text-muted-foreground">{p.orders} órdenes</p></div></div><div className="text-right"><p className="font-bold text-sm">{p.quantity} un.</p><p className="text-xs text-muted-foreground">{currencyFormatter(p.revenue)}</p></div></div>
                        ))}
                        {currentProducts.length === 0 && <p className="text-center text-muted-foreground py-4">No hay productos.</p>}
                    </CardContent>
                </Card>
                {isComparing && (
                    <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2"><Package className="h-5 w-5" /> Ranking (Comparación)</CardTitle></CardHeader>
                        <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
                            {compareProducts.map((p, i) => (
                                <div key={`comp-${p.productId}-${p.optionName}`} className="flex items-center justify-between p-2 border rounded-md"><div className="flex items-center gap-3"><Badge variant="outline">#{i + 1}</Badge><div><p className="font-medium text-sm">{p.productName} ({p.optionName})</p><p className="text-xs text-muted-foreground">{p.orders} órdenes</p></div></div><div className="text-right"><p className="font-bold text-sm">{p.quantity} un.</p><p className="text-xs text-muted-foreground">{currencyFormatter(p.revenue)}</p></div></div>
                            ))}
                            {compareProducts.length === 0 && <p className="text-center text-muted-foreground py-4">No hay productos.</p>}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
} 