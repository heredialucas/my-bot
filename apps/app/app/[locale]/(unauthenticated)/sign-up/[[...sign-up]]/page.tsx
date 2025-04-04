import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
// Import from our custom components folder
import { SignUp } from '../../components/sign-up';

// Dynamic import from Clerk (commented out as requested)
// import dynamic from 'next/dynamic';
// const SignUp = dynamic(() =>
//   import('@repo/auth/components/sign-up').then((mod) => mod.SignUp)
// );

const title = 'Create an account';
const description = 'Enter your details to start.';

export const metadata: Metadata = createMetadata({ title, description });

const SignUpPage = () => (
  <>
    <div className="flex flex-col space-y-2 text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-sm">{description}</p>
    </div>
    <SignUp />
  </>
);

export default SignUpPage;
