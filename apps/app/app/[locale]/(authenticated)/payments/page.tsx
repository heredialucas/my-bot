import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { redirect } from 'next/navigation';
import PaymentsWithData from './components/PaymentsWithData.server';

export default async function PaymentsPage({
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

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    {dictionary.app.admin.navigation.payments}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {user.role === 'admin'
                        ? 'Gestiona todos los pagos del sistema y genera facturas.'
                        : 'Visualiza los pagos de tus ventas y genera facturas para tus clientes.'}
                </p>
            </div>

            <PaymentsWithData />
        </div>
    );
} 