import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const title = 'Crear una cuenta';
const description = 'Ingresa tus datos para comenzar.';
const SignUp = dynamic(() =>
  import('@repo/auth/components/sign-up').then((mod) => mod.SignUp)
);

export const metadata: Metadata = createMetadata({ title, description });

const SignUpPage = () => (
  <>
    <div className="flex flex-col space-y-2 text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
    <SignUp />
  </>
);

export default SignUpPage;
