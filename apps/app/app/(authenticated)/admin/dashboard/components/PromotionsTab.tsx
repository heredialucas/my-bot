"use client";

import { Button } from "@repo/design-system/components/ui/button"
import { PlusIcon, PencilIcon, TrashIcon, Tv, ChevronLeft, TagIcon, EyeIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { getAllPromotions, deletePromotion } from "@repo/data-services"
import { revalidatePath } from "next/cache"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@repo/design-system/components/ui/card"
import { Badge } from "@repo/design-system/components/ui/badge"
import { useState, useMemo, useEffect } from "react";
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from "@repo/design-system/components/ui/button";

// Define types for our components
interface Promotion {
    id: string;
    name: string;
    discount: number;
    duration: number;
    active: boolean;
    createdAt?: string | Date;
    services?: { id: string }[];
    plans?: { id: string }[];
    addons?: { id: string }[];
}

// Update the Service interface to handle null values
interface Service {
    id: string;
    name: string;
    speed?: number | null;
    price?: number | null;
    description?: string | null;
    serviceItems?: any[];
}

interface Addon {
    id: string;
    name: string;
    price: number;
    description?: string;
}

interface PromotionPreviewProps {
    promotion: Promotion | null;
    selectedService: Service | null;
    selectedAddons?: Addon[];
    plans?: Plan[];
}

// Define the PricingCardPreview component directly instead of importing it
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

// Simplified version of the PricingCard for preview
function PromotionPreview({ promotion, selectedService, selectedAddons = [], plans = [] }: PromotionPreviewProps) {
    const [showZappingPlans, setShowZappingPlans] = useState(false);
    const [selectedZappingPlan, setSelectedZappingPlan] = useState<Plan | null>(null);

    // Obtener planes de Zapping de la promoción
    const zappingPlans = useMemo(() => {
        if (!promotion || !promotion.plans) return [];

        // Filtrar planes de la promoción que sean de tipo Zapping
        return plans.filter((plan: Plan) => {
            const isPlanTypeZapping = plan.planType === 'Zapping' ||
                plan.planType === 'ZAPPING' ||
                plan.planType.toLowerCase().includes('zapping') ||
                plan.name.toLowerCase().includes('zapping');
            return isPlanTypeZapping && promotion.plans?.some(p => p.id === plan.id);
        });
    }, [promotion, plans]);

    // Inicializar el plan de Zapping seleccionado
    useEffect(() => {
        if (zappingPlans.length > 0) {
            setSelectedZappingPlan(zappingPlans[0]);
        } else {
            setSelectedZappingPlan(null);
        }
    }, [zappingPlans]);

    if (!promotion || !selectedService) return (
        <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Selecciona una promoción para ver la vista previa</p>
        </div>
    );

    // Calculate values for the preview
    const discount = promotion.discount || 0;
    const months = promotion.duration || 1;
    const planType = selectedService.name || "Fibra";
    const speed = selectedService.speed || 500;
    const originalPrice = selectedService.price || 25990;
    const price = Math.round(originalPrice * (1 - (discount / 100)));
    const promotionName = promotion.name || "";

    // Toggle function for zapping plans
    const toggleZappingPlans = () => setShowZappingPlans(!showZappingPlans);

    // Function to select a zapping plan
    const selectZappingPlan = (plan: any) => {
        setSelectedZappingPlan(plan);
        setShowZappingPlans(false);
    };

    return (
        <PricingCardPreview
            discount={discount}
            months={months}
            planType={planType}
            speed={speed}
            price={price}
            originalPrice={originalPrice}
            promotionName={promotionName}
            selectedAddons={selectedAddons}
            showZappingPlans={showZappingPlans}
            onToggleZappingPlans={toggleZappingPlans}
            selectedZappingPlan={selectedZappingPlan}
            availableZappingPlans={zappingPlans}
            onSelectZappingPlan={selectZappingPlan}
            selectedPlans={promotion.plans?.map(p => p.id) || []}
        />
    );
}

// Update the type definition for plans
interface Plan {
    id: string;
    name: string;
    price: number;
    planType: string;
    speed?: number | null;
    channelCount?: number | null;
}

interface PromotionsTabProps {
    promotions: Promotion[];
    services: Service[];
    plans: Plan[];
    addons: Addon[];
    onDeletePromotion?: (id: string) => Promise<void>;
}

export default function PromotionsTab({ promotions = [], services = [], plans = [], addons = [], onDeletePromotion }: PromotionsTabProps) {
    const [showPreview, setShowPreview] = useState(false);
    const [selectedPromotionId, setSelectedPromotionId] = useState<string | null>(
        promotions.length > 0 ? promotions[0].id : null
    );

    // Zapping plans state for preview
    const [showZappingPlans, setShowZappingPlans] = useState(false);
    const [selectedZappingPlan, setSelectedZappingPlan] = useState<any>(null);

    // Find the selected promotion
    const selectedPromotion = useMemo(() => {
        return promotions.find(promo => promo.id === selectedPromotionId) || null;
    }, [promotions, selectedPromotionId]);

    // Get selected service from the promotion
    const selectedService = useMemo(() => {
        if (!selectedPromotion || !selectedPromotion.services) return null;

        // Get the serviceId from the promotion's services
        const serviceId = selectedPromotion.services[0]?.id;
        if (!serviceId) return null;

        // Find the actual service object 
        return services.find(s => s.id === serviceId) || null;
    }, [selectedPromotion, services]);

    // Get selected addons from the promotion
    const selectedAddons = useMemo(() => {
        if (!selectedPromotion || !selectedPromotion.addons) return [];

        // Map addon ids from promotion to actual addon objects
        return addons.filter(addon =>
            selectedPromotion.addons?.some(a => a.id === addon.id)
        );
    }, [selectedPromotion, addons]);

    // Get plans from the current promotion that are Zapping plans
    const zappingPlans = useMemo(() => {
        if (!selectedPromotion || !selectedPromotion.plans) return [];

        // Primero obtenemos los IDs de los planes de la promoción
        const promotionPlanIds = selectedPromotion.plans.map(p => p.id);

        // Luego filtramos los planes reales para encontrar los que son de tipo Zapping
        return plans.filter((plan: Plan) =>
            (plan.planType === 'Zapping' || plan.name.includes('Zapping')) &&
            promotionPlanIds.includes(plan.id)
        );
    }, [selectedPromotion, plans]);

    // Find the selected Zapping plan from the promotion's plans
    useEffect(() => {
        if (!selectedPromotion || !selectedPromotion.plans) {
            setSelectedZappingPlan(null);
            return;
        }

        // Get the promotion's plan ids
        const promotionPlanIds = selectedPromotion.plans.map(p => p.id);

        // Find which of those plans is a Zapping plan
        const zappingPlanFromPromotion = zappingPlans.find(plan =>
            promotionPlanIds.includes(plan.id)
        );

        // Set the selected Zapping plan
        setSelectedZappingPlan(zappingPlanFromPromotion || null);
    }, [selectedPromotion, zappingPlans]);

    // Toggle function for zapping plans view
    const toggleZappingPlans = () => {
        setShowZappingPlans(!showZappingPlans);
    };

    // Function to select a zapping plan
    const selectZappingPlan = (plan: any) => {
        setSelectedZappingPlan(plan);
        setShowZappingPlans(false);
    };

    const handleDelete = async (id: string) => {
        if (!onDeletePromotion) return;

        if (window.confirm('¿Estás seguro de que deseas eliminar esta promoción?')) {
            await onDeletePromotion(id);

            // If the deleted promotion was the selected one, select another
            if (id === selectedPromotionId && promotions.length > 1) {
                const newSelectedId = promotions.find(p => p.id !== id)?.id;
                if (newSelectedId) {
                    setSelectedPromotionId(newSelectedId);
                }
            }
        }
    };

    // Toggle the preview panel
    const togglePreview = (id: string) => {
        setSelectedPromotionId(id);
        setShowPreview(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Promociones</h2>
                <Link
                    href="/admin/dashboard/new-promotion"
                    className={buttonVariants({
                        variant: "default",
                        size: "sm",
                    })}
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Nueva Promoción
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List of promotions - take up 2 columns when preview is showing */}
                <div className={`${showPreview ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                    {promotions.length === 0 ? (
                        <Card className="border-dashed">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="rounded-full p-3 bg-muted mb-3">
                                    <TagIcon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="mb-2">No hay promociones registradas</CardTitle>
                                <CardDescription className="mb-4">Crea una promoción para comenzar a ofrecer descuentos.</CardDescription>
                                <Link
                                    href="/admin/dashboard/new-promotion"
                                    className={buttonVariants({
                                        variant: "default",
                                    })}
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Nueva Promoción
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {promotions.map((promotion) => (
                                <Card
                                    key={promotion.id}
                                    className={`overflow-hidden ${selectedPromotionId === promotion.id ? 'ring-2 ring-primary' : ''}`}
                                    onClick={() => togglePreview(promotion.id)}
                                >
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle>{promotion.name}</CardTitle>
                                                <CardDescription>
                                                    {promotion.createdAt ? `Creada el ${new Date(promotion.createdAt as any).toLocaleDateString()}` : 'Creada recientemente'}
                                                </CardDescription>
                                            </div>
                                            <Badge variant={promotion.active ? "default" : "secondary"}>
                                                {promotion.active ? "Activa" : "Inactiva"}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-3">
                                        <div className="flex flex-col space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Descuento</span>
                                                    <span className="font-semibold text-lg">{promotion.discount}%</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Duración</span>
                                                    <span className="font-semibold text-lg">{promotion.duration} meses</span>
                                                </div>
                                            </div>

                                            {/* Servicios */}
                                            {promotion.services && promotion.services.length > 0 && (
                                                <div>
                                                    <div className="text-sm font-medium mb-1">Servicios:</div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {promotion.services.map(service => {
                                                            const serviceObj = services.find(s => s.id === service.id);
                                                            return (
                                                                <Badge key={service.id} variant="outline" className="bg-blue-50">
                                                                    {serviceObj?.name || 'Servicio'}
                                                                    {serviceObj?.speed && ` (${serviceObj.speed} Mbps)`}
                                                                </Badge>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Addons */}
                                            {promotion.addons && promotion.addons.length > 0 && (
                                                <div>
                                                    <div className="text-sm font-medium mb-1">Complementos:</div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {promotion.addons.map(addon => {
                                                            const addonObj = addons.find(a => a.id === addon.id);
                                                            return (
                                                                <Badge key={addon.id} variant="outline" className="bg-indigo-50">
                                                                    {addonObj?.name || 'Complemento'}
                                                                </Badge>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end pt-0 gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 px-2 text-muted-foreground"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(promotion.id);
                                            }}
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 px-2"
                                            asChild
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Link href={`/admin/dashboard/edit-promotion/${promotion.id}`}>
                                                <PencilIcon className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-8 px-2" onClick={(e) => {
                                            e.stopPropagation();
                                            togglePreview(promotion.id);
                                        }}>
                                            <EyeIcon className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Preview panel */}
                {showPreview && selectedPromotion && (
                    <div className="border rounded-lg p-4 flex flex-col items-center">
                        <div className="mb-2 w-full flex justify-between items-center">
                            <h3 className="text-lg font-medium">Vista previa</h3>
                            <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                                <XIcon className="h-4 w-4" />
                            </Button>
                        </div>

                        <PromotionPreview
                            promotion={selectedPromotion}
                            selectedService={selectedService}
                            selectedAddons={selectedAddons}
                            plans={plans}
                        />

                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Vista previa de cómo se verá esta promoción en el sitio web público
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Implement PricingCardPreview function component
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
                            {selectedPlans.length > 0 && availableZappingPlans.filter(plan => selectedPlans.includes(plan.id)).length > 0 ? (
                                availableZappingPlans.filter(plan => selectedPlans.includes(plan.id)).map((plan) => (
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
                                    <p>No hay planes de Zapping seleccionados en esta promoción.</p>
                                    <p className="text-sm mt-2">Edita esta promoción para añadir planes de tipo Zapping.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 