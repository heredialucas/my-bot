'use client';

import Image from 'next/image';
import { FeatureData } from './types';

type FiberFeatureCardProps = {
    feature: FeatureData;
};

export const FiberFeatureCard = ({ feature }: FiberFeatureCardProps) => {
    return (
        <div className="relative rounded-lg overflow-hidden">
            {/* Background image with overlay */}
            <div className="relative aspect-[4/3] sm:aspect-square">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                />

                {/* Content positioned at the bottom left */}
                <div className="absolute top-0 left-0 z-20 p-3 sm:p-6 text-white">
                    <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-[10px] sm:text-xs leading-tight sm:leading-snug text-white/90">{feature.description}</p>
                </div>
            </div>
        </div>
    );
}; 