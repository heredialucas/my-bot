'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Textarea } from '@repo/design-system/components/ui/textarea';
import type { Dictionary } from '@repo/internationalization';
import { Facebook, Instagram, Mail, MessageSquare, Phone, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { contact } from '../actions/contact';
import keyboard from '@/public/keyboards.png'

type ContactFormProps = {
  dictionary: Dictionary;
};

export const ContactForm = ({ dictionary }: ContactFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await contact(name, email, message, phone);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch (err) {
      setError(dictionary.web.contact.hero.form.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-0 my-4 sm:m-8">
      <div className="rounded-3xl border-2 border-gray-100 overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-7 p-6 sm:p-8 md:p-12 lg:p-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              {dictionary.web.contact.hero.title}
            </h1>
            <p className="text-gray-600 mb-6 sm:mb-10 text-sm sm:text-base">
              {dictionary.web.contact.hero.description}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </div>
                <Input
                  type="text"
                  placeholder={dictionary.web.contact.hero.form.name}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 py-5 sm:py-6 bg-gray-50 text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </div>
                <Input
                  type="email"
                  placeholder={dictionary.web.contact.hero.form.email}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 py-5 sm:py-6 bg-gray-50 text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </div>
                <Input
                  type="tel"
                  placeholder={dictionary.web.contact.hero.form.phone}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 py-5 sm:py-6 bg-gray-50 text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <div className="absolute top-3 left-0 flex items-start pl-3 pointer-events-none">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </div>
                <Textarea
                  placeholder={dictionary.web.contact.hero.form.message}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="pl-10 min-h-[120px] sm:min-h-[150px] bg-gray-50 text-sm sm:text-base"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-5 sm:py-6 rounded-md flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                {dictionary.web.contact.hero.form.cta}
              </Button>

              {error && <p className="text-red-500 mt-2 text-sm sm:text-base">{error}</p>}
              {success && <p className="text-green-500 mt-2 text-sm sm:text-base">{dictionary.web.contact.hero.form.success}</p>}
            </form>
          </div>

          <div className="col-span-1 lg:col-span-5 bg-gray-100 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between">
            <div>
              <Image
                src={keyboard}
                alt="Contact support"
                width={500}
                height={300}
                className="rounded-lg mb-8 sm:mb-12"
              />
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-indigo-600 mb-3 sm:mb-4">{dictionary.web.contact.hero.social.title}</h3>
                <div className="flex gap-3">
                  <Link href="https://www.instagram.com/netfullfibra/" target="_blank" className="p-2 bg-white rounded-full">
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                  <Link href="https://www.facebook.com/people/NetFull-Fibra/61551999591754/" target="_blank" className="p-2 bg-white rounded-full">
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-indigo-600 mb-3 sm:mb-4">{dictionary.web.contact.hero.contact.title}</h3>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{dictionary.web.contact.hero.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{dictionary.web.contact.hero.contact.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
