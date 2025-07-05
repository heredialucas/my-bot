'use client';

import { useState } from 'react';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { updateSellersPermissionsAction } from '../actions';

export function UpdatePermissionsButton() {
    const [isUpdating, setIsUpdating] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleUpdate = async () => {
        if (!confirm('¿Estás seguro de que quieres actualizar los permisos de todos los vendedores existentes?')) {
            return;
        }

        setIsUpdating(true);
        try {
            const result = await updateSellersPermissionsAction();
            if (result.success) {
                toast({
                    title: 'Éxito',
                    description: result.message,
                });
                router.refresh();
            } else {
                toast({
                    title: 'Error',
                    description: result.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudieron actualizar los permisos.',
                variant: 'destructive',
            });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Button
            onClick={handleUpdate}
            disabled={isUpdating}
            variant="outline"
            size="sm"
        >
            {isUpdating ? 'Actualizando...' : 'Actualizar Permisos de Vendedores'}
        </Button>
    );
} 