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
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold">Gestión de Vendedores</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                <b>Flujo:</b> Ves la lista de vendedores ➔ Asignas productos del inventario ➔
                                El vendedor puede crear pedidos con esos productos ➔ Puedes ver qué productos
                                tiene asignados cada vendedor.
                            </p>
                        </div>
                    </div>
                    <SellersWithData />
                </div>
            </main>
        </AdminOnly>
    );
} 