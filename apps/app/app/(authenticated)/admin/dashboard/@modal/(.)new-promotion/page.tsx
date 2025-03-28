import DialogWrapper from "../../components/DialogWrapper";
import PromotionForm from "./PromotionForm";
import { getAllServices, getAllPlans, getAllAddons } from "@repo/data-services";

export default async function NewPromotionModal() {
    // Cargar los datos necesarios para el formulario
    const [servicesData, plans, addons] = await Promise.all([
        getAllServices(),
        getAllPlans(),
        getAllAddons()
    ]);

    // Transform services to match the expected Service type
    const services = servicesData.map(service => ({
        id: service.id,
        name: service.name,
        icon: service.icon,
        description: null,
        price: service.price === null ? undefined : service.price,
        speed: service.speed === null ? undefined : service.speed
    }));

    return (
        <DialogWrapper title="Nueva Promoción">
            <PromotionForm services={services} plans={plans} addons={addons} />
        </DialogWrapper>
    );
} 