'use client';

import Image from 'next/image';
import type { Dictionary } from '@repo/internationalization';
import menElectrician from '@/public/menElectrician.png'

type MissionSectionProps = {
    dictionary: Dictionary;
};

export const MissionSection = ({ dictionary }: MissionSectionProps) => {
    return (
        <div className="flex flex-col sm:flex-row max-w-[800px] h-auto sm:h-[500px] mx-auto rounded-3xl bg-white shadow-lg border-4 border-gray-100 shadow-gray-200 mt-8 sm:mt-20">
            {/* Content card - Top on mobile, Left on desktop */}
            <div className="w-full sm:w-[75%] p-6 sm:p-14 order-2 sm:order-1">
                <div className="p-4 sm:p-10 sm:pr-[15%]">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-600 mb-3 sm:mb-4">
                        {dictionary.web.about.mission.title}
                    </h2>
                    <p className="text-sm sm:text-md text-muted-foreground leading-relaxed">
                        {dictionary.web.about.mission.description}
                    </p>
                </div>
            </div>

            {/* Image card - Bottom on mobile, Right on desktop */}
            <div className="w-full sm:w-[25%] md:w-[38%] lg:w-[30%] relative h-[200px] sm:h-auto order-1 sm:order-2">
                <div className="sm:rounded-3xl overflow-hidden h-[200px] sm:h-[500px] w-full sm:w-[400px] relative sm:top-[-15%] sm:right-0 z-10">
                    <Image
                        src={menElectrician}
                        alt="Mission"
                        fill
                        className='object-cover sm:object-fit'
                    />
                </div>
            </div>
        </div>
    );
}; 