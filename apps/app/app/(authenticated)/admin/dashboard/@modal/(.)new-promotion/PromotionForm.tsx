"use client";

import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Switch } from "@repo/design-system/components/ui/switch";
import { Checkbox } from "@repo/design-system/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@repo/design-system/components/ui/radio-group";
import ModalActions from "../../components/ModalActions";
import { useState, useMemo, useEffect } from "react";
import { createPromotion } from "@repo/data-services";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Button } from "@repo/design-system/components/ui/button";
import { ArrowRight, ChevronLeft, Tv } from 'lucide-react';

// Define props interface for PricingCardPreview
interface PricingCardPreviewProps {
    discount: number;
    months: number;
    planType?: string;
    speed?: number;
    price?: number;
    originalPrice?: number;
    promotionName?: string;
    selectedAddons?: Array<{
        id: string;
        name: string;
        price: number;
    }>;
    showZappingPlans?: boolean;
    onToggleZappingPlans?: () => void;
    selectedZappingPlan?: any;
    availableZappingPlans?: any[];
    onSelectZappingPlan?: (plan: any) => void;
    selectedPlans?: string[];
}

// Import a simplified version of PricingCard for the preview
function PricingCardPreview({
    discount,
    months,
    planType = "Fibra",
    speed = 500,
    price = 0,
    originalPrice = 0,
    promotionName = "",
    selectedAddons = [],
    showZappingPlans = false,
    onToggleZappingPlans,
    selectedZappingPlan,
    availableZappingPlans = [],
    onSelectZappingPlan,
    selectedPlans = []
}: PricingCardPreviewProps) {
    // Calculate total with addons
    const addonsTotal = selectedAddons.reduce((total, addon) => total + addon.price, 0);
    const zappingPrice = selectedZappingPlan?.price || 0;

    // Calculate the price after applying the promotion discount
    const totalPrice = price + addonsTotal + zappingPrice;

    // Original price is the price without discount plus addons and zapping
    const totalOriginalPrice = originalPrice + addonsTotal + zappingPrice;

    // Manejar evento para seleccionar un plan y evitar propagación
    const handleSelectPlan = (e: React.MouseEvent, plan: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (onSelectZappingPlan) {
            onSelectZappingPlan(plan);
        }
    };

    // Manejar evento para volver y evitar propagación
    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onToggleZappingPlans) {
            onToggleZappingPlans();
        }
    };

    return (
        <div className="flex flex-col rounded-lg bg-white overflow-hidden shadow-md h-auto relative w-full max-w-[340px]">
            <div className="w-full h-full relative">
                {/* Main card with transition for zapping toggle */}
                <div
                    className="transition-all duration-500 ease-in-out flex flex-col h-full"
                    style={{
                        transform: showZappingPlans ? 'translateX(-100%)' : 'translateX(0)',
                    }}
                >
                    {/* Header */}
                    <div
                        className="py-3 px-3 text-center text-white font-medium sticky top-0 z-10"
                        style={{
                            background: 'linear-gradient(90deg, #4900FF 25%, #00FFF9 100%)'
                        }}
                    >
                        <div className="text-xl font-bold">{discount}% descuento</div>
                        <div className="text-lg">X {months} meses</div>
                        <div className="text-xs mt-1">Solo clientes nuevos</div>
                        {promotionName && <div className="text-xs font-bold mt-1">{promotionName}</div>}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow p-4">
                        <div className="text-center mb-4">
                            <div className="text-lg text-gray-800">Plan {planType}</div>
                            <div className="text-indigo-600 text-3xl font-bold">Fibra {speed}</div>
                            <div className="text-gray-700">Mensual</div>
                            <div className="text-indigo-600 text-4xl font-bold mb-2">${totalPrice.toLocaleString('es-CL')}</div>
                            <div className="text-sm text-gray-500">
                                Después de {months} meses ${totalOriginalPrice.toLocaleString('es-CL')}
                            </div>
                        </div>

                        {/* Service details - show when addons or zapping plan is selected */}
                        {(selectedAddons.length > 0 || selectedZappingPlan) && (
                            <div className="w-full mb-4">
                                <div className="text-gray-600 text-sm font-medium mb-1">Detalles del servicio:</div>
                                <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                                    <span className="text-gray-500">• Fibra {speed}</span>
                                    <span className="text-gray-700">${price.toLocaleString('es-CL')}</span>
                                </div>

                                {selectedZappingPlan && (
                                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                                        <span className="text-gray-500">• {selectedZappingPlan.name}</span>
                                        <span className="text-gray-700">${selectedZappingPlan.price.toLocaleString('es-CL')}</span>
                                    </div>
                                )}

                                {selectedAddons.map((addon, idx) => (
                                    <div key={idx} className="flex justify-between text-sm py-1 border-b border-gray-100">
                                        <span className="text-gray-500">• {addon.name}</span>
                                        <span className="text-gray-700">${addon.price.toLocaleString('es-CL')}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-col items-center mt-auto w-full space-y-3">
                            <div className="flex items-center justify-center text-white text-sm px-4 py-2 rounded-lg bg-indigo-600 w-full">
                                Lo quiero
                            </div>
                            <div className="flex items-center justify-center text-indigo-600 text-sm px-4 py-2 rounded-lg border border-indigo-600 w-full">
                                Ver detalles
                            </div>

                            {/* Zapping button - only if handler is provided - moved to bottom */}
                            {onToggleZappingPlans && (
                                <div className="w-full">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs w-full border border-[#F0436E] text-[#F0436E] hover:bg-[#F0436E]/10"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onToggleZappingPlans();
                                        }}
                                    >
                                        <Tv className="h-3 w-3 mr-1" />
                                        {selectedZappingPlan ? "Cambiar plan de ZAPPING" : "Agregar ZAPPING"}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Zapping Plans View - shown when toggled */}
                <div
                    className="absolute top-0 left-full w-full h-full bg-gray-900 text-white"
                    style={{
                        transform: showZappingPlans ? 'translateX(-100%)' : 'translateX(0)',
                        transition: 'all 0.5s ease-in-out',
                    }}
                >
                    {/* Zapping header */}
                    <div className="bg-[#F0436E] py-3 px-3 text-center text-white sticky top-0 z-10">
                        <h3 className="text-lg font-bold">Elegí tu plan Zapping</h3>
                    </div>

                    <button
                        onClick={handleBackClick}
                        className="absolute right-4 top-14 flex items-center text-white text-sm font-medium z-20"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Volver a mi plan
                    </button>

                    <div className="px-4 pt-8 pb-4 h-[calc(100%-56px)] overflow-y-auto">
                        <div className="space-y-4">
                            {selectedPlans && selectedPlans.length > 0 && availableZappingPlans.filter(plan => selectedPlans.includes(plan.id)).length > 0 ? (
                                availableZappingPlans.filter(plan => selectedPlans.includes(plan.id)).map((plan: any) => (
                                    <div
                                        key={plan.id}
                                        className="cursor-pointer hover:bg-gray-800 rounded-lg p-4 transition-colors"
                                        onClick={(e) => handleSelectPlan(e, plan)}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`w-5 h-5 rounded-full border-2 ${selectedZappingPlan?.id === plan.id ? 'border-white bg-transparent' : 'border-gray-400'} flex items-center justify-center`}>
                                                {selectedZappingPlan?.id === plan.id && <div className="w-3 h-3 bg-white rounded-full"></div>}
                                            </div>
                                            <span className="text-white font-medium text-lg">{plan.name}</span>
                                        </div>
                                        <div className="ml-8">
                                            <div className="text-white text-sm mb-1">${plan.price.toLocaleString('es-CL')} /mes</div>
                                            {plan.channelCount && (
                                                <div className="text-xs text-white/70">+ {plan.channelCount} canales</div>
                                            )}
                                            <div className="mt-2">
                                                <span className="bg-[#F0436E] text-xs text-white px-2 py-1 rounded-md">
                                                    ZAPPING
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-white/80">
                                    <p>No hay planes de Zapping seleccionados.</p>
                                    <p className="text-sm mt-2">Selecciona planes de tipo Zapping desde la sección de Planes.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

type Service = {
    id: string;
    name: string;
    icon?: string | null;
    description?: string | null;
    price?: number;
    speed?: number;
};

type Plan = {
    id: string;
    name: string;
    price: number;
    planType: string;
    speed?: number | null;
};

type Addon = {
    id: string;
    name: string;
    price: number;
    icon?: string | null;
};

interface PromotionFormProps {
    services: Service[];
    plans: Plan[];
    addons: Addon[];
}

export default function PromotionForm({ services, plans, addons }: PromotionFormProps) {
    const [name, setName] = useState("");
    const [discount, setDiscount] = useState("");
    const [duration, setDuration] = useState("");
    const [active, setActive] = useState(true);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Selected entities
    const [selectedService, setSelectedService] = useState<string>("");
    const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    // Preview state
    const [showZappingPlans, setShowZappingPlans] = useState(false);
    const [selectedZappingPlan, setSelectedZappingPlan] = useState<any>(null);

    // Get Zapping plans from the available plans
    const zappingPlans = useMemo(() => {
        // Filtrar planes reales de tipo Zapping, incluyendo variantes en el nombre o tipo
        return plans.filter(plan =>
            plan.planType === 'Zapping' ||
            plan.planType === 'ZAPPING' ||
            plan.planType.toLowerCase().includes('zapping') ||
            plan.name.toLowerCase().includes('zapping')
        );
    }, [plans]);

    // Effect to initialize selectedZappingPlan when selectedPlans or zappingPlans change
    useEffect(() => {
        // Find if any of the selected plans is a Zapping plan
        const selectedZappingPlanFromTabs = zappingPlans.find(plan =>
            selectedPlans.includes(plan.id)
        );

        if (selectedZappingPlanFromTabs) {
            setSelectedZappingPlan(selectedZappingPlanFromTabs);
        }
    }, [selectedPlans, zappingPlans]);

    // Toggle function for zapping plans view
    const toggleZappingPlans = () => {
        setShowZappingPlans(!showZappingPlans);
    };

    // Function to select a zapping plan
    const selectZappingPlan = (plan: any) => {
        // Remove any other Zapping plans from the selectedPlans
        const otherZappingPlanIds = zappingPlans
            .filter(p => p.id !== plan.id)
            .map(p => p.id);

        const plansWithoutZapping = selectedPlans.filter(id => !otherZappingPlanIds.includes(id));

        // Add the newly selected Zapping plan if it's not already there
        if (!plansWithoutZapping.includes(plan.id)) {
            setSelectedPlans([...plansWithoutZapping, plan.id]);
        } else {
            setSelectedPlans(plansWithoutZapping);
        }

        setSelectedZappingPlan(plan);
        setShowZappingPlans(false);
        setIsFormDirty(true);
    };

    const handleSave = async () => {
        if (isSubmitting) return;

        // Validate at least service is selected
        if (!selectedService) {
            setError("Debes seleccionar un servicio para la promoción.");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            // Convertir los valores numéricos
            const discountValue = parseFloat(discount);
            const durationValue = parseInt(duration);

            // Usar la función directamente
            await createPromotion({
                name,
                discount: discountValue,
                duration: durationValue,
                active,
                serviceIds: [selectedService], // Now an array with a single service
                planIds: selectedPlans,
                addonIds: selectedAddons
            });

            // La redirección la maneja automáticamente el sistema
        } catch (error) {
            console.error("Error creating promotion:", error);
            setError("Hubo un error al crear la promoción. Por favor intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Toggle selection for plans and addons
    const togglePlan = (id: string) => {
        const newSelectedPlans = selectedPlans.includes(id)
            ? selectedPlans.filter(item => item !== id)
            : [...selectedPlans, id];

        setSelectedPlans(newSelectedPlans);

        // Si es un plan Zapping
        const plan = plans.find(p => p.id === id);
        if (plan && (plan.planType === 'Zapping' || plan.name.includes('Zapping'))) {
            if (newSelectedPlans.includes(id)) {
                // Plan fue añadido, establecerlo como el plan Zapping seleccionado
                setSelectedZappingPlan(plan);
            } else if (selectedZappingPlan && selectedZappingPlan.id === id) {
                // Plan fue removido y era el plan Zapping seleccionado, limpiarlo
                setSelectedZappingPlan(null);
            }
        }

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

    // Find selected service for preview
    const selectedServiceData = useMemo(() => {
        return services.find(service => service.id === selectedService);
    }, [selectedService, services]);

    // Get selected addons objects for preview
    const selectedAddonsData = useMemo(() => {
        return addons.filter(addon => selectedAddons.includes(addon.id));
    }, [addons, selectedAddons]);

    // Calculate discount price for preview
    const discountedPrice = useMemo(() => {
        if (!selectedServiceData || !selectedServiceData.price) return 0;

        // Apply discount percentage to the service's price
        return Math.round(selectedServiceData.price * (1 - (Number(discount) / 100)));
    }, [selectedServiceData, discount]);

    return (
        <div className="flex flex-col h-full max-h-[90vh]">
            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-6">Nueva Promoción</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                <form className="px-8 py-6 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Columns 1-2: Form fields */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Existing form fields */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold">Información básica</h2>

                            {/* Name field */}
                            <div className="grid grid-cols-1 gap-2">
                                <Label htmlFor="name">Nombre de la promoción</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ej. Promoción Verano 2024"
                                />
                            </div>

                            {/* Discount field */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="discount">Descuento (%)</Label>
                                    <Input
                                        id="discount"
                                        type="number"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        placeholder="Ej. 30"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="duration">Duración (meses)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        placeholder="Ej. 3"
                                    />
                                </div>
                            </div>

                            {/* Active toggle */}
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="active"
                                    checked={active}
                                    onCheckedChange={(checked) => {
                                        setActive(checked);
                                        setIsFormDirty(true);
                                    }}
                                    disabled={isSubmitting}
                                />
                                <Label htmlFor="active">Promoción activa</Label>
                            </div>
                        </div>

                        {/* Tabs for services, plans, and addons */}
                        <div className="mt-8">
                            <h2 className="text-lg font-bold mb-3">Asociar a servicios y complementos</h2>
                            <Tabs defaultValue="services" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="services">Servicios</TabsTrigger>
                                    <TabsTrigger value="plans">Planes</TabsTrigger>
                                    <TabsTrigger value="addons">Complementos</TabsTrigger>
                                </TabsList>

                                {/* Services tab content */}
                                <TabsContent value="services" className="space-y-2 mt-4">
                                    <p className="text-sm text-gray-500 mb-2">
                                        Seleccione <strong>un solo servicio</strong> para esta promoción:
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {services.map((service) => (
                                            <label
                                                key={service.id}
                                                className={`flex items-center p-2 rounded-md border cursor-pointer hover:bg-gray-50 ${selectedService === service.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                                                    }`}
                                            >
                                                <RadioGroup
                                                    value={selectedService}
                                                    onValueChange={(value) => {
                                                        setSelectedService(value);
                                                        setIsFormDirty(true);
                                                    }}
                                                    className="flex-1"
                                                >
                                                    <div className="flex items-start gap-2">
                                                        <RadioGroupItem value={service.id} id={`service-${service.id}`} />
                                                        <div className="flex-1">
                                                            <Label htmlFor={`service-${service.id}`} className="font-medium cursor-pointer">{service.name}</Label>
                                                            <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-2">
                                                                {service.speed && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{service.speed} Mbps</span>}
                                                                {service.price && <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">${service.price.toLocaleString('es-CL')}</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </RadioGroup>
                                            </label>
                                        ))}
                                    </div>
                                </TabsContent>

                                {/* Plans tab content */}
                                <TabsContent value="plans" className="space-y-2 mt-4">
                                    <p className="text-sm text-gray-500 mb-2">
                                        Seleccione los planes que aplicarán para esta promoción:
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {plans.map((plan) => (
                                            <label
                                                key={plan.id}
                                                className={`flex items-center p-2 rounded-md border cursor-pointer hover:bg-gray-50 ${selectedPlans.includes(plan.id) ? 'border-primary bg-primary/5' : 'border-gray-200'
                                                    }`}
                                            >
                                                <Checkbox
                                                    checked={selectedPlans.includes(plan.id)}
                                                    onCheckedChange={() => togglePlan(plan.id)}
                                                    id={`plan-${plan.id}`}
                                                    disabled={isSubmitting}
                                                />
                                                <div className="ml-2 flex-1">
                                                    <Label htmlFor={`plan-${plan.id}`} className="font-medium cursor-pointer">{plan.name}</Label>
                                                    <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-2">
                                                        <span className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded-full">${plan.price.toLocaleString('es-CL')}</span>
                                                        <span className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded-full">{plan.planType}</span>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </TabsContent>

                                {/* Addons tab content */}
                                <TabsContent value="addons" className="space-y-2 mt-4">
                                    <p className="text-sm text-gray-500 mb-2">
                                        Seleccione los complementos que aplicarán para esta promoción:
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {addons.map((addon) => (
                                            <label
                                                key={addon.id}
                                                className={`flex items-center p-2 rounded-md border cursor-pointer hover:bg-gray-50 ${selectedAddons.includes(addon.id) ? 'border-primary bg-primary/5' : 'border-gray-200'
                                                    }`}
                                            >
                                                <Checkbox
                                                    checked={selectedAddons.includes(addon.id)}
                                                    onCheckedChange={() => toggleAddon(addon.id)}
                                                    id={`addon-${addon.id}`}
                                                    disabled={isSubmitting}
                                                />
                                                <div className="ml-2 flex-1">
                                                    <Label htmlFor={`addon-${addon.id}`} className="font-medium cursor-pointer">{addon.name}</Label>
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">${addon.price.toLocaleString('es-CL')}</span>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>

                    {/* Column 3: Preview section */}
                    <div className="pt-6 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-6 flex flex-col items-center">
                        <h3 className="text-sm font-medium text-gray-500 mb-4 w-full">Vista previa</h3>
                        <PricingCardPreview
                            discount={Number(discount) || 0}
                            months={Number(duration) || 0}
                            planType={selectedServiceData?.name}
                            speed={selectedServiceData?.speed}
                            price={discountedPrice}
                            originalPrice={selectedServiceData?.price || 0}
                            promotionName={name}
                            selectedAddons={selectedAddonsData}
                            showZappingPlans={showZappingPlans}
                            onToggleZappingPlans={toggleZappingPlans}
                            selectedZappingPlan={selectedZappingPlan}
                            availableZappingPlans={zappingPlans}
                            onSelectZappingPlan={selectZappingPlan}
                            selectedPlans={selectedPlans}
                        />
                        <p className="text-xs text-gray-500 mt-2 text-center px-4">
                            Vista previa de cómo se verá esta promoción en la web pública
                        </p>
                    </div>
                </form>
            </div>

            <ModalActions
                onSave={handleSave}
                isDisabled={isSubmitting || !isFormDirty || !name || !discount || !duration || !selectedService}
            />
        </div>
    );
}