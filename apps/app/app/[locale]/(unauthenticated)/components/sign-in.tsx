import { redirect } from 'next/navigation';
import { signIn } from '@repo/data-services/src/services/authService';
import { Dictionary } from '@repo/internationalization';
import { SignInButton } from './SignInButton';

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
                    <label htmlFor="email" className="text-sm font-medium">
                        {dictionary?.app?.auth?.signIn?.email || 'Email'}
                    </label>
                    <input
                        name="email"
                        type="email"
                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="email@example.com"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                        {dictionary?.app?.auth?.signIn?.password || 'Password'}
                    </label>
                    <input
                        name="password"
                        type="password"
                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <SignInButton dictionary={dictionary} />
            </form>
        </div>
    );
}; 