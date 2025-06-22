import { getCategorySales } from '@repo/data-services/src/services/barfer';
import { CategoriesAnalyticsClient } from './CategoriesAnalyticsClient';

export async function CategoriesAnalyticsTab() {
    try {
        // Obtener datos para cada estado por separado
        const [allCategories, pendingCategories, confirmedCategories] = await Promise.all([
            getCategorySales('all'),
            getCategorySales('pending'),
            getCategorySales('confirmed')
        ]);

        return (
            <CategoriesAnalyticsClient
                allCategories={allCategories}
                pendingCategories={pendingCategories}
                confirmedCategories={confirmedCategories}
            />
        );
    } catch (error) {
        console.error('Error loading category sales:', error);
        return (
            <div className="p-4 border rounded-lg">
                <p className="text-sm text-red-600">Error al cargar datos de categorías</p>
            </div>
        );
    }
} 