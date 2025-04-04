'use client';

import { signOut } from '@repo/data-services/src/services/authService';
import { Avatar, AvatarFallback } from '@repo/design-system/components/ui/avatar';
import { Button } from '@repo/design-system/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@repo/design-system/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Dictionary } from '@repo/internationalization';

interface LogoutButtonProps {
    userName?: string;
    dictionary?: Dictionary;
}

export function LogoutButton({ userName, dictionary }: LogoutButtonProps) {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        if (isLoggingOut) return;

        try {
            setIsLoggingOut(true);
            const result = await signOut();

            if (result.success) {
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Get user initials from name
    const getInitials = () => {
        if (!userName) return '?';

        const parts = userName.split(' ');
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const logoutText = dictionary?.app?.admin?.navigation?.logout ||
        dictionary?.app?.client?.navigation?.logout ||
        dictionary?.app?.pharmacy?.navigation?.logout ||
        'Cerrar sesión';
    const loggingOutText = 'Cerrando sesión...';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label="Usuario"
                >
                    <Avatar>
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {userName && (
                    <DropdownMenuItem disabled className="font-medium">
                        {userName}
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-destructive focus:text-destructive"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isLoggingOut ? loggingOutText : logoutText}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 