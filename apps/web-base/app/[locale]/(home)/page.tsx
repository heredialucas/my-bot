import { showBetaFeature } from '@repo/feature-flags';
import { getDictionary } from '@repo/internationalization';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { FeaturesServer } from './components/features/featuresServer';
import { HeroServer } from './components/hero/heroServer';
import { InternetAvailabilityServer } from './components/internet-availability/internetAvailabilityServer';
import { FiberOpticInfoServer } from './components/fiber-optic-info/fiberOpticInfoServer';
import { CallToActionServer } from './components/call-to-action/callToActionServer';
import { FaqServer } from './components/faq/faqServer';

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
      <HeroServer dictionary={dictionary} />
      <FeaturesServer dictionary={dictionary} />
      <InternetAvailabilityServer dictionary={dictionary} />
      <FiberOpticInfoServer dictionary={dictionary} />
      <CallToActionServer dictionary={dictionary} />
      <FaqServer dictionary={dictionary} />
    </>
  );
};

export default Home;
