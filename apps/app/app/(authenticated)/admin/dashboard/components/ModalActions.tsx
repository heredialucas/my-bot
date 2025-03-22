"use client";

import { Button } from "@repo/design-system/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ModalActionsProps {
    onSave: () => Promise<void>;
    onCancel?: () => void;
    saveLabel?: string;
    cancelLabel?: string;
    isDisabled?: boolean;
}

export default function ModalActions({
    onSave,
    onCancel,
    saveLabel = "Guardar",
    cancelLabel = "Cancelar",
    isDisabled = false,
}: ModalActionsProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            router.back();
        }
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            await onSave();
            router.back();
            router.refresh();
        } catch (error) {
            console.error("Error al guardar:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-end gap-2 p-4 border-t">
            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                {cancelLabel}
            </Button>
            <Button onClick={handleSave} disabled={isDisabled || isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando...
                    </>
                ) : (
                    saveLabel
                )}
            </Button>
        </div>
    );
} 