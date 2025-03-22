import DialogWrapper from "../../components/DialogWrapper";
import PlanForm from "./PlanForm";

export default async function NewPlanModal() {
    return (
        <DialogWrapper title="Nuevo Plan">
            <PlanForm />
        </DialogWrapper>
    );
} 