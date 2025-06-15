'use client';

import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { ReactNode, useEffect, useState } from 'react';
import { LogoutButton } from '../logout-button';
import { LanguageSwitcher } from '../language-switcher';
import { Dictionary } from '@repo/internationalization';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

interface UserHeaderClientProps {
    logo?: ReactNode;
    title?: string;
    extraItems?: ReactNode;
    dictionary?: Dictionary;
    user?: User;
}

export function UserHeaderClient({ logo, title = 'Ganga-Menú', extraItems, dictionary, user }: UserHeaderClientProps) {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 z-10 h-16">
            <div className="h-full mx-auto flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    {logo}
                    {title && (
                        <div className="font-bold text-xl text-gray-900 dark:text-white">{title}</div>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    {/* <LanguageSwitcher /> */}
                    {extraItems}
                    <LogoutButton userName={user?.name} dictionary={dictionary} />
                </div>
            </div>
        </header>
    );
} 