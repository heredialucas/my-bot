import { getProductSales } from '@repo/data-services/src/services/barfer';
import { ProductsAnalyticsClient } from './ProductsAnalyticsClient';

interface ProductsAnalyticsTabProps {
    dateFilter: {
        from: Date;
        to: Date;
    };
    compareFilter?: {
        from: Date;
        to: Date;
    };
}

export async function ProductsAnalyticsTab({ dateFilter, compareFilter }: ProductsAnalyticsTabProps) {
    try {
        // Obtener datos para cada estado por separado - filtros de fecha aplicados
        const [allProducts, pendingProducts, confirmedProducts] = await Promise.all([
            getProductSales('all', 10, dateFilter.from, dateFilter.to),
            getProductSales('pending', 10, dateFilter.from, dateFilter.to),
            getProductSales('confirmed', 10, dateFilter.from, dateFilter.to)
        ]);

        // Datos del período de comparación (si está habilitado)
        let compareAllProducts, comparePendingProducts, compareConfirmedProducts;
        if (compareFilter) {
            [compareAllProducts, comparePendingProducts, compareConfirmedProducts] = await Promise.all([
                getProductSales('all', 10, compareFilter.from, compareFilter.to),
                getProductSales('pending', 10, compareFilter.from, compareFilter.to),
                getProductSales('confirmed', 10, compareFilter.from, compareFilter.to)
            ]);
        }

        return (
            <ProductsAnalyticsClient
                allProducts={allProducts}
                pendingProducts={pendingProducts}
                confirmedProducts={confirmedProducts}
                compareAllProducts={compareAllProducts}
                comparePendingProducts={comparePendingProducts}
                compareConfirmedProducts={compareConfirmedProducts}
                isComparing={!!compareFilter}
                dateFilter={dateFilter}
                compareFilter={compareFilter}
            />
        );
    } catch (error) {
        console.error('Error loading products analytics:', error);
        return (
            <div className="p-4 border rounded-lg">
                <p className="text-sm text-red-600">Error al cargar datos de productos</p>
            </div>
        );
    }
} 