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
import { CalendarIcon, Check, MoveRight, FileSpreadsheet, Mail } from 'lucide-react';
import { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';

type ContactFormProps = {
  dictionary: Dictionary;
};

interface FormData {
  nombre: string;
  email: string;
  mensaje: string;
}

interface StatusMessage {
  type: 'success' | 'error' | '';
  message: string;
}

export const ContactForm = ({ dictionary }: ContactFormProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [status, setStatus] = useState<StatusMessage>({
    type: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Aquí iría la lógica para enviar el formulario - se implementará después
      // Simulamos el envío exitoso
      setTimeout(() => {
        setStatus({
          type: 'success',
          message: 'Your message has been sent successfully!'
        });
        setFormData({
          nombre: '',
          email: '',
          mensaje: ''
        });
        setSending(false);
      }, 1500);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
      setSending(false);
    }
  };

  return (
    <div className="w-full py-20 lg:py-40 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="max-w-xl text-left font-black text-3xl tracking-tighter md:text-5xl var(--font-nunito) text-foreground">
                  {dictionary.web.contact.meta.title}
                </h4>
                <p className="max-w-sm text-left text-lg text-muted-foreground leading-relaxed tracking-tight var(--font-nunito)">
                  {dictionary.web.contact.meta.description}
                </p>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-6 shadow-md">
              {[
                ...dictionary.web.contact.hero.benefits.slice(0, 3)
              ].map((benefit, index) => (
                <div
                  className="flex flex-row items-start gap-4 py-3 border-b border-border last:border-0"
                  key={index}
                >
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="var(--font-nunito) font-bold text-foreground">{benefit.title}</p>
                    <p className="text-muted-foreground text-sm var(--font-nunito)">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center shadow-md">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-black var(--font-nunito) text-foreground">AppWise</h3>
                <p className="text-sm text-muted-foreground var(--font-nunito)">Transformando ideas en soluciones digitales</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="w-full max-w-md bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-border/80 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Contact us</h3>
                  <p className="text-muted-foreground text-sm">We respond in 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                    className="w-full px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground/60 rounded-xl border border-border focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    className="w-full px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground/60 rounded-xl border border-border focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Tell us about your project"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground/60 rounded-xl border border-border focus:border-primary/50 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                {status.type && (
                  <div
                    className={`p-4 rounded-xl ${status.type === "success"
                      ? "bg-green-500/10"
                      : "bg-red-500/10"
                      }`}
                  >
                    <p
                      className={`text-sm ${status.type === "success"
                        ? "text-green-400"
                        : "text-red-400"
                        }`}
                    >
                      {status.message}
                    </p>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={sending}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  {sending ? "Sending..." : "Send message"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
