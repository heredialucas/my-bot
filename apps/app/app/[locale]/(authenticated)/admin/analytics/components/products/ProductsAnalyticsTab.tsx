import { getProductSales, getProductTimeline } from '@repo/data-services/src/services/barfer';
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
        const [
            allProducts,
            pendingProducts,
            confirmedProducts,
            timelineData
        ] = await Promise.all([
            getProductSales('all', 20, dateFilter.from, dateFilter.to),
            getProductSales('pending', 20, dateFilter.from, dateFilter.to),
            getProductSales('confirmed', 20, dateFilter.from, dateFilter.to),
            getProductTimeline(dateFilter.from, dateFilter.to)
        ]);

        let compareAllProducts, comparePendingProducts, compareConfirmedProducts, compareTimelineData;
        if (compareFilter) {
            [
                compareAllProducts,
                comparePendingProducts,
                compareConfirmedProducts,
                compareTimelineData
            ] = await Promise.all([
                getProductSales('all', 20, compareFilter.from, compareFilter.to),
                getProductSales('pending', 20, compareFilter.from, compareFilter.to),
                getProductSales('confirmed', 20, compareFilter.from, compareFilter.to),
                compareFilter ? getProductTimeline(compareFilter.from, compareFilter.to) : Promise.resolve(undefined)
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
                timelineData={timelineData}
                compareTimelineData={compareTimelineData}
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