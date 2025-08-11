import { PrismaClient } from './generated/client';

// Permisos por defecto para admins (siempre tienen todos)
const ADMIN_PERMISSIONS = [
    'users:view',
    'users:create',
    'users:edit',
    'users:delete',
    'account:view_own',
    'account:edit_own',
    'account:change_password',
    'account:manage_users',
    'admin:full_access',
    'admin:system_settings',
];

// Permisos por defecto para usuarios
const USER_DEFAULT_PERMISSIONS = [
    'account:view_own',
    'account:edit_own',
    'account:change_password',
];

const prisma = new PrismaClient();

// Script para darle todos los permisos posibles al único usuario existente
async function giveAllPermissionsToSingleUser() {
    const user = await prisma.user.findFirst();
    if (!user) {
        console.log('No hay usuarios en la base de datos.');
        return;
    }
    await prisma.user.update({
        where: { id: user.id },
        data: { permissions: ADMIN_PERMISSIONS },
    });
    console.log(`Permisos actualizados para el usuario ${user.email}`);
}

giveAllPermissionsToSingleUser().finally(() => prisma.$disconnect());
