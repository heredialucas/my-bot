import { showBetaFeature } from '@repo/feature-flags';
import { getDictionary } from '@repo/internationalization';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { Features } from './components/features/features';
import { Hero } from './components/hero/hero';
import { InternetAvailability } from './components/internet-availability/internet-availability';
import { FiberOpticInfo } from './components/fiber-optic-info';
import { CallToAction } from './components/call-to-action';
import { Faq } from './components/faq';

type HomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: HomeProps): Promise<Metadata> => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return createMetadata(dictionary.web.home.meta);
};

const Home = async ({ params }: HomeProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const betaFeature = await showBetaFeature();

  return (
    <>
      <Hero dictionary={dictionary} />
      <Features dictionary={dictionary} />
      <InternetAvailability dictionary={dictionary} />
      <FiberOpticInfo dictionary={dictionary} />
      <CallToAction dictionary={dictionary} />
      <Faq dictionary={dictionary} />
    </>
  );
};

export default Home;
