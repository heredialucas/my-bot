'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { Shield } from 'lucide-react';
import type { Dictionary } from '@repo/internationalization';

interface PasswordSectionProps {
    currentUser: any;
    dictionary: Dictionary;
}

export function PasswordSection({ currentUser, dictionary }: PasswordSectionProps) {
    const { toast } = useToast();
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Verificar si el usuario tiene permisos para cambiar su contraseña
    const canChangePassword = currentUser?.permissions?.includes('account:change_password') || currentUser?.role === 'admin';

    const handlePasswordChange = async () => {
        if (!currentUser) return;

        // Validations
        if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
            toast({
                title: "Error",
                description: "Todos los campos son requeridos",
                variant: "destructive",
            });
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast({
                title: "Error",
                description: "Las contraseñas no coinciden",
                variant: "destructive",
            });
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            toast({
                title: "Error",
                description: "La contraseña debe tener al menos 6 caracteres",
                variant: "destructive",
            });
            return;
        }

        setIsPasswordLoading(true);

        try {
            const { changePassword } = await import('@repo/data-services/src/services/userService');
            const result = await changePassword(
                currentUser.id,
                passwordForm.currentPassword,
                passwordForm.newPassword
            );

            if (result.success) {
                toast({
                    title: "Éxito",
                    description: "Contraseña actualizada exitosamente",
                });
                setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            } else {
                toast({
                    title: "Error",
                    description: result.message || "Error al actualizar la contraseña",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Error al actualizar la contraseña",
                variant: "destructive",
            });
        } finally {
            setIsPasswordLoading(false);
        }
    };

    return (
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
                {!canChangePassword ? (
                    <div className="text-center py-8">
                        <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                            No tienes permisos para cambiar tu contraseña.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            Contacta a un administrador si necesitas cambiar tu contraseña.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="current-password">
                                Contraseña Actual
                            </Label>
                            <Input
                                id="current-password"
                                type="password"
                                value={passwordForm.currentPassword}
                                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">
                                Nueva Contraseña
                            </Label>
                            <Input
                                id="new-password"
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">
                                Confirmar Nueva Contraseña
                            </Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            />
                        </div>
                        <Button
                            className="w-full"
                            onClick={handlePasswordChange}
                            disabled={isPasswordLoading}
                        >
                            {isPasswordLoading ? "Actualizando..." : "Actualizar Contraseña"}
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
} 