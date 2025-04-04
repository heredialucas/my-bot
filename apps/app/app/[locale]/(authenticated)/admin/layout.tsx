import { Leaf } from 'lucide-react';
import type { ReactNode } from 'react';
import { getDictionary } from '@repo/internationalization';
import { AdminSidebar } from '../components/sidebar-components/admin-sidebar';
import { UserHeader } from '../components/user-header';

type AdminLayoutProps = {
    readonly children: ReactNode;
    readonly params: {
        locale: string;
    };
};

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
    const { locale } = params;
    const dictionary = await getDictionary(locale);

    return (
        <div className="flex w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
            <UserHeader
                logo={<Leaf className="h-5 w-5 text-green-500" />}
                title={dictionary.app.admin?.title || "AppWise Innovation"}
                dictionary={dictionary}
            />

            <div className="pt-16 flex w-full h-full">
                <AdminSidebar dictionary={dictionary} />

                <main className="w-full bg-gray-50 dark:bg-zinc-950 flex-1 p-6 min-h-screen">
                    <div className="container mx-auto px-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
} 