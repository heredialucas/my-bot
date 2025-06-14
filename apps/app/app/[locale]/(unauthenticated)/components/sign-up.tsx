import { redirect } from 'next/navigation';
import { signUp } from '@repo/data-services/src/services/authService';
import { Dictionary } from '@repo/internationalization';
import { SignUpButton } from './SignUpButton';

interface SignUpProps {
    dictionary?: Dictionary;
    error?: string;
}

async function handleSignUp(formData: FormData) {
    'use server';

    const name = formData.get('name') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    console.log('Sign up attempt:', { name, lastName, email });

    if (!name || !lastName || !email || !password || !confirmPassword) {
        console.log('Missing fields');
        redirect('/sign-up?error=' + encodeURIComponent('Please complete all fields'));
    }

    if (password !== confirmPassword) {
        console.log('Passwords do not match');
        redirect('/sign-up?error=' + encodeURIComponent('Passwords do not match'));
    }

    try {
        console.log('Calling signUp service...');
        const result = await signUp({
            name,
            lastName,
            email,
            password
        });

        console.log('SignUp result:', result);

        if (result.success) {
            console.log('Account created successfully, redirecting to sign-in...');
            redirect('/sign-in');
        } else {
            console.log('SignUp failed:', result.error);
            redirect('/sign-up?error=' + encodeURIComponent(result.message || 'Error creating account'));
        }
    } catch (err) {
        // No capturar NEXT_REDIRECT como error
        if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) {
            console.log('Redirect successful');
            throw err; // Re-throw para que Next.js maneje el redirect
        }
        console.error('Real sign up error:', err);
        redirect('/sign-up?error=' + encodeURIComponent('An error occurred while creating the account'));
    }
}

export const SignUp = ({ dictionary, error }: SignUpProps) => {
    return (
        <div className="grid gap-6">
            <form action={handleSignUp} className="space-y-4">
                {error && (
                    <div className="p-3 rounded-md bg-red-50 border border-red-200">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        {dictionary?.app?.auth?.signUp?.firstName || 'First Name'}
                    </label>
                    <input
                        name="name"
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder={dictionary?.app?.auth?.signUp?.firstName || 'First Name'}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                        {dictionary?.app?.auth?.signUp?.lastName || 'Last Name'}
                    </label>
                    <input
                        name="lastName"
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder={dictionary?.app?.auth?.signUp?.lastName || 'Last Name'}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        {dictionary?.app?.auth?.signUp?.email || 'Email'}
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
                        {dictionary?.app?.auth?.signUp?.password || 'Password'}
                    </label>
                    <input
                        name="password"
                        type="password"
                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                        {dictionary?.app?.auth?.signUp?.confirmPassword || 'Confirm Password'}
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <SignUpButton dictionary={dictionary} />
            </form>
        </div>
    );
}; 