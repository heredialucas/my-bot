'use client';

import { cn } from '@repo/design-system/lib/utils';
import {
    User,
    Calendar,
    Folder,
    Headphones,
    MessageSquare,
    Receipt,
    FileQuestion,
    BookOpen,
    Briefcase,
    Calculator,
    LayoutDashboard,
    Users,
    FileText
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


export function AccountantSidebar() {
    const pathname = usePathname();
    const menuItems: MenuItemProps[] = [
        {
            title: 'Panel Principal',
            icon: LayoutDashboard,
            href: '/accountant/dashboard',
        },
        {
            title: 'Clientes',
            icon: Users,
            href: '/accountant/clients',
        },
        /* Comentado temporalmente para enfocarnos en la gestión de clientes
        {
            title: 'Perfil Tributario',
            icon: User,
            href: '/accountant/tax-profile',
        },
        {
            title: 'Impuestos Mensuales',
            icon: Calendar,
            href: '/accountant/monthly-taxes',
        },
        {
            title: 'RRHH',
            icon: Briefcase,
            href: '/accountant/human-resources',
        },
        {
            title: 'Impuestos Anuales',
            icon: Calculator,
            href: '/accountant/annual-taxes',
        },
        {
            title: 'Carpeta Tributaria',
            icon: Folder,
            href: '/accountant/tax-folder',
        },
        {
            title: 'Asesoría',
            icon: Headphones,
            href: '/accountant/advisory',
        },
        {
            title: 'Contacto',
            icon: MessageSquare,
            href: '/accountant/contact',
        },
        */
    ];

    const isActivePath = (path: string) => pathname.endsWith(path);

    return (
        <>
            {/* Sidebar para escritorio */}
            <Sidebar variant="inset" className="border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 fixed left-0 top-16 bottom-0 w-64 overflow-y-auto">
                <div className="p-3">
                    <div className="relative">
                        <div className="rounded-md border px-3 py-1 flex items-center gap-2">
                            <input
                                className="w-full rounded-md border-0 bg-transparent pl-9 pr-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-900 dark:text-white"
                                placeholder="Buscar..."
                            />
                        </div>
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