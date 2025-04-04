import { Leaf } from 'lucide-react';
import type { ReactNode } from 'react';
import { getDictionary } from '@repo/internationalization';
import { PharmacySidebar } from '../components/sidebar-components/pharmacy-sidebar';
import { UserHeader } from '../components/user-header';

type PharmacyLayoutProps = {
    readonly children: ReactNode;
    readonly params: Promise<{
        locale: string;
    }>;
};

export default async function PharmacyLayout({ children, params }: PharmacyLayoutProps) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return (
        <div className="flex w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
            <UserHeader
                logo={<Leaf className="h-5 w-5 text-green-500" />}
                title={dictionary.app.pharmacy?.title || "AppWise Innovation"}
                dictionary={dictionary}
            />

            <div className="flex pt-16 w-full h-full">
                {/* Sidebar */}
                <PharmacySidebar dictionary={dictionary} />

                <main className="w-full bg-gray-50 dark:bg-zinc-950 flex-1 p-6 min-h-screen">
                    <div className="container mx-auto px-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
} 