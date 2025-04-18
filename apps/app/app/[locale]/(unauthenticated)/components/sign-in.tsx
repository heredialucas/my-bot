'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@repo/data-services/src/services/authService';
import { Dictionary } from '@repo/internationalization';

interface SignInProps {
    dictionary?: Dictionary;
}

export const SignIn = ({ dictionary }: SignInProps) => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
            setError(dictionary?.app?.auth?.signIn?.errors?.emptyFields || 'Please complete all fields');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const result = await signIn({ email, password });

            if (result.success) {
                router.push('/');
            } else {
                setError(result.message || dictionary?.app?.auth?.signIn?.errors?.invalidCredentials || 'Error signing in');
            }
        } catch (err) {
            setError(dictionary?.app?.auth?.signIn?.errors?.generic || 'An error occurred while signing in');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid gap-6">
            <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        {dictionary?.app?.auth?.signIn?.email || 'Email'}
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    disabled={loading}
                >
                    {loading ?
                        (dictionary?.app?.auth?.signIn?.signing || 'Signing in...') :
                        (dictionary?.app?.auth?.signIn?.button || 'Sign in')}
                </button>
            </form>
        </div>
    );
}; 