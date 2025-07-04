import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getClientById } from '@repo/data-services';
import { notFound } from 'next/navigation';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@repo/design-system/components/ui/card';

interface ClientDetailPageProps {
    params: Promise<{
        locale: Locale;
        clientId: string;
    }>;
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
    const { locale, clientId } = await params;
    const dictionary = await getDictionary(locale);

    const client = await getClientById(clientId);

    if (!client) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                {`${client.firstName} ${client.lastName}`}
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>{dictionary.app.admin.clients.detail.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>{dictionary.app.admin.clients.form.email}:</strong> {client.email}</p>
                    <p><strong>{dictionary.app.admin.clients.form.phone}:</strong> {client.phone}</p>
                    <p><strong>{dictionary.app.admin.clients.form.address}:</strong> {client.address}</p>
                    <p><strong>{'Saldo de cuenta'}:</strong> {client.accountBalance.toString()}</p>
                </CardContent>
            </Card>
        </div>
    );
} 