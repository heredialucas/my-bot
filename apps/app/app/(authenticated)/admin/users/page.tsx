'use client';

import { SearchUsers } from '../../components/SearchUsers';
import { useClerk } from '@repo/auth/client';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/design-system/components/ui/avatar';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@repo/design-system/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@repo/design-system/components/ui/table';
import { UserCog } from 'lucide-react';
import { removeRole, setRole } from '../_actions';

interface User {
    id: string;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string;
    emailAddresses: Array<{
        id: string;
        emailAddress: string;
    }>;
    primaryEmailAddressId: string | null;
    publicMetadata: {
        role?: string;
    };
}

export default function UsersManagementPage() {
    const { user: currentUser } = useClerk();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/users${searchQuery ? `?search=${searchQuery}` : ''}`);
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.users);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [searchQuery]);

    // Imprimir el rol del usuario para depuración
    useEffect(() => {
        if (currentUser) {
            console.log('ROLES DEL USUARIO:', {
                publicMetadataRole: currentUser.publicMetadata?.role,
                orgRole: currentUser.organizationMemberships?.[0]?.role
            });
        }
    }, [currentUser]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Verificación manual de roles
    const isAdmin =
        currentUser?.publicMetadata?.role === 'admin' ||
        currentUser?.organizationMemberships?.some(m => m.role === 'org:admin');

    // Si no es admin, mostrar mensaje de error
    if (!isAdmin) {
        return (
            <div className="p-6">
                <p className="text-red-500 mb-4">No tienes permisos para acceder a esta página. Se requiere rol de administrador.</p>

                <div className="border rounded p-4 bg-gray-50 mt-4">
                    <h3 className="font-bold mb-2">Información de Depuración</h3>
                    <p className="mb-2">Roles detectados:</p>
                    <ul className="list-disc pl-5">
                        <li>Public Metadata Role: {String(currentUser?.publicMetadata?.role || "No definido")}</li>
                        <li>Organization Role: {currentUser?.organizationMemberships?.[0]?.role || "No definido"}</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="py-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Gestión de Usuarios</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Administra los roles y permisos de los usuarios
                    </p>
                </div>
                <UserCog className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>

            <SearchUsers onSearch={handleSearch} />

            <div className="my-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Usuarios</CardTitle>
                        <CardDescription>
                            {isLoading ? 'Cargando usuarios...' : `${users.length} usuarios encontrados`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Usuario</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Rol Actual</TableHead>
                                        <TableHead>Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => {
                                        const primaryEmail = user.emailAddresses.find(
                                            (email) => email.id === user.primaryEmailAddressId
                                        )?.emailAddress;

                                        const currentRole = user.publicMetadata?.role;

                                        return (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={user.imageUrl}
                                                                alt={`${user.firstName} ${user.lastName}`}
                                                            />
                                                            <AvatarFallback>
                                                                {user.firstName?.[0]}{user.lastName?.[0]}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium">
                                                                {user.firstName} {user.lastName}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                ID: {user.id.slice(0, 8)}...
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {primaryEmail}
                                                </TableCell>
                                                <TableCell>
                                                    {currentRole ? (
                                                        <Badge
                                                            variant={
                                                                currentRole === 'admin' ? 'default' :
                                                                    currentRole === 'accountant' ? 'outline' : 'secondary'
                                                            }
                                                        >
                                                            {currentRole}
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-gray-500 dark:text-gray-400">
                                                            Sin rol
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <form action={setRole}>
                                                            <input type="hidden" name="id" value={user.id} />
                                                            <input type="hidden" name="role" value="admin" />
                                                            <Button
                                                                type="submit"
                                                                size="sm"
                                                                variant={currentRole === 'admin' ? 'default' : 'outline'}
                                                                disabled={currentRole === 'admin'}
                                                            >
                                                                Admin
                                                            </Button>
                                                        </form>

                                                        <form action={setRole}>
                                                            <input type="hidden" name="id" value={user.id} />
                                                            <input type="hidden" name="role" value="accountant" />
                                                            <Button
                                                                type="submit"
                                                                size="sm"
                                                                variant={currentRole === 'accountant' ? 'default' : 'outline'}
                                                                disabled={currentRole === 'accountant'}
                                                            >
                                                                Contador
                                                            </Button>
                                                        </form>

                                                        <form action={setRole}>
                                                            <input type="hidden" name="id" value={user.id} />
                                                            <input type="hidden" name="role" value="user" />
                                                            <Button
                                                                type="submit"
                                                                size="sm"
                                                                variant={currentRole === 'user' ? 'default' : 'outline'}
                                                                disabled={currentRole === 'user'}
                                                            >
                                                                Cliente
                                                            </Button>
                                                        </form>

                                                        {currentRole && (
                                                            <form action={removeRole}>
                                                                <input type="hidden" name="id" value={user.id} />
                                                                <Button type="submit" size="sm" variant="destructive">
                                                                    Quitar Rol
                                                                </Button>
                                                            </form>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <p className="text-sm text-gray-500">
                            Los cambios de rol se aplican inmediatamente en el sistema.
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
} 