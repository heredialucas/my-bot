import type { UserData } from '@repo/data-services/src/types/user';

export const getAccountPermissions = (user: UserData | any | null | undefined) => {
    if (!user) {
        return {
            canEditProfile: false,
            canChangePassword: false,
        };
    }
    const isAdmin = user.role === 'admin';
    const permissions = user.permissions || [];

    return {
        canEditProfile: isAdmin || permissions.includes('account:edit_own'),
        canChangePassword: isAdmin || permissions.includes('account:change_password'),
    };
}; 