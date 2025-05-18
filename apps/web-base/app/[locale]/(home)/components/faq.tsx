'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/design-system/components/ui/accordion';
import { Button } from '@repo/design-system/components/ui/button';
import type { Dictionary } from '@repo/internationalization';
import { MessageCircle, HelpCircle, Leaf, RecycleIcon, Utensils, Clock, DollarSign, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/animations';

type FAQProps = {
  dictionary: Dictionary;
  locale: string;
};

// Sample FAQ items to use if dictionary doesn't have them
const sampleFaqItems = [
  {
    question: "¿Cómo funciona Gangañam?",
    answer: "Gangañam conecta a usuarios con restaurantes, cafeterías y tiendas que tienen excedentes de comida. Estos establecimientos crean packs sorpresa con sus productos sobrantes del día, que puedes reservar a través de la app a un precio reducido y recoger en el horario indicado."
  },
  {
    question: "¿Qué tipo de comida puedo encontrar?",
    answer: "Puedes encontrar todo tipo de alimentos: desde platos preparados de restaurantes, sándwiches y ensaladas de cafeterías, productos de panadería, hasta frutas, verduras y otros productos de supermercados. El contenido es sorpresa, pero siempre de calidad."
  },
  {
    question: "¿Cómo sé que la comida está en buen estado?",
    answer: "Todos los establecimientos asociados a Gangañam cumplen con las normativas de seguridad alimentaria. La comida que se ofrece es perfectamente apta para el consumo, simplemente son excedentes que de otra forma se desperdiciarían. No se trata de comida caducada."
  },
  {
    question: "¿Puedo elegir lo que viene en mi pack de Gangañam?",
    answer: "Los packs son sorpresa, lo que forma parte de la experiencia Gangañam. Sin embargo, en la descripción de cada establecimiento puedes ver qué tipo de productos suelen ofrecer para hacerte una idea del contenido."
  },
  {
    question: "¿Cómo pago por mi pedido en Gangañam?",
    answer: "El pago se realiza directamente a través de la aplicación Gangañam mediante tarjeta de crédito/débito o PayPal de forma segura. Una vez confirmado el pago, recibirás un recibo digital que deberás mostrar al recoger tu pedido."
  },
  {
    question: "¿Qué ocurre si no puedo recoger mi pedido de Gangañam?",
    answer: "Es importante recoger tu pedido en el horario establecido. Si sabes que no podrás recogerlo, debes cancelarlo con al menos 2 horas de antelación para recibir un reembolso. Si no recoges tu pedido sin previo aviso, no se realizará ningún reembolso."
  }
];

export const FAQ = ({ dictionary, locale }: FAQProps) => {
  // Create WhatsApp message 
  const getWhatsAppMessage = () => {
    return "¡Hola! Tengo preguntas sobre la app de Gangañam para salvar comida. Me interesa saber más sobre cómo funciona y cómo puedo empezar a usarla. ¡Gracias!";
  };

  // Get FAQ items from dictionary if available, otherwise use samples
  const faqItems = dictionary.web.home.faq?.items?.length > 0
    ? dictionary.web.home.faq.items
    : sampleFaqItems;

  return (
    <div className="w-full py-20 lg:py-40" id="food-waste">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            {dictionary.web.home.faq?.title || "Preguntas frecuentes"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0d4b3d]/70 to-[#0d4b3d] rounded-full mx-auto mb-4"></div>
          <p className="text-base text-gray-600 dark:text-gray-300">
            {dictionary.web.home.faq?.description || "Respuestas a las dudas más comunes sobre Gangañam y cómo puedes comenzar a salvar comida"}
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col gap-6 items-center lg:items-start"
          >
            <div className="w-16 h-16 bg-[#0d4b3d]/10 dark:bg-[#0d4b3d]/30 rounded-xl flex items-center justify-center mb-2">
              <HelpCircle className="w-8 h-8 text-[#0d4b3d] dark:text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              {dictionary.web.home.faq?.needMore || "¿Necesitas más información?"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center lg:text-left mb-4">
              {dictionary.web.home.faq?.contactDescription || "Contáctanos si tienes dudas sobre cómo usar Gangañam o quieres saber más sobre cómo puedes unirte al movimiento contra el desperdicio alimentario"}
            </p>
            <Button className="gap-2 bg-[#0d4b3d] hover:bg-[#0d4b3d]/80 text-white shadow-md" asChild>
              <Link href={`/${locale}/contact`}>
                {dictionary.web.home.faq?.cta || "Contáctanos"}{' '}
                <MessageCircle className="h-4 w-4" />
              </Link>
            </Button>

            <div className="flex gap-6 mt-8 justify-center lg:justify-start">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-[#0d4b3d]/10 dark:bg-[#0d4b3d]/30 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-[#0d4b3d] dark:text-white" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Ecológico</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-[#0d4b3d]/10 dark:bg-[#0d4b3d]/30 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#0d4b3d] dark:text-white" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Ahorro</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-[#0d4b3d]/10 dark:bg-[#0d4b3d]/30 rounded-full flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-[#0d4b3d] dark:text-white" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Delicioso</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`index-${index}`}
                  className="mb-3 border border-[#0d4b3d]/20 dark:border-[#0d4b3d]/40 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
