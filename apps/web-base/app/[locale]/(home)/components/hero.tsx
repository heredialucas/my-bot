import { env } from '@/env';
import { Button } from '@repo/design-system/components/ui/button';
import type { Dictionary } from '@repo/internationalization';
import { MoveRight, PhoneCall } from 'lucide-react';
import Link from 'next/link';

type HeroProps = {
  dictionary: Dictionary;
};

export const Hero = ({ dictionary }: HeroProps) => {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-20">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            {dictionary.web.home.meta.title}
          </h1>
          <p className="text-balance text-xl text-muted-foreground">
            {dictionary.web.home.meta.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild>
              <Link href="/contact">
                <PhoneCall className="mr-2 h-4 w-4" />
                {dictionary.web.global.primaryCta}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog">
                {dictionary.web.global.secondaryCta}
                <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="h-64 w-full rounded-xl bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Contenido del Hero - Pendiente de implementación</p>
        </div>
      </div>
    </div>
  );
};

