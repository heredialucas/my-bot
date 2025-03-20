'use client';

import type { Dictionary } from '@repo/internationalization';
import { useState } from 'react';
import Image from 'next/image';
import { useServiceStore } from '@/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import fiberImage from './fiber.png';
import companyImage from './company.png';
import hogarImage from './hogar.png';
import profesionalImage from './profesional.png';


type HeroProps = {
  dictionary: Dictionary;
};

export const Hero = ({ dictionary }: HeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Use the Zustand store from the dedicated store directory
  const { selectedOption, setSelectedOption } = useServiceStore();

  const slides = [
    { id: 1, image: fiberImage },
    { id: 2, image: companyImage },
    { id: 3, image: hogarImage },
    { id: 4, image: profesionalImage }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Swiper Carousel Section */}
      <div className="w-full">
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
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          modules={[Autoplay, Pagination]}
          className="w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-[500px] w-full overflow-hidden bg-blue-950">
                <Image
                  src={slide.image}
                  alt="Hero slide"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Option Switcher Section */}
      <div className="w-full flex justify-center mt-6">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-full flex overflow-hidden shadow-lg relative p-3">
          <button
            onClick={() => setSelectedOption('internet-hogar')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full transition-colors ${selectedOption === 'internet-hogar'
              ? 'bg-white text-slate-900'
              : 'text-white hover:bg-slate-800/60'
              }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Internet hogar
          </button>

          <button
            onClick={() => setSelectedOption('internet-tv')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full transition-colors ${selectedOption === 'internet-tv'
              ? 'bg-white text-slate-900'
              : 'text-white hover:bg-slate-800/60'
              }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Internet + TV online
          </button>
        </div>
      </div>
    </div>
  );
};

