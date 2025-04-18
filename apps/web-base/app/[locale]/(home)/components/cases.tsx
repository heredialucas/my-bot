'use client';

import type { Dictionary } from '@repo/internationalization';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../../../../animations/animations';

type CasesProps = {
  dictionary: Dictionary;
};

export const Cases = ({ dictionary }: CasesProps) => {

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="container mx-auto px-4 py-24 relative"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-400/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
      </div>

      {/* Encabezado */}
      <motion.div variants={fadeIn} className="text-center mb-16 relative">

        {/* Título centrado */}
        <h2
          id="projects"
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          {dictionary.web.home.cases.projectsTitle}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-6"></div>

        <p className="text-white/70 text-sm max-w-2xl mx-auto my-2">
          {dictionary.web.home.cases.subtitle}
        </p>
      </motion.div>

    </motion.section>
  );
};
