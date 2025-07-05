import { AdminOnly } from '@repo/auth/components/PermissionGate';
import { Locale } from '@repo/internationalization';
import SellersWithData from './components/SellersWithData.server';

type SellersPageProps = {
    params: Promise<{
        locale: Locale;
    }>;
};

// TODO: Crear un fallback para cuando el acceso es denegado.
const AccessDeniedFallback = () => <div>Acceso Denegado</div>;

export default async function SellersPage({ params }: SellersPageProps) {
    const { locale } = await params;

    return (
        <AdminOnly fallback={<AccessDeniedFallback />}>
            <main className="p-4 md:p-6">
                <h1 className="text-2xl font-bold">Vendedores</h1>
                <SellersWithData />
            </main>
        </AdminOnly>
    );
} 