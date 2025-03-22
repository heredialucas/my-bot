import DialogWrapper from "../../components/DialogWrapper";
import PromotionForm from "./PromotionForm";

export default async function NewPromotionModal() {
    return (
        <DialogWrapper title="Nueva Promoción">
            <PromotionForm />
        </DialogWrapper>
    );
} 