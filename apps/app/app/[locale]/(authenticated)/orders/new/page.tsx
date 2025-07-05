import { getDictionary, type Locale } from '@repo/internationalization';
import { getClientsBySeller, getInventoryBySeller } from '@repo/data-services';
import { NewOrderForm } from '../components/new-order-form';
import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { getAllSellers } from '@repo/data-services/src/services/userService';
import { redirect } from 'next/navigation';

export default async function NewOrderPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);
    const user = await getCurrentUser();

    if (!user) {
        redirect(`/${locale}/sign-in`);
    }

    // Fetch initial data based on role
    const sellers = user.role === 'admin' ? await getAllSellers() : [];
    const initialClients = user.role === 'seller' ? await getClientsBySeller() : [];
    const initialInventory = user.role === 'seller' ? await getInventoryBySeller() : [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    {dictionary.app.admin.orders.newOrder}
                </h1>
                <p className="text-muted-foreground">
                    {user.role === 'admin'
                        ? 'Selecciona un vendedor para crear un pedido en su nombre.'
                        : 'Crea un nuevo pedido seleccionando un cliente y agregando productos de tu inventario.'}
                </p>
            </div>
            <NewOrderForm
                user={user}
                sellers={sellers}
                initialClients={initialClients}
                initialInventory={initialInventory}
                dictionary={dictionary}
            />
        </div>
    );
} 