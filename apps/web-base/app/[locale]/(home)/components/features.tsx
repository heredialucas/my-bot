'use client';

import type { Dictionary } from '@repo/internationalization';
import { User, FileSpreadsheet, BarChart3, Clock, Database, Code, PenTool, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../../../../animations/animations';

type FeaturesProps = {
  dictionary: Dictionary;
};

export const Features = ({ dictionary }: FeaturesProps) => {
  const features = [
    {
      icon: <Code className="w-6 h-6 text-foreground" />,
      title: dictionary.web.home.features.items[0].title,
      description: dictionary.web.home.features.items[0].description
    },
    {
      icon: <Globe className="w-6 h-6 text-foreground" />,
      title: dictionary.web.home.features.items[1].title,
      description: dictionary.web.home.features.items[1].description
    },
    {
      icon: <PenTool className="w-6 h-6 text-foreground" />,
      title: dictionary.web.home.features.items[2].title,
      description: dictionary.web.home.features.items[2].description
    },
    {
      icon: <Database className="w-6 h-6 text-foreground" />,
      title: dictionary.web.home.features.items[3].title,
      description: dictionary.web.home.features.items[3].description
    },
    {
      icon: <Clock className="w-6 h-6 text-foreground" />,
      title: dictionary.web.home.features.items[4].title,
      description: dictionary.web.home.features.items[4].description
    },
    {
      icon: <User className="w-6 h-6 text-foreground" />,
      title: dictionary.web.home.features.items[5].title,
      description: dictionary.web.home.features.items[5].description
    }
  ];

  return (
    <motion.section
      id="servicios"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="w-full py-20 lg:py-40 relative"
    >
      <div className="container mx-auto px-4">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-10 top-1/2 w-40 h-40 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute right-20 bottom-1/4 w-32 h-32 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-primary/40 dark:bg-primary/20 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-primary/20 dark:bg-primary/10 rounded-full"></div>
        </div>

        {/* Header */}
        <motion.div variants={fadeIn} className="text-center mb-16 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 var(--font-nunito)">
            {dictionary.web.home.features.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto var(--font-nunito)">
            {dictionary.web.home.features.description}
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
              className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border hover:border-border/80 transition-all group hover:transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-blue-500/20 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors var(--font-nunito)">
                {feature.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors var(--font-nunito)">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
