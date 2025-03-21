'use client';

import Image from 'next/image';
import type { Dictionary } from '@repo/internationalization';
import menElectrician from '@/public/menElectrician.png'

type MissionSectionProps = {
    dictionary: Dictionary;
};

export const MissionSection = ({ dictionary }: MissionSectionProps) => {
    return (
        <div className="flex max-w-[800px] h-[500px] mx-auto rounded-3xl bg-white shadow-lg border-4 border-gray-100 shadow-gray-200 mt-20">
            {/* Left side - Content card */}
            <div className="w-[75%] p-14">
                <div className="p-10 pr-[15%]">
                    <h2 className="text-5xl font-bold text-indigo-600 mb-4">
                        {dictionary.web.about.mission.title}
                    </h2>
                    <p className="text-md text-muted-foreground leading-relaxed">
                        {dictionary.web.about.mission.description}
                    </p>
                </div>
            </div>

            {/* Right side - Image card that overlaps */}
            <div className="w-[25%] md:w-[38%] lg:w-[30%] relative">
                <div className="rounded-3xl overflow-hidden h-[500px] w-[400px] relative top-[-15%] right-0 z-10">
                    <Image src={menElectrician} alt="Mission" fill className='object-fit' />
                </div>
            </div>
        </div>
    );
}; 