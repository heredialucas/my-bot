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
import { Star, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../lib/animations';

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

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [api, current]);

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="w-full py-20 lg:py-40 relative"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-10 w-80 h-80 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-primary/20 dark:bg-primary/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div variants={fadeIn} className="flex flex-col gap-6 mb-12">
          <h2 className="text-center font-bold text-3xl md:text-4xl text-foreground var(--font-nunito)">
            {dictionary.web.home.testimonials.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-2"></div>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto text-lg var(--font-nunito)">
            {dictionary.web.home.testimonials.description}
          </p>
        </motion.div>

        <motion.div
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
          }}
          className="w-full"
        >
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {dictionary.web.home.testimonials.items.map((item, index) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/2 p-2" key={index}>
                  <div className="flex h-full flex-col justify-between rounded-xl bg-card/50 backdrop-blur-sm border border-border p-6 shadow-sm hover:border-border/80 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-primary/20" />
                    </div>

                    <div className="flex flex-col gap-4 flex-grow">
                      <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-foreground var(--font-nunito) mb-2">{item.title}</h3>
                        <p className="text-muted-foreground var(--font-nunito)">
                          "{item.description}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                      <Avatar className="h-10 w-10 border-2 border-primary/10">
                        <AvatarImage src={item.author.image} alt={item.author.name} />
                        <AvatarFallback className="bg-primary/10 text-primary-foreground">
                          {item.author.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground var(--font-nunito)">{item.author.name}</p>
                        <p className="text-sm text-muted-foreground var(--font-nunito)">Client</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </motion.section>
  );
};
