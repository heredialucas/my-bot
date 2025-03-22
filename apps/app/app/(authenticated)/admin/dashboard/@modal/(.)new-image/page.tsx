import DialogWrapper from "../../components/DialogWrapper";
import ImageForm from "./ImageForm";

export default function NewImageModal() {
    return (
        <DialogWrapper title="Nueva Imagen">
            <ImageForm />
        </DialogWrapper>
    );
}