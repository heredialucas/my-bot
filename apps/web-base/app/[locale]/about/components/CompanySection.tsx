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
            <div className="relative h-24 w-24 sm:h-32 sm:w-32 mb-4 sm:mb-6">
                <Image
                    src={Logo}
                    alt="NetFull Fibra Logo"
                    fill
                    className="object-contain rounded-full"
                    priority
                />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter md:text-5xl mb-3 sm:mb-4">
                NetFull Fibra
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl px-4 sm:px-0">
                {dictionary.web.about.company.description}
            </p>
        </div>
    );
}; 