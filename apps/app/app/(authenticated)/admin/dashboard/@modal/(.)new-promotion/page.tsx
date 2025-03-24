import DialogWrapper from "../../components/DialogWrapper";
import PromotionForm from "./PromotionForm";
import { getAllServices, getAllPlans, getAllAddons } from "@repo/data-services";

export default async function NewPromotionModal() {
    // Cargar los datos necesarios para el formulario
    const [services, plans, addons] = await Promise.all([
        getAllServices(),
        getAllPlans(),
        getAllAddons()
    ]);

    return (
        <DialogWrapper title="Nueva Promoción">
            <PromotionForm services={services} plans={plans} addons={addons} />
        </DialogWrapper>
    );
} 