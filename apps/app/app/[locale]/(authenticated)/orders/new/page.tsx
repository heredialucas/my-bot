import { getDictionary, type Locale } from '@repo/internationalization';
import { getClientsBySeller, getInventoryBySeller } from '@repo/data-services';
import { NewOrderForm } from '../components/new-order-form';

export default async function NewOrderPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);
    const clients = await getClientsBySeller();
    const inventory = await getInventoryBySeller();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                {dictionary.app.admin.orders.newOrder}
            </h1>
            <NewOrderForm
                clients={clients}
                inventory={inventory}
                dictionary={dictionary}
            />
        </div>
    );
} 