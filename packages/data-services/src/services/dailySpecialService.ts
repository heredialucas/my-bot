'use server'

import { revalidatePath } from 'next/cache';
import { database } from '@repo/database';

export interface DailySpecialData {
    id: string;
    date: Date;
    isActive: boolean;
    dish: {
        id: string;
        name: string;
        description: string;
        price: number;
        promotionalPrice?: number | null;
        imageUrl?: string;
        category: {
            name: string;
        };
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface DailySpecialFormData {
    date: Date;
    dishId: string;
    isActive?: boolean;
}

/**
 * Crear un nuevo plato del día
 */
export async function createDailySpecial(data: DailySpecialFormData, createdById: string) {
    try {
        // Verificar si ya existe un plato del día para esa fecha
        const existingSpecial = await database.dailySpecial.findUnique({
            where: { date: data.date },
        });

        if (existingSpecial) {
            throw new Error('Ya existe un plato del día para esta fecha');
        }

        // Crear el plato del día
        const dailySpecial = await database.dailySpecial.create({
            data: {
                date: data.date,
                dishId: data.dishId,
                isActive: data.isActive ?? true,
                createdById,
            },
            include: {
                dish: {
                    include: {
                        category: {
                            select: { name: true }
                        }
                    }
                }
            }
        });

        revalidatePath('/admin/dashboard');
        revalidatePath('/'); // Para la landing page
        return dailySpecial;
    } catch (error) {
        console.error('Error al crear plato del día:', error);
        throw new Error('No se pudo crear el plato del día');
    }
}

/**
 * Obtener todos los platos del día (para admin)
 */
export async function getAllDailySpecials() {
    try {
        const dailySpecials = await database.dailySpecial.findMany({
            include: {
                dish: {
                    include: {
                        category: {
                            select: { name: true }
                        }
                    }
                }
            },
            orderBy: { date: 'desc' },
        });

        return dailySpecials as DailySpecialData[];
    } catch (error) {
        console.error("Error al obtener platos del día:", error);
        throw new Error("No se pudieron obtener los platos del día");
    }
}

/**
 * Obtener el plato del día actual (para público)
 */
export async function getTodaySpecial() {
    try {
        // Usar UTC para evitar problemas de zona horaria
        const nowUTC = new Date();
        const todayUTC = new Date(Date.UTC(nowUTC.getUTCFullYear(), nowUTC.getUTCMonth(), nowUTC.getUTCDate()));

        // Buscar plato especial para hoy
        const todaySpecial = await database.dailySpecial.findFirst({
            where: {
                date: todayUTC,
                isActive: true
            },
            include: {
                dish: {
                    include: {
                        category: {
                            select: { name: true }
                        }
                    }
                }
            }
        });

        return todaySpecial;
    } catch (error) {
        console.error("Error al obtener plato del día actual:", error);
        throw new Error("No se pudo obtener el plato del día");
    }
}

/**
 * Obtener plato del día por fecha específica
 */
export async function getDailySpecialByDate(date: Date) {
    try {
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0); // Normalizar a inicio del día

        const dailySpecial = await database.dailySpecial.findUnique({
            where: { date: dateOnly },
            include: {
                dish: {
                    include: {
                        category: {
                            select: { name: true }
                        }
                    }
                }
            }
        });

        return dailySpecial;
    } catch (error) {
        console.error('Error al obtener plato del día por fecha:', error);
        throw new Error('No se pudo obtener el plato del día');
    }
}

/**
 * Actualizar un plato del día existente
 */
export async function updateDailySpecial(specialId: string, data: DailySpecialFormData) {
    try {
        // Verificar si ya existe otro plato del día para esa fecha (excluyendo el actual)
        if (data.date) {
            const existingSpecial = await database.dailySpecial.findFirst({
                where: {
                    date: data.date,
                    id: { not: specialId }
                },
            });

            if (existingSpecial) {
                throw new Error('Ya existe un plato del día para esta fecha');
            }
        }

        // Actualizar plato del día en la base de datos
        const dailySpecial = await database.dailySpecial.update({
            where: { id: specialId },
            data: {
                date: data.date,
                dishId: data.dishId,
                isActive: data.isActive,
            },
            include: {
                dish: {
                    include: {
                        category: {
                            select: { name: true }
                        }
                    }
                }
            }
        });

        revalidatePath('/admin/dashboard');
        revalidatePath('/'); // Para la landing page
        return dailySpecial;
    } catch (error) {
        console.error("Error al actualizar plato del día:", error);
        throw new Error("No se pudo actualizar el plato del día");
    }
}

/**
 * Eliminar un plato del día
 */
export async function deleteDailySpecial(specialId: string) {
    try {
        // Eliminar plato del día de la base de datos
        await database.dailySpecial.delete({
            where: { id: specialId },
        });

        revalidatePath('/admin/dashboard');
        revalidatePath('/'); // Para la landing page
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar plato del día:", error);
        throw new Error("No se pudo eliminar el plato del día");
    }
}

/**
 * Obtener próximos platos del día (para admin y planning)
 */
export async function getUpcomingDailySpecials(days: number = 7) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + days);

        const upcomingSpecials = await database.dailySpecial.findMany({
            where: {
                date: {
                    gte: today,
                    lte: futureDate
                }
            },
            include: {
                dish: {
                    include: {
                        category: {
                            select: { name: true }
                        }
                    }
                }
            },
            orderBy: { date: 'asc' }
        });

        return upcomingSpecials as DailySpecialData[];
    } catch (error) {
        console.error("Error al obtener próximos platos del día:", error);
        throw new Error("No se pudieron obtener los próximos platos del día");
    }
} 