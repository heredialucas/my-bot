import { env } from '@/env';
import { Button } from '@repo/design-system/components/ui/button';
import type { Dictionary } from '@repo/internationalization';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

type CTAProps = {
  dictionary: Dictionary;
};

export const CTA = ({ dictionary }: CTAProps) => (
  <div className="w-full py-20 lg:py-40 bg-gray-50">
    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-8 rounded-md bg-[#7dd3c8] p-4 text-center lg:p-14">
        <div className="flex flex-col gap-2">
          <h3 className="max-w-xl font-black text-3xl tracking-tighter md:text-5xl text-black var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
            {dictionary.web.home.cta.title}
          </h3>
          <p className="max-w-xl text-lg text-black leading-relaxed tracking-tight var(--font-nunito) font-bold">
            {dictionary.web.home.cta.description}
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <Button className="gap-4 bg-[#FFB800] hover:bg-[#FFE01B] text-black var(--font-nunito) font-black" asChild>
            <Link href={env.NEXT_PUBLIC_APP_URL}>
              {dictionary.web.global.secondaryCta}{' '}
              <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);
