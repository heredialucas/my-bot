import DialogWrapper from "../../../components/DialogWrapper";
import ImageForm from "./ImageForm";

// Esta función será reemplazada con una consulta real a la base de datos
async function getImage(imageId: string) {
    // Simulación de consulta a la base de datos
    return {
        id: imageId,
        name: "Banner promoción 16%",
        description: "Imagen para la promoción de 16% de descuento",
        url: "",
        alt: "Banner promoción 16%"
    };
}

export default async function EditImageModal({ params }: { params: { imageId: string } }) {
    const { imageId } = params;

    // Obtener datos de la imagen desde la base de datos
    const image = await getImage(imageId);

    return (
        <DialogWrapper title="Editar Imagen">
            <ImageForm image={image} imageId={imageId} />
        </DialogWrapper>
    );
}