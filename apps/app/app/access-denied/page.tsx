import { SignOutButton } from '@repo/auth/client';
import { Button } from '@repo/design-system/components/ui/button';
import { ShieldIcon } from 'lucide-react';

export default function AccessDenied() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900 p-4">
            <div className="max-w-md w-full mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <ShieldIcon className="h-10 w-10 text-red-500 dark:text-red-400" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Acceso Denegado
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    No tienes permiso para acceder al panel de administración. Esta área está reservada para administradores autorizados de NetFull.
                </p>

                <div className="bg-gray-50 dark:bg-zinc-700/30 p-4 rounded-md text-left mb-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        ¿Necesitas acceso?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Si necesitas permisos de administrador, por favor contacta al administrador de NetFull para solicitar autorización.
                    </p>
                </div>

                <div className="flex justify-center">
                    <SignOutButton>
                        <Button variant="outline">
                            Cerrar Sesión
                        </Button>
                    </SignOutButton>
                </div>
            </div>
        </div>
    );
} 