'use client';

import { Button } from '@repo/design-system/components/ui/button';
import type { Dictionary } from '@repo/internationalization';
import { PricingCard } from './pricing-card';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useServiceStore } from '@/store';

type FeaturesProps = {
  dictionary: Dictionary;
};

export const Features = ({ dictionary }: FeaturesProps) => {
  const [includeWifiExtender, setIncludeWifiExtender] = useState(false);
  const { selectedOption } = useServiceStore();

  // Check if TV is included in the selected option
  const includeInternetTV = selectedOption === 'internet-tv';

  const pricingData = [
    {
      discount: 12,
      months: 3,
      planType: 'Hogar',
      speed: 120,
      price: 14990,
      originalPrice: 16990,
    },
    {
      discount: 16,
      months: 4,
      planType: 'Profesional',
      speed: 300,
      price: 16780,
      originalPrice: 19990,
    },
    {
      discount: 19,
      months: 5,
      planType: 'Empresas',
      speed: 500,
      price: 19410,
      originalPrice: 23990,
    },
  ];

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Wifi Extender Option */}
        <div className="flex flex-col max-w-2xl mx-auto md:flex-row md:items-center md:justify-between px-5 py-5 border-4 border-dashed border-gray-300 rounded-3xl mb-10 relative">
          <div className="text-lg font-medium">{dictionary.web.home.cases.wifiExtender.question}</div>
          <div className="flex items-center mt-2 md:mt-0">
            <div className="mr-4">{dictionary.web.home.cases.wifiExtender.add} <span className="text-indigo-600 font-bold">{dictionary.web.home.cases.wifiExtender.price}</span>{dictionary.web.home.cases.wifiExtender.perMonth}</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeWifiExtender}
                onChange={(e) => setIncludeWifiExtender(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-sm peer-checked:bg-indigo-600 peer-checked:border-0 relative z-10 flex items-center justify-center after:content-['✓'] after:hidden peer-checked:after:block after:text-white after:text-xs"></div>
            </label>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pricingData.map((plan, index) => (
            <PricingCard
              key={index}
              discount={plan.discount}
              months={plan.months}
              planType={plan.planType}
              speed={plan.speed}
              price={plan.price}
              originalPrice={plan.originalPrice}
              includeWifiExtender={includeWifiExtender}
              includeInternetTV={includeInternetTV}
              showZappingButton={includeInternetTV}
              dictionary={dictionary}
            />
          ))}
        </div>

        {/* Info Boxes */}
        <div className="mt-8 space-y-5 max-w-2xl mx-auto">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between p-6 rounded-xl text-left border-2 hover:bg-gray-50"
            asChild
          >
            <a href="#">
              <span className="text-md ">{dictionary.web.home.cases.infoBoxes.billing}</span>
              <ChevronRight className="h-7 w-7 text-indigo-600" />
            </a>
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-between p-6 rounded-xl text-left border-2 hover:bg-gray-50"
            asChild
          >
            <a href="#">
              <span className="text-md ">{dictionary.web.home.cases.infoBoxes.fiberPlans}</span>
              <ChevronRight className="h-7 w-7 text-indigo-600" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
