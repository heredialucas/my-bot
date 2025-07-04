import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getOrdersBySeller } from '@repo/data-services';
import { OrderList } from './components/order-list';

export default async function OrdersPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);
    const orders = await getOrdersBySeller();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                {dictionary.app.admin.orders.title}
            </h1>
            <OrderList orders={orders} dictionary={dictionary} locale={locale} />
        </div>
    );
} 