import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { getProductById } from '@repo/data-services/src/services/productService';
import { redirect, notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Separator } from '@repo/design-system/components/ui/separator';
import Link from 'next/link';
import { ArrowLeftIcon, Package, DollarSign, Warehouse } from 'lucide-react';
import { Button } from '@repo/design-system/components/ui/button';

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ locale: Locale; productId: string }>;
}) {
    const { locale, productId } = await params;
    const dictionary = await getDictionary(locale);
    const user = await getCurrentUser();

    if (user?.role !== 'admin') {
        redirect(`/${locale}/access-denied`);
    }

    const product = await getProductById(productId);

    if (!product) {
        notFound();
    }

    // Determinar estado del stock
    const getStockStatus = (stock: number) => {
        if (stock <= 0) return { label: 'Sin Stock', variant: 'destructive' as const };
        if (stock <= 10) return { label: 'Stock Bajo', variant: 'destructive' as const };
        if (stock <= 50) return { label: 'Stock Medio', variant: 'secondary' as const };
        return { label: 'Stock Bueno', variant: 'default' as const };
    };

    const stockStatus = getStockStatus(product.quantityInStock);

    return (
        <div className="container mx-auto py-8">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Link href={`/${locale}/products`}>
                            <Button variant="outline" size="icon">
                                <ArrowLeftIcon className="w-4 h-4" />
                            </Button>
                        </Link>
                        {product.name}
                    </h1>
                    <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Información General */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="w-5 h-5" />
                                Información General
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Código</p>
                                    <p className="text-lg font-mono">{product.sku}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Precio</p>
                                    <p className="text-lg font-semibold">
                                        {new Intl.NumberFormat('es-AR', {
                                            style: 'currency',
                                            currency: 'ARS',
                                        }).format(product.price)}
                                    </p>
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Descripción</p>
                                <p className="text-base mt-1">
                                    {product.description || 'Sin descripción disponible'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Información de Stock */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Warehouse className="w-5 h-5" />
                                Inventario
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <p className="text-sm font-medium text-muted-foreground">Stock Actual</p>
                                <p className="text-4xl font-bold">{product.quantityInStock}</p>
                                <p className="text-sm text-muted-foreground">unidades</p>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm">Estado:</span>
                                    <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Valor Total:</span>
                                    <span className="font-semibold">
                                        {new Intl.NumberFormat('es-AR', {
                                            style: 'currency',
                                            currency: 'ARS',
                                        }).format(product.price * product.quantityInStock)}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Información Adicional */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información Adicional</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Fecha de Creación</p>
                                <p className="text-base">
                                    {new Date(product.createdAt).toLocaleDateString('es-AR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
                                <p className="text-base">
                                    {new Date(product.updatedAt).toLocaleDateString('es-AR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Historial de Pedidos - Placeholder para futuras implementaciones */}
                <Card>
                    <CardHeader>
                        <CardTitle>Historial de Ventas</CardTitle>
                        <CardDescription>
                            Próximamente: Historial de pedidos que incluyen este producto
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Esta funcionalidad estará disponible en una futura actualización.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 