'use server'

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

// Tipo para los datos del servicio
export type ServiceFormData = {
    name: string;
    description?: string;
    icon?: string;
    speed?: number | null;
    price?: number | null;
    regularPrice?: number | null;
    promoMonths?: number | null;
    serviceItems?: Array<{
        title: string;
        description?: string;
        icon?: string;
    }>;
};

/**
 * Get all services
 */
export async function getAllServices() {
    try {
        const services = await db.serviceType.findMany({
            select: {
                id: true,
                name: true,
                icon: true,
                description: true,
                speed: true,
                price: true
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
 * Create a new service
 */
export async function createService(data: ServiceFormData) {
    try {
        const { name, description, icon, serviceItems, speed, price, regularPrice, promoMonths } = data;

        // Create the service
        const service = await db.serviceType.create({
            data: {
                name,
                description: description || null,
                icon: icon || null,
                speed: speed,
                price: price,
                regularPrice: regularPrice,
                promoMonths: promoMonths,
            },
        });

        // Create service items if provided
        if (serviceItems && serviceItems.length > 0) {
            for (const item of serviceItems) {
                await db.serviceItem.create({
                    data: {
                        title: item.title,
                        description: item.description || null,
                        icon: item.icon || null,
                        serviceTypeId: service.id,
                    },
                });
            }
        }

        // Revalidate cache to reflect changes
        revalidatePath("/admin/dashboard");
    } catch (error) {
        console.error("Error creating service:", error);
        throw new Error("Failed to create service");
    }
}

// Actualizar un servicio existente
export async function updateService(serviceId: string, formData: ServiceFormData) {
    try {
        // Actualizar el servicio en la base de datos
        await db.serviceType.update({
            where: { id: serviceId },
            data: {
                name: formData.name,
                description: formData.description || null,
                icon: formData.icon || null,
                speed: formData.speed,
                price: formData.price,
                regularPrice: formData.regularPrice,
                promoMonths: formData.promoMonths,
            },
        });

        // Primero eliminar los items existentes para evitar duplicados
        await db.serviceItem.deleteMany({
            where: { serviceTypeId: serviceId }
        });

        // Luego crear los nuevos service items
        if (formData.serviceItems && formData.serviceItems.length > 0) {
            for (const item of formData.serviceItems) {
                await db.serviceItem.create({
                    data: {
                        title: item.title,
                        description: item.description || null,
                        icon: item.icon || null,
                        serviceTypeId: serviceId,
                    },
                });
            }
        }

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error("Error updating service:", error);
        throw new Error("Failed to update service");
    }
}

// Obtener un servicio por ID
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

// Eliminar un servicio
export async function deleteService(serviceId: string) {
    try {
        await db.serviceType.delete({
            where: { id: serviceId },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error(`Error deleting service with ID ${serviceId}:`, error);
        throw new Error("Failed to delete service");
    }
} 