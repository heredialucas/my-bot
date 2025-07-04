import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getOrderById } from '@repo/data-services';
import { notFound } from 'next/navigation';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Separator } from '@repo/design-system/components/ui/separator';

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    PENDING: 'secondary',
    PROCESSING: 'default',
    SHIPPED: 'outline',
    DELIVERED: 'default',
    CANCELLED: 'destructive',
};

export default async function OrderDetailPage({
    params,
}: {
    params: Promise<{ locale: Locale; orderId: string }>;
}) {
    const { locale, orderId } = await params;
    const dictionary = await getDictionary(locale);
    const order = await getOrderById(orderId);

    if (!order) {
        notFound();
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(amount);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Pedido #{order.id.slice(-8)}
                </h1>
                <Badge variant={statusVariantMap[order.status] || 'default'}>
                    {order.status}
                </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Información del Cliente */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información del Cliente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <span className="font-medium">Nombre:</span>{' '}
                            {order.client.firstName} {order.client.lastName}
                        </div>
                        {order.client.email && (
                            <div>
                                <span className="font-medium">Email:</span> {order.client.email}
                            </div>
                        )}
                        {order.client.phone && (
                            <div>
                                <span className="font-medium">Teléfono:</span> {order.client.phone}
                            </div>
                        )}
                        {order.client.address && (
                            <div>
                                <span className="font-medium">Dirección:</span> {order.client.address}
                            </div>
                        )}
                        <div>
                            <span className="font-medium">Saldo de cuenta:</span>{' '}
                            {formatCurrency(order.client.accountBalance)}
                        </div>
                    </CardContent>
                </Card>

                {/* Información del Pedido */}
                <Card>
                    <CardHeader>
                        <CardTitle>Detalles del Pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <span className="font-medium">Fecha:</span>{' '}
                            {formatDate(order.orderDate)}
                        </div>
                        <div>
                            <span className="font-medium">Estado:</span>{' '}
                            <Badge variant={statusVariantMap[order.status] || 'default'}>
                                {order.status}
                            </Badge>
                        </div>
                        <div>
                            <span className="font-medium">Total:</span>{' '}
                            <span className="text-lg font-bold">
                                {formatCurrency(order.totalAmount)}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Items del Pedido */}
            <Card>
                <CardHeader>
                    <CardTitle>Productos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {order.items.map((item, index) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-medium">{item.product.name}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            SKU: {item.product.sku}
                                        </p>
                                        {item.product.description && (
                                            <p className="text-sm text-muted-foreground">
                                                {item.product.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right space-y-1">
                                        <div className="text-sm">
                                            Cantidad: <span className="font-medium">{item.quantity}</span>
                                        </div>
                                        <div className="text-sm">
                                            Precio unitario: {formatCurrency(item.price)}
                                        </div>
                                        <div className="font-medium">
                                            Subtotal: {formatCurrency(item.price * item.quantity)}
                                        </div>
                                    </div>
                                </div>
                                {index < order.items.length - 1 && <Separator className="mt-4" />}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Pagos */}
            {order.payments && order.payments.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Historial de Pagos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {order.payments.map((payment, index) => (
                                <div key={payment.id}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-medium">
                                                {formatCurrency(payment.amount)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {payment.paymentMethod} • {formatDate(payment.paymentDate)}
                                            </div>
                                            {payment.receiptNumber && (
                                                <div className="text-sm text-muted-foreground">
                                                    Recibo: {payment.receiptNumber}
                                                </div>
                                            )}
                                            {payment.notes && (
                                                <div className="text-sm text-muted-foreground">
                                                    Notas: {payment.notes}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {index < order.payments.length - 1 && <Separator className="mt-4" />}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
} 