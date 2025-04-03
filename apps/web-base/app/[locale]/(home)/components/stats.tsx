import type { Dictionary } from '@repo/internationalization';
import { BarChart4, FileText, Clock, Users } from 'lucide-react';

type StatsProps = {
  dictionary: Dictionary;
};

export const Stats = ({ dictionary }: StatsProps) => {
  const icons = [
    FileText,
    Users,
    Clock,
    BarChart4
  ];

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-left font-black text-xl tracking-tighter md:text-5xl lg:max-w-xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
                {dictionary.web.home.stats.title}
              </h2>
              <p className="text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-sm var(--font-nunito)">
                {dictionary.web.home.stats.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-2">
              {dictionary.web.home.stats.items.map((item, index) => {
                const Icon = icons[index];
                return (
                  <div
                    className="flex flex-col justify-between gap-0 rounded-md border-none bg-[#7dd3c8] p-6"
                    key={index}
                  >
                    <Icon className="mb-4 h-8 w-8 text-black" />
                    <div className="mt-auto">
                      <p className="max-w-xl text-left text-base font-black text-black leading-relaxed tracking-tight var(--font-nunito)">
                        {item}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
