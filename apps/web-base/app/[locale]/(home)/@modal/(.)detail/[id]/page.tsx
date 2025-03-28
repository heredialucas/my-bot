import { DialogContent, DialogTitle } from '@repo/design-system/components/ui/dialog';
import { getActivePromotionsWithDetails, getAllAddons } from '@repo/data-services';
import Detail from './components/detail';
import { redirect } from 'next/navigation';
import DialogWrapper from './components/dialog-wrapper';

// Definir los props que recibe la página
type DetailModalProps = {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        addons?: string;
    }>;
};

// Función para adaptar la promoción al formato esperado por el componente Detail
function adaptPromotion(promotion: any) {
    if (!promotion) return null;

    return {
        ...promotion,
        services: promotion.services.map((service: any) => ({
            id: service.id,
            name: service.name,
            description: service.description,
            icon: service.icon,
            speed: service.speed,
            price: service.price,
            regularPrice: service.regularPrice,
            promoMonths: service.promoMonths,
            serviceItems: service.serviceItems || []
        })),
        plans: promotion.plans.map((plan: any) => ({
            id: plan.id,
            name: plan.name,
            description: plan.description,
            price: plan.price,
            regularPrice: plan.regularPrice,
            promoMonths: plan.promoMonths,
            channelCount: plan.channelCount,
            planType: plan.planType || 'DEFAULT',
            characteristics: plan.characteristics || []
        })),
        addons: promotion.addons.map((addon: any) => ({
            id: addon.id,
            name: addon.name,
            description: addon.description,
            price: addon.price,
            icon: addon.icon,
            color: addon.color
        }))
    };
}

// Componente de servidor que obtiene los datos de la promoción
export default async function DetailModal({ params, searchParams }: DetailModalProps) {
    // Obtener el ID de los params de forma asíncrona
    const { id } = await params;

    // Obtener los searchParams de forma asíncrona
    const resolvedSearchParams = await searchParams;

    try {
        // Obtener la promoción y todos los addons en paralelo
        const [promotions, allAddons] = await Promise.all([
            getActivePromotionsWithDetails(),
            getAllAddons()
        ]);

        // Buscar la promoción específica por ID
        const promotion = promotions.find((p: any) => p.id === id);

        if (!promotion) {
            redirect('/');
            return null;
        }

        // Parsear los addons seleccionados desde los query params
        const selectedAddonsFromLanding = resolvedSearchParams?.addons ?
            allAddons.filter(addon => resolvedSearchParams.addons?.split(',').includes(addon.id)) :
            [];

        return (
            <DialogWrapper>
                <DialogContent className="max-w-6xl w-11/12 p-0 border-none max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="sr-only">Detalles del Plan</DialogTitle>
                    <Detail
                        promotion={promotion}
                        selectedAddonsFromLanding={selectedAddonsFromLanding}
                        allAddons={allAddons}
                    />
                </DialogContent>
            </DialogWrapper>
        );
    } catch (error) {
        console.error("Error al obtener la promoción:", error);
        redirect('/');
        return null;
    }
} 