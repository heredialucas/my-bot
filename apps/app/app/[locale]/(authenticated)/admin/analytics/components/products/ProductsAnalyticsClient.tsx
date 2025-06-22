'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import { Package, Filter } from 'lucide-react';

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
}

export function ProductsAnalyticsClient({ allProducts, pendingProducts, confirmedProducts }: ProductsAnalyticsClientProps) {
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

    const currentProducts = getCurrentProducts();

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
            {/* Filtro de estado */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filtro por estado
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
                        Ventas por producto
                    </CardTitle>
                    <CardDescription>
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
        </div>
    );
} 