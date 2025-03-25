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
};

// Función para adaptar la promoción al formato esperado por el componente Detail
function adaptPromotion(promotion: any) {
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
            premiumContent: plan.premiumContent,
            noAds: plan.noAds,
            planType: plan.planType || 'DEFAULT'
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
export default async function DetailModal({ params }: DetailModalProps) {
    // Obtener los params
    const { id } = await params;

    try {
        // Obtener la promoción y todos los addons en paralelo
        const [promotions, allAddons] = await Promise.all([
            getActivePromotionsWithDetails(),
            getAllAddons()
        ]);

        // Buscar la promoción específica por ID
        const promotion = promotions.find(p => p.id === id);

        // Adaptar la promoción al formato esperado por el componente Detail
        const adaptedPromotion = adaptPromotion(promotion);

        return (
            <DialogWrapper>
                <DialogContent className="max-w-6xl w-11/12 p-0 overflow-hidden border-none">
                    <DialogTitle className="sr-only">Detalles del Plan</DialogTitle>
                    <Detail
                        promotion={adaptedPromotion}
                        allAddons={allAddons}
                    />
                </DialogContent>
            </DialogWrapper>
        );
    } catch (error) {
        console.error("Error al obtener la promoción:", error);
        redirect(`/`);
    }
} 