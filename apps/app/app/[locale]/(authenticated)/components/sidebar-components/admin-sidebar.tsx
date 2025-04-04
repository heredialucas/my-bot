'use client';

import { cn } from '@repo/design-system/lib/utils';
import {
    LayoutDashboard,
    Search as SearchIcon,
    Users as UsersIcon,
    Settings
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
import { Dictionary } from '@repo/internationalization';

type MenuItemProps = {
    title: string;
    icon: any;
    href: string;
};

interface AdminSidebarProps {
    dictionary?: Dictionary;
}

export function AdminSidebar({ dictionary }: AdminSidebarProps) {
    const pathname = usePathname();
    const menuItems: MenuItemProps[] = [
        {
            title: dictionary?.app.admin.navigation.dashboard || 'Dashboard',
            icon: LayoutDashboard,
            href: '/admin/dashboard',
        },
        {
            title: dictionary?.app.admin.navigation.users || 'Users',
            icon: UsersIcon,
            href: '/admin/users',
        },
    ];

    const isActivePath = (path: string) => pathname.startsWith(path);

    return (
        <>
            {/* Desktop Sidebar */}
            <Sidebar variant="inset" className="border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 fixed left-0 top-16 bottom-0 w-64 overflow-y-auto">
                <div className="p-3">
                    <div className="relative">
                        <div className="rounded-md border px-3 py-1 flex items-center gap-2">
                            <SearchIcon className="h-4 w-4 text-gray-500 dark:text-zinc-400" />
                            <input
                                className="w-full rounded-md border-0 bg-transparent pl-0 pr-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-900 dark:text-white"
                                placeholder="Search..."
                            />
                        </div>
                    </div>
                </div>
                <SidebarContent>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem
                                key={item.title}
                                className={cn(
                                    isActivePath(item.href) && "text-green-500 bg-green-500/10",
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
                </SidebarContent>
            </Sidebar>

            {/* Mobile Navigation */}
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
                                    ? "text-green-500"
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