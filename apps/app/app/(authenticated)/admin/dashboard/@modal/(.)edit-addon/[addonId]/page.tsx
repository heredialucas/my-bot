import DialogWrapper from "../../../components/DialogWrapper";
import AddonForm from "./AddonForm";
import { getAddonById } from "../../../../server/addonActions";

export default async function EditAddonModal({ params }: { params: Promise<{ addonId: string }> }) {
    const { addonId } = await params;

    // Obtener datos del complemento usando la Server Action
    const addonData = await getAddonById(addonId);

    // Si no se encuentra el complemento, mostrar un mensaje
    if (!addonData) {
        return (
            <DialogWrapper title="Editar Complemento">
                <div className="p-6">
                    <p className="text-red-500">No se encontró el complemento solicitado.</p>
                </div>
            </DialogWrapper>
        );
    }

    return (
        <DialogWrapper title="Editar Complemento">
            <AddonForm initialData={addonData} />
        </DialogWrapper>
    );
} 