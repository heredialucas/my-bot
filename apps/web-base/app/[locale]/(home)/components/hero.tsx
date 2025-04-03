import { env } from '@/env';
import { Button } from '@repo/design-system/components/ui/button';
import type { Dictionary } from '@repo/internationalization';
import { MoveRight, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';

type HeroProps = {
  dictionary: Dictionary;
};

export const Hero = ({ dictionary }: HeroProps) => {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <div className="flex flex-col gap-8 text-left">
          <h1 className="text-balance text-4xl font-black tracking-tight sm:text-6xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
            {dictionary.web.home.meta.title}
          </h1>
          <p className="text-balance text-xl text-muted-foreground var(--font-nunito)">
            {dictionary.web.home.meta.description}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button className="bg-[#FFB800] hover:bg-[#FFE01B] text-black var(--font-nunito) font-black" asChild>
              <Link href={env.NEXT_PUBLIC_APP_URL}>
                {dictionary.web.global.secondaryCta}
                <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-xl bg-[#7dd3c8] flex items-center justify-center p-8 h-[400px]">
          <div className="bg-white/90 rounded-lg p-8 shadow-lg w-full max-w-md transform -translate-y-10">
            <div className="flex flex-col items-center gap-6">
              <FileSpreadsheet className="h-20 w-20 text-[#FFB800]" />
              <div className="text-center var(--font-nunito)">
                <h3 className="text-5xl font-black mb-2 tracking-[6px] text-[#FFB800]">SOPY</h3>
                <p className="text-gray-700 text-lg">Simplifica la gestión tributaria para contadores y sus clientes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

