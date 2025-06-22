'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/design-system/components/ui/tabs';
import { User } from 'lucide-react';
import type { UserData } from '@repo/data-services/src/types/user';
import type { Dictionary } from '@repo/internationalization';
import { ProfileSection } from './ProfileSection';
import { PasswordSection } from './PasswordSection';
import { UsersSection } from './UsersSection';

interface AccountClientProps {
    currentUser: any;
    users: UserData[];
    dictionary: Dictionary;
    locale: string;
    canManageUsers: boolean;
}

export function AccountClient({ currentUser, users, dictionary, locale, canManageUsers }: AccountClientProps) {

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">
                    Gestión de Cuenta
                </h1>
                <div className="text-sm text-muted-foreground">
                    Configuración y usuarios
                </div>
            </div>

            <Tabs defaultValue="profile" className="space-y-4">
                <div className="overflow-x-auto">
                    <TabsList className={`grid w-full ${canManageUsers ? 'grid-cols-2' : 'grid-cols-1'} min-w-[300px] md:min-w-0`}>
                        <TabsTrigger value="profile" className="text-sm">
                            Mi Perfil
                        </TabsTrigger>
                        {canManageUsers && (
                            <TabsTrigger value="users" className="text-sm">
                                Gestión de Usuarios
                            </TabsTrigger>
                        )}
                    </TabsList>
                </div>

                <TabsContent value="profile" className="space-y-4">
                    <ProfileSection currentUser={currentUser} dictionary={dictionary} />
                    <PasswordSection currentUser={currentUser} dictionary={dictionary} />
                </TabsContent>

                {canManageUsers && (
                    <TabsContent value="users" className="space-y-4">
                        <UsersSection
                            users={users}
                            currentUser={currentUser}
                            dictionary={dictionary}
                        />
                    </TabsContent>
                )}
            </Tabs>
        </div>
    );
} 