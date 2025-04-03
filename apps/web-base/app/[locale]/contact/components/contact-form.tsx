'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Calendar } from '@repo/design-system/components/ui/calendar';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/design-system/components/ui/popover';
import { cn } from '@repo/design-system/lib/utils';
import type { Dictionary } from '@repo/internationalization';
import { format } from 'date-fns';
import { CalendarIcon, Check, MoveRight, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';

type ContactFormProps = {
  dictionary: Dictionary;
};

export const ContactForm = ({ dictionary }: ContactFormProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-full py-20 lg:py-40 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="max-w-xl text-left font-black text-3xl tracking-tighter md:text-5xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
                  {dictionary.web.contact.meta.title}
                </h4>
                <p className="max-w-sm text-left text-lg text-muted-foreground leading-relaxed tracking-tight var(--font-nunito)">
                  {dictionary.web.contact.meta.description}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[#e0e0e0] p-6 shadow-md">
              {[
                ...dictionary.web.contact.hero.benefits.slice(0, 3)
              ].map((benefit, index) => (
                <div
                  className="flex flex-row items-start gap-4 py-3 border-b border-gray-100 last:border-0"
                  key={index}
                >
                  <div className="h-8 w-8 rounded-full bg-[#7dd3c8]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-[#7dd3c8]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="var(--font-nunito) font-bold text-gray-800">{benefit.title}</p>
                    <p className="text-muted-foreground text-sm var(--font-nunito)">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div className="h-14 w-14 rounded-xl bg-[#FFB800] flex items-center justify-center shadow-md">
                <FileSpreadsheet className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black var(--font-nunito)">SOPY</h3>
                <p className="text-sm text-muted-foreground var(--font-nunito)">Simplificando la gestión tributaria</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex w-full max-w-md flex-col gap-6 rounded-xl bg-white border border-[#e0e0e0] p-8 shadow-lg transform transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="h-10 w-10 rounded-full bg-[#FFB800]/20 flex items-center justify-center">
                  <CalendarIcon className="h-5 w-5 text-[#FFB800]" />
                </div>
                <h5 className="text-xl font-black var(--font-nunito) text-gray-800">{dictionary.web.contact.hero.form.title}</h5>
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture" className="var(--font-nunito) font-bold text-gray-700">
                  {dictionary.web.contact.hero.form.date}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal var(--font-nunito) rounded-lg border-gray-300',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#7dd3c8]" />
                      {date ? (
                        format(date, 'PPP')
                      ) : (
                        <span>{dictionary.web.contact.hero.form.date}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname" className="var(--font-nunito) font-bold text-gray-700">
                  {dictionary.web.contact.hero.form.firstName}
                </Label>
                <Input
                  id="firstname"
                  type="text"
                  className="var(--font-nunito) rounded-lg border-gray-300 focus:border-[#7dd3c8] focus:ring-[#7dd3c8]"
                  placeholder="Ingrese su nombre"
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastname" className="var(--font-nunito) font-bold text-gray-700">
                  {dictionary.web.contact.hero.form.lastName}
                </Label>
                <Input
                  id="lastname"
                  type="text"
                  className="var(--font-nunito) rounded-lg border-gray-300 focus:border-[#7dd3c8] focus:ring-[#7dd3c8]"
                  placeholder="Ingrese su apellido"
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture" className="var(--font-nunito) font-bold text-gray-700">
                  {dictionary.web.contact.hero.form.resume}
                </Label>
                <div className="relative">
                  <Input
                    id="picture"
                    type="file"
                    className="var(--font-nunito) rounded-lg border-gray-300 focus:border-[#7dd3c8] focus:ring-[#7dd3c8]"
                  />
                </div>
              </div>

              <Button className="w-full gap-4 bg-[#FFB800] hover:bg-[#FFE01B] text-black var(--font-nunito) font-black rounded-lg mt-4 py-6">
                {dictionary.web.contact.hero.form.cta}{' '}
                <MoveRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
