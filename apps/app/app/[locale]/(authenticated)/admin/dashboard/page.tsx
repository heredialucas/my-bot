import { Suspense } from 'react';
import { getDashboardStats, getBarferProducts, getBarferRecentOrders } from '@repo/data-services';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';

async function DashboardContent() {
    try {
        const [dashboardStats, products, recentOrders] = await Promise.all([
            getDashboardStats(),
            getBarferProducts(),
            getBarferRecentOrders(5)
        ]);

        return (
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Dashboard de Barfer</h1>
                    <div className="text-sm text-muted-foreground">
                        Panel de administración
                    </div>
                </div>

                {/* Estadísticas principales */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
                            <span className="text-2xl">📦</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dashboardStats.totalProducts}</div>
                            <p className="text-xs text-muted-foreground">
                                Productos disponibles
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Órdenes</CardTitle>
                            <span className="text-2xl">📋</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dashboardStats.totalOrders.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                Órdenes procesadas
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                            <span className="text-2xl">👥</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dashboardStats.totalUsers.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                Usuarios registrados
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenue Total</CardTitle>
                            <span className="text-2xl">💰</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${dashboardStats.totalRevenue.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Ingresos completados
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Estadísticas de órdenes */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Estado de Órdenes</CardTitle>
                            <CardDescription>Órdenes por estado actual</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm">Pendientes</span>
                                    <span className="font-medium text-yellow-600">
                                        {dashboardStats.pendingOrders}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Completadas</span>
                                    <span className="font-medium text-green-600">
                                        {dashboardStats.completedOrders.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Total</span>
                                    <span className="font-medium">
                                        {dashboardStats.totalOrders.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Productos Populares</CardTitle>
                            <CardDescription>Top 5 productos más vendidos</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {dashboardStats.topProducts.map((product, index) => (
                                    <div key={String(product._id)} className="flex justify-between">
                                        <span className="text-sm truncate mr-2">
                                            {index + 1}. {product.name}
                                        </span>
                                        <span className="font-medium text-blue-600">
                                            {product.salesCount} ventas
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Órdenes recientes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Órdenes Recientes</CardTitle>
                        <CardDescription>Últimas 5 órdenes procesadas</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={String(order._id)} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                            Orden #{String(order._id).slice(-8)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {order.user.name} {order.user.lastName}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(order.createdAt).toLocaleDateString('es-ES')}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">
                                            ${order.total.toLocaleString()}
                                        </p>
                                        <p className={`text-xs px-2 py-1 rounded-full inline-block ${order.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : order.status === 'delivered'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Resumen de productos */}
                <Card>
                    <CardHeader>
                        <CardTitle>Catálogo de Productos</CardTitle>
                        <CardDescription>Vista general de productos disponibles</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {products.slice(0, 6).map((product) => (
                                <div key={String(product._id)} className="border rounded-lg p-4">
                                    <div className="aspect-square bg-gray-100 rounded-md mb-3 relative overflow-hidden">
                                        {product.images[0] && (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <h3 className="font-medium text-sm mb-2 line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mb-2">
                                        {product.category.name}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">
                                            {product.salesCount} ventas
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {product.options.length} opciones
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        return (
            <div className="p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Error al cargar datos</CardTitle>
                        <CardDescription>No se pudieron obtener los datos del dashboard</CardDescription>
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

function DashboardSkeleton() {
    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {[1, 2].map((i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                                <div className="space-y-2">
                                    {[1, 2, 3].map((j) => (
                                        <div key={j} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <DashboardContent />
        </Suspense>
    );
}