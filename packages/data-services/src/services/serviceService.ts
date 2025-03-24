'use server'

import { database as db } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { ServiceFormData } from '../types/service';

/**
 * Obtener todos los servicios
 */
export async function getAllServices() {
    try {
        const services = await db.serviceType.findMany({
            include: {
                serviceItems: true
            },
            orderBy: {
                name: 'asc'
            }
        });
        return services;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw new Error("Failed to fetch services");
    }
}

/**
 * Obtener un servicio por ID
 */
export async function getServiceById(serviceId: string) {
    try {
        return await db.serviceType.findUnique({
            where: { id: serviceId },
            include: {
                serviceItems: true
            }
        });
    } catch (error) {
        console.error(`Error fetching service with ID ${serviceId}:`, error);
        throw new Error("Failed to fetch service");
    }
}

/**
 * Actualizar un servicio existente
 */
export async function updateService(serviceId: string, data: ServiceFormData) {
    "use server";
    try {
        const {
            name,
            description,
            icon,
            serviceItems,
            speed,
            price,
            regularPrice,
            promoMonths
        } = data;

        // Primero, actualizar el servicio
        const service = await db.serviceType.update({
            where: { id: serviceId },
            data: {
                name,
                description: description || null,
                icon: icon || null,
                speed,
                price,
                regularPrice,
                promoMonths
            },
        });

        // Si se proporcionaron serviceItems, manejarlos
        if (serviceItems && serviceItems.length > 0) {
            // Eliminar todos los elementos de servicio existentes
            await db.serviceItem.deleteMany({
                where: { serviceTypeId: serviceId }
            });

            // Crear nuevos elementos de servicio
            await db.serviceItem.createMany({
                data: serviceItems.map(item => ({
                    title: item.title,
                    description: item.description || null,
                    icon: item.icon || null,
                    serviceTypeId: serviceId
                }))
            });
        }
        revalidatePath('/admin/dashboard');
        return service;
    } catch (error) {
        console.error("Error updating service:", error);
        throw new Error("Failed to update service");
    }
}

/**
 * Eliminar un servicio
 */
export async function deleteService(serviceId: string) {
    "use server";
    try {
        await db.serviceType.delete({
            where: { id: serviceId },
        });
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error(`Error deleting service with ID ${serviceId}:`, error);
        throw new Error("Failed to delete service");
    }
}

/**
 * Crear un nuevo servicio
 */
export async function createService(data: ServiceFormData) {
    "use server";
    try {
        const {
            name,
            description,
            icon,
            serviceItems,
            speed,
            price,
            regularPrice,
            promoMonths
        } = data;

        // Crear el servicio
        const service = await db.serviceType.create({
            data: {
                name,
                description: description || null,
                icon: icon || null,
                speed,
                price,
                regularPrice,
                promoMonths
            },
        });

        // Si se proporcionaron serviceItems, crearlos
        if (serviceItems && serviceItems.length > 0) {
            await db.serviceItem.createMany({
                data: serviceItems.map(item => ({
                    title: item.title,
                    description: item.description || null,
                    icon: item.icon || null,
                    serviceTypeId: service.id
                }))
            });
        }
        revalidatePath('/admin/dashboard');
        return service;
    } catch (error) {
        console.error("Error creating service:", error);
        throw new Error("Failed to create service");
    }
} 