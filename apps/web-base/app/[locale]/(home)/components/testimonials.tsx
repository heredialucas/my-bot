'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/design-system/components/ui/avatar';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@repo/design-system/components/ui/carousel';
import type { Dictionary } from '@repo/internationalization';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

type TestimonialsProps = {
  dictionary: Dictionary;
};

export const Testimonials = ({ dictionary }: TestimonialsProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-40 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="text-left font-black text-3xl tracking-tighter md:text-5xl lg:max-w-xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
            {dictionary.web.home.testimonials.title}
          </h2>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {dictionary.web.home.testimonials.items.map((item, index) => (
                <CarouselItem className="lg:basis-1/2" key={index}>
                  <div className="flex aspect-video h-full flex-col justify-between rounded-md bg-white border-2 border-[#7dd3c8] p-6 lg:col-span-2 shadow-md">
                    <Star className="h-8 w-8 stroke-1 text-[#FFB800] fill-[#FFB800]" />
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <h3 className="text-xl tracking-tight font-black var(--font-nunito)">{item.title}</h3>
                        <p className="max-w-xs text-base text-gray-600 var(--font-nunito)">
                          {item.description}
                        </p>
                      </div>
                      <p className="flex flex-row items-center gap-2 text-sm var(--font-nunito) font-bold">
                        <span className="text-muted-foreground">Por</span>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={item.author.image} />
                          <AvatarFallback>??</AvatarFallback>
                        </Avatar>
                        <span className="font-black">{item.author.name}</span>
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
