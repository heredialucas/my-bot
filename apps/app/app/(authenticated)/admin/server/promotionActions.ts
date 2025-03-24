'use server'

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
// Tipo para los datos de la promoción
export type PromotionFormData = {
    name: string;
    description?: string;
    discount: number;
    duration: number;
    active?: boolean;
    color?: string | null;
    serviceIds?: string[];
    planIds?: string[];
    addonIds?: string[];
};

/**
 * Create a new promotion
 */
export async function createPromotion(data: PromotionFormData) {
    try {
        const {
            name,
            description,
            discount,
            duration,
            active = true,
            color,
            serviceIds = [],
            planIds = [],
            addonIds = []
        } = data;

        // Create the promotion
        const promotion = await db.promotion.create({
            data: {
                name,
                description: description || null,
                discount,
                duration,
                active,
                color: color || null,
            },
        });

        // Create relationships with services
        if (serviceIds.length > 0) {
            for (const serviceId of serviceIds) {
                // Note: These models will be available after Prisma schema is regenerated
                // The code might show errors until then
                await db.promotionService.create({
                    data: {
                        promotionId: promotion.id,
                        serviceId,
                    },
                });
            }
        }

        // Create relationships with plans
        if (planIds.length > 0) {
            for (const planId of planIds) {
                await db.promotionPlan.create({
                    data: {
                        promotionId: promotion.id,
                        planId,
                    },
                });
            }
        }

        // Create relationships with add-ons
        if (addonIds.length > 0) {
            for (const addonId of addonIds) {
                await db.promotionAddon.create({
                    data: {
                        promotionId: promotion.id,
                        addonId,
                    },
                });
            }
        }

        // Revalidate cache to reflect changes
        revalidatePath("/admin/dashboard");

    } catch (error) {
        console.error("Error creating promotion:", error);
        throw new Error("Failed to create promotion");
    }
}

// Actualizar una promoción existente
export async function updatePromotion(promotionId: string, formData: PromotionFormData) {
    try {
        const {
            name,
            description,
            discount,
            duration,
            active = true,
            color,
            serviceIds = [],
            planIds = [],
            addonIds = []
        } = formData;

        // Actualizar la promoción en la base de datos
        await db.promotion.update({
            where: { id: promotionId },
            data: {
                name,
                description,
                discount,
                duration,
                active,
                color,
            },
        });

        // Eliminar las relaciones existentes con servicios
        await db.promotionService.deleteMany({
            where: { promotionId }
        });

        // Crear nuevas relaciones con servicios
        if (serviceIds.length > 0) {
            for (const serviceId of serviceIds) {
                await db.promotionService.create({
                    data: {
                        promotionId,
                        serviceId,
                    },
                });
            }
        }

        // Eliminar las relaciones existentes con planes
        await db.promotionPlan.deleteMany({
            where: { promotionId }
        });

        // Crear nuevas relaciones con planes
        if (planIds.length > 0) {
            for (const planId of planIds) {
                await db.promotionPlan.create({
                    data: {
                        promotionId,
                        planId,
                    },
                });
            }
        }

        // Eliminar las relaciones existentes con complementos
        await db.promotionAddon.deleteMany({
            where: { promotionId }
        });

        // Crear nuevas relaciones con complementos
        if (addonIds.length > 0) {
            for (const addonId of addonIds) {
                await db.promotionAddon.create({
                    data: {
                        promotionId,
                        addonId,
                    },
                });
            }
        }

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');

    } catch (error) {
        console.error("Error updating promotion:", error);
        throw new Error("Failed to update promotion");
    }
}

// Obtener todas las promociones
export async function getAllPromotions() {
    try {
        return await db.promotion.findMany({
            orderBy: { name: 'asc' },
        });
    } catch (error) {
        console.error("Error fetching promotions:", error);
        throw new Error("Failed to fetch promotions");
    }
}

// Obtener una promoción por ID
export async function getPromotionById(promotionId: string) {
    try {
        const promotion = await db.promotion.findUnique({
            where: { id: promotionId },
            include: {
                // Incluir las relaciones para servicios, planes y addons
                services: {
                    select: {
                        service: {
                            select: {
                                id: true
                            }
                        }
                    }
                },
                plans: {
                    select: {
                        plan: {
                            select: {
                                id: true
                            }
                        }
                    }
                },
                addons: {
                    select: {
                        addon: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        });

        if (!promotion) return null;

        // Transformar los datos para que coincidan con la estructura esperada por el formulario
        return {
            ...promotion,
            services: promotion.services.map(s => ({ id: s.service.id })),
            plans: promotion.plans.map(p => ({ id: p.plan.id })),
            addons: promotion.addons.map(a => ({ id: a.addon.id }))
        };
    } catch (error) {
        console.error(`Error fetching promotion with ID ${promotionId}:`, error);
        throw new Error("Failed to fetch promotion");
    }
}

// Eliminar una promoción
export async function deletePromotion(promotionId: string) {
    try {
        await db.promotion.delete({
            where: { id: promotionId },
        });

        // Revalidar el path para actualizar los datos
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error(`Error deleting promotion with ID ${promotionId}:`, error);
        throw new Error("Failed to delete promotion");
    }
} 