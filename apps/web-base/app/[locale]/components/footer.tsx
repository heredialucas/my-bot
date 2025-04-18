'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Facebook, Github, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export const Footer = ({ locale }: { locale: string }) => (
  <footer className="relative mt-24 border-t border-white/10 overflow-hidden">
    {/* Elementos decorativos */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-2xl"></div>
      <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
    </div>

    <div className="container mx-auto px-4">
      {/* Grid Principal */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16">
        {/* Logo y descripción - centrado en móvil */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-6 justify-center items-center"
          >
            <Image
              src='/logo.png'
              alt="AppWise Innovations - Consultora de Desarrollo de Software y MVPs"
              width={140}
              height={45}
              className="mb-6"
            />
          </motion.div>

          <p className="leading-relaxed max-w-sm">
            We transform innovative ideas into successful digital products.
            Specialized in MVP development and custom technological
            solutions.
          </p>
          <div className="flex gap-4 mt-6">
            <a
              href="https://www.facebook.com/profile.php?id=61558007701780"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              <Facebook />
            </a>
            <a
              href="https://github.com/AppWiseInnovations"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/company/appwise-innovations"
              target="_blank"
              rel="noopener noreferrer"
              className="/60 hover:text-blue-300 transition-colors"
            >
              <Linkedin />
            </a>
            <a
              href="https://www.instagram.com/consultora_software_appwise?igsh=ajBqeHlqNmp3aWM0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              <Instagram />
            </a>
          </div>
          <div className="flex gap-4 mt-6"></div>
        </div>

        {/* Enlaces rápidos - centrado en móvil */}
        <div className="md:col-span-2 flex flex-col items-center md:items-start">
          <h3 className=" font-semibold mb-4 text-center md:text-left">
            Services
          </h3>
          <ul className="space-y-3 text-center md:text-left">
            <li>
              <a
                href="https://wa.me/5493541286481"
                className="hover:text-blue-300 transition-colors"
              >
                MVP Development
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5493541286481"
                className="hover:text-blue-300 transition-colors"
              >
                IA Development
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5493541286481"
                className="hover:text-blue-300 transition-colors"
              >
                Consulting
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5493541286481"
                className="hover:text-blue-300 transition-colors"
              >
                UX/UI Design
              </a>
            </li>
          </ul>
        </div>

        {/* Contacto - centrado en móvil */}
        <div className="md:col-span-3 flex flex-col items-center md:items-start">
          <h3 className=" font-semibold mb-4 text-center md:text-left">
            Contact
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <Mail />
              <a
                href="mailto:appwise.innovations@gmail.com"
                className="hover:text-blue-300 transition-colors"
              >
                appwise.innovations@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <Phone />
              <a
                href="tel:+1234567890"
                className="hover:text-blue-300 transition-colors"
              >
                +54 9 3541 28-6481
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter - centrado en móvil */}
        <div className="md:col-span-3 flex flex-col items-center md:items-start">
          <h3 className=" font-semibold mb-4 text-center md:text-left">
            Newsletter
          </h3>
          <form className="space-y-3 w-full max-w-sm">
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-white/10 placeholder-black/40 focus:border-blue-400/50 focus:outline-none transition-colors"
              />
            </div>
            <button className="w-full px-4 py-2.5 bg-white/10 hover:bg-white/20  rounded-lg transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Separador */}
      <div className="border-t border-white/10"></div>

      {/* Footer inferior - mejor espaciado en móvil */}
      <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm /60">
        <div className="text-center">
          © {new Date().getFullYear()} AppWise Innovations. All rights
          reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <motion.a
            href={`/${locale}/legal`}
            className="hover:text-blue-300 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Privacy Policy
          </motion.a>
        </div>
      </div>
    </div>
  </footer>
);
