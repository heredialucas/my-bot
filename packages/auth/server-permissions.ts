import 'server-only';

import { getCurrentUser } from '@repo/data-services/src/services/authService';

/**
 * Sistema de permisos del lado del servidor
 */

// Tipos de permisos disponibles
export type Permission =
    // Users
    | 'users:view'
    | 'users:create'
    | 'users:edit'
    | 'users:delete'
    // Account
    | 'account:view_own'
    | 'account:edit_own'
    | 'account:change_password'
    | 'account:manage_users'
    // Admin
    | 'admin:full_access'
    | 'admin:system_settings'
    // Analytics
    | 'analytics:view_global'
    // Clients
    | 'clients:view'
    | 'clients:create'
    | 'clients:edit'
    | 'clients:delete'
    | 'clients:view_account_balance'
    | 'clients:manage_account_balance'
    // Orders
    | 'orders:view_own'
    | 'orders:view_all'
    | 'orders:create'
    | 'orders:edit'
    | 'orders:cancel'
    // Products
    | 'products:view'
    | 'products:create'
    | 'products:edit'
    | 'products:delete'
    // Sellers
    | 'sellers:view'
    // Payments
    | 'payments:view'
    | 'payments:manage';

// Permisos por defecto para admins (siempre tienen todos)
export const ADMIN_PERMISSIONS: Permission[] = [
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
    'analytics:view_global',
    'clients:view',
    'clients:create',
    'clients:edit',
    'clients:delete',
    'clients:view_account_balance',
    'clients:manage_account_balance',
    'orders:view_own',
    'orders:view_all',
    'orders:create',
    'orders:edit',
    'orders:cancel',
    'products:view',
    'products:create',
    'products:edit',
    'products:delete',
    'sellers:view',
    'payments:view',
    'payments:manage',
];

// Permisos por defecto para vendedores
export const SELLER_DEFAULT_PERMISSIONS: Permission[] = [
    'account:view_own',
    'account:edit_own',
    'account:change_password',
    'clients:view',
    'clients:create',
    'clients:edit',
    'clients:view_account_balance',
    'orders:view_own',
    'orders:create',
    'payments:view',
];

/**
 * Obtiene el usuario actual y sus permisos desde las cookies
 */
export async function getCurrentUserWithPermissions() {
    const user = await getCurrentUser();
    if (!user) {
        return null;
    }

    const isAdmin = user.role.toLowerCase() === 'admin';
    const isSeller = user.role.toLowerCase() === 'seller';

    // Si es admin, tiene todos los permisos siempre
    if (isAdmin) {
        return {
            ...user,
            permissions: ADMIN_PERMISSIONS,
            isAdmin: true,
            isSeller: false,
        };
    }

    // Si es vendedor, usar sus permisos personalizados
    if (isSeller) {
        return {
            ...user,
            permissions: user.permissions, // Usar permisos del usuario desde la BD
            isAdmin: false,
            isSeller: true,
        };
    }

    // Rol desconocido - sin permisos
    return {
        ...user,
        permissions: [],
        isAdmin: false,
        isSeller: false,
    };
}

/**
 * Verifica si el usuario actual tiene un permiso específico
 */
export async function hasPermission(permission: Permission): Promise<boolean> {
    const userWithPermissions = await getCurrentUserWithPermissions();
    if (!userWithPermissions) return false;

    return userWithPermissions.permissions.includes(permission);
}

/**
 * Verifica si el usuario actual tiene todos los permisos especificados
 */
export async function hasAllPermissions(permissions: Permission[]): Promise<boolean> {
    const userWithPermissions = await getCurrentUserWithPermissions();
    if (!userWithPermissions) return false;

    return permissions.every(permission => userWithPermissions.permissions.includes(permission));
}

/**
 * Verifica si el usuario actual tiene al menos uno de los permisos especificados
 */
export async function hasAnyPermission(permissions: Permission[]): Promise<boolean> {
    const userWithPermissions = await getCurrentUserWithPermissions();
    if (!userWithPermissions) return false;

    return permissions.some(permission => userWithPermissions.permissions.includes(permission));
}

/**
 * Verifica si el usuario actual es administrador
 */
export async function isAdmin(): Promise<boolean> {
    const userWithPermissions = await getCurrentUserWithPermissions();
    return userWithPermissions?.isAdmin || false;
}

/**
 * Middleware para verificar permisos - lanza error si no tiene permisos
 */
export async function requirePermission(permission: Permission): Promise<void> {
    const hasAccess = await hasPermission(permission);
    if (!hasAccess) {
        throw new Error(`Access denied: Missing permission ${permission}`);
    }
}

/**
 * Middleware para verificar si es admin - lanza error si no es admin
 */
export async function requireAdmin(): Promise<void> {
    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
        throw new Error('Access denied: Admin privileges required');
    }
}

/**
 * Configuración del sidebar basada en permisos
 */
export interface SidebarItem {
    label: string;
    mobileLabel: string;
    href: string;
    icon: string;
    requiredPermissions: Permission[];
    adminOnly?: boolean;
}

export const SIDEBAR_CONFIG: SidebarItem[] = [
    {
        label: 'account',
        mobileLabel: 'accountMobile',
        href: '/account',
        icon: 'User',
        requiredPermissions: ['account:view_own'],
    },
    {
        label: 'products',
        mobileLabel: 'productsMobile',
        href: '/products',
        icon: 'Package',
        requiredPermissions: ['products:view'],
        adminOnly: true,
    },
    {
        label: 'sellers',
        mobileLabel: 'sellersMobile',
        href: '/sellers',
        icon: 'Users',
        requiredPermissions: ['sellers:view'],
        adminOnly: true,
    },
    {
        label: 'clients',
        mobileLabel: 'clientsMobile',
        href: '/clients',
        icon: 'Users',
        requiredPermissions: ['clients:view'],
    },
    {
        label: 'orders',
        mobileLabel: 'ordersMobile',
        href: '/orders',
        icon: 'ShoppingCart',
        requiredPermissions: ['orders:view_own'],
    },
    {
        label: 'payments',
        mobileLabel: 'paymentsMobile',
        href: '/payments',
        icon: 'CreditCard',
        requiredPermissions: ['payments:view'],
    },
];

/**
 * Obtiene los elementos del sidebar autorizados para el usuario actual
 */
export async function getAuthorizedSidebarItems(): Promise<SidebarItem[]> {
    const userWithPermissions = await getCurrentUserWithPermissions();
    if (!userWithPermissions) return [];

    const authorizedItems = [];

    for (const item of SIDEBAR_CONFIG) {
        // Si es adminOnly y el usuario no es admin, no incluir
        if (item.adminOnly && !userWithPermissions.isAdmin) {
            continue;
        }

        // Verificar si tiene todos los permisos requeridos
        const hasRequiredPermissions = item.requiredPermissions.every(
            permission => userWithPermissions.permissions.includes(permission)
        );

        if (hasRequiredPermissions) {
            authorizedItems.push(item);
        }
    }

    return authorizedItems;
} 