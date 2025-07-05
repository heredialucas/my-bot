import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { getProductById } from '@repo/data-services';
import { getAllSellers } from '@repo/data-services/src/services/userService';
import { getInventoryForProduct } from '@repo/data-services/src/services/productService';
import { redirect } from 'next/navigation';
import { SellerStockForm } from './components/seller-stock-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Separator } from '@repo/design-system/components/ui/separator';
import Link from 'next/link';
import { ArrowLeftIcon, Package, Warehouse, Users } from 'lucide-react';
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
    const sellers = await getAllSellers();
    const inventoryBySeller = await getInventoryForProduct(productId);

    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(price);

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
                    <Badge variant="outline">{formatPrice(product.price)}</Badge>
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
                                        {formatPrice(product.price)}
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
                                    <span className="text-sm">Valor Total:</span>
                                    <span className="font-semibold">
                                        {formatPrice(product.price * product.quantityInStock)}
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

                {/* Seller Stock Management */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Asignar Stock a Vendedores
                        </CardTitle>
                        <CardDescription>
                            Define la cantidad de este producto que cada vendedor tendrá en su inventario personal.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <SellerStockForm
                            productId={productId}
                            sellers={sellers}
                            inventoryBySeller={inventoryBySeller}
                            dictionary={dictionary}
                        />
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