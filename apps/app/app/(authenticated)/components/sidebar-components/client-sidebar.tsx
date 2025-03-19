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
    LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type SubMenuItem = {
    title: string;
    icon: any;
    href: string;
};

type MenuItem = {
    title: string;
    icon: any;
    href: string;
    subMenus?: SubMenuItem[];
};


export function ClientSidebar() {
    const pathname = usePathname();
    const [expandedMenu, setExpandedMenu] = useState<string | null>("Perfil Tributario");

    const menuItems: MenuItem[] = [
        {
            title: 'Panel Principal',
            icon: LayoutDashboard,
            href: '/client/dashboard',
        },
        /* Comentado temporalmente para enfocarnos en la gestión de clientes
        {
            title: 'Perfil Tributario',
            icon: User,
            href: '/client/tax-profile',
            subMenus: [
                {
                    title: 'Mis Datos',
                    icon: User,
                    href: '/client/tax-profile/data',
                },
                {
                    title: 'Mis Facturas',
                    icon: Receipt,
                    href: '/client/tax-profile/invoices',
                },
                {
                    title: 'Mis Consultas',
                    icon: FileQuestion,
                    href: '/client/tax-profile/queries',
                },
                {
                    title: 'Guías',
                    icon: BookOpen,
                    href: '/client/tax-profile/guides',
                },
            ]
        },
        {
            title: 'Impuestos Mensuales',
            icon: Calendar,
            href: '/client/monthly-taxes',
        },
        {
            title: 'RRHH',
            icon: Briefcase,
            href: '/client/human-resources',
        },
        {
            title: 'Impuestos Anuales',
            icon: Calculator,
            href: '/client/annual-taxes',
        },
        {
            title: 'Carpeta Tributaria',
            icon: Folder,
            href: '/client/tax-folder',
        },
        {
            title: 'Asesoría',
            icon: Headphones,
            href: '/client/advisory',
        },
        {
            title: 'Contacto',
            icon: MessageSquare,
            href: '/client/contact',
        },
        */
    ];

    const toggleSubmenu = (title: string) => {
        if (expandedMenu === title) {
            setExpandedMenu(null);
        } else {
            setExpandedMenu(title);
        }
    };

    const isActivePath = (path: string) => pathname.endsWith(path);
    const isActiveSubmenu = (path: string) => pathname.includes(path);

    return (
        <>
            {/* Sidebar para escritorio */}
            <aside className="w-64 fixed left-0 top-16 bottom-0 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 hidden md:block overflow-y-auto">
                <nav className="p-4 flex flex-col gap-2">
                    {menuItems.map((item) => {
                        const hasSubmenu = item.subMenus && item.subMenus.length > 0;
                        const isMenuActive = hasSubmenu ? isActiveSubmenu(item.href) : isActivePath(item.href);
                        const isExpanded = expandedMenu === item.title;

                        return (
                            <div key={item.title} className="flex flex-col">
                                {hasSubmenu ? (
                                    <div
                                        className={cn(
                                            "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                            isMenuActive
                                                ? "bg-[#FFE01B] text-zinc-900"
                                                : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
                                        )}
                                    >
                                        <Link href={item.href} className="flex items-center gap-3 flex-1">
                                            <item.icon className="h-5 w-5 flex-shrink-0" />
                                            <span>{item.title}</span>
                                        </Link>

                                        <button
                                            onClick={() => toggleSubmenu(item.title)}
                                            className="focus:outline-none"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={cn("h-4 w-4 transition-transform", isExpanded ? "transform rotate-180" : "")}
                                            >
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                            isMenuActive
                                                ? "bg-[#FFE01B] text-zinc-900"
                                                : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5 flex-shrink-0" />
                                        <span>{item.title}</span>
                                    </Link>
                                )}

                                {hasSubmenu && isExpanded && (
                                    <div className="ml-4 pl-4 border-l border-gray-200 dark:border-zinc-700 mt-1 mb-1 space-y-1">
                                        {item.subMenus!.map((subItem) => {
                                            const isSubActive = isActivePath(subItem.href);
                                            return (
                                                <Link
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    className={cn(
                                                        "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                                        isSubActive
                                                            ? "bg-[#FFE01B]/30 text-zinc-900 dark:text-white"
                                                            : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
                                                    )}
                                                >
                                                    <subItem.icon className="h-4 w-4 flex-shrink-0" />
                                                    <span>{subItem.title}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>

            {/* Navegación móvil */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 flex justify-around py-3 md:hidden z-10">
                {menuItems.slice(0, 5).map((item) => {
                    const isActive = isActivePath(item.href) || (item.subMenus && item.subMenus.some(sub => isActivePath(sub.href)));
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
                            <span className="text-xs mt-1">{item.title.split(' ')[0]}</span>
                        </Link>
                    );
                })}
            </div>
        </>
    );
} 