import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
// Import from our custom components folder
import { SignIn } from '../../components/sign-in';

// Dynamic import from Clerk (commented out as requested)
// import dynamic from 'next/dynamic';
// const SignIn = dynamic(() =>
//   import('@repo/auth/components/sign-in').then((mod) => mod.SignIn)
// );

const title = 'Log in';
const description = 'Enter your details to log in.';

export const metadata: Metadata = createMetadata({ title, description });

const SignInPage = () => (
  <>
    <div className="flex flex-col space-y-2 text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-sm">{description}</p>
    </div>
    <SignIn />
  </>
);

export default SignInPage;
