'use client';

import type { Dictionary } from '@repo/internationalization';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../lib/animations';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import logoWithBg from '@/public/logoWithBg.png';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type StatsProps = {
  dictionary: Dictionary;
};

export const Stats = ({ dictionary }: StatsProps) => {
  const steps = [
    {
      title: dictionary.web.home.stats.process?.[0]?.title || "Descarga la App",
      description: dictionary.web.home.stats.process?.[0]?.description || "Instala Gangañam en tu móvil y crea tu cuenta en segundos para comenzar a salvar comida."
    },
    {
      title: dictionary.web.home.stats.process?.[1]?.title || "Encuentra packs",
      description: dictionary.web.home.stats.process?.[1]?.description || "Explora los packs sorpresa disponibles cerca de ti y elige los que más te apetezcan."
    },
    {
      title: dictionary.web.home.stats.process?.[2]?.title || "Reserva y paga",
      description: dictionary.web.home.stats.process?.[2]?.description || "Haz tu reserva con un solo clic y paga directamente desde la app de forma segura."
    },
    {
      title: dictionary.web.home.stats.process?.[3]?.title || "Recoge y disfruta",
      description: dictionary.web.home.stats.process?.[3]?.description || "Pasa por el establecimiento a la hora indicada, muestra tu reserva y disfruta de tu deliciosa comida salvada."
    }
  ];

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="container mx-auto px-4 py-16 relative"
      id="app"
    >
      {/* Decorative elements */}
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#0d4b3d]/10 dark:bg-[#0d4b3d]/5 rounded-full blur-3xl"></div>
      <div className="absolute left-1/4 top-1/2 w-1 h-1 bg-[#0d4b3d]/40 dark:bg-[#0d4b3d]/20 rounded-full"></div>

      {/* Header */}
      <motion.div
        variants={fadeIn}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 var(--font-nunito)">
          {dictionary.web.home.stats.title || "Cómo funciona Gangañam"}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#0d4b3d]/70 to-[#0d4b3d] rounded-full mx-auto mb-6"></div>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto var(--font-nunito)">
          {dictionary.web.home.stats.description || "Es muy sencillo empezar a salvar comida con nuestra app. Sigue estos cuatro pasos y únete al movimiento contra el desperdicio alimentario"}
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={{
              initial: { opacity: 0, y: 50 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-[#0d4b3d]/10 dark:bg-[#0d4b3d]/20 rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-[#0d4b3d] dark:text-white">
                  {index + 1}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-full h-px bg-[#0d4b3d]/20 dark:bg-[#0d4b3d]/30 -translate-y-1/2"></div>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 var(--font-nunito)">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 var(--font-nunito) max-w-xs mx-auto">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* App Preview Image with animation */}
      <motion.div
        variants={fadeIn}
        className="mt-20 flex justify-center"
      >
        <motion.div
          className="relative max-w-sm lg:max-w-2xl"
          animate={{
            y: [0, -10, 0],
            transition: {
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            }
          }}
        >
          <Image
            src={logoWithBg}
            alt="Gangañam App"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
