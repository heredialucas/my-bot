'use client';

import Image from 'next/image';
import type { Dictionary } from '@repo/internationalization';
import handsWifi from '@/public/handsWifi.png'

type VisionSectionProps = {
    dictionary: Dictionary;
};

export const VisionSection = ({ dictionary }: VisionSectionProps) => {
    return (
        <div className="flex flex-col sm:flex-row max-w-[800px] h-auto sm:h-[350px] mx-auto rounded-3xl bg-white shadow-lg border-4 border-gray-100 shadow-gray-200">
            {/* Image card - Top on mobile, Left on desktop */}
            <div className="w-full sm:w-[25%] md:w-[38%] lg:w-[30%] relative h-[200px] sm:h-auto">
                <div className="sm:rounded-3xl overflow-hidden h-[200px] sm:h-[350px] w-full sm:w-[300px] relative sm:top-[-20%] sm:left-[-15%] z-10">
                    <Image
                        src={handsWifi}
                        alt="Vision"
                        fill
                        className='object-cover sm:object-fit'
                    />
                </div>
            </div>

            {/* Content card - Bottom on mobile, Right on desktop */}
            <div className="w-full sm:w-[75%] p-6 sm:p-14">
                <div className="p-4 sm:p-10 sm:pl-[15%]">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-600 mb-3 sm:mb-4">
                        {dictionary.web.about.vision.title}
                    </h2>
                    <p className="text-sm sm:text-md text-muted-foreground leading-relaxed">
                        {dictionary.web.about.vision.description}
                    </p>
                </div>
            </div>
        </div>
    );
}; 