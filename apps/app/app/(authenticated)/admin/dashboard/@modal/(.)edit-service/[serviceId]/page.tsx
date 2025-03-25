import DialogWrapper from "../../../components/DialogWrapper";
import ServiceForm from "./ServiceForm";
import { getServiceById } from "@repo/data-services";

export default async function EditServiceModal({ params }: { params: Promise<{ serviceId: string }> }) {
    const { serviceId } = await params;

    // Obtener datos del servicio
    const serviceData = await getServiceById(serviceId);

    // Si no se encuentra el servicio, mostrar un mensaje
    if (!serviceData) {
        return (
            <DialogWrapper title="Editar Servicio">
                <div className="p-6">
                    <p className="text-red-500">No se encontró el servicio solicitado.</p>
                </div>
            </DialogWrapper>
        );
    }

    return (
        <DialogWrapper title="Editar Servicio">
            <ServiceForm initialData={serviceData} />
        </DialogWrapper>
    );
} 