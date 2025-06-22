import { Suspense } from 'react';
import {
    getOrdersByDay,
    getRevenueByDay,
    getAverageOrderValue,
    getCustomerFrequency,
    getOrdersByMonth,
    getProductSales,
    getCategorySales,
    getPaymentMethodStats
} from '@repo/data-services';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/design-system/components/ui/tabs';
import { Badge } from '@repo/design-system/components/ui/badge';
import {
    BarChart3,
    TrendingUp,
    Users,
    ShoppingCart,
    DollarSign,
    Calendar,
    Package,
    Tag,
    CreditCard,
    RefreshCw
} from 'lucide-react';

async function AnalyticsContent() {
    try {
        const [
            dailyOrders,
            dailyRevenue,
            averageOrderValue,
            customerFrequency,
            monthlyStats,
            productSales,
            categorySales,
            paymentStats
        ] = await Promise.all([
            getOrdersByDay(),
            getRevenueByDay(),
            getAverageOrderValue(),
            getCustomerFrequency(),
            getOrdersByMonth(),
            getProductSales(),
            getCategorySales(),
            getPaymentMethodStats()
        ]);

        // Calcular porcentajes para métodos de pago
        const totalPayments = paymentStats.reduce((sum, method) => sum + method.count, 0);
        const paymentStatsWithPercentage = paymentStats.map(method => ({
            ...method,
            percentage: totalPayments > 0 ? (method.count / totalPayments * 100).toFixed(1) : '0'
        }));

        // Obtener datos de los últimos 30 días
        const last30Days = dailyOrders.slice(-30);
        const last30DaysRevenue = dailyRevenue.slice(-30);

        return (
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold">Estadísticas y KPIs</h1>
                    <div className="text-sm text-muted-foreground">
                        Análisis detallado del negocio
                    </div>
                </div>

                {/* Métricas principales */}
                <div className="overflow-x-auto">
                    <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 min-w-full">
                        <Card className="min-w-[250px] md:min-w-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    ${averageOrderValue.averageValue.toFixed(2)}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Basado en {averageOrderValue.totalOrders} pedidos
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="min-w-[250px] md:min-w-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Clientes Únicos</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {customerFrequency.totalCustomers.toLocaleString()}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {customerFrequency.averageOrdersPerCustomer.toFixed(1)} pedidos por cliente
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="min-w-[250px] md:min-w-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Gasto Promedio/Cliente</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    ${customerFrequency.averageSpentPerCustomer.toFixed(2)}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Promedio por cliente
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="min-w-[250px] md:min-w-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Productos Vendidos</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {productSales.reduce((sum, product) => sum + product.totalSold, 0).toLocaleString()}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Total de unidades vendidas
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Tabs defaultValue="daily" className="space-y-4">
                    <div className="overflow-x-auto">
                        <TabsList className="grid grid-cols-6 w-full min-w-[480px] md:min-w-0">
                            <TabsTrigger value="daily" className="text-xs md:text-sm">Por Día</TabsTrigger>
                            <TabsTrigger value="monthly" className="text-xs md:text-sm">Por Mes</TabsTrigger>
                            <TabsTrigger value="products" className="text-xs md:text-sm">Productos</TabsTrigger>
                            <TabsTrigger value="categories" className="text-xs md:text-sm">Categorías</TabsTrigger>
                            <TabsTrigger value="payments" className="text-xs md:text-sm">Pagos</TabsTrigger>
                            <TabsTrigger value="frequency" className="text-xs md:text-sm">Frecuencia</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="daily" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ShoppingCart className="h-5 w-5" />
                                        Pedidos por Día (Últimos 30 días)
                                    </CardTitle>
                                    <CardDescription>
                                        Evolución diaria de pedidos
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {last30Days.length > 0 ? (
                                            last30Days.map((day, index) => (
                                                <div key={day.date} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                                                    <span className="text-sm">{day.date}</span>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="secondary">
                                                            {day.orders} pedidos
                                                        </Badge>
                                                        <span className="text-sm text-muted-foreground">
                                                            ${day.revenue.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-muted-foreground">
                                                <p>No hay datos disponibles</p>
                                                <p className="text-xs mt-1">Verifica la conexión a la base de datos</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <DollarSign className="h-5 w-5" />
                                        Ingresos por Día (Últimos 30 días)
                                    </CardTitle>
                                    <CardDescription>
                                        Evolución diaria de ingresos
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {last30DaysRevenue.map((day, index) => (
                                            <div key={day.date} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                                                <span className="text-sm">{day.date}</span>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="default">
                                                        ${day.revenue.toLocaleString()}
                                                    </Badge>
                                                    <span className="text-sm text-muted-foreground">
                                                        {day.orders} pedidos
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="monthly" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Estadísticas Mensuales
                                </CardTitle>
                                <CardDescription>
                                    Pedidos totales y clientes únicos por mes
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {monthlyStats.map((month) => (
                                        <div key={month.month} className="p-4 border rounded-lg">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div>
                                                    <p className="text-sm font-medium">Mes</p>
                                                    <p className="text-lg">{month.month}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Total Pedidos</p>
                                                    <p className="text-xl font-bold text-blue-600">
                                                        {month.totalOrders.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Clientes Únicos</p>
                                                    <p className="text-xl font-bold text-green-600">
                                                        {month.uniqueCustomers.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Ingresos</p>
                                                    <p className="text-xl font-bold text-purple-600">
                                                        ${month.revenue.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="products" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Ventas por Producto
                                </CardTitle>
                                <CardDescription>
                                    Ranking de productos más vendidos
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {productSales.slice(0, 20).map((product, index) => (
                                        <div key={product.productId} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline" className="text-xs">
                                                    #{index + 1}
                                                </Badge>
                                                <div>
                                                    <p className="font-medium text-sm">{product.productName}</p>
                                                    <p className="text-xs text-muted-foreground">ID: {String(product.productId).slice(-8)}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-sm">{product.totalSold} unidades</p>
                                                <p className="text-xs text-muted-foreground">
                                                    ${product.totalRevenue.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="categories" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Tag className="h-5 w-5" />
                                    Ventas por Categoría
                                </CardTitle>
                                <CardDescription>
                                    Rendimiento por categorías (Perro, Gato, Complementos, Huesos carnosos)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                                    {categorySales.map((category) => (
                                        <div key={category.category} className="p-4 border rounded-lg">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                                                <h3 className="font-medium capitalize">{category.category}</h3>
                                                <Badge variant="secondary" className="self-start sm:self-center">
                                                    {category.uniqueProducts} productos
                                                </Badge>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Unidades vendidas</span>
                                                    <span className="font-medium">{category.totalSold.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Ingresos totales</span>
                                                    <span className="font-bold text-green-600">
                                                        ${category.totalRevenue.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="payments" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Métodos de Pago
                                </CardTitle>
                                <CardDescription>
                                    Distribución entre Mercado Pago y Efectivo
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                                    {paymentStatsWithPercentage.map((method) => (
                                        <div key={method.paymentMethod} className="p-4 border rounded-lg">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                                                <h3 className="font-medium capitalize">
                                                    {method.paymentMethod === 'mercadopago' ? 'Mercado Pago' : method.paymentMethod}
                                                </h3>
                                                <Badge variant="default" className="self-start sm:self-center">
                                                    {method.percentage}%
                                                </Badge>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Transacciones</span>
                                                    <span className="font-medium">{method.count.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Monto total</span>
                                                    <span className="font-bold text-blue-600">
                                                        ${method.totalAmount.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="frequency" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <RefreshCw className="h-5 w-5" />
                                    Frecuencia de Compra
                                </CardTitle>
                                <CardDescription>
                                    Análisis de comportamiento de clientes
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                                    <div className="p-4 border rounded-lg text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-2">
                                            {customerFrequency.averageOrdersPerCustomer.toFixed(1)}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Pedidos promedio por cliente
                                        </p>
                                    </div>
                                    <div className="p-4 border rounded-lg text-center">
                                        <div className="text-2xl font-bold text-green-600 mb-2">
                                            ${customerFrequency.averageSpentPerCustomer.toFixed(0)}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Gasto promedio por cliente
                                        </p>
                                    </div>
                                    <div className="p-4 border rounded-lg text-center">
                                        <div className="text-2xl font-bold text-purple-600 mb-2">
                                            {customerFrequency.totalCustomers.toLocaleString()}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Total de clientes únicos
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        );
    } catch (error) {
        console.error('Error loading analytics data:', error);
        return (
            <div className="p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Error al cargar estadísticas</CardTitle>
                        <CardDescription>No se pudieron obtener los datos de analytics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Por favor, verifica la conexión a la base de datos.
                        </p>
                        <pre className="mt-2 text-xs bg-red-50 p-2 rounded border">
                            {error instanceof Error ? error.message : 'Error desconocido'}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

function AnalyticsSkeleton() {
    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="overflow-x-auto">
                <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 min-w-full">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="min-w-[250px] md:min-w-0">
                            <CardContent className="p-6">
                                <div className="space-y-2">
                                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="overflow-x-auto">
                    <div className="h-10 w-full min-w-[480px] md:min-w-0 bg-gray-200 rounded animate-pulse" />
                </div>
                <Card>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-16 w-full bg-gray-200 rounded animate-pulse" />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function AnalyticsPage() {
    return (
        <Suspense fallback={<AnalyticsSkeleton />}>
            <AnalyticsContent />
        </Suspense>
    );
} 