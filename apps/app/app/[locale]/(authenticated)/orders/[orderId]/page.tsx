import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getOrderById } from '@repo/data-services';
import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { notFound } from 'next/navigation';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Separator } from '@repo/design-system/components/ui/separator';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@repo/design-system/components/ui/button';
import { AddPaymentDialog } from '../components/AddPaymentDialog.client';
import { OrderStatusSelect } from '../components/OrderStatusSelect.client';

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    PENDING: 'secondary',
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
    const user = await getCurrentUser();
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
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Link href={`/${locale}/orders`}>
                        <Button variant="outline" size="icon">
                            <ArrowLeftIcon className="w-4 h-4" />
                        </Button>
                    </Link>
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
                            {user && (user.role === 'admin' || order.sellerId === user.id) ? (
                                <OrderStatusSelect
                                    orderId={order.id}
                                    currentStatus={order.status}
                                    hasPayments={order.payments && order.payments.length > 0}
                                />
                            ) : (
                                <Badge variant={statusVariantMap[order.status] || 'default'}>
                                    {order.status}
                                </Badge>
                            )}
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
                    <CardTitle>Productos ({order.items.length} productos, {order.items.reduce((sum, item) => sum + item.quantity, 0)} unidades)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {order.items.map((item, index) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-medium">{item.product.name}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Código: {item.product.sku}
                                        </p>
                                        {item.product.description && (
                                            <p className="text-sm text-muted-foreground">
                                                {item.product.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right space-y-1">
                                        <div className="text-sm">
                                            Cantidad: <span className="font-medium">{item.quantity} unidades</span>
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
                        <Separator />
                        <div className="flex justify-between items-center pt-2">
                            <span className="font-medium">Total de productos:</span>
                            <span className="font-bold">{order.items.reduce((sum, item) => sum + item.quantity, 0)} unidades</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Pagos */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Historial de Pagos</CardTitle>
                        <div className="flex gap-2">
                            {user && (user.role === 'admin' || order.sellerId === user.id) && (
                                <AddPaymentDialog
                                    orderId={order.id}
                                    orderTotal={order.totalAmount}
                                    currentPayments={order.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0}
                                />
                            )}
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/payments">
                                    Ver Todos los Pagos
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {order.payments && order.payments.length > 0 ? (
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
                            <Separator />
                            <div className="flex justify-between items-center pt-4">
                                <span className="font-medium">Total Pagado:</span>
                                <span className="text-lg font-bold text-green-600">
                                    {formatCurrency(order.payments.reduce((sum, payment) => sum + payment.amount, 0))}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Monto Pendiente:</span>
                                <span className="text-lg font-bold text-orange-600">
                                    {formatCurrency(order.totalAmount - order.payments.reduce((sum, payment) => sum + payment.amount, 0))}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No se han registrado pagos para este pedido.</p>
                            <p className="text-sm mt-2">
                                Monto pendiente: <span className="font-semibold">{formatCurrency(order.totalAmount)}</span>
                            </p>
                            <p className="text-xs mt-1">
                                💡 <strong>Tip:</strong> Cambia el estado a "Entregado" para generar automáticamente un pago.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 