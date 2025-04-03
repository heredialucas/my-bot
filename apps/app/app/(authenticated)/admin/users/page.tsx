'use client';

import { Avatar, AvatarFallback } from '@repo/design-system/components/ui/avatar';
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
import { getAllUsers } from '@repo/data-services';
import { UserData } from '@repo/data-services';
import { useEffect } from 'react';
import { useState } from 'react';

export default function UsersManagementPage() {

    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getAllUsers();
                setUsers(users);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

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
                                        const primaryEmail = user.email;

                                        const currentRole = user.role;

                                        return (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarFallback>
                                                                {user.name?.[0]}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium">
                                                                {user.name}
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
                                                                currentRole === 'ADMIN' ? 'default' :
                                                                    currentRole === 'USER' ? 'outline' : 'secondary'
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
                                                        <form >
                                                            <input type="hidden" name="id" value={user.id} />
                                                            <input type="hidden" name="role" value="admin" />
                                                            <Button
                                                                type="submit"
                                                                size="sm"
                                                                variant={currentRole === 'ADMIN' ? 'default' : 'outline'}
                                                                disabled={currentRole === 'ADMIN'}
                                                            >
                                                                Admin
                                                            </Button>
                                                        </form>

                                                        <form >
                                                            <input type="hidden" name="id" value={user.id} />
                                                            <input type="hidden" name="role" value="accountant" />
                                                            <Button
                                                                type="submit"
                                                                size="sm"
                                                                variant={currentRole === 'USER' ? 'default' : 'outline'}
                                                                disabled={currentRole === 'USER'}
                                                            >
                                                                Contador
                                                            </Button>
                                                        </form>

                                                        <form >
                                                            <input type="hidden" name="id" value={user.id} />
                                                            <input type="hidden" name="role" value="user" />
                                                            <Button
                                                                type="submit"
                                                                size="sm"
                                                                variant={currentRole === 'USER' ? 'default' : 'outline'}
                                                                disabled={currentRole === 'USER'}
                                                            >
                                                                Cliente
                                                            </Button>
                                                        </form>

                                                        {currentRole && (
                                                            <form >
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