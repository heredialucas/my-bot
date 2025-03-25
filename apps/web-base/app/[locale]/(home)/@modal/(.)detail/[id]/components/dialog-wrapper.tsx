"use client";

import { Dialog, DialogOverlay } from '@repo/design-system/components/ui/dialog';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

type DialogWrapperProps = {
    children: React.ReactNode;
};

export default function DialogWrapper({ children }: DialogWrapperProps) {
    const router = useRouter();

    // Función para manejar el cierre del diálogo
    const handleOpenChange = useCallback((open: boolean) => {
        if (!open) {
            // Navegar de vuelta a la página principal cuando el diálogo se cierra
            router.back();
        }
    }, [router]);

    // Función para manejar el escape
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            router.back();
        }
    }, [router]);

    return (
        <Dialog
            open={true}
            onOpenChange={handleOpenChange}
        >
            <div onKeyDown={handleKeyDown} className="focus:outline-none">
                <DialogOverlay className="bg-black/50" />
                {children}
            </div>
        </Dialog>
    );
} 