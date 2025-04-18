import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { SignIn } from '../../components/sign-in';
import { getDictionary } from '@repo/internationalization';

const title = 'Log in';
const description = 'Enter your details to log in.';

export const metadata: Metadata = createMetadata({ title, description });

const SignInPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {dictionary.app.auth.signIn.title || title}
        </h1>
        <p className="text-sm">{description}</p>
      </div>
      <SignIn dictionary={dictionary} />
    </>
  );
};

export default SignInPage;
