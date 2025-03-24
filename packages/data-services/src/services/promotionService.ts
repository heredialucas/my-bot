'use server'

import { database as db } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { PromotionFormData } from '../types/promotion';

// Define interfaces para tipos específicos
interface ServiceRelation {
    service: { id: string }
}

interface PlanRelation {
    plan: { id: string }
}

interface AddonRelation {
    addon: { id: string }
}

/**
 * Obtener todas las promociones
 */
export async function getAllPromotions() {
    try {
        const promotions = await db.promotion.findMany({
            orderBy: { name: 'asc' },
        });
        return promotions;
    } catch (error) {
        console.error("Error fetching promotions:", error);
        throw new Error("Failed to fetch promotions");
    }
}

/**
 * Crear una nueva promoción
 */
export async function createPromotion(data: PromotionFormData) {
    "use server";
    try {
        // Extraer los IDs de relaciones
        const { serviceIds = [], planIds = [], addonIds = [], ...promotionData } = data;

        // Crear la promoción
        const promotion = await db.promotion.create({
            data: {
                name: promotionData.name,
                description: promotionData.description || null,
                discount: promotionData.discount,
                duration: promotionData.duration,
                active: promotionData.active,
                color: promotionData.color,
                // Crear relaciones
                services: {
                    create: serviceIds.map(serviceId => ({
                        service: {
                            connect: { id: serviceId }
                        }
                    }))
                },
                plans: {
                    create: planIds.map(planId => ({
                        plan: {
                            connect: { id: planId }
                        }
                    }))
                },
                addons: {
                    create: addonIds.map(addonId => ({
                        addon: {
                            connect: { id: addonId }
                        }
                    }))
                }
            },
        });
        revalidatePath('/admin/dashboard');
        return promotion;
    } catch (error) {
        console.error("Error creating promotion:", error);
        throw new Error("Failed to create promotion");
    }
}

/**
 * Actualizar una promoción existente
 */
export async function updatePromotion(promotionId: string, data: PromotionFormData) {
    "use server";
    try {
        // Extraer los IDs de relaciones
        const { serviceIds = [], planIds = [], addonIds = [], ...promotionData } = data;

        // Primero, eliminar todas las relaciones existentes
        await db.$transaction([
            db.promotionService.deleteMany({
                where: { promotionId }
            }),
            db.promotionPlan.deleteMany({
                where: { promotionId }
            }),
            db.promotionAddon.deleteMany({
                where: { promotionId }
            })
        ]);

        // Luego, actualizar la promoción y crear nuevas relaciones
        const promotion = await db.promotion.update({
            where: { id: promotionId },
            data: {
                name: promotionData.name,
                description: promotionData.description || null,
                discount: promotionData.discount,
                duration: promotionData.duration,
                active: promotionData.active,
                color: promotionData.color,
                // Crear nuevas relaciones
                services: {
                    create: serviceIds.map(serviceId => ({
                        service: {
                            connect: { id: serviceId }
                        }
                    }))
                },
                plans: {
                    create: planIds.map(planId => ({
                        plan: {
                            connect: { id: planId }
                        }
                    }))
                },
                addons: {
                    create: addonIds.map(addonId => ({
                        addon: {
                            connect: { id: addonId }
                        }
                    }))
                }
            },
        });
        revalidatePath('/admin/dashboard');
        return promotion;
    } catch (error) {
        console.error("Error updating promotion:", error);
        throw new Error("Failed to update promotion");
    }
}

/**
 * Obtener una promoción por ID incluyendo sus relaciones
 */
export async function getPromotionById(promotionId: string) {
    try {
        const promotion = await db.promotion.findUnique({
            where: { id: promotionId },
            include: {
                services: true,
                plans: true,
                addons: true
            }
        });

        // Transformar los datos para adaptarse a la estructura esperada por el frontend
        return promotion ? {
            ...promotion,
            services: promotion.services.map(s => ({ id: s.serviceId })),
            plans: promotion.plans.map(p => ({ id: p.planId })),
            addons: promotion.addons.map(a => ({ id: a.addonId }))
        } : null;
    } catch (error) {
        console.error("Error fetching promotion:", error);
        throw new Error("Failed to fetch promotion");
    }
}

/**
 * Eliminar una promoción
 */
export async function deletePromotion(promotionId: string) {
    "use server";
    try {
        await db.promotion.delete({
            where: { id: promotionId },
        });
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error("Error deleting promotion:", error);
        throw new Error("Failed to delete promotion");
    }
} 