import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { getClientsBySeller, getAllClients, getAllSellers } from '@repo/data-services';
import { ClientList } from './components/ClientList.client';

export default async function ClientsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);
    const user = await getCurrentUser();

    if (!user) {
        return null;
    }

    const [clients, sellers] = await Promise.all([
        user.role === 'admin' ? getAllClients() : getClientsBySeller(),
        user.role === 'admin' ? getAllSellers() : Promise.resolve([]),
    ]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Gestión de Clientes
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    <b>Flujo:</b> Creas un cliente ➔ Le asignas un pedido.
                </p>
            </div>
            <ClientList clients={clients} dictionary={dictionary} user={user} sellers={sellers} />
        </div>
    );
} 