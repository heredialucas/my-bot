import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const title = 'Bienvenido de nuevo';
const description = 'Ingresa tus datos para iniciar sesión.';
const SignIn = dynamic(() =>
  import('@repo/auth/components/sign-in').then((mod) => mod.SignIn)
);

export const metadata: Metadata = createMetadata({ title, description });

const SignInPage = () => (
  <>
    <div className="flex flex-col space-y-2 text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
    <SignIn />
  </>
);

export default SignInPage;
