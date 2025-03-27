import '@repo/design-system/styles/globals.css';
import './styles/web-base.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { cn } from '@repo/design-system/lib/utils';
import { getDictionary } from '@repo/internationalization';
import type { ReactNode } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { FloatingContactButtons } from './components/floatingContactBtn';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NetFull',
  description: 'Internet de alta velocidad. El mejor servicio de internet para tu hogar y empresa.',
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' }
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/logo.png' }
    ],
  },
};

type RootLayoutProperties = {
  readonly children: ReactNode;
  readonly modal: ReactNode;
  readonly params: Promise<{
    locale: string;
  }>;
};

const RootLayout = async ({ children, modal, params }: RootLayoutProperties) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <html
      lang="es"
      className={cn(fonts, 'scroll-smooth')}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden relative w-full">
        <DesignSystemProvider>
          <div className="overflow-x-hidden relative w-full">
            <Header dictionary={dictionary} />
            {children}
            {modal}
            <Footer />
            <FloatingContactButtons />
          </div>
        </DesignSystemProvider>
      </body>
    </html>
  );
};

export default RootLayout;
