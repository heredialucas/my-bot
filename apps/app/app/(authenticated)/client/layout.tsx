'use client';

import { UserButton } from '@repo/auth/client';
import { Button } from '@repo/design-system/components/ui/button';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { cn } from '@repo/design-system/lib/utils';
import {
    LayoutDashboard,
    FileText,
    CreditCard,
    User,
    HomeIcon
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type ClientLayoutProps = {
    readonly children: ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: LayoutDashboard,
            href: '/client/dashboard',
        },
        {
            title: 'Documentos',
            icon: FileText,
            href: '/client/documents',
        },
        {
            title: 'Pagos',
            icon: CreditCard,
            href: '/client/payments',
        },
        {
            title: 'Perfil',
            icon: User,
            href: '/client/profile',
        },
    ];

    const isActivePath = (path: string) => pathname.endsWith(path);

    return (
        <div className="flex w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 z-10 h-16">
                <div className="container h-full mx-auto flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <div className="font-bold text-xl text-[#FFE01B]">SOPY</div>
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

            <div className="flex pt-16 w-full h-full">
                {/* Sidebar */}
                <aside className="w-64 left-0 top-16 bottom-0 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 hidden md:block overflow-y-auto">
                    <nav className="p-4 flex flex-col gap-2">
                        {menuItems.map((item) => {
                            const isActive = isActivePath(item.href);
                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-[#FFE01B] text-zinc-900"
                                            : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
                                    )}
                                >
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Mobile Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 flex justify-around py-3 md:hidden z-10">
                    {menuItems.map((item) => {
                        const isActive = isActivePath(item.href);
                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center p-1 rounded-md",
                                    isActive
                                        ? "text-[#FFE01B]"
                                        : "text-gray-600 dark:text-zinc-400"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="text-xs mt-1">{item.title}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Main Content */}
                <main className="flex-1 w-full bg-gray-50 dark:bg-zinc-950 p-6 pb-20 md:pb-6 min-h-screen overflow-auto">
                    <div className="container mx-auto px-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
} 