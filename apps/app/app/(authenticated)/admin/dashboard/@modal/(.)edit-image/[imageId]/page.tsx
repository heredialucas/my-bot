import DialogWrapper from "../../../components/DialogWrapper";
import ImageForm from "./ImageForm";
import { getImageById } from "@repo/data-services";

export default async function EditImageModal({ params }: { params: Promise<{ imageId: string }> }) {
    const { imageId } = await params;

    // Obtener datos de la imagen desde la base de datos directamente del paquete
    const image = await getImageById(imageId);

    if (!image) {
        // Si no se encuentra la imagen, mostrar un mensaje de error
        return (
            <DialogWrapper title="Error">
                <div className="p-6">
                    <p className="text-red-500">No se encontró la imagen solicitada.</p>
                </div>
            </DialogWrapper>
        );
    }

    return (
        <DialogWrapper title="Editar Imagen">
            <ImageForm image={image} imageId={imageId} />
        </DialogWrapper>
    );
}