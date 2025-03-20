import type { Dictionary } from '@repo/internationalization';
import { User } from 'lucide-react';

type FeaturesProps = {
  dictionary: Dictionary;
};

export const Features = ({ dictionary }: FeaturesProps) => {
  const featureItems = Array.isArray(dictionary.web.home.features.items)
    ? dictionary.web.home.features.items
    : Object.values(dictionary.web.home.features.items || {});

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                {dictionary.web.home.features.title}
              </h2>
              <p className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg">
                {dictionary.web.home.features.description}
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featureItems.map((feature: any, index: number) => (
              <div
                className="flex flex-col justify-between gap-4 rounded-md border p-6 md:col-span-1"
                key={index}
              >
                <div className="flex w-fit items-center justify-center rounded-full bg-primary p-4">
                  <User className="h-4 w-4 stroke-primary-foreground" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="max-w-xl text-base text-muted-foreground leading-relaxed tracking-tight">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
