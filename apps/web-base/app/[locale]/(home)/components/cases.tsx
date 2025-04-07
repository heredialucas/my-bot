'use client';

import type { Dictionary } from '@repo/internationalization';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../lib/animations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useState } from 'react';

type CasesProps = {
  dictionary: Dictionary;
  projects: Project[];
};

type Project = {
  title: string;
  description: string;
  images: string[];
  status: 'finished' | 'in progress';
  size: 'medium' | 'small';
};

export const Cases = ({ dictionary, projects }: CasesProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="container mx-auto px-4 py-24 relative"
      id="projects"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-1/3 w-64 h-64 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/30 dark:bg-primary/20 rounded-full animate-ping"></div>
      </div>

      {/* Encabezado */}
      <motion.div variants={fadeIn} className="text-center mb-16 relative">
        {/* Frase flotante */}
        <span className="absolute -top-8 left-4 md:left-20 text-sm md:text-lg text-muted-foreground font-normal italic -rotate-12 origin-left">
          &quot;{dictionary.web.home.cases.quote}&quot;
        </span>

        {/* Título centrado */}
        <h2
          id="projects"
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          {dictionary.web.home.cases.projectsTitle}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-6"></div>

        <p className="text-muted-foreground text-sm max-w-2xl mx-auto my-2">
          {dictionary.web.home.cases.subtitle}
        </p>
      </motion.div>

      {/* Grid de proyectos */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Proyecto Principal (Medium) */}
        {projects.map((project, index) =>
          project.size === "medium" ? (
            <motion.div
              key={index}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/2 h-fit"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative cursor-pointer overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-border/80 transition-all duration-300 h-full">
                <div className="aspect-[3/2] relative">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    navigation={true}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    className="h-full project-slider"
                  >
                    {project.images.map((image, imageIndex) => (
                      <SwiperSlide key={imageIndex}>
                        <Image
                          src={image}
                          alt={`${project.title} - Imagen ${imageIndex + 1}`}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent z-10"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-2 h-2 rounded-full ${project.status === "finished"
                        ? "bg-success animate-pulse"
                        : "bg-blue-400 animate-pulse"
                        }`}
                    ></div>
                    <span className="text-xs text-muted-foreground capitalize">
                      {project.status === "finished"
                        ? dictionary.web.home.cases.projectStatus.finished
                        : dictionary.web.home.cases.projectStatus.inProgress}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-base font-semibold mb-2 text-foreground">
                    {project.title}
                  </h3>
                  <p className="hidden md:block text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : null
        )}

        {/* Grid de Proyectos Pequeños */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full md:w-1/2">
          {projects.map((project, index) =>
            project.size !== "medium" ? (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group h-fit"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative cursor-pointer overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-border/80 transition-all duration-300 h-full">
                  <div className="aspect-[3/2] relative">
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      pagination={{ clickable: true }}
                      navigation={true}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      className="h-full project-slider"
                    >
                      {project.images.map((image, imageIndex) => (
                        <SwiperSlide key={imageIndex}>
                          <Image
                            src={image}
                            alt={`${project.title} - Imagen ${imageIndex + 1
                              }`}
                            fill
                            className="object-contain object-center"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent z-10"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-2 h-2 rounded-full ${project.status === "finished"
                          ? "bg-success animate-pulse"
                          : "bg-blue-400 animate-pulse"
                          }`}
                      ></div>
                      <span className="text-xs text-muted-foreground capitalize">
                        {project.status === "finished"
                          ? dictionary.web.home.cases.projectStatus.finished
                          : dictionary.web.home.cases.projectStatus.inProgress}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-base font-semibold mb-2 text-foreground">
                      {project.title}
                    </h3>
                    <p className="hidden md:block text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : null
          )}
        </div>
      </div>
    </motion.section>
  );
};
