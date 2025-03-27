"use client";

import { Button } from "@repo/design-system/components/ui/button";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { useState } from "react";
import PlanPreview from "./PlanPreview";

// Definir el tipo Plan con características dinámicas
type DBPlan = {
    id: string;
    name: string;
    price: number;
    regularPrice: number | null;
    promoMonths: number | null;
    createdAt: Date;
    updatedAt: Date;
    channelCount: number | null;
    planType: string;
    characteristics: {
        id: string;
        key: string;
        value: boolean;
        planId: string;
    }[];
};

// Tipo adaptado para el componente PlanPreview
type PreviewPlan = {
    name: string;
    price: number;
    regularPrice?: number;
    promoMonths?: number;
    channelCount?: number;
    characteristics?: Array<{ key: string; value: boolean }>;
};

interface PlansTabProps {
    plans: DBPlan[];
    onDeletePlan: (id: string) => Promise<void>;
}

export default function PlansTab({ plans, onDeletePlan }: PlansTabProps) {
    // Estado para el plan seleccionado
    const [selectedPlanId, setSelectedPlanId] = useState(plans.length > 0 ? plans[0]?.id : null);
    // Estado para mostrar la vista previa en móvil
    const [showPreviewMobile, setShowPreviewMobile] = useState(false);

    // Encontrar el plan seleccionado
    const selectedPlan = plans.find(p => p.id === selectedPlanId) || (plans.length > 0 ? plans[0] : null);

    // Convertir el plan seleccionado al formato adecuado para PlanPreview
    const adaptPlanForPreview = (plan: DBPlan | null): PreviewPlan => {
        if (!plan) return {
            name: 'Plan no seleccionado',
            price: 0
        };

        return {
            name: plan.name,
            price: plan.price,
            regularPrice: plan.regularPrice || undefined,
            promoMonths: plan.promoMonths || undefined,
            channelCount: plan.channelCount || undefined,
            characteristics: plan.characteristics.map(c => ({
                key: c.key,
                value: c.value
            }))
        };
    };

    // Manejar eliminación de plan
    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este plan?')) {
            await onDeletePlan(id);
            // Si el plan eliminado era el seleccionado, seleccionar otro
            if (id === selectedPlanId && plans.length > 1) {
                const newSelectedId = plans.find(p => p.id !== id)?.id;
                if (newSelectedId) {
                    setSelectedPlanId(newSelectedId);
                }
            }
        }
    };

    // Alternar la vista previa en móvil
    const toggleMobilePreview = () => {
        setShowPreviewMobile(!showPreviewMobile);
    };

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl font-bold">Planes de Zapping</h2>
                <div className="flex gap-2">
                    {/* Botón para mostrar/ocultar vista previa en móvil */}
                    {selectedPlan && (
                        <Button
                            className="flex items-center gap-2 lg:hidden"
                            variant="outline"
                            onClick={toggleMobilePreview}
                        >
                            {showPreviewMobile ? 'Ocultar Vista' : 'Ver Vista Previa'}
                        </Button>
                    )}
                    <Link href="/admin/dashboard/new-plan">
                        <Button className="flex items-center gap-2">
                            <PlusIcon className="h-4 w-4" />
                            Nuevo Plan
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Vista previa móvil togglable */}
            {showPreviewMobile && selectedPlan && (
                <div className="lg:hidden mb-4">
                    <h3 className="text-sm font-medium mb-2 text-gray-500">Vista previa</h3>
                    <div className="border rounded-lg overflow-hidden h-[400px]">
                        <PlanPreview plan={adaptPlanForPreview(selectedPlan)} />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Vista previa de cómo se verá este plan en la web pública
                    </p>
                </div>
            )}

            {plans.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No hay planes registrados</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Columna izquierda y central - Lista de planes */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {plans.map((plan) => (
                            <Card
                                key={plan.id}
                                className={`cursor-pointer transition-colors ${selectedPlanId === plan.id ? 'ring-2 ring-primary' : 'hover:bg-gray-50'}`}
                                onClick={() => {
                                    setSelectedPlanId(plan.id);
                                    // En móvil, mostrar automáticamente la vista previa al seleccionar
                                    if (!showPreviewMobile && window.innerWidth < 1024) {
                                        setShowPreviewMobile(true);
                                    }
                                }}
                            >
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">
                                            {plan.name}
                                        </CardTitle>
                                        <div className="flex gap-1">
                                            <Link href={`/admin/dashboard/edit-plan/${plan.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <PencilIcon className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Evitar que el click se propague al Card
                                                    handleDelete(plan.id);
                                                }}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="font-medium">Precio:</span> ${plan.price.toLocaleString('es-CL')}
                                        </div>
                                        {plan.regularPrice && (
                                            <div>
                                                <span className="font-medium">Precio regular:</span> ${plan.regularPrice.toLocaleString('es-CL')}
                                            </div>
                                        )}
                                        {plan.channelCount && (
                                            <div>
                                                <span className="font-medium">Canales:</span> {plan.channelCount}
                                            </div>
                                        )}
                                        {plan.promoMonths && (
                                            <div>
                                                <span className="font-medium">Meses promo:</span> {plan.promoMonths}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {/* Mostrar características dinámicas */}
                                        {plan.characteristics && plan.characteristics
                                            .filter(char => char.value)
                                            .map((char, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {char.key}
                                                </span>
                                            ))
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Columna derecha - Vista previa (solo en desktop) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-4">
                            <h3 className="text-sm font-medium mb-2 text-gray-500">Vista previa</h3>
                            <div className="border rounded-lg overflow-hidden h-[500px]">
                                {selectedPlan ? (
                                    <PlanPreview plan={adaptPlanForPreview(selectedPlan)} />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-50 text-gray-500">
                                        <p>Selecciona un plan para ver la vista previa</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Vista previa de cómo se verá este plan en la web pública
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 