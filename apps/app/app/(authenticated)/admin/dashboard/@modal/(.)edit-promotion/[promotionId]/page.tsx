import DialogWrapper from "../../../components/DialogWrapper";
import PromotionForm from "./PromotionForm";
import { getPromotionById } from "../../../../server/promotionActions";

export default async function EditPromotionModal({ params }: { params: { promotionId: string } }) {
    const { promotionId } = params;

    // Obtener datos de la promoción usando la Server Action
    const promotionData = await getPromotionById(promotionId);

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
            <PromotionForm initialData={promotionData} />
        </DialogWrapper>
    );
} 