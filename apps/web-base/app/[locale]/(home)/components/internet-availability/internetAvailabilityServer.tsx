import { getAllServices } from '@repo/data-services';
import type { Dictionary } from '@repo/internationalization';
import { InternetAvailabilityClient } from './internetAvailabilityClient';

type InternetAvailabilityServerProps = {
    dictionary: Dictionary;
};

export async function InternetAvailabilityServer({ dictionary }: InternetAvailabilityServerProps) {
    // Obtenemos los datos del servicio para mostrar la mejor oferta
    const services = await getAllServices();

    // Encontrar el servicio con la mejor relación velocidad/precio para mostrar
    let bestDeal = null;
    if (services.length > 0) {
        // Simplemente elegimos el que tenga el precio promocional más bajo
        bestDeal = services.reduce((best, current) => {
            if (!best || (current.price && best.price && current.price < best.price)) {
                return current;
            }
            return best;
        });
    }

    return <InternetAvailabilityClient
        dictionary={dictionary}
        bestDeal={bestDeal}
    />;
} 