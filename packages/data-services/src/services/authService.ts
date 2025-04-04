'use server';

import { cookies } from 'next/headers';
import { createUser, getUserById, verifyUserCredentials } from './userService';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
// Cookie expiration (30 days in seconds)
const COOKIE_EXPIRATION = 60 * 60 * 24 * 30;

/**
 * Establecer cookie de manera compatible con Next.js 15
 */
async function setCookie(name: string, value: string, options?: Partial<ResponseCookie>) {
    try {
        const cookieStore = await cookies();

        cookieStore.set(name, value, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: COOKIE_EXPIRATION,
            sameSite: 'lax',
            ...options,
        });
    } catch (error) {
        console.error('Error al establecer cookie:', error);
    }
}

/**
 * Sign in a user with email and password
 */
export async function signIn({ email, password }: { email: string; password: string }) {
    try {
        // Verify credentials
        const authResult = await verifyUserCredentials(email, password);

        if (!authResult.success) {
            return { success: false, message: 'Credenciales inválidas' };
        }

        // Get user details
        const user = await getUserById(authResult.userId || '');
        if (!user) {
            return { success: false, message: 'Usuario no encontrado' };
        }

        // Create session token (simple JSON string, no encryption)
        const token = JSON.stringify({
            id: user.id,
            email: user.email,
            role: user.role.toLowerCase(), // Asegurar que el rol está en minúsculas
        });

        // Establecer cookie
        await setCookie('auth-token', token);

        return {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        };
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return { success: false, message: 'Error al iniciar sesión' };
    }
}

/**
 * Sign up a new user
 */
export async function signUp(data: {
    name: string;
    lastName: string;
    email: string;
    password: string;
}) {
    try {
        // Create new user
        const user = await createUser({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            role: 'user', // Asegurar que el rol está en minúsculas
        });

        // Create session token (simple JSON string, no encryption)
        const token = JSON.stringify({
            id: user.id,
            email: user.email,
            role: user.role.toLowerCase(), // Asegurar que el rol está en minúsculas
        });

        // Establecer cookie
        await setCookie('auth-token', token);

        return {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        };
    } catch (error) {
        console.error('Error al crear cuenta:', error);
        return { success: false, message: 'Error al crear la cuenta' };
    }
}

/**
 * Sign out the current user
 */
export async function signOut() {
    // Eliminar la cookie directamente
    try {
        const cookieStore = await cookies();
        cookieStore.delete('auth-token');
    } catch (error) {
        console.error('Error al eliminar cookie:', error);
    }
    return { success: true };
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
    try {
        // Obtener la cookie directamente
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get('auth-token');

        if (!tokenCookie) {
            return null;
        }

        const token = JSON.parse(tokenCookie.value);
        const user = await getUserById(token.id);

        if (!user) {
            const cookieStore = await cookies();
            cookieStore.delete('auth-token');
            return null;
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    } catch (error) {
        console.error('Error al obtener usuario actual:', error);
        try {
            const cookieStore = await cookies();
            cookieStore.delete('auth-token');
        } catch (deleteError) {
            console.error('Error al eliminar cookie después de error:', deleteError);
        }
        return null;
    }
} 