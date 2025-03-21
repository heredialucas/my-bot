'use client';

import Image from 'next/image';
import type { Dictionary } from '@repo/internationalization';
import handsWifi from '@/public/handsWifi.png'

type VisionSectionProps = {
    dictionary: Dictionary;
};

export const VisionSection = ({ dictionary }: VisionSectionProps) => {
    return (
        <div className="flex max-w-[800px] h-[350px] mx-auto rounded-3xl bg-white shadow-lg border-4 border-gray-100 shadow-gray-200 ">
            {/* Left side - Image card that overlaps */}
            <div className="w-[25%] md:w-[38%] lg:w-[30%] relative">
                <div className="rounded-3xl overflow-hidden h-[350px] w-[300px] relative top-[-20%] left-[-15%] z-10">
                    <Image src={handsWifi} alt="Vision" fill className='object-fit' />
                </div>
            </div>

            {/* Right side - Content card */}
            <div className="w-[75%] p-14">
                <div className=" p-10 pl-[15%]">
                    <h2 className="text-5xl font-bold text-indigo-600 mb-4">
                        {dictionary.web.about.vision.title}
                    </h2>
                    <p className="text-md text-muted-foreground leading-relaxed">
                        {dictionary.web.about.vision.description}
                    </p>
                </div>
            </div>
        </div>
    );
}; 