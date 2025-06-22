import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { getAllUsers } from '@repo/data-services/src/services/userService';
import { getDictionary } from '@repo/internationalization';
import { AccountClient } from './components/AccountClient';
import { hasPermission, requirePermission } from '@repo/auth/server-permissions';

interface AccountPageProps {
    params: Promise<{ locale: string }>;
}

export default async function AccountPage({ params }: AccountPageProps) {
    // Verificar permisos básicos
    await requirePermission('account:view_own');
    const { locale } = await params;

    // Obtener datos en el servidor
    const [currentUser, dictionary] = await Promise.all([
        getCurrentUser(),
        getDictionary(locale)
    ]);

    if (!currentUser) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-muted-foreground">Usuario no encontrado</p>
                </div>
            </div>
        );
    }

    // Verificar si puede gestionar usuarios para obtener la lista
    const canManageUsers = await hasPermission('account:manage_users');
    const users = canManageUsers ? await getAllUsers(currentUser.id) : []; // Excluir al usuario actual

    return (
        <AccountClient
            currentUser={currentUser}
            users={users}
            dictionary={dictionary}
            locale={locale}
            canManageUsers={canManageUsers}
        />
    );
} 