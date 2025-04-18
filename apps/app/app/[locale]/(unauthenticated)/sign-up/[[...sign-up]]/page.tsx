import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { SignUp } from '../../components/sign-up';
import { getDictionary } from '@repo/internationalization';

const title = 'Create an account';
const description = 'Enter your details to start.';

export const metadata: Metadata = createMetadata({ title, description });

const SignUpPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {dictionary.app.auth.signUp.title || title}
        </h1>
        <p className="text-sm">{description}</p>
      </div>
      <SignUp dictionary={dictionary} />
    </>
  );
};

export default SignUpPage;
