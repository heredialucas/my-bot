'use client';

import type { Dictionary } from '@repo/internationalization';
import { CompanySection } from './CompanySection';
import { VisionSection } from './VisionSection';
import { MissionSection } from './MissionSection';

type AboutPageContentProps = {
    dictionary: Dictionary;
};

export const AboutPageContent = ({ dictionary }: AboutPageContentProps) => {
    return (
        <div className="w-full py-10 lg:py-20">
            <div className="flex flex-col gap-32 container mx-auto max-w-6xl ">
                {/* Company Section */}
                <CompanySection dictionary={dictionary} />

                {/* Vision Section */}
                <VisionSection dictionary={dictionary} />

                {/* Mission Section */}
                <MissionSection dictionary={dictionary} />
            </div>
        </div>
    );
}; 