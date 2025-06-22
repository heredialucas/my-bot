import { DailyAnalyticsTab } from './components/daily/DailyAnalyticsTab';
import { MonthlyAnalyticsTab } from './components/monthly/MonthlyAnalyticsTab';
import { ProductsAnalyticsTab } from './components/products/ProductsAnalyticsTab';
import { CategoriesAnalyticsTab } from './components/categories/CategoriesAnalyticsTab';
import { PaymentsAnalyticsTab } from './components/payments/PaymentsAnalyticsTab';
import { FrequencyAnalyticsTab } from './components/frequency/FrequencyAnalyticsTab';
import { AnalyticsTabsWrapper } from './components/AnalyticsTabsWrapper';

export default function AnalyticsPage() {
    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">Estadísticas y KPIs</h1>
                <div className="text-sm text-muted-foreground">
                    Análisis detallado del negocio
                </div>
            </div>

            <AnalyticsTabsWrapper
                dailyTab={<DailyAnalyticsTab />}
                monthlyTab={<MonthlyAnalyticsTab />}
                productsTab={<ProductsAnalyticsTab />}
                categoriesTab={<CategoriesAnalyticsTab />}
                paymentsTab={<PaymentsAnalyticsTab />}
                frequencyTab={<FrequencyAnalyticsTab />}
            />
        </div>
    );
} 