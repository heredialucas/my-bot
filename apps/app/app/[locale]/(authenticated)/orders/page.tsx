import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getAllOrders, getOrdersBySeller } from '@repo/data-services';
import { OrderList } from './components/order-list';
import { getCurrentUser } from '@repo/data-services/src/services/authService';

export default async function OrdersPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);
    const user = await getCurrentUser();

    const orders = user?.role === 'admin' ? await getAllOrders() : await getOrdersBySeller();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Historial de Pedidos
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    <b>Flujo:</b> Tienes stock ➔ Creas un pedido ➔ El stock se descuenta.
                </p>
            </div>
            <OrderList orders={orders} dictionary={dictionary} locale={locale} />
        </div>
    );
} 