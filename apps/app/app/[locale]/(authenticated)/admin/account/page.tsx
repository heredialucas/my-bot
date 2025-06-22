import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/design-system/components/ui/tabs';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/design-system/components/ui/avatar';
import { User, Mail, Phone, Shield, Plus, Edit, Trash2 } from 'lucide-react';

export default function AccountPage() {
    // Mock data for current user
    const currentUser = {
        id: '1',
        name: 'Admin',
        lastName: 'Usuario',
        email: 'admin@barfer.com',
        phone: '+54 11 1234-5678',
        role: 'admin',
        avatar: null,
        createdAt: '2024-01-15',
        lastLogin: '2024-12-19'
    };

    // Mock data for users
    const mockUsers = [
        {
            id: '1',
            name: 'Juan',
            lastName: 'Pérez',
            email: 'juan@example.com',
            phone: '+54 11 2345-6789',
            role: 'admin',
            status: 'active',
            createdAt: '2024-01-15',
            lastLogin: '2024-12-19'
        },
        {
            id: '2',
            name: 'María',
            lastName: 'González',
            email: 'maria@example.com',
            phone: '+54 11 3456-7890',
            role: 'user',
            status: 'active',
            createdAt: '2024-02-10',
            lastLogin: '2024-12-18'
        },
        {
            id: '3',
            name: 'Carlos',
            lastName: 'Rodríguez',
            email: 'carlos@example.com',
            phone: '+54 11 4567-8901',
            role: 'user',
            status: 'inactive',
            createdAt: '2024-03-05',
            lastLogin: '2024-12-10'
        }
    ];

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">Gestión de Cuenta</h1>
                <div className="text-sm text-muted-foreground">
                    Configuración y usuarios
                </div>
            </div>

            <Tabs defaultValue="profile" className="space-y-4">
                <div className="overflow-x-auto">
                    <TabsList className="grid w-full grid-cols-2 min-w-[300px] md:min-w-0">
                        <TabsTrigger value="profile" className="text-sm">Mi Perfil</TabsTrigger>
                        <TabsTrigger value="users" className="text-sm">Gestión de Usuarios</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Información Personal
                            </CardTitle>
                            <CardDescription>
                                Actualiza tu información personal y configuración de cuenta
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={currentUser.avatar || undefined} />
                                    <AvatarFallback className="text-lg">
                                        {currentUser.name[0]}{currentUser.lastName[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-center sm:text-left">
                                    <Button variant="outline" size="sm">
                                        Cambiar Foto
                                    </Button>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        JPG, PNG max 2MB
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input id="name" defaultValue={currentUser.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Apellido</Label>
                                    <Input id="lastName" defaultValue={currentUser.lastName} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue={currentUser.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Teléfono</Label>
                                    <Input id="phone" type="tel" defaultValue={currentUser.phone} />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Rol actual</p>
                                    <Badge variant="default" className="capitalize">
                                        {currentUser.role}
                                    </Badge>
                                </div>
                                <Button className="w-full sm:w-auto">Guardar Cambios</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Seguridad
                            </CardTitle>
                            <CardDescription>
                                Gestiona tu contraseña y configuración de seguridad
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Contraseña Actual</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">Nueva Contraseña</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                            <Button className="w-full">Actualizar Contraseña</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div className="flex-1">
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Usuarios del Sistema
                                    </CardTitle>
                                    <CardDescription>
                                        Gestiona los usuarios y sus permisos
                                    </CardDescription>
                                </div>
                                <Button className="w-full sm:w-auto">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nuevo Usuario
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockUsers.map((user) => (
                                    <div key={user.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg gap-4">
                                        <div className="flex items-center gap-4 flex-1">
                                            <Avatar>
                                                <AvatarFallback>
                                                    {user.name[0]}{user.lastName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">
                                                    {user.name} {user.lastName}
                                                </p>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Mail className="h-3 w-3 shrink-0" />
                                                    <span className="truncate">{user.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Phone className="h-3 w-3 shrink-0" />
                                                    <span>{user.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            <div className="flex-1 sm:text-right">
                                                <Badge
                                                    variant={user.role === 'admin' ? 'default' : 'secondary'}
                                                    className="mb-1"
                                                >
                                                    {user.role}
                                                </Badge>
                                                <p className={`text-xs ${user.status === 'active'
                                                    ? 'text-green-600'
                                                    : 'text-gray-500'
                                                    }`}>
                                                    {user.status === 'active' ? 'Activo' : 'Inactivo'}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Último: {new Date(user.lastLogin).toLocaleDateString('es-ES')}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 