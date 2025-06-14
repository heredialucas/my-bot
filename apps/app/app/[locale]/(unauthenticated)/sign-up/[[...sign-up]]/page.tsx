import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { SignUp } from '../../components/sign-up';
import { getDictionary } from '@repo/internationalization';

const title = 'Create an account';
const description = 'Enter your details to start.';

export const metadata: Metadata = createMetadata({ title, description });

const SignUpPage = async ({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) => {
  const { locale } = await params;
  const { error } = await searchParams;
  const dictionary = await getDictionary(locale);

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'empty-fields':
        return dictionary.app.auth.signUp.errors.emptyFields || 'Please complete all fields';
      case 'passwords-mismatch':
        return dictionary.app.auth.signUp.errors.passwordsDoNotMatch || 'Passwords do not match';
      case 'email-exists':
        return dictionary.app.auth.signUp.errors.accountCreation || 'Email already exists';
      case 'creation-failed':
        return dictionary.app.auth.signUp.errors.accountCreation || 'Error creating account';
      case 'generic':
        return dictionary.app.auth.signUp.errors.generic || 'An error occurred while creating the account';
      default:
        return null;
    }
  };

  const errorMessage = error ? getErrorMessage(error) : null;

  return (
    <>
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {dictionary.app.auth.signUp.title || title}
        </h1>
        <p className="text-sm">{description}</p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-3 rounded-md bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      <SignUp dictionary={dictionary} error={error} />
    </>
  );
};

export default SignUpPage;
