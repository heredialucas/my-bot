import { getDictionary } from '@repo/internationalization';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { AboutPageContent } from './components/AboutPageContent';

type AboutProps = {
    params: Promise<{
        locale: string;
    }>;
};

export const generateMetadata = async ({
    params,
}: AboutProps): Promise<Metadata> => {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return createMetadata({
        title: dictionary.web.about.metaTitle,
        description: dictionary.web.about.metaDescription,
    });
};

const About = async ({ params }: AboutProps) => {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return <AboutPageContent dictionary={dictionary} />;
};

export default About; 