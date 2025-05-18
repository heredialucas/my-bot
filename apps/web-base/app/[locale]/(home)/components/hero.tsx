'use client';

import type { Dictionary } from '@repo/internationalization';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { RecycleIcon, Leaf, Save } from 'lucide-react';
import logo from '@/public/logo.png';
import rubish from '@/public/rubish.png';
import background from '@/public/background.png';
import { staggerContainer, fadeIn, slideIn } from '../lib/animations';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type HeroProps = {
  dictionary: Dictionary;
};

export const Hero = ({ dictionary }: HeroProps) => {
  const [rotation, setRotation] = useState(0);
  const [bounce, setBounce] = useState(0);

  // Logo rotation animation
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 90) % 360);
    }, 1000);

    // Adding bounce animation to the right image
    const bounceInterval = setInterval(() => {
      setBounce(prev => prev === 0 ? 10 : 0);
    }, 1500);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(bounceInterval);
    };
  }, []);

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="min-h-[calc(100vh-4rem)] flex items-center relative px-4 overflow-hidden"
      id="inicio"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={background}
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-10 right-1/4 w-20 h-20 bg-[#0d4b3d]/20 dark:bg-[#0d4b3d]/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-1/3 w-32 h-32 bg-[#0d4b3d]/10 dark:bg-[#0d4b3d]/5 rounded-full blur-2xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div variants={slideIn} className="pt-8 md:pt-0">
            <motion.div
              className="flex items-center mb-8"
              variants={fadeIn}
            >
              <div className="relative flex items-center">
                <Image
                  src={logo}
                  alt="Gangañam"
                  width={120}
                  height={120}
                  className="w-auto h-24 transition-transform duration-300 mr-[-10px]"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
                <span className="text-4xl font-bold text-[#0d4b3d] dark:text-white">angañam</span>
              </div>
            </motion.div>
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center md:text-left"
              variants={fadeIn}
            >
              {dictionary.web.home.hero.title || "¡Rescata alimentos de calidad y ahorra con nosotros!"}
            </motion.h1>
            <motion.p className="text-gray-600 dark:text-gray-300 text-lg mb-8 text-center md:text-left" variants={fadeIn}>
              {dictionary.web.home.hero.subtitle || "Descubre una forma responsable y económica de disfrutar excelente comida. Con Gangañam conectamos personas con establecimientos locales para aprovechar excedentes de alimentos a precios increíbles, cuidando tanto tu bolsillo como el planeta."}
            </motion.p>
            <div className="flex justify-center md:justify-start">
              <Link href="#app" id="app">
                <motion.button
                  className="bg-[#0d4b3d] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#0d4b3d]/90 transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {dictionary.web.header.downloadApp || "Descarga la app"}
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.2 }
            }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{
                rotate: [0, 5, 0, -5, 0],
                y: [0, -bounce, 0],
                transition: {
                  rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                  y: { duration: 1.5, ease: "easeInOut" }
                }
              }}
              className="relative"
            >
              <Image
                src={rubish}
                alt="Comida salvada"
                width={500}
                height={500}
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 10, 0],
                  transition: { repeat: Infinity, duration: 3 }
                }}
                className="absolute -top-5 -right-5 bg-[#0d4b3d] dark:bg-[#0d4b3d] text-white p-3 rounded-full shadow-lg w-16 h-16 flex items-center justify-center"
              >
                <RecycleIcon className="w-10 h-10 text-white" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  transition: { repeat: Infinity, duration: 4, delay: 1 }
                }}
                className="absolute top-3/4 -left-5 bg-[#0d4b3d] dark:bg-[#0d4b3d] text-white p-3 rounded-full shadow-lg w-14 h-14 flex items-center justify-center"
              >
                <Leaf className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  transition: { repeat: Infinity, duration: 3.5, delay: 0.5 }
                }}
                className="absolute top-1/3 right-[-15px] bg-[#0d4b3d] dark:bg-[#0d4b3d] text-white p-2 rounded-full shadow-lg w-12 h-12 flex items-center justify-center"
              >
                <Save className="w-7 h-7 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

