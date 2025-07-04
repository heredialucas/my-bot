import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { getInventoryBySeller } from '@repo/data-services';
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

    const inventory = await getInventoryBySeller();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                {dictionary.app.admin.inventory.title}
            </h1>
            <InventoryList inventory={inventory} dictionary={dictionary} />
        </div>
    );
} 