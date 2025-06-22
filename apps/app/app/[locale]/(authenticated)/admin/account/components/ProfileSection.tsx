'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { Badge } from '@repo/design-system/components/ui/badge';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { User } from 'lucide-react';
import type { Dictionary } from '@repo/internationalization';

interface ProfileSectionProps {
    currentUser: any;
    dictionary: Dictionary;
}

export function ProfileSection({ currentUser, dictionary }: ProfileSectionProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [profileForm, setProfileForm] = useState({
        name: currentUser?.name || '',
        lastName: currentUser?.lastName || '',
        email: currentUser?.email || '',
    });

    // Verificar si el usuario tiene permisos para editar su perfil
    const canEditProfile = currentUser?.permissions?.includes('account:edit_own') || currentUser?.role === 'admin';

    const handleProfileUpdate = async () => {
        if (!currentUser) return;

        setIsLoading(true);
        try {
            const { updateUser } = await import('@repo/data-services/src/services/userService');
            await updateUser(currentUser.id, {
                ...profileForm,
                password: '', // No actualizar contraseña aquí
            });

            toast({
                title: "Éxito",
                description: "Perfil actualizado exitosamente",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Error al actualizar el perfil",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                            disabled={!canEditProfile}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                            id="lastName"
                            value={profileForm.lastName}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, lastName: e.target.value }))}
                            disabled={!canEditProfile}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                            disabled={!canEditProfile}
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium">Rol actual</p>
                        <Badge variant="default" className="capitalize">
                            {currentUser?.role === 'admin' ? 'Administrador' : 'Usuario'}
                        </Badge>
                        {!canEditProfile && (
                            <p className="text-xs text-muted-foreground">
                                Solo lectura - Sin permisos de edición
                            </p>
                        )}
                    </div>
                    {canEditProfile && (
                        <Button
                            className="w-full sm:w-auto"
                            onClick={handleProfileUpdate}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
} 