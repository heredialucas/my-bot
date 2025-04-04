'use client';

import { useState } from 'react';
import { signUp } from '@repo/data-services/src/services/authService';
import { redirect } from 'next/navigation';

// Clerk component (commented out)
// import { SignUp as ClerkSignUp } from '@clerk/nextjs';

export const SignUp = () => {
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
            setError('Please complete all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
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
                redirect('/sign-in');
            } else {
                setError(result.message || 'Error creating account');
            }

        } catch (err) {
            setError('An error occurred while creating the account');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid gap-6">
            {/* Clerk component (commented out) */}
            {/* <ClerkSignUp appearance={{ elements: { header: 'hidden' } }} /> */}

            <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        First Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="First Name"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                    </label>
                    <input
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="Last Name"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
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
                        Password
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
                        Confirm Password
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
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Creating account...' : 'Create account'}
                </button>
            </form>
        </div>
    );
}; 