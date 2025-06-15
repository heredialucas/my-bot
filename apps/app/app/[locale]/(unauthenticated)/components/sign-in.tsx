import { redirect } from 'next/navigation';
import { signIn } from '@repo/data-services/src/services/authService';
import { Dictionary } from '@repo/internationalization';
import { SignInButton } from './SignInButton';
import Link from 'next/link';

interface SignInProps {
    dictionary?: Dictionary;
}

async function handleSignIn(formData: FormData) {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log('Sign in attempt:', { email });

    if (!email || !password) {
        console.log('Missing email or password');
        return;
    }

    try {
        console.log('Calling signIn service...');
        const result = await signIn({ email, password });

        console.log('SignIn result:', result);

        if (result.success) {
            console.log('Sign in successful, redirecting to dashboard...');
            redirect('/admin/dashboard');
        } else {
            console.log('Sign in failed:', result.message);
        }
    } catch (err) {
        // No capturar NEXT_REDIRECT como error
        if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) {
            console.log('Redirect successful');
            throw err; // Re-throw para que Next.js maneje el redirect
        }
        console.error('Real sign in error:', err);
    }
}

export const SignIn = ({ dictionary }: SignInProps) => {
    return (
        <div className="grid gap-6">
            <form action={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-white">
                        {dictionary?.app?.auth?.signIn?.email || 'Correo Electrónico'}
                    </label>
                    <input
                        name="email"
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="correo@ejemplo.com"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-900 dark:text-white">
                        {dictionary?.app?.auth?.signIn?.password || 'Contraseña'}
                    </label>
                    <input
                        name="password"
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <SignInButton dictionary={dictionary} />
            </form>

            {/* Navigation to Sign Up */}
            <div className="text-center">
                <Link
                    href="/sign-up"
                    className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                >
                    {dictionary?.app?.auth?.signIn?.goToSignUp || '¿No tienes cuenta? Crear cuenta'}
                </Link>
            </div>
        </div>
    );
}; 