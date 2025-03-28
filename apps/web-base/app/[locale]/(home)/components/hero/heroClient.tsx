'use client';

import type { Dictionary } from '@repo/internationalization';
import Image from 'next/image';
import { useServiceStore } from '@/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';


type HeroClientProps = {
    dictionary: Dictionary;
    sliderImages?: any[];
};

export function HeroClient({ dictionary, sliderImages }: HeroClientProps) {
    // Use the Zustand store from the dedicated store directory
    const { selectedOption, setSelectedOption } = useServiceStore();

    return (
        <div className="container mx-auto flex flex-col w-full  bg-white px-0">
            {/* Swiper Carousel Section */}
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    bulletActiveClass: "bg-cyan-300",
                    bulletClass: "inline-block h-2 w-2 rounded-full bg-gray-300 mx-1"
                }}
                modules={[Autoplay, Pagination]}
                className="w-full"
            >
                {sliderImages?.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-[200px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
                            <Image
                                src={slide.url}
                                alt="Hero slide"
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Option Switcher Section */}
            <div className="w-full flex justify-center mt-6">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-full flex overflow-hidden shadow-lg relative p-2 md:p-3 scale-90 md:scale-100">
                    <button
                        onClick={() => setSelectedOption('internet-hogar')}
                        className={`flex items-center gap-1 md:gap-2 px-4 md:px-8 py-2 md:py-3 rounded-full transition-colors text-sm md:text-base ${selectedOption === 'internet-hogar'
                            ? 'bg-white text-slate-900'
                            : 'text-white hover:bg-slate-800/60'
                            }`}
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {dictionary.web.home.hero.serviceOptions.internetHogar}
                    </button>

                    <button
                        onClick={() => setSelectedOption('internet-tv')}
                        className={`flex items-center gap-1 md:gap-2 px-4 md:px-8 py-2 md:py-3 rounded-full transition-colors text-sm md:text-base ${selectedOption === 'internet-tv'
                            ? 'bg-white text-slate-900'
                            : 'text-white hover:bg-slate-800/60'
                            }`}
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {dictionary.web.home.hero.serviceOptions.internetTV}
                    </button>
                </div>
            </div>
        </div>
    );
} 