import '@repo/design-system/styles/globals.css';
import './styles/web-base.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { cn } from '@repo/design-system/lib/utils';
import { Toolbar } from '@repo/feature-flags/components/toolbar';
import { getDictionary } from '@repo/internationalization';
import type { ReactNode } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';

// Temporary component to replace CMS toolbar
const TemporaryCMSToolbar = () => (
  <div className="fixed bottom-4 right-4 bg-gray-100 p-4 rounded-lg shadow-lg">
    <p className="text-sm text-gray-600">CMS Toolbar - Pendiente de implementación</p>
  </div>
);

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
      lang="en"
      className={cn(fonts, 'scroll-smooth')}
      suppressHydrationWarning
    >
      <body>
        <DesignSystemProvider>
          <Header dictionary={dictionary} />
          {children}
          <Footer />
        </DesignSystemProvider>
        <Toolbar />
        <TemporaryCMSToolbar />
      </body>
    </html>
  );
};

export default RootLayout;
