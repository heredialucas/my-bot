import DialogWrapper from "../../../components/DialogWrapper";
import PromotionForm from "./PromotionForm";
import { getPromotionById, getAllServices, getAllPlans, getAllAddons } from "@repo/data-services";

export default async function EditPromotionModal({ params }: { params: Promise<{ promotionId: string }> }) {
    const { promotionId } = await params;

    // Obtener datos en paralelo
    const [promotionData, services, plans, addons] = await Promise.all([
        getPromotionById(promotionId),
        getAllServices(),
        getAllPlans(),
        getAllAddons()
    ]);

    // Si no se encuentra la promoción, mostrar un mensaje
    if (!promotionData) {
        return (
            <DialogWrapper title="Editar Promoción">
                <div className="p-6">
                    <p className="text-red-500">No se encontró la promoción solicitada.</p>
                </div>
            </DialogWrapper>
        );
    }

    return (
        <DialogWrapper title="Editar Promoción">
            <PromotionForm
                initialData={promotionData}
                services={services}
                plans={plans}
                addons={addons}
            />
        </DialogWrapper>
    );
} 