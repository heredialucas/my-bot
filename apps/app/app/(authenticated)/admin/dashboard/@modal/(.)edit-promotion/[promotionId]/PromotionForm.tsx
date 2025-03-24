"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Switch } from "@repo/design-system/components/ui/switch";
import { Checkbox } from "@repo/design-system/components/ui/checkbox";
import ModalActions from "../../../components/ModalActions";
import { useState } from "react";
import { updatePromotion } from "@repo/data-services";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";

type Service = {
    id: string;
    name: string;
    icon?: string | null;
    description?: string | null;
};

type Plan = {
    id: string;
    name: string;
    price: number;
    planType: string;
    description?: string | null;
    speed?: number | null;
};

type Addon = {
    id: string;
    name: string;
    price: number;
    icon?: string | null;
    description?: string | null;
};

interface PromotionData {
    id: string;
    name: string;
    description: string | null;
    discount: number;
    duration: number;
    active: boolean;
    color: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    services?: { id: string }[];
    plans?: { id: string }[];
    addons?: { id: string }[];
}

interface PromotionFormProps {
    initialData: PromotionData;
    services: Service[];
    plans: Plan[];
    addons: Addon[];
}

export default function PromotionForm({ initialData, services, plans, addons }: PromotionFormProps) {
    const [name, setName] = useState(initialData.name);
    const [description, setDescription] = useState(initialData.description || "");
    const [discount, setDiscount] = useState(initialData.discount.toString());
    const [duration, setDuration] = useState(initialData.duration.toString());
    const [active, setActive] = useState(initialData.active);
    const [color, setColor] = useState(initialData.color || "");
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Selecciones iniciales basadas en los datos existentes
    const [selectedServices, setSelectedServices] = useState<string[]>(
        initialData.services?.map(s => s.id) || []
    );
    const [selectedPlans, setSelectedPlans] = useState<string[]>(
        initialData.plans?.map(p => p.id) || []
    );
    const [selectedAddons, setSelectedAddons] = useState<string[]>(
        initialData.addons?.map(a => a.id) || []
    );

    // Toggle selection
    const toggleService = (id: string) => {
        setSelectedServices(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
        setIsFormDirty(true);
    };

    const togglePlan = (id: string) => {
        setSelectedPlans(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
        setIsFormDirty(true);
    };

    const toggleAddon = (id: string) => {
        setSelectedAddons(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
        setIsFormDirty(true);
    };

    const handleSave = async () => {
        if (isSubmitting) return;

        // Validate at least one relationship is selected
        if (selectedServices.length === 0 && selectedPlans.length === 0 && selectedAddons.length === 0) {
            setError("Debes seleccionar al menos un servicio, plan o complemento para la promoción.");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            // Convertir los valores numéricos
            const discountValue = parseFloat(discount);
            const durationValue = parseInt(duration);

            // Usar la función directamente
            await updatePromotion(initialData.id, {
                name,
                description,
                discount: discountValue,
                duration: durationValue,
                active,
                color: color || null,
                serviceIds: selectedServices,
                planIds: selectedPlans,
                addonIds: selectedAddons
            });

            // La redirección la maneja automáticamente el sistema
        } catch (error) {
            console.error("Error updating promotion:", error);
            setError("Hubo un error al actualizar la promoción. Por favor intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[80vh]">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Editar Promoción</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre de la promoción</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                                className="h-20"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="discount">Descuento (%)</Label>
                                <Input
                                    id="discount"
                                    type="number"
                                    step="0.01"
                                    value={discount}
                                    onChange={(e) => {
                                        setDiscount(e.target.value);
                                        setIsFormDirty(true);
                                    }}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="duration">Duración (meses)</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    value={duration}
                                    onChange={(e) => {
                                        setDuration(e.target.value);
                                        setIsFormDirty(true);
                                    }}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 col-span-2">
                            <Switch
                                id="active"
                                checked={active}
                                onCheckedChange={(checked) => {
                                    setActive(checked);
                                    setIsFormDirty(true);
                                }}
                                disabled={isSubmitting}
                            />
                            <Label htmlFor="active">Activa</Label>
                        </div>

                        {/* Relationships Tabs */}
                        <div className="pt-4 col-span-2">
                            <Label className="mb-4 block text-lg font-medium">Incluir en la promoción:</Label>
                            <Tabs defaultValue="services" className="w-full">
                                <TabsList className="grid grid-cols-3 mb-4 w-full">
                                    <TabsTrigger value="services" className="px-4 py-2">Servicios</TabsTrigger>
                                    <TabsTrigger value="plans" className="px-4 py-2">Planes</TabsTrigger>
                                    <TabsTrigger value="addons" className="px-4 py-2">Complementos</TabsTrigger>
                                </TabsList>

                                <TabsContent value="services" className="border rounded-md p-4 mt-2">
                                    <h3 className="text-sm font-medium mb-3 text-gray-700">Selecciona los servicios a incluir en la promoción:</h3>
                                    {services.length === 0 ? (
                                        <p className="text-sm text-gray-500">No hay servicios disponibles.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {services.map((service) => (
                                                <div key={service.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md">
                                                    <Checkbox
                                                        id={`service-${service.id}`}
                                                        checked={selectedServices.includes(service.id)}
                                                        onCheckedChange={() => toggleService(service.id)}
                                                        disabled={isSubmitting}
                                                    />
                                                    <Label
                                                        htmlFor={`service-${service.id}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                    >
                                                        {service.name}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="plans" className="border rounded-md p-4 mt-2">
                                    <h3 className="text-sm font-medium mb-3 text-gray-700">Selecciona los planes a incluir en la promoción:</h3>
                                    {plans.length === 0 ? (
                                        <p className="text-sm text-gray-500">No hay planes disponibles.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {plans.map((plan) => (
                                                <div key={plan.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md">
                                                    <Checkbox
                                                        id={`plan-${plan.id}`}
                                                        checked={selectedPlans.includes(plan.id)}
                                                        onCheckedChange={() => togglePlan(plan.id)}
                                                        disabled={isSubmitting}
                                                    />
                                                    <Label
                                                        htmlFor={`plan-${plan.id}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                    >
                                                        {plan.name} - ${plan.price.toLocaleString()} - {plan.planType}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="addons" className="border rounded-md p-4 mt-2">
                                    <h3 className="text-sm font-medium mb-3 text-gray-700">Selecciona los complementos a incluir en la promoción:</h3>
                                    {addons.length === 0 ? (
                                        <p className="text-sm text-gray-500">No hay complementos disponibles.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {addons.map((addon) => (
                                                <div key={addon.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md">
                                                    <Checkbox
                                                        id={`addon-${addon.id}`}
                                                        checked={selectedAddons.includes(addon.id)}
                                                        onCheckedChange={() => toggleAddon(addon.id)}
                                                        disabled={isSubmitting}
                                                    />
                                                    <Label
                                                        htmlFor={`addon-${addon.id}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                    >
                                                        {addon.name} - ${addon.price.toLocaleString()}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

            <ModalActions
                onSave={handleSave}
                isDisabled={isSubmitting || !isFormDirty || !name || !description || !discount || !duration}
            />
        </div>
    );
} 