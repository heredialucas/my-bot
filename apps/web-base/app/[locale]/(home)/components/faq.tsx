'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/design-system/components/ui/accordion';
import { Button } from '@repo/design-system/components/ui/button';
import type { Dictionary } from '@repo/internationalization';
import { MessageCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/animations';

type FAQProps = {
  dictionary: Dictionary;
};

export const FAQ = ({ dictionary }: FAQProps) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <motion.div
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-12"
        id="faq"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {dictionary.web.home.faq.title}
        </h2>
        <div className="w-20 h-1 bg-white/20 rounded-full mx-auto mb-4"></div>
        <p className="text-base text-muted-foreground">
          {dictionary.web.home.faq.description}
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
          <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-2">
            <HelpCircle className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold">
            {dictionary.web.home.faq.needMore}
          </h3>
          <p className="text-muted-foreground text-center lg:text-left mb-4">
            {dictionary.web.home.faq.contactDescription}
          </p>
          <Button className="gap-2 bg-blue-500 hover:bg-blue-600 text-white" asChild>
            <Link href="/contact">
              {dictionary.web.home.faq.cta}{' '}
              <MessageCircle className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <Accordion type="single" collapsible className="w-full">
            {dictionary.web.home.faq.items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`index-${index}`}
                className="mb-3 border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-muted-foreground">
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
