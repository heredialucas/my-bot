'use client';

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@repo/design-system/components/ui/carousel';
import type { Dictionary } from '@repo/internationalization';
import { Building2, FileSpreadsheet, Calculator, Building, BarChart4, Receipt, PiggyBank, Landmark } from 'lucide-react';
import { useEffect, useState } from 'react';

type CasesProps = {
  dictionary: Dictionary;
};

export const Cases = ({ dictionary }: CasesProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const icons = [
    Building2,
    FileSpreadsheet,
    Calculator,
    Building,
    BarChart4,
    Receipt,
    PiggyBank,
    Landmark
  ];

  const companyNames = [
    "Contax",
    "FiscalPro",
    "TaxExpert",
    "ContaPlus",
    "FiscalEase",
    "AuditMaster",
    "TaxWise",
    "FiscalTech"
  ];

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
    }, 2000);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-40 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="text-left font-black text-xl tracking-tighter md:text-5xl lg:max-w-xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
            {dictionary.web.home.cases.title}
          </h2>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {companyNames.map((name, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <CarouselItem className="basis-1/3 lg:basis-1/5" key={index}>
                    <div className="flex flex-col aspect-square items-center justify-center rounded-md bg-white border-2 border-[#FFB800] p-6 gap-3 shadow-sm">
                      <Icon className="h-8 w-8 text-[#FFB800]" />
                      <span className="text-sm font-black var(--font-nunito)">{name}</span>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
