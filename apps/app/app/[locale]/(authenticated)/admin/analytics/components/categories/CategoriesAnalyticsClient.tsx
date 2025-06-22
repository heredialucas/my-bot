'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import { Tag, Filter } from 'lucide-react';

interface CategorySale {
    categoryName: string;
    quantity: number;
    revenue: number;
    orders: number;
    uniqueProducts: number;
    avgPrice: number;
    statusFilter: string;
}

interface CategoriesAnalyticsClientProps {
    allCategories: CategorySale[];
    pendingCategories: CategorySale[];
    confirmedCategories: CategorySale[];
}

export function CategoriesAnalyticsClient({ allCategories, pendingCategories, confirmedCategories }: CategoriesAnalyticsClientProps) {
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed'>('all');

    // Seleccionar los datos correctos basado en el filtro
    const getCurrentCategories = () => {
        let categories;
        switch (statusFilter) {
            case 'all': categories = allCategories; break;
            case 'pending': categories = pendingCategories; break;
            case 'confirmed': categories = confirmedCategories; break;
            default: categories = allCategories; break;
        }

        // Reordenar por cantidad (descendente)
        return [...categories].sort((a, b) => b.quantity - a.quantity);
    };

    const currentCategories = getCurrentCategories();

    // Obtener estadísticas del filtro actual
    const getFilterStats = () => {
        const total = currentCategories.length;
        const totalQuantity = currentCategories.reduce((sum, c) => sum + c.quantity, 0);
        const totalRevenue = currentCategories.reduce((sum, c) => sum + c.revenue, 0);
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

    const getCategoryIcon = (category: string) => {
        const upperCategory = category.toUpperCase();

        // Iconos para categorías específicas de perro
        if (upperCategory === 'PERRO POLLO') return '🐶🍗';
        if (upperCategory === 'PERRO VACA') return '🐶🥩';
        if (upperCategory === 'PERRO CERDO') return '🐶🥓';
        if (upperCategory === 'PERRO CORDERO') return '🐶🐑';
        if (upperCategory === 'PERRO OTROS') return '🐶';

        // Iconos para categorías específicas de gato
        if (upperCategory === 'GATO POLLO') return '🐱🍗';
        if (upperCategory === 'GATO VACA') return '🐱🥩';
        if (upperCategory === 'GATO CORDERO') return '🐱🐑';
        if (upperCategory === 'GATO OTROS') return '🐱';

        // Iconos para productos especiales
        if (upperCategory === 'HUESOS CARNOSOS') return '🦴';
        if (upperCategory === 'COMPLEMENTOS') return '🔧';
        if (upperCategory === 'BIG DOG') return '📦';
        if (upperCategory === 'OTROS') return '📋';

        // Icono por defecto
        return '📋';
    };

    return (
        <div className="space-y-4" key={`categories-filter-${statusFilter}`}>
            {/* Filtro de estado */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filtro por estado
                    </CardTitle>
                    <CardDescription>
                        Filtra categorías por estado de órdenes
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                        <Button
                            variant={statusFilter === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setStatusFilter('all')}
                            className="w-full sm:w-auto"
                        >
                            Todas las órdenes
                        </Button>
                        <Button
                            variant={statusFilter === 'pending' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setStatusFilter('pending')}
                            className="w-full sm:w-auto"
                        >
                            Solo pendientes
                        </Button>
                        <Button
                            variant={statusFilter === 'confirmed' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setStatusFilter('confirmed')}
                            className="w-full sm:w-auto"
                        >
                            Solo confirmadas
                        </Button>
                    </div>
                    <div className={`mt-3 text-xs sm:text-sm font-medium ${getFilterColor(statusFilter)} break-words`}>
                        Mostrando: {stats.total} categorías • {stats.totalQuantity.toLocaleString()} unidades • ${stats.totalRevenue.toLocaleString()}
                    </div>
                </CardContent>
            </Card>

            {/* Lista de categorías */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5" />
                        Ventas por categoría
                    </CardTitle>
                    <CardDescription>
                        Rendimiento por categorías ({getFilterLabel(statusFilter)}) • {currentCategories.length} resultados
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {currentCategories.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            <Tag className="h-8 w-8 mx-auto mb-2" />
                            <p>No hay categorías con el filtro seleccionado</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                            {currentCategories.map((category, index) => (
                                <div key={`${statusFilter}-${category.categoryName}`} className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="text-lg flex-shrink-0">{getCategoryIcon(category.categoryName)}</span>
                                            <h3 className="font-medium truncate">{category.categoryName}</h3>
                                        </div>
                                        <Badge variant="outline" className="text-xs flex-shrink-0">
                                            #{index + 1}
                                        </Badge>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs sm:text-sm text-muted-foreground">Productos únicos</span>
                                            <span className="font-medium text-sm">{category.uniqueProducts}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs sm:text-sm text-muted-foreground">Unidades vendidas</span>
                                            <span className={`font-medium text-sm ${getFilterColor(statusFilter)}`}>
                                                {category.quantity.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs sm:text-sm text-muted-foreground">Órdenes</span>
                                            <span className="font-medium text-sm">{category.orders.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs sm:text-sm text-muted-foreground">Ingresos totales</span>
                                            <span className={`font-bold text-sm ${getFilterColor(statusFilter)}`}>
                                                ${category.revenue.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs sm:text-sm text-muted-foreground">Precio promedio</span>
                                            <span className="text-xs sm:text-sm">${category.avgPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 