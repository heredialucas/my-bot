import DialogWrapper from "../../components/DialogWrapper";
import ServiceForm from "./ServiceForm";

export default async function NewServiceModal() {
    return (
        <DialogWrapper title="Nuevo Servicio">
            <ServiceForm />
        </DialogWrapper>
    );
} 