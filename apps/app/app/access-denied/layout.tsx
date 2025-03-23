import type { ReactNode } from 'react';

type AccessDeniedLayoutProps = {
    readonly children: ReactNode;
};

export default function AccessDeniedLayout({ children }: AccessDeniedLayoutProps) {
    return (
        <div className="bg-white dark:bg-black text-gray-900 dark:text-white">
            {children}
        </div>
    );
} 