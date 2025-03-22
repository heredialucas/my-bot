'use client';

import { cn } from '@repo/design-system/lib/utils';
import {
    BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem
} from '@repo/design-system/components/ui/sidebar';
import { usePathname } from 'next/navigation';

type MenuItemProps = {
    title: string;
    icon: any;
    href: string;
};



export function AdminSidebar() {
    const pathname = usePathname();
    const menuItems: MenuItemProps[] = [
        {
            title: 'Panel Principal',
            icon: BarChart3,
            href: '/admin/dashboard',
        },
    ];

    const isActivePath = (path: string) => pathname.startsWith(path);

    return (
        <>
            {/* Sidebar para escritorio */}
            <Sidebar variant="inset" className="border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 fixed left-0 top-16 bottom-0 w-64 overflow-y-auto">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Menú</SidebarGroupLabel>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem
                                    key={item.title}
                                    className={cn(
                                        isActivePath(item.href) && "text-blue-500 bg-blue-500/10",
                                        !isActivePath(item.href) && "text-gray-600 dark:text-zinc-400"
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

            {/* Navegación móvil */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 flex justify-around py-3 md:hidden z-10">
                {menuItems.slice(0, 5).map((item) => {
                    const isActive = isActivePath(item.href);
                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center p-1 rounded-md",
                                isActive
                                    ? "text-blue-500"
                                    : "text-gray-600 dark:text-zinc-400"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="text-xs mt-1">{item.title.split(' ')[0]}</span>
                        </Link>
                    );
                })}
            </div>
        </>
    );
} 