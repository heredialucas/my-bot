import { getDictionary } from '@repo/internationalization';
import { getClientCategorization } from '@repo/data-services';
import { ClientsManagement } from './components/ClientsManagement';

interface ClientsPageProps {
    params: Promise<{
        locale: string;
    }>;
}

export default async function ClientsPage({ params }: ClientsPageProps) {
    const { locale } = await params;
    const [dictionary, analytics] = await Promise.all([
        getDictionary(locale),
        getClientCategorization()
    ]);

    return (
        <ClientsManagement
            analytics={analytics}
            dictionary={dictionary}
        />
    );
} 