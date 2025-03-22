'use server'

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

// Tipo para los datos del plan
type PlanFormData = {
    name: string;
    description: string;
    price: number;
    speed: number | null;
};

// Crear un nuevo plan
export async function createPlan(formData: PlanFormData) {
    try {
        // Crear el plan en la base de datos
        await db.plan.create({
            data: {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                speed: formData.speed,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error("Error creating plan:", error);
        throw new Error("Failed to create plan");
    }
}

// Actualizar un plan existente
export async function updatePlan(planId: string, formData: PlanFormData) {
    try {
        // Actualizar el plan en la base de datos
        await db.plan.update({
            where: { id: planId },
            data: {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                speed: formData.speed,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');

    } catch (error) {
        console.error("Error updating plan:", error);
        throw new Error("Failed to update plan");
    }
}

// Obtener todos los planes
export async function getAllPlans() {
    try {
        return await db.plan.findMany({
            orderBy: { name: 'asc' },
        });

    } catch (error) {
        console.error("Error fetching plans:", error);
        throw new Error("Failed to fetch plans");
    }
}

// Obtener un plan por ID
export async function getPlanById(planId: string) {
    try {
        return await db.plan.findUnique({
            where: { id: planId },
        });
    } catch (error) {
        console.error(`Error fetching plan with ID ${planId}:`, error);
        throw new Error("Failed to fetch plan");
    }
}

// Eliminar un plan
export async function deletePlan(planId: string) {
    try {
        await db.plan.delete({
            where: { id: planId },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error(`Error deleting plan with ID ${planId}:`, error);
        throw new Error("Failed to delete plan");
    }
}