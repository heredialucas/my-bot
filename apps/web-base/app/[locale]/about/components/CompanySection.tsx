'use client';

import Image from 'next/image';
import type { Dictionary } from '@repo/internationalization';
import Logo from '@/public/logo.png';

type CompanySectionProps = {
    dictionary: Dictionary;
};

export const CompanySection = ({ dictionary }: CompanySectionProps) => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="relative h-32 w-32 mb-6">
                <Image
                    src={Logo}
                    alt="NetFull Fibra Logo"
                    fill
                    className="object-contain rounded-full"
                    priority
                />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl mb-4">
                NetFull Fibra
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {dictionary.web.about.company.description}
            </p>
        </div>
    );
}; 