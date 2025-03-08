import { env } from '@/env';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import Link from 'next/link';
import type { ReactNode } from 'react';

type AuthLayoutProps = {
  readonly children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="grid w-full min-h-screen lg:grid-cols-2 bg-white dark:bg-black text-gray-900 dark:text-white">
    {/* Panel izquierdo (solo visible en desktop) */}
    <div className="hidden lg:flex flex-col justify-between bg-gray-100 dark:bg-zinc-900 p-10 relative overflow-hidden">
      <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200 dark:from-zinc-900 dark:via-zinc-900 dark:to-black z-0" />

      {/* Círculos decorativos */}
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#FFE01B]/10 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute right-32 top-1/3 w-96 h-96 bg-[#FFE01B]/10 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FFE01B]/10 rounded-full filter blur-3xl opacity-30" />

      {/* Logo */}
      <div className="relative z-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-[#FFE01B]">SOPY</span>
        </Link>
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Una plataforma para gestionar tu emprendimiento.
          </h1>
          <p className="text-lg mt-4 text-gray-700 dark:text-gray-300">
            Conectamos emprendedores con contadores para optimizar la gestión financiera y tributaria.
          </p>
        </div>
      </div>

      {/* Testimonial */}
      <div className="relative z-10 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 mt-8">
        <p className="text-gray-700 dark:text-gray-300 italic">
          "SOPY ha transformado cómo gestiono mi negocio. Ahora puedo dedicarme al crecimiento mientras mi contador maneja los números."
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFE01B]/30 flex items-center justify-center text-gray-900">
            LC
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Lucas Heredia</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Fundador, Appwise</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-sm text-gray-600 dark:text-zinc-400">
        <div className="flex justify-between items-center relative z-10 mt-8">
          <div>
            &copy; 2023 SOPY. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white">
              Términos
            </Link>
            <Link href="#" className="text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white">
              Privacidad
            </Link>
            <ModeToggle />
          </div>
        </div>
      </footer>
    </div>

    {/* Panel derecho (formulario) */}
    <div className="flex flex-col justify-center p-8 md:p-12 bg-white dark:bg-zinc-950">
      <div className="lg:hidden flex items-center justify-between mb-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl text-[#FFE01B]">SOPY</span>
        </Link>
        <ModeToggle />
      </div>

      <div className="max-w-md mx-auto w-full">
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
