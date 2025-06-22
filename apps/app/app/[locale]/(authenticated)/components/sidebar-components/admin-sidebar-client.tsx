'use client';

import { cn } from '@repo/design-system/lib/utils';
import {
    User,
    Users,
    BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem
} from '@repo/design-system/components/ui/sidebar';
import { usePathname, useSearchParams } from 'next/navigation';
import { Dictionary } from '@repo/internationalization';
import type { SidebarItem } from '@repo/auth/server-permissions';

// Mapeo de iconos
const ICON_MAP = {
    User,
    Users,
    BarChart3,
} as const;

type AdminSidebarClientProps = {
    items: SidebarItem[];
    dictionary: Dictionary;
};

export function AdminSidebarClient({ items, dictionary }: AdminSidebarClientProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'config';

    const isActivePath = (path: string) => {
        if (path.includes('?tab=')) {
            const [basePath, tab] = path.split('?tab=');
            return pathname.startsWith(basePath) && activeTab === tab;
        }
        return pathname.startsWith(path);
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <Sidebar variant="inset" className="hidden md:block border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 fixed left-0 top-16 bottom-0 w-64 overflow-y-auto">
                <SidebarContent>
                    <SidebarMenu>
                        {items.map((item) => {
                            const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP];
                            return (
                                <SidebarMenuItem
                                    key={item.label}
                                    className={cn(
                                        isActivePath(item.href) && "text-green-500 bg-green-500/10",
                                        !isActivePath(item.href) && "text-gray-600 dark:text-zinc-400"
                                    )}
                                >
                                    <Link href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-zinc-800">
                                        {IconComponent && <IconComponent className="h-5 w-5" />}
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 z-50">
                <div className="flex items-center justify-around px-2 py-2">
                    {items.map((item) => {
                        const isActive = isActivePath(item.href);
                        const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP];
                        const mobileTitle = item.label.includes('Gestión') ? 'Usuarios' :
                            item.label.includes('Configuración') ? 'Config' :
                                item.label.includes('Estadísticas') ? 'KPIs' :
                                    item.label.includes('Cuenta') ? 'Cuenta' :
                                        item.label.includes('Clientes') ? 'Clientes' :
                                            item.label;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center gap-1 px-3 py-2 rounded-lg min-w-0 flex-1 transition-colors",
                                    isActive
                                        ? "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400"
                                        : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800"
                                )}
                            >
                                {IconComponent && <IconComponent className={cn("h-5 w-5 shrink-0", isActive && "text-green-600 dark:text-green-400")} />}
                                <span className={cn(
                                    "text-xs font-medium truncate text-center leading-tight",
                                    isActive && "text-green-600 dark:text-green-400"
                                )}>
                                    {mobileTitle}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
} 