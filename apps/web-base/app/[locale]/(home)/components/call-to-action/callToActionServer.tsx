import { getServiceById } from '@repo/data-services';
import type { Dictionary } from '@repo/internationalization';
import { CallToActionClient } from './callToActionClient';
type CallToActionServerProps = {
    dictionary: Dictionary;
};

export async function CallToActionServer({ dictionary }: CallToActionServerProps) {
    // Podríamos obtener algún servicio destacado para mostrar en el CTA
    // En caso de tener un ID específico de servicio destacado
    let featuredService = null;
    try {
        // Esto es un ejemplo, deberías usar un ID real o alguna lógica para obtener el servicio destacado
        featuredService = await getServiceById('service-id-example');
    } catch (error) {
        // Si hay error, simplemente no enviamos servicio destacado al cliente
        console.error('Error al obtener el servicio destacado:', error);
    }

    return <CallToActionClient
        dictionary={dictionary}
        featuredService={featuredService}
    />;
} 