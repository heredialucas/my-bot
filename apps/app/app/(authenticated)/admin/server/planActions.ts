'use server'

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

// Tipo para los datos del plan
export type PlanFormData = {
    name: string;
    description?: string;
    price: number;
    regularPrice?: number | null;
    promoMonths?: number | null;
    channelCount?: number | null;
    premiumContent?: boolean;
    noAds?: boolean;
    icon?: string | null;
    planType: string;
};

/**
 * Get all plans
 */
export async function getAllPlans() {
    try {
        const plans = await db.plan.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                regularPrice: true,
                promoMonths: true,
                channelCount: true,
                premiumContent: true,
                noAds: true,
            },
            orderBy: {
                name: 'asc'
            }
        });

        // Until the schema is updated, add planType
        return plans.map(plan => ({
            ...plan,
            planType: 'ZAPPING' // Now default to Zapping
        }));
    } catch (error) {
        console.error("Error fetching plans:", error);
        throw new Error("Failed to fetch plans");
    }
}

/**
 * Create a new plan
 */
export async function createPlan(data: PlanFormData) {
    try {
        const {
            name,
            description,
            price,
            regularPrice,
            promoMonths,
            channelCount,
            premiumContent,
            noAds,
            planType
        } = data;

        // Create the plan
        await db.plan.create({
            data: {
                name,
                description: description || null,
                price,
                regularPrice,
                promoMonths,
                channelCount,
                premiumContent,
                noAds,
                planType,
            },
        });

        // Revalidate cache to reflect changes
        revalidatePath("/admin/dashboard");
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
                regularPrice: formData.regularPrice,
                promoMonths: formData.promoMonths,
                channelCount: formData.channelCount,
                premiumContent: formData.premiumContent,
                noAds: formData.noAds,
            },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');

    } catch (error) {
        console.error("Error updating plan:", error);
        throw new Error("Failed to update plan");
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