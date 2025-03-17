'use client';

import { UserButton } from '@repo/auth/client';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { Button } from '@repo/design-system/components/ui/button';
import { ShieldIcon, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { AdminSidebar } from '../components/sidebar-components/admin-sidebar';

type AdminLayoutProps = {
    readonly children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();

    return (
        <div className="flex w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 z-10 h-16">
                <div className="container h-full mx-auto flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <ShieldIcon className="h-5 w-5 text-blue-400" />
                        <div className="font-bold text-xl text-gray-900 dark:text-white">SOPY</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white">
                                <HomeIcon className="h-4 w-4 mr-2" />
                                <span>Cambiar rol</span>
                            </Button>
                        </Link>
                        <ModeToggle />
                        <UserButton />
                    </div>
                </div>
            </header>

            <div className="pt-16 flex w-full h-full">
                <AdminSidebar pathname={pathname} />

                <main className="w-full bg-gray-50 dark:bg-zinc-950 flex-1 p-6 min-h-screen">
                    <div className="container mx-auto px-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
} 