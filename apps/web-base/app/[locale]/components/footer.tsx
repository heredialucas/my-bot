'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Mail, Phone, ShoppingBag, Shield, CheckCircle } from 'lucide-react';
import logo from '@/public/logo.png';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Dictionary } from '@repo/internationalization';

// Simple data structure for saved food
const defaultFoodData = {
  location: '',
  date: '',
  price: 0,
  originalPrice: 0
};

// Use a fallback if the imported one isn't available yet
let savedFoodData;
try {
  savedFoodData = require('../(home)/components/hero').savedFoodData || defaultFoodData;
} catch (e) {
  savedFoodData = defaultFoodData;
}

type FooterProps = {
  dictionary?: Dictionary;
};

export const Footer = ({ dictionary }: FooterProps) => {
  const params = useParams();
  const locale = params.locale as string;

  // Determine if we're using English
  const isEnglish = locale === 'en';

  // Navigation labels
  const navLabels = {
    navigation: isEnglish ? "Navigation" : "Navegación",
    home: isEnglish ? "Home" : "Inicio",
    app: isEnglish ? "The App" : "La App",
    business: isEnglish ? "Business Solutions" : "Soluciones para Empresas",
    about: isEnglish ? "About Us" : "Sobre Nosotros",
    foodWaste: isEnglish ? "About Food Waste" : "Sobre desperdicio alimentario"
  };

  // Features labels
  const featureLabels = {
    features: isEnglish ? "Features" : "Características",
    savings: isEnglish ? "Save money" : "Ahorra dinero",
    ecofriendly: isEnglish ? "Eco-friendly" : "Ecológico",
    local: isEnglish ? "Support local businesses" : "Apoya negocios locales"
  };

  // Contact labels
  const contactLabels = {
    contact: isEnglish ? "Contact" : "Contacto",
    download: isEnglish ? "Download the App" : "Descarga la App"
  };

  // Footer labels
  const footerLabels = {
    rights: isEnglish ? "All rights reserved" : "Todos los derechos reservados",
    privacy: isEnglish ? "Privacy Policy" : "Política de Privacidad",
    terms: isEnglish ? "Terms and Conditions" : "Términos y Condiciones"
  };

  // Company description
  const companyDescription = isEnglish
    ? "We are fighting food waste by making surplus food from shops, restaurants and producers available to users at a lower price."
    : "Luchamos contra el desperdicio de alimentos haciendo que los excedentes de tiendas, restaurantes y productores estén disponibles para los usuarios a un precio más bajo.";

  return (
    <footer className="relative mt-24 border-t border-[#0d4b3d]/10 dark:border-[#0d4b3d]/30 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0d4b3d]/5 dark:bg-[#0d4b3d]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-[#0d4b3d]/5 dark:bg-[#0d4b3d]/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16">
          {/* Logo and description */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-2 items-center mb-6"
            >
              <div className="relative flex items-center">
                <Image
                  src={logo}
                  alt="Gangañam"
                  width={60}
                  height={60}
                  className="h-14 w-auto mr-[-7px]"
                />
                <span className="text-3xl font-bold text-[#0d4b3d] dark:text-white">angañam</span>
              </div>
            </motion.div>

            <p className="leading-relaxed max-w-sm text-gray-600 dark:text-gray-300">
              {companyDescription}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#0d4b3d] dark:text-gray-400 dark:hover:text-[#0d4b3d]/90 transition-colors"
              >
                <Facebook />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#0d4b3d] dark:text-gray-400 dark:hover:text-[#0d4b3d]/90 transition-colors"
              >
                <Instagram />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#0d4b3d] dark:text-gray-400 dark:hover:text-[#0d4b3d]/90 transition-colors"
              >
                <Linkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4 text-center md:text-left text-gray-800 dark:text-white">
              {navLabels.navigation}
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-[#0d4b3d] dark:hover:text-[#0d4b3d]/90 transition-colors"
                >
                  {navLabels.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#app`}
                  className="text-gray-600 dark:text-gray-300 hover:text-[#0d4b3d] dark:hover:text-[#0d4b3d]/90 transition-colors"
                >
                  {navLabels.app}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#business`}
                  className="text-gray-600 dark:text-gray-300 hover:text-[#0d4b3d] dark:hover:text-[#0d4b3d]/90 transition-colors"
                >
                  {navLabels.business}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#about`}
                  className="text-gray-600 dark:text-gray-300 hover:text-[#0d4b3d] dark:hover:text-[#0d4b3d]/90 transition-colors"
                >
                  {navLabels.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#food-waste`}
                  className="text-gray-600 dark:text-gray-300 hover:text-[#0d4b3d] dark:hover:text-[#0d4b3d]/90 transition-colors"
                >
                  {navLabels.foodWaste}
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4 text-center md:text-left text-gray-800 dark:text-white">
              {featureLabels.features}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 justify-center md:justify-start text-gray-600 dark:text-gray-300">
                <ShoppingBag className="w-4 h-4 text-[#0d4b3d]" />
                <span>{featureLabels.savings}</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start text-gray-600 dark:text-gray-300">
                <Shield className="w-4 h-4 text-[#0d4b3d]" />
                <span>{featureLabels.ecofriendly}</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-[#0d4b3d]" />
                <span>{featureLabels.local}</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4 text-center md:text-left text-gray-800 dark:text-white">
              {contactLabels.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-[#0d4b3d]" />
                <a
                  href="mailto:info@ganganam.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#0d4b3d] dark:hover:text-[#0d4b3d]/90 transition-colors"
                >
                  info@ganganam.com
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-[#0d4b3d]" />
                <a
                  href="tel:+34900123456"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#0d4b3d] dark:hover:text-[#0d4b3d]/90 transition-colors"
                >
                  +34 900 123 456
                </a>
              </li>
              <li className="mt-4">
                <Link
                  href={`/${locale}#app`}
                  className="bg-[#0d4b3d] hover:bg-[#0d4b3d]/90 text-white px-4 py-2 rounded-lg transition-colors inline-block"
                >
                  {contactLabels.download}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* App Stores */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 border-t border-[#0d4b3d]/10 py-8">
          <a href="#" className="block">
            <Image
              src="https://toogoodtogo.com/apple-app-store-badge-en.svg"
              alt="Download on App Store"
              width={140}
              height={42}
              className="h-10 w-auto"
            />
          </a>
          <a href="#" className="block">
            <Image
              src="https://toogoodtogo.com/google-play-badge-en.png"
              alt="Get it on Google Play"
              width={140}
              height={42}
              className="h-10 w-auto"
            />
          </a>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-[#0d4b3d]/10 py-8 text-center md:flex md:justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>© {new Date().getFullYear()} Gangañam. {footerLabels.rights}</div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-4 md:mt-0">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-[#0d4b3d] dark:hover:text-[#0d4b3d]/90 transition-colors"
            >
              {footerLabels.privacy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-[#0d4b3d] dark:hover:text-[#0d4b3d]/90 transition-colors"
            >
              {footerLabels.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
