import { UserButton } from '@repo/auth/client';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { CalculatorIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { AccountantSidebar } from '../components/sidebar-components/accountant-sidebar';

type AccountantLayoutProps = {
    readonly children: ReactNode;
};

export default async function AccountantLayout({ children }: AccountantLayoutProps) {

    return (
        <div className="flex w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 z-10 h-16">
                <div className="h-full mx-auto flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <CalculatorIcon className="h-5 w-5 text-green-400" />
                        <div className="font-bold text-xl text-gray-900 dark:text-white">SOPY</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ModeToggle />
                        <UserButton />
                    </div>
                </div>
            </header>

            <div className="flex pt-16 w-full h-full">
                {/* Sidebar */}
                <AccountantSidebar />

                <main className="w-full bg-gray-50 dark:bg-zinc-950 flex-1 p-6 min-h-screen">
                    <div className="container mx-auto px-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
} 