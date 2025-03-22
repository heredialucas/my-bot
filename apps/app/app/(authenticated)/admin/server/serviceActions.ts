'use server'

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

// Tipo para los datos del servicio
type ServiceFormData = {
    name: string;
    description: string;
    icon: string;
};

// Crear un nuevo servicio
export async function createService(formData: ServiceFormData) {
    try {
        // Crear el servicio en la base de datos
        await db.serviceType.create({
            data: {
                name: formData.name,
                description: formData.description,
                icon: formData.icon,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
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
                description: formData.description,
                icon: formData.icon,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error("Error updating service:", error);
        throw new Error("Failed to update service");
    }
}

// Obtener todos los servicios
export async function getAllServices() {
    try {
        return await db.serviceType.findMany({
            orderBy: { name: 'asc' },
        });

    } catch (error) {
        console.error("Error fetching services:", error);
        throw new Error("Failed to fetch services");
    }
}

// Obtener un servicio por ID
export async function getServiceById(serviceId: string) {
    try {
        return await db.serviceType.findUnique({
            where: { id: serviceId },
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