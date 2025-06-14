'use server'

import { revalidatePath } from 'next/cache';
import { database } from '@repo/database';

export interface RestaurantConfigData {
    id: string;
    name: string;
    description?: string | null;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    hours?: string | null;
    logoUrl?: string | null;
    slug: string;
    themeColor: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface RestaurantConfigFormData {
    name: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
    hours?: string;
    logoUrl?: string;
    slug?: string;
    themeColor?: string;
}

/**
 * Obtener la configuración del restaurante (solo debería haber una)
 */
export async function getRestaurantConfig(): Promise<RestaurantConfigData | null> {
    try {
        const config = await database.restaurantConfig.findFirst({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        });

        return config;
    } catch (error) {
        console.error('Error al obtener configuración del restaurante:', error);
        throw new Error('No se pudo obtener la configuración del restaurante');
    }
}

/**
 * Crear o actualizar la configuración del restaurante
 */
export async function upsertRestaurantConfig(data: RestaurantConfigFormData, createdById: string) {
    try {
        // Buscar si ya existe una configuración
        const existingConfig = await database.restaurantConfig.findFirst({
            where: { isActive: true }
        });

        let config;

        if (existingConfig) {
            // Actualizar configuración existente
            config = await database.restaurantConfig.update({
                where: { id: existingConfig.id },
                data: {
                    name: data.name,
                    description: data.description,
                    address: data.address,
                    phone: data.phone,
                    email: data.email,
                    hours: data.hours,
                    logoUrl: data.logoUrl,
                    slug: data.slug || existingConfig.slug,
                    themeColor: data.themeColor || existingConfig.themeColor,
                }
            });
        } else {
            // Crear nueva configuración
            config = await database.restaurantConfig.create({
                data: {
                    name: data.name,
                    description: data.description,
                    address: data.address,
                    phone: data.phone,
                    email: data.email,
                    hours: data.hours,
                    logoUrl: data.logoUrl,
                    slug: data.slug || 'mi-restaurante',
                    themeColor: data.themeColor || 'green',
                    createdById,
                }
            });
        }

        revalidatePath('/admin/dashboard');
        revalidatePath('/es/menu');

        return config;
    } catch (error) {
        console.error('Error al guardar configuración del restaurante:', error);
        throw new Error('No se pudo guardar la configuración del restaurante');
    }
}

/**
 * Obtener la configuración pública del restaurante por slug
 */
export async function getRestaurantConfigBySlug(slug: string): Promise<RestaurantConfigData | null> {
    try {
        const config = await database.restaurantConfig.findUnique({
            where: {
                slug,
                isActive: true
            }
        });

        return config;
    } catch (error) {
        console.error('Error al obtener configuración por slug:', error);
        return null;
    }
} 