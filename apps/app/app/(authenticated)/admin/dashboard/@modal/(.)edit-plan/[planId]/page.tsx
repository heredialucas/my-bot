import DialogWrapper from "../../../components/DialogWrapper";
import PlanForm from "./PlanForm";
import { getPlanById } from "../../../../server/planActions";

export default async function EditPlanModal({ params }: { params: Promise<{ planId: string }> }) {
    const { planId } = await params;

    // Obtener datos del plan usando la Server Action
    const planData = await getPlanById(planId);

    // Si no se encuentra el plan, mostrar un mensaje
    if (!planData) {
        return (
            <DialogWrapper title="Editar Plan">
                <div className="p-6">
                    <p className="text-red-500">No se encontró el plan solicitado.</p>
                </div>
            </DialogWrapper>
        );
    }

    return (
        <DialogWrapper title="Editar Plan">
            <PlanForm initialData={planData} />
        </DialogWrapper>
    );
} 