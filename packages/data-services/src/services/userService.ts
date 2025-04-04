'use server'

import { revalidatePath } from 'next/cache';
import { UserData, UserFormData } from '../types/user';
import { database } from '@repo/database';

/**
 * Crear un nuevo usuario
 */
export async function createUser(data: UserFormData & { role: string }) {
    try {
        // Verificar si ya existe un usuario con ese email
        const existingUser = await database.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new Error('Ya existe un usuario con este email');
        }

        // Crear el usuario (sin hash de contraseña por simplicidad)
        const user = await database.user.create({
            data: {
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                role: data.role,
            },
        });

        // Retornar usuario sin contraseña
        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw new Error('No se pudo crear el usuario');
    }
}

/**
 * Obtener un usuario por ID
 */
export async function getUserById(userId: string) {
    try {
        const user = await database.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return null;
        }

        // Retornar usuario sin contraseña
        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw new Error('No se pudo obtener el usuario');
    }
}

/**
 * Obtener todos los usuarios
 */
export async function getAllUsers() {
    try {
        // Implementación real con la base de datos
        const users = await database.user.findMany({
            orderBy: { createdAt: 'desc' },
        });

        // Mapear para no incluir passwords
        return users.map(user => ({
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })) as UserData[];
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw new Error("No se pudieron obtener los usuarios");
    }
}

/**
 * Actualizar un usuario existente
 */
export async function updateUser(userId: string, data: UserFormData & { role?: string }) {
    "use server";
    try {
        // Actualizar usuario en la base de datos
        const user = await database.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                role: data.role,
                ...(data.password ? { password: data.password } : {})
            },
        });

        revalidatePath('/admin/dashboard');

        // Devolver usuario sin password
        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        } as UserData;
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw new Error("No se pudo actualizar el usuario");
    }
}

/**
 * Eliminar un usuario
 */
export async function deleteUser(userId: string) {
    "use server";
    try {
        // Eliminar usuario de la base de datos
        await database.user.delete({
            where: { id: userId },
        });

        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw new Error("No se pudo eliminar el usuario");
    }
}

/**
 * Verificar credenciales de usuario (comparación simple, sin hash)
 */
export async function verifyUserCredentials(email: string, password: string) {
    try {
        // Buscar usuario por email
        const user = await database.user.findUnique({
            where: { email },
        });

        // Si no se encuentra el usuario, retornar fallo
        if (!user) {
            return { success: false, message: 'Credenciales inválidas' };
        }

        // Comparación simple de contraseña (sin hash por simplicidad)
        const passwordMatch = user.password === password;

        // Si las contraseñas no coinciden, retornar fallo
        if (!passwordMatch) {
            return { success: false, message: 'Credenciales inválidas' };
        }

        // Retornar éxito con ID de usuario
        return { success: true, userId: user.id };
    } catch (error) {
        console.error('Error al verificar credenciales:', error);
        throw new Error('No se pudieron verificar las credenciales');
    }
} 