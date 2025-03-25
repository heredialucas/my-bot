import { getActivePromotionsWithDetails, getAllAddons } from '@repo/data-services';
import type { Dictionary } from '@repo/internationalization';
import { FeaturesClient } from './featuresClient';

type FeaturesServerProps = {
    dictionary: Dictionary;
};

export async function FeaturesServer({ dictionary }: FeaturesServerProps) {
    // Obtener promociones activas con todos sus detalles (servicios, planes y complementos)
    const promotions = await getActivePromotionsWithDetails();

    // Obtener todos los addons disponibles independientemente de las promociones
    const addons = await getAllAddons();

    return <FeaturesClient
        dictionary={dictionary}
        promotions={promotions}
        addons={addons}
    />;
} 