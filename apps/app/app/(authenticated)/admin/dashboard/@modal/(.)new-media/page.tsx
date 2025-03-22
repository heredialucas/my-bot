import DialogWrapper from "../../components/DialogWrapper";
import MediaForm from "./MediaForm";
export default async function NewMediaModal() {
    return (
        <DialogWrapper title="Nuevo Medio">
            <MediaForm />
        </DialogWrapper>
    );
} 