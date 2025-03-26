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
import { FloatingContactButtons } from './components/floating-contact-buttons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NetFull',
  description: 'Internet de alta velocidad',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

type RootLayoutProperties = {
  readonly children: ReactNode;
  readonly params: Promise<{
    locale: string;
  }>;
};

const RootLayout = async ({ children, params }: RootLayoutProperties) => {
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
            <Footer />
            <FloatingContactButtons />
          </div>
        </DesignSystemProvider>
      </body>
    </html>
  );
};

export default RootLayout;
