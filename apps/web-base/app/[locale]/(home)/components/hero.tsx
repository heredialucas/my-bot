'use client';

import type { Dictionary } from '@repo/internationalization';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { staggerContainer, fadeIn, slideIn } from '@/animations/animations';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type HeroProps = {
  dictionary: Dictionary;
};


export const Hero = ({ dictionary }: HeroProps) => {
  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="container mx-auto px-4 py-16 relative"
    >
      {/* Elementos decorativos específicos del hero */}
      <div className="absolute -top-10 right-1/4 w-20 h-20 bg-blue-300/20 dark:bg-blue-300/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-2xl"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div variants={slideIn}>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            variants={fadeIn}
          >
            {dictionary.web.home.hero.title}
          </motion.h1>
          <motion.p className="text-muted-foreground text-lg mb-4" variants={fadeIn}>
            {dictionary.web.home.hero.subtitle}
          </motion.p>
          <Link href="https://wa.me/5493541286481" target="_blank">
            <motion.button
              className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {dictionary.web.home.hero.cta}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section >
  );
};

