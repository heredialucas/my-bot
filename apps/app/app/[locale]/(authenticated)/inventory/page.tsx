import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { getInventoryBySeller, getAllProducts } from '@repo/data-services';
import { redirect } from 'next/navigation';
import { InventoryList } from './components/inventory-list';

export default async function InventoryPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);
    const user = await getCurrentUser();

    if (user?.role !== 'seller' && user?.role !== 'admin') {
        redirect(`/${locale}/access-denied`);
    }

    const [inventory, availableProducts] = await Promise.all([
        getInventoryBySeller(),
        getAllProducts(),
    ]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    {dictionary.app.admin.inventory.title}
                </h1>
                <p className="text-muted-foreground">
                    {dictionary.app.admin.inventory.description}
                </p>
            </div>
            <InventoryList
                inventory={inventory}
                availableProducts={availableProducts}
                dictionary={dictionary}
            />
        </div>
    );
} 