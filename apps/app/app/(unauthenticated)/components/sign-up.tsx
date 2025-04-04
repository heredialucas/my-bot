'use client';

import { useState, FormEvent } from 'react';
import { signUp } from '@repo/data-services/src/services/authService';

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!name || !lastName || !email || !password || !confirmPassword) {
            setError('Por favor completa todos los campos');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
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

        } catch (err) {
            setError('Ocurrió un error al crear la cuenta');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid gap-6">
            {/* Clerk component (commented out) */}
            {/* <ClerkSignUp appearance={{ elements: { header: 'hidden' } }} /> */}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        Nombre
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Nombre"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                        Apellido
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Apellido"
                        required
                    />
                </div>

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

                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirmar Contraseña
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                    {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
            </form>
        </div>
    );
}; 