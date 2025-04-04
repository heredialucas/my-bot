'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@repo/data-services/src/services/authService';

// Clerk component (commented out)
// import { SignIn as ClerkSignIn } from '@clerk/nextjs';

export const SignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Por favor completa todos los campos');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const result = await signIn({ email, password });

            if (result.success) {
                router.push('/');
            } else {
                setError(result.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Ocurrió un error al iniciar sesión');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid gap-6">
            {/* Clerk component (commented out) */}
            {/* <ClerkSignIn appearance={{ elements: { header: 'hidden' } }} /> */}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="correo@ejemplo.com"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
            </form>
        </div>
    );
}; 