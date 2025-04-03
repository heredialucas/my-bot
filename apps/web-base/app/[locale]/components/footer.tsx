import { env } from '@/env';
import { Status } from '@repo/observability/status';
import Link from 'next/link';
import { FileSpreadsheet, Mail, Phone } from 'lucide-react';

const LegalLinks = () => {
  const links = [
    { _slug: 'privacy', _title: 'Política de Privacidad' },
    { _slug: 'terms', _title: 'Términos y Condiciones' }
  ];

  return (
    <div className="flex gap-4">
      {links.map((link) => (
        <Link
          key={link._slug}
          href={`/legal/${link._slug}`}
          className="text-sm font-bold hover:underline var(--font-nunito) text-[#FFB800]"
        >
          {link._title}
        </Link>
      ))}
    </div>
  );
};

export const Footer = () => (
  <footer className="border-t py-10 bg-gray-50">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="h-8 w-8 text-[#FFB800]" />
            <h3 className="text-2xl font-black var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
              SOPY
            </h3>
          </div>
          <p className="text-sm text-muted-foreground var(--font-nunito)">
            Simplificando la gestión tributaria para contadores y sus clientes desde 2024.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-black var(--font-nunito)">Enlaces rápidos</h4>
          <div className="flex flex-col space-y-2">
            <Link href="/" className="text-sm var(--font-nunito) hover:text-[#FFB800]">Inicio</Link>
            <Link href="/pricing" className="text-sm var(--font-nunito) hover:text-[#FFB800]">Precios</Link>
            <Link href="/contact" className="text-sm var(--font-nunito) hover:text-[#FFB800]">Contacto</Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-black var(--font-nunito)">Contacto</h4>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#7dd3c8]" />
              <span className="text-sm var(--font-nunito)">info@sopy.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#7dd3c8]" />
              <span className="text-sm var(--font-nunito)">+56 2 2123 4567</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs text-muted-foreground var(--font-nunito) mb-4 md:mb-0">
          © {new Date().getFullYear()} SOPY. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-6">
          <Status />
          <LegalLinks />
        </div>
      </div>
    </div>
  </footer>
);
