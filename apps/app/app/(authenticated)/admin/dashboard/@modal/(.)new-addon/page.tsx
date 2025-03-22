import DialogWrapper from "../../components/DialogWrapper";
import AddonForm from "./AddonForm";

export default async function NewAddonModal() {
    return (
        <DialogWrapper title="Nuevo Complemento">
            <AddonForm />
        </DialogWrapper>
    );
} 