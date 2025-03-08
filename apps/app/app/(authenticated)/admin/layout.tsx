'use client';

import { UserButton } from '@repo/auth/client';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { Button } from '@repo/design-system/components/ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from '@repo/design-system/components/ui/sidebar';
import { cn } from '@repo/design-system/lib/utils';
import {
    UsersIcon,
    BarChart3Icon,
    HomeIcon,
    ClipboardCheckIcon,
    SettingsIcon,
    SearchIcon,
    ShieldIcon
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type AdminLayoutProps = {
    readonly children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const sidebar = useSidebar();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: BarChart3Icon,
            href: '/admin/dashboard',
        },
        {
            title: 'Contadores',
            icon: UsersIcon,
            href: '/admin/accountants',
        },
        {
            title: 'Auditoría',
            icon: ClipboardCheckIcon,
            href: '/admin/audit',
        },
        {
            title: 'Reportes',
            icon: BarChart3Icon,
            href: '/admin/reports',
        },
        {
            title: 'Configuración',
            icon: SettingsIcon,
            href: '/admin/settings',
        },
    ];

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
                <Sidebar variant="inset" className="border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 fixed left-0 top-16 bottom-0 w-64 overflow-y-auto">
                    <div className="p-3">
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-zinc-500" />
                            <input
                                className="w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-9 pr-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-white"
                                placeholder="Buscar..."
                            />
                        </div>
                    </div>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Menú</SidebarGroupLabel>
                            <SidebarMenu>
                                {menuItems.map((item) => (
                                    <SidebarMenuItem
                                        key={item.title}
                                        className={cn(
                                            pathname.endsWith(item.href) && "text-blue-500 bg-blue-500/10",
                                            !pathname.endsWith(item.href) && "text-gray-600 dark:text-zinc-400"
                                        )}
                                    >
                                        <Link href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-zinc-800">
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                <main className="w-full bg-gray-50 dark:bg-zinc-950 flex-1 p-6 min-h-screen">
                    <div className="container mx-auto px-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
} 