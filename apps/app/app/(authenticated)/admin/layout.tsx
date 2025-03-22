import { UserButton } from '@repo/auth/client';
import { ShieldIcon } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { AdminSidebar } from '../components/sidebar-components/admin-sidebar';

type AdminLayoutProps = {
    readonly children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {

    return (
        <div className="flex w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 z-10 h-16">
                <div className="mx-4 h-full w-full flex items-center gap-4">
                    <UserButton />
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <ShieldIcon className="h-5 w-5 text-blue-400" />
                        <div className="font-bold text-xl text-gray-900 dark:text-white">NetFull</div>
                    </Link>
                </div>
            </header>

            <div className="pt-16 flex w-full h-full">
                <AdminSidebar />

                <main className="w-full bg-gray-50 dark:bg-zinc-950 flex-1 p-6 min-h-screen">
                    <div className="container mx-auto px-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
} 