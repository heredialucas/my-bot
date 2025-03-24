'use server'

import { PlanFormData } from '../types/plan';
import { database as db } from '@repo/database';
import { revalidatePath } from 'next/cache';

/**
 * Obtener todos los planes
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
                planType: true
            },
            orderBy: {
                name: 'asc'
            }
        });

        // Ya contiene planType, no necesitamos mapearlo
        return plans;
    } catch (error) {
        console.error("Error fetching plans:", error);
        throw new Error("Failed to fetch plans");
    }
}

/**
 * Crear un nuevo plan
 */
export async function createPlan(data: PlanFormData) {
    "use server";
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

        // Crear el plan
        const plan = await db.plan.create({
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
        revalidatePath('/admin/dashboard');
        return plan;
    } catch (error) {
        console.error("Error creating plan:", error);
        throw new Error("Failed to create plan");
    }
}

/**
 * Actualizar un plan existente
 */
export async function updatePlan(planId: string, data: PlanFormData) {
    "use server";
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

        // Actualizar el plan
        const plan = await db.plan.update({
            where: { id: planId },
            data: {
                name,
                description: description || null,
                price,
                regularPrice,
                promoMonths,
                channelCount,
                premiumContent,
                noAds,
                planType
            },
        });
        revalidatePath('/admin/dashboard');
        return plan;
    } catch (error) {
        console.error("Error updating plan:", error);
        throw new Error("Failed to update plan");
    }
}

/**
 * Obtener un plan por ID
 */
export async function getPlanById(planId: string) {
    try {
        const plan = await db.plan.findUnique({
            where: { id: planId },
        });
        return plan;
    } catch (error) {
        console.error("Error fetching plan:", error);
        throw new Error("Failed to fetch plan");
    }
}

/**
 * Eliminar un plan
 */
export async function deletePlan(planId: string) {
    "use server";
    try {
        await db.plan.delete({
            where: { id: planId },
        });
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error("Error deleting plan:", error);
        throw new Error("Failed to delete plan");
    }
} 