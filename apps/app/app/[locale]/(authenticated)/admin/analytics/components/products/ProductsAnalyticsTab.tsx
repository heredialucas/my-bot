import { getProductSales } from '@repo/data-services/src/services/barfer';
import { ProductsAnalyticsClient } from './ProductsAnalyticsClient';

export async function ProductsAnalyticsTab() {
    try {
        // Obtener datos para cada estado por separado
        const [allProducts, pendingProducts, confirmedProducts] = await Promise.all([
            getProductSales('all'),
            getProductSales('pending'),
            getProductSales('confirmed')
        ]);

        return (
            <ProductsAnalyticsClient
                allProducts={allProducts}
                pendingProducts={pendingProducts}
                confirmedProducts={confirmedProducts}
            />
        );
    } catch (error) {
        console.error('Error loading product sales:', error);
        return (
            <div className="p-4 border rounded-lg">
                <p className="text-sm text-red-600">Error al cargar datos de productos</p>
            </div>
        );
    }
} 