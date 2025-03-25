'use server'

import { PlanFormData } from '../types/plan';
import { database as db } from '@repo/database';
import { revalidatePath } from 'next/cache';

/**
 * Obtener todos los planes
 */
export async function getAllPlans() {
    try {
        // Consultar todos los planes incluyendo sus características
        const plans = await db.plan.findMany({
            include: {
                characteristics: true
            },
            orderBy: {
                name: 'asc'
            }
        });

        // Transformar el resultado para que sea más fácil de usar en el frontend
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
            price,
            regularPrice,
            promoMonths,
            channelCount,
            planType,
            characteristics
        } = data;

        console.log("Creando plan con características:", characteristics);

        // Primero crear el plan base
        const plan = await db.plan.create({
            data: {
                name,
                price,
                regularPrice,
                promoMonths,
                channelCount,
                planType,
            }
        });

        // Luego crear las características de forma separada
        if (characteristics && characteristics.length > 0) {
            const validCharacteristics = characteristics.filter(c => c.key.trim() !== '');

            if (validCharacteristics.length > 0) {
                await db.planCharacteristic.createMany({
                    data: validCharacteristics.map(char => ({
                        key: char.key,
                        value: char.value,
                        planId: plan.id
                    }))
                });
            }
        }

        // Consultar el plan con sus características para devolverlo
        const planWithCharacteristics = await db.plan.findUnique({
            where: { id: plan.id },
            include: {
                characteristics: true
            }
        });

        revalidatePath('/admin/dashboard');
        return planWithCharacteristics;
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
            price,
            regularPrice,
            promoMonths,
            channelCount,
            planType,
            characteristics
        } = data;

        console.log("Actualizando plan con características:", characteristics);

        // Primero actualizar el plan base
        await db.plan.update({
            where: { id: planId },
            data: {
                name,
                price,
                regularPrice,
                promoMonths,
                channelCount,
                planType
            }
        });

        // Eliminar todas las características existentes
        await db.planCharacteristic.deleteMany({
            where: { planId }
        });

        // Crear las nuevas características
        if (characteristics && characteristics.length > 0) {
            const validCharacteristics = characteristics.filter(c => c.key.trim() !== '');

            if (validCharacteristics.length > 0) {
                await db.planCharacteristic.createMany({
                    data: validCharacteristics.map(char => ({
                        key: char.key,
                        value: char.value,
                        planId
                    }))
                });
            }
        }

        // Consultar el plan con sus características para devolverlo
        const updatedPlan = await db.plan.findUnique({
            where: { id: planId },
            include: {
                characteristics: true
            }
        });

        revalidatePath('/admin/dashboard');
        return updatedPlan;
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
            include: {
                characteristics: true
            }
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