import DialogWrapper from "../../../components/DialogWrapper";
import { getMediaById } from "../../../../server/mediaActions";
import MediaForm from "./MediaForm";
export default async function EditMediaModal({ params }: { params: { mediaId: string } }) {
    const { mediaId } = params;

    // Obtener datos del medio usando la Server Action
    const mediaData = await getMediaById(mediaId);

    // Si no se encuentra el medio, mostrar un mensaje
    if (!mediaData) {
        return (
            <DialogWrapper title="Editar Medio">
                <div className="p-6">
                    <p className="text-red-500">No se encontró el medio solicitado.</p>
                </div>
            </DialogWrapper>
        );
    }

    return (
        <DialogWrapper title="Editar Medio">
            <MediaForm initialData={mediaData} />
        </DialogWrapper>
    );
} 