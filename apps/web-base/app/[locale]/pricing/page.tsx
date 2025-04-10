import { env } from '@/env';
import { Button } from '@repo/design-system/components/ui/button';
import { Check, Minus, MoveRight, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from '@repo/internationalization';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';

type PricingProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: PricingProps): Promise<Metadata> => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return createMetadata({
    title: dictionary.web.pricing.title,
    description: dictionary.web.pricing.description
  });
};

const Pricing = async ({ params }: PricingProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <div className="w-full py-20 lg:py-40 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <div className="flex flex-col gap-2">
            <h2 className="max-w-xl text-center font-black text-3xl tracking-tighter md:text-5xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
              {dictionary.web.pricing.title}
            </h2>
            <p className="max-w-xl text-center text-lg text-muted-foreground leading-relaxed tracking-tight var(--font-nunito)">
              {dictionary.web.pricing.description}
            </p>
          </div>
          <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6 pt-10">
            {/* Plan 1 */}
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-md border border-[#e0e0e0] overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-6">
                <p className="text-2xl font-black var(--font-nunito) text-[#FFB800]">{dictionary.web.pricing.plans[0].name}</p>
                <p className="text-muted-foreground text-sm mt-2 var(--font-nunito)">
                  {dictionary.web.pricing.plans[0].description}
                </p>
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-4xl font-black var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">${dictionary.web.pricing.plans[0].price}</span>
                  <span className="text-muted-foreground text-sm var(--font-nunito)">/ {dictionary.web.pricing.monthly}</span>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0" />
                    <span className="var(--font-nunito)">{dictionary.web.pricing.features.sso}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Minus className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span className="var(--font-nunito) text-gray-500">{dictionary.web.pricing.features.ai}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Minus className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span className="var(--font-nunito) text-gray-500">{dictionary.web.pricing.features.version}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0" />
                    <span className="var(--font-nunito)">{dictionary.web.pricing.features.members.replace('{count}', '5')}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 mt-4">
                <Button variant="outline" className="w-full gap-4 var(--font-nunito) font-bold" asChild>
                  {env.NEXT_PUBLIC_APP_URL && (
                    <Link href={env.NEXT_PUBLIC_APP_URL}>
                      {dictionary.web.pricing.tryIt} <MoveRight className="h-4 w-4" />
                    </Link>
                  )}
                </Button>
              </div>
            </div>

            {/* Plan 2 - Featured */}
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-lg border-2 border-[#FFB800] overflow-hidden transform transition-all hover:scale-105 relative">
              <div className="absolute top-0 right-0 bg-[#FFB800] text-black px-4 py-1 rounded-bl-xl var(--font-nunito) font-bold text-sm">
                {dictionary.web.pricing.popular}
              </div>
              <div className="p-6">
                <p className="text-2xl font-black var(--font-nunito) text-[#FFB800]">{dictionary.web.pricing.plans[1].name}</p>
                <p className="text-muted-foreground text-sm mt-2 var(--font-nunito)">
                  {dictionary.web.pricing.plans[1].description}
                </p>
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-4xl font-black var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">${dictionary.web.pricing.plans[1].price}</span>
                  <span className="text-muted-foreground text-sm var(--font-nunito)">/ {dictionary.web.pricing.monthly}</span>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0" />
                    <span className="var(--font-nunito)">{dictionary.web.pricing.features.sso}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0" />
                    <span className="var(--font-nunito)">{dictionary.web.pricing.features.ai}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0" />
                    <span className="var(--font-nunito)">{dictionary.web.pricing.features.version}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0" />
                    <span className="var(--font-nunito)">{dictionary.web.pricing.features.members.replace('{count}', '25')}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 mt-4">
                <Button className="w-full gap-4 bg-[#FFB800] hover:bg-[#FFE01B] text-black var(--font-nunito) font-black" asChild>
                  {env.NEXT_PUBLIC_APP_URL && (
                    <Link href={env.NEXT_PUBLIC_APP_URL}>
                      {dictionary.web.pricing.tryIt} <MoveRight className="h-4 w-4" />
                    </Link>
                  )}
                </Button>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-md border border-[#e0e0e0] overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg">
              <div className="p-6">
                <p className="text-2xl font-black var(--font-nunito) text-[#FFB800]">{dictionary.web.pricing.plans[2].name}</p>
                <p className="text-muted-foreground text-sm mt-2 var(--font-nunito)">
                  {dictionary.web.pricing.plans[2].description}
                </p>
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-4xl font-black var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">${dictionary.web.pricing.plans[2].price}</span>
                  <span className="text-muted-foreground text-sm var(--font-nunito)">/ {dictionary.web.pricing.monthly}</span>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0" />
                    <span className="var(--font-nunito)">{dictionary.web.pricing.features.sso}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0" />
                    <span className="var(--font-nunito)">{dictionary.web.pricing.features.ai}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0" />
                    <span className="var(--font-nunito)">{dictionary.web.pricing.features.version}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0" />
                    <span className="var(--font-nunito)">{dictionary.web.pricing.features.members.replace('{count}', '100+')}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 mt-4">
                <Button variant="outline" className="w-full gap-4 var(--font-nunito) font-bold" asChild>
                  <Link href="/contact">
                    {dictionary.web.pricing.contactUs} <PhoneCall className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
