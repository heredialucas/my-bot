import 'server-only';
import { getCollection } from '@repo/database';

export async function migrateClientType(): Promise<{ success: boolean; updatedCount: number; error?: string }> {
    try {
        const collection = await getCollection('orders');

        // Actualizar todas las órdenes que no tengan el campo clientType
        const result = await collection.updateMany(
            { clientType: { $exists: false } },
            { $set: { clientType: 'minorista' } }
        );

        console.log(`Migración completada: ${result.modifiedCount} órdenes actualizadas`);

        return {
            success: true,
            updatedCount: result.modifiedCount
        };
    } catch (error) {
        console.error('Error en la migración de clientType:', error);
        return {
            success: false,
            updatedCount: 0,
            error: (error as Error).message
        };
    }
} 