import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { getClientsBySeller, getAllClients } from '@repo/data-services';
import { ClientList } from './components/client-list';

export default async function ClientsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);
    const user = await getCurrentUser();

    const clients = user?.role === 'admin' ? await getAllClients() : await getClientsBySeller();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                {dictionary.app.admin.navigation.clients}
            </h1>
            <ClientList clients={clients} dictionary={dictionary} />
        </div>
    );
} 