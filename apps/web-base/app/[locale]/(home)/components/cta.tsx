'use client';

import type { Dictionary } from '@repo/internationalization';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../../animations/animations';
import { Calendar, CheckCircle } from 'lucide-react';

type CTAProps = {
  dictionary: Dictionary;
};

export const CTA = ({ dictionary }: CTAProps) => {
  // Hardcoded values as fallback if translations aren't available
  const title = dictionary.web.home.cta.calendly?.title || "Schedule a call";
  const subtitle = dictionary.web.home.cta.calendly?.subtitle || "30 minutes · Free";
  const benefits = dictionary.web.home.cta.calendly?.benefits || [
    "Know our process",
    "Solve your doubts",
    "Define the scope of your project"
  ];

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn}
          className="text-center max-w-2xl mx-auto mb-12"
          id="contact"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to make your idea a reality?
          </h2>
          <div className="w-20 h-1 bg-white/20 rounded-full mx-auto mb-4"></div>
          <p>
            Choose your preferred option to start your project
          </p>
        </motion.div>
        {/* Calendly */}
        <motion.div
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
          }}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-colors"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">
                {title}
              </h3>
              <p className="text-sm">{subtitle}</p>
            </div>
          </div>

          <div className="aspect-video rounded-xl overflow-hidden bg-white/5">
            <iframe
              src="https://calendly.com/appwise-innovations/30min"
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>
          </div>

          <div className="mt-6 space-y-4">
            {benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
