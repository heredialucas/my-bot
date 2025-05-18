'use client';

import type { Dictionary } from '@repo/internationalization';
import { ShoppingBag, Leaf, Store, Clock, DollarSign, ShoppingBasket } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../lib/animations';

type FeaturesProps = {
  dictionary: Dictionary;
};

export const Features = ({ dictionary }: FeaturesProps) => {
  const features = [
    {
      icon: <ShoppingBag className="w-6 h-6 text-[#0d4b3d] dark:text-white" />,
      title: dictionary.web.home.features.items[0].title || "Ahorra hasta un 70% en comida deliciosa",
      description: dictionary.web.home.features.items[0].description || "Disfruta de alimentos de calidad a precios reducidos mientras contribuyes a evitar el desperdicio alimentario."
    },
    {
      icon: <Store className="w-6 h-6 text-[#0d4b3d] dark:text-white" />,
      title: dictionary.web.home.features.items[1].title || "Descubre comercios locales",
      description: dictionary.web.home.features.items[1].description || "Explora restaurantes, cafeterías, panaderías y supermercados cercanos que se unen a la lucha contra el desperdicio."
    },
    {
      icon: <Leaf className="w-6 h-6 text-[#0d4b3d] dark:text-white" />,
      title: dictionary.web.home.features.items[2].title || "Reduce tu huella ecológica",
      description: dictionary.web.home.features.items[2].description || "Cada compra con Gangañam ayuda a reducir las emisiones de CO2 y el uso de recursos naturales asociados al desperdicio."
    },
    {
      icon: <ShoppingBasket className="w-6 h-6 text-[#0d4b3d] dark:text-white" />,
      title: dictionary.web.home.features.items[3].title || "Packs sorpresa variados",
      description: dictionary.web.home.features.items[3].description || "Vive la emoción de descubrir qué contiene tu pack sorpresa mientras pruebas nuevos sabores y experiencias."
    },
    {
      icon: <Clock className="w-6 h-6 text-[#0d4b3d] dark:text-white" />,
      title: dictionary.web.home.features.items[4].title || "Recogida sencilla y rápida",
      description: dictionary.web.home.features.items[4].description || "Reserva en segundos y recoge tu pack en el horario indicado sin complicaciones ni largas esperas."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-[#0d4b3d] dark:text-white" />,
      title: dictionary.web.home.features.items[5].title || "Pago seguro integrado",
      description: dictionary.web.home.features.items[5].description || "Realiza el pago directamente desde la app de forma rápida y segura con múltiples métodos disponibles."
    }
  ];

  return (
    <motion.section
      id="about"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="w-full py-20 lg:py-40 relative bg-[#0d4b3d]/5 dark:bg-[#0d4b3d]/10"
    >
      <div className="container mx-auto px-4">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-10 top-1/2 w-40 h-40 bg-[#0d4b3d]/20 dark:bg-[#0d4b3d]/10 rounded-full blur-2xl"></div>
          <div className="absolute right-20 bottom-1/4 w-32 h-32 bg-[#0d4b3d]/10 dark:bg-[#0d4b3d]/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-[#0d4b3d]/40 dark:bg-[#0d4b3d]/20 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-[#0d4b3d]/20 dark:bg-[#0d4b3d]/10 rounded-full"></div>
        </div>

        {/* Header */}
        <motion.div variants={fadeIn} className="text-center mb-16 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 var(--font-nunito)">
            {dictionary.web.home.features.title || "Por qué usar Gangañam"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0d4b3d]/70 to-[#0d4b3d] rounded-full mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto var(--font-nunito)">
            {dictionary.web.home.features.description || "Únete a nuestra comunidad de salvadores de comida y disfruta de estos increíbles beneficios mientras haces algo bueno por el planeta"}
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-[#0d4b3d]/20 dark:border-[#0d4b3d]/30 hover:border-[#0d4b3d]/40 dark:hover:border-[#0d4b3d]/50 transition-all hover:shadow-xl transform hover:scale-105 shadow-lg"
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.3 }
              }}
            >
              <div className="w-12 h-12 bg-[#0d4b3d]/10 dark:bg-[#0d4b3d]/20 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 transition-transform var(--font-nunito)">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors var(--font-nunito)">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
