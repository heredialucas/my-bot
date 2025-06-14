'use client';

import { useState } from 'react';
import { signUp } from '@repo/data-services/src/services/authService';
import { useRouter } from 'next/navigation';
import { Dictionary } from '@repo/internationalization';

interface SignUpProps {
    dictionary?: Dictionary;
}

export const SignUp = ({ dictionary }: SignUpProps) => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        const name = formData.get('name') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (!name || !lastName || !email || !password || !confirmPassword) {
            setError(dictionary?.app?.auth?.signUp?.errors?.emptyFields || 'Please complete all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError(dictionary?.app?.auth?.signUp?.errors?.passwordsDoNotMatch || 'Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const result = await signUp({
                name,
                lastName,
                email,
                password
            });

            if (result.success) {
                router.push('/sign-in');
            } else {
                if (result.error === 'EMAIL_ALREADY_EXISTS') {
                    setError(dictionary?.app?.auth?.signUp?.errors?.accountCreation || 'Email already exists');
                } else {
                    setError(result.message || dictionary?.app?.auth?.signUp?.errors?.accountCreation || 'Error creating account');
                }
            }

        } catch (err) {
            setError(dictionary?.app?.auth?.signUp?.errors?.generic || 'An error occurred while creating the account');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid gap-6">
            <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        {dictionary?.app?.auth?.signUp?.firstName || 'First Name'}
                    </label>
                    <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-md transition-colors ${loading
                        ? 'bg-gray-400 cursor-not-allowed opacity-60'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                    disabled={loading}
                >
                    {loading ?
                        (dictionary?.app?.auth?.signUp?.creating || 'Creating account...') :
                        (dictionary?.app?.auth?.signUp?.button || 'Create account')}
                </button>
            </form>
        </div>
    );
}; 