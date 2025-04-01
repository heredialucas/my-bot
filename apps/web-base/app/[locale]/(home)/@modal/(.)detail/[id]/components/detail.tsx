"use client";

import { Check, Wrench, X, FileText, Calendar, Clock, Gauge, Eye, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { AddOn } from "../../../../components/features/types";
import { CallToActionBtn } from "@/app/[locale]/components/callToActionBtn";
import { DetailProps } from "./types";
import { ChannelGalleryModal } from "../../../../components/features/channel-gallery-modal";
import { partnerLogos } from "../../../../components/features/images";
import Star from '@/public/star.png'
import { floorNumber } from "@/utils/formatData";

export default function Detail({ promotion, selectedAddonsFromLanding = [], allAddons = [] }: DetailProps) {
    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

    // Ordenar los planes por precio (menor a mayor)
    const sortedPlans = [...promotion.plans].sort((a, b) => a.price - b.price);

    // Obtener el primer servicio de la promoción
    const service = promotion.services[0] || {};
    const speed = service.speed || 0;
    const price = service.price || 0;
    const regularPrice = service.price || 0;

    // Estado local para el plan seleccionado
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
        null // Ya no seleccionamos un plan por defecto
    );

    // Estado local para addons
    const [localAddons, setLocalAddons] = useState<AddOn[]>(selectedAddonsFromLanding);

    // Estado para controlar el modal de canales
    const [showChannelModal, setShowChannelModal] = useState(false);
    const [selectedChannelSet, setSelectedChannelSet] = useState<'national' | 'football' | 'plus' | 'cine'>('national');

    // Función para cerrar el modal
    const handleClose = () => {
        router.back();
    };

    // Manejar selección de plan
    const handlePlanSelection = (planId: string) => {
        setSelectedPlanId(planId);
    };

    // Manejar selección de addon
    const handleToggleAddon = (addon: AddOn) => {
        setLocalAddons(current => {
            // Verificar si el addon ya está seleccionado
            const isSelected = current.some(a => a.id === addon.id);

            if (isSelected) {
                // Si está seleccionado, lo eliminamos
                return current.filter(a => a.id !== addon.id);
            } else {
                // Si no está seleccionado, lo agregamos
                return [...current, addon];
            }
        });
    };

    // Encontrar el plan seleccionado por ID
    const displayPlan = selectedPlanId ? promotion.plans.find(plan => plan.id === selectedPlanId) : null;
    const selectedPlanPrice = displayPlan?.price || 0;

    // Calcular el total de addons
    const addonsTotal = localAddons.reduce((total, addon) => total + addon.price, 0);

    // Calcular el precio con descuento aplicando el porcentaje de la promoción
    // Solo se aplica descuento al servicio principal (fibra), no a los planes de Zapping
    const discountedPrice = price * (1 - promotion.discount / 100);

    // El precio total incluye: precio con descuento del servicio + precio SIN descuento del plan Zapping + addons
    const totalPrice = discountedPrice + selectedPlanPrice + addonsTotal;

    // El precio regular (después de la promoción) es el precio regular del servicio + precio del plan + addons
    const regularTotalPrice = regularPrice + selectedPlanPrice + addonsTotal;

    // Generar mensaje personalizado para esta selección específica
    const getDetailFormattedText = () => {
        const parts = ['Hola, me gustaría contratar:'];

        // Agregar información del plan de internet
        parts.push(`- Plan Fibra ${speed} Mbps por $${floorNumber(discountedPrice).toLocaleString('es-CL')}`);

        // Agregar plan de TV si está seleccionado
        if (displayPlan) {
            const channels = displayPlan.channelCount
                ? `con ${displayPlan.channelCount} canales`
                : '';
            parts.push(`- Plan ${displayPlan.name} ${channels} por $${floorNumber(selectedPlanPrice).toLocaleString('es-CL')}`);
        }

        // Agregar complementos seleccionados
        if (localAddons.length > 0) {
            const addonsList = localAddons.map(addon =>
                `${addon.name} por $${floorNumber(addon.price).toLocaleString('es-CL')}`
            ).join(', ');
            parts.push(`- Complementos: ${addonsList}`);
        }

        // Agregar precio total mensual
        parts.push(`\nPrecio total mensual: $${floorNumber(totalPrice).toLocaleString('es-CL')}`);

        // Agregar información sobre el precio después de la promoción
        parts.push(`Después del mes ${promotion.duration}, el precio será $${floorNumber(regularTotalPrice).toLocaleString('es-CL')}`);

        return parts.join('\n');
    };

    // Handle scroll events to show/hide scroll indicator
    const handleScroll = () => {
        if (modalRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
            // Consider it "scrolled to bottom" when within 20px of the bottom
            const isBottom = scrollHeight - scrollTop - clientHeight < 20;
            setIsScrolledToBottom(isBottom);
        }
    };

    // Add scroll event listener
    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            modalElement.addEventListener('scroll', handleScroll);
            // Initialize scroll position
            handleScroll();
        }

        return () => {
            if (modalElement) {
                modalElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <>
            <div
                ref={modalRef}
                className="flex flex-col lg:flex-row rounded-lg overflow-hidden relative w-full max-h-[90vh] lg:max-h-none overflow-y-auto lg:overflow-visible"
            >
                {/* Botón para cerrar el modal */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-10 p-1 bg-white/70 hover:bg-white/90 rounded-full transition-colors"
                    aria-label="Cerrar"
                >
                    <X className="h-5 w-5 text-black" />
                </button>

                {/* Left Section - Blue gradient with diagonal cut */}
                <div
                    className="text-white p-4 sm:p-7 lg:w-[48%] relative"
                    style={{
                        background: 'linear-gradient(90deg, #4900FF 70%, #00FFF9 100%)'
                    }}
                >
                    {/* Scroll indicator arrow - only visible on mobile when not scrolled to bottom */}
                    {!isScrolledToBottom && (
                        <div className="lg:hidden absolute bottom-4 right-4 animate-bounce">
                            <ChevronDown className="w-10 h-10 text-[#4900FF] drop-shadow-md" />
                        </div>
                    )}

                    {/* Diagonal divider - moved more towards the right */}
                    <div className="hidden lg:block absolute top-0 right-0 h-full w-16"
                        style={{
                            background: 'linear-gradient(90deg, #4900FF 0%, #00FFF9 100%)',
                            clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
                        }}>
                    </div>
                    <div className="hidden lg:block absolute top-0 right-0 h-full w-16 bg-white"
                        style={{
                            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                        }}>
                    </div>

                    {/* Star for desktop view - centered on the right edge */}
                    <div className="hidden lg:block absolute right-0 top-[45%] z-10 rotate-12 translate-x-1/3">
                        <div className="relative">
                            <Image
                                src={Star}
                                alt="Promoción Zapping"
                                width={140}
                                height={140}
                                className="w-36 h-36"
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-center px-3">
                                <p className="text-sm font-semibold text-gray-800 leading-tight">
                                    No olvides<br />tu plan<br />Zapping
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <h2 className="text-base lg:text-lg font-medium mb-1 lg:mb-2">Plan internet fibra</h2>
                            <h1 className="text-4xl lg:text-5xl font-bold mb-2 lg:mb-4 text-cyan-300">{speed} <span className="text-white">Mbps</span></h1>

                            <p className="mb-4 lg:mb-6 text-sm lg:text-base">contrata este plan y tendrás</p>

                            <div className="flex flex-col gap-y-4 lg:gap-y-6 mb-6 lg:mb-8">
                                {/* Velocidad semétrica */}
                                <div className="flex items-start">
                                    <div className="bg-blue-400/30 p-1.5 lg:p-2 rounded-full mr-2 lg:mr-3 mt-1">
                                        <Gauge className="h-4 w-4 lg:h-5 lg:w-5 text-cyan-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-cyan-300 text-sm lg:text-base">Velocidad semétrica</h3>
                                        <p className="text-xs lg:text-sm mt-0.5 lg:mt-1">Hasta {speed} Mbps de subida y bajada</p>
                                    </div>
                                </div>

                                {/* Sin letra chica */}
                                <div className="flex items-start">
                                    <div className="bg-blue-400/30 p-1.5 lg:p-2 rounded-full mr-2 lg:mr-3 mt-1">
                                        <FileText className="h-4 w-4 lg:h-5 lg:w-5 text-cyan-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-cyan-300 text-sm lg:text-base">Sin letra chica</h3>
                                        <p className="text-xs lg:text-sm mt-0.5 lg:mt-1">Cobros y boletas transparentes</p>
                                    </div>
                                </div>

                                {/* Contact center */}
                                <div className="flex items-start">
                                    <div className="bg-blue-400/30 p-1.5 lg:p-2 rounded-full mr-2 lg:mr-3 mt-1">
                                        <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-cyan-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-cyan-300 text-sm lg:text-base">Contact center</h3>
                                        <p className="text-xs lg:text-sm mt-0.5 lg:mt-1">Lunes a viernes 9:00 a 20:00 hs</p>
                                        <p className="text-xs lg:text-sm">Sábados de 9:00 a 14:00 hs</p>
                                    </div>
                                </div>

                                {/* Incluye */}
                                <div className="flex items-start">
                                    <div className="bg-blue-400/30 p-1.5 lg:p-2 rounded-full mr-2 lg:mr-3 mt-1">
                                        <Wrench className="h-4 w-4 lg:h-5 lg:w-5 text-cyan-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-cyan-300 text-sm lg:text-base">Incluye</h3>
                                        <p className="text-xs lg:text-sm mt-0.5 lg:mt-1">La activación y habilitación. ¡Agendá tu instalación!</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 lg:pt-6 border-t border-white/20">
                            <p className="text-xs lg:text-sm text-center">Cliente cancela plan a contratar al momento de instalar</p>
                            <h2 className="text-3xl lg:text-4xl font-bold mt-1 lg:mt-2 text-center">${(floorNumber(discountedPrice + (selectedPlanPrice > 0 ? selectedPlanPrice : 0) + addonsTotal)).toLocaleString('es-CL')}</h2>
                            <p className="text-xs lg:text-sm text-center">¡Mes {promotion.duration} pagas ${(floorNumber(regularPrice + (selectedPlanPrice > 0 ? selectedPlanPrice : 0) + addonsTotal)).toLocaleString('es-CL')}</p>

                            <div className="flex justify-center mt-4 lg:mt-6">
                                <CallToActionBtn options={[getDetailFormattedText()]} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - White with plan details */}
                <div className="bg-white p-4 sm:p-7 lg:w-[52%] relative">
                    {/* Star for mobile view - absolute to the right section */}
                    <div className="absolute bottom-1/3 -right-4 lg:hidden z-10 rotate-12">
                        <div className="relative">
                            <Image
                                src={Star}
                                alt="Promoción Zapping"
                                width={140}
                                height={140}
                                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-center px-3">
                                <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight">
                                    No olvides<br />tu plan<br />Zapping
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block text-center mb-6 lg:mb-8">
                        <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#4900FF] to-[#00FFF9] bg-clip-text text-transparent">
                            ${floorNumber(totalPrice).toLocaleString('es-CL')}
                        </h2>
                        <p className="text-gray-700 mt-1 text-sm lg:text-base">Mensual / mes {promotion.duration} pagás ${floorNumber(regularTotalPrice).toLocaleString('es-CL')}</p>
                    </div>

                    <div className="mb-6 lg:mb-8">
                        <h3 className="font-medium text-gray-800 mb-2 lg:mb-3 text-sm lg:text-base">Detalles del servicio</h3>
                        <div className="flex flex-col gap-y-2 lg:gap-y-3">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                <span className="text-sm lg:text-base">Fibra {speed}</span>
                                <span className="font-medium text-sm lg:text-base">${floorNumber(discountedPrice).toLocaleString('es-CL')}</span>
                            </div>

                            {/* Mostrar el plan seleccionado si hay uno */}
                            {displayPlan && (
                                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <span className="text-sm lg:text-base">Plan {displayPlan.name}</span>
                                    <span className="font-medium text-sm lg:text-base">${floorNumber(selectedPlanPrice).toLocaleString('es-CL')}</span>
                                </div>
                            )}

                            {/* Mostrar los addons seleccionados */}
                            {localAddons.map((addon, index) => (
                                <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <span className="text-sm lg:text-base">{addon.name}</span>
                                    <span className="font-medium text-sm lg:text-base">${floorNumber(addon.price).toLocaleString('es-CL')}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mb-6 lg:mb-8">
                        <CallToActionBtn options={[getDetailFormattedText()]} />
                    </div>

                    {/* Sección de selección de plan Zapping con fondo oscuro */}
                    {promotion.plans.length > 0 && (
                        <div className="relative">
                            <div className="bg-rose-500 text-white p-2 lg:p-3 text-center rounded-t-lg">
                                <h3 className="font-medium text-sm lg:text-base">TV Online. Elige tu plan ZAPPING</h3>
                            </div>
                            <div className="bg-gray-900 text-white rounded-b-lg max-h-[180px] lg:max-h-[220px] overflow-y-auto custom-scrollbar">
                                {sortedPlans.length > 0 && (
                                    <div className="flex flex-col">
                                        {sortedPlans.map((plan) => (
                                            <div
                                                key={plan.id}
                                                className="flex items-start lg:items-center flex-col lg:flex-row px-3 lg:px-4 py-3 border-b border-gray-700 cursor-pointer"
                                                onClick={() => handlePlanSelection(plan.id)}
                                            >
                                                {/* Columna izquierda: Checkbox y nombre */}
                                                <div className="flex items-center gap-2 w-full lg:w-[25%] mb-2 lg:mb-0">
                                                    <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full border ${selectedPlanId === plan.id ? 'border-blue-400 bg-blue-400' : 'border-gray-400'} flex items-center justify-center`}>
                                                        <div className={`w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full ${selectedPlanId === plan.id ? 'bg-white' : ''}`}></div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-white text-sm lg:text-base">{plan.name}</span>
                                                        <div className="flex gap-1 mt-1">
                                                            {(() => {
                                                                const planName = plan.name?.toLowerCase() || '';
                                                                let channelSet: 'national' | 'football' | 'plus' | 'cine' = 'national';

                                                                if (planName.includes('cine')) {
                                                                    channelSet = 'cine';
                                                                } else if (planName.includes('plus')) {
                                                                    channelSet = 'plus';
                                                                } else if (planName.includes('fútbol') || planName.includes('futbol')) {
                                                                    channelSet = 'football';
                                                                }

                                                                return partnerLogos[channelSet].map((partner, idx) => (
                                                                    <Image
                                                                        key={idx}
                                                                        src={partner.logo}
                                                                        alt={partner.name}
                                                                        className={`h-3 sm:h-4 w-auto object-contain ${idx === 1 ? 'bg-white rounded-sm p-0.5' : ''}`}
                                                                        width={40}
                                                                        height={16}
                                                                    />
                                                                ))
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Columna media: Características del plan */}
                                                <div className="w-full lg:w-[45%] mb-2 lg:mb-0 pl-6 lg:pl-0">
                                                    {plan.characteristics && plan.characteristics.length > 0 && (
                                                        <div className="flex flex-wrap gap-1">
                                                            {plan.characteristics
                                                                .filter(char => char.value)
                                                                .map((char, idx) => (
                                                                    <span key={idx} className="text-[10px] lg:text-xs bg-rose-800 text-white px-2 py-0.5 rounded">
                                                                        {char.key}
                                                                    </span>
                                                                ))
                                                            }
                                                        </div>
                                                    )}
                                                    {plan.channelCount && (
                                                        <div className="w-fit mt-1 text-[10px] lg:text-xs text-white font-medium bg-rose-800 px-2 py-0.5 rounded flex items-center gap-1">
                                                            <span>{plan.channelCount} canales</span>
                                                            <button
                                                                className="ml-1 bg-transparent hover:bg-[#F0436E20] p-0.5 rounded"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    // Get channel set from plan
                                                                    const planName = plan.name?.toLowerCase() || '';
                                                                    let channelSet: 'national' | 'football' | 'plus' | 'cine' = 'national';

                                                                    if (planName.includes('cine')) {
                                                                        channelSet = 'cine';
                                                                    } else if (planName.includes('plus')) {
                                                                        channelSet = 'plus';
                                                                    } else if (planName.includes('fútbol') || planName.includes('futbol')) {
                                                                        channelSet = 'football';
                                                                    }

                                                                    setSelectedChannelSet(channelSet);
                                                                    setShowChannelModal(true);
                                                                }}
                                                            >
                                                                <Eye className="h-3 w-3 text-white" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Columna derecha: Precios */}
                                                <div className="text-left lg:text-right w-full lg:w-[30%] pl-6 lg:pl-0">
                                                    <p className="font-bold text-white text-sm lg:text-base">${floorNumber(plan.price).toLocaleString('es-CL')}</p>
                                                    <p className="text-[10px] lg:text-xs text-gray-400">{`${plan.promoMonths} meses`}</p>
                                                    <p className="text-[10px] lg:text-xs text-gray-400">luego ${(floorNumber(plan.regularPrice || plan.price)).toLocaleString('es-CL')} /mes</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Footer con addons como en la imagen de referencia */}
                    {allAddons.length > 0 && (
                        <div className="mt-4 lg:mt-6 pt-2 lg:pt-3 border-t border-gray-200">
                            {allAddons.map((addon, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-center p-2 lg:p-3 mx-auto border border-dashed border-gray-300 rounded-lg cursor-pointer mb-2 lg:mb-2.5"
                                    onClick={() => handleToggleAddon(addon)}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`w-4 h-4 lg:w-5 lg:h-5 border-2 ${localAddons.some(a => a.id === addon.id) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400'} rounded-sm flex items-center justify-center`}>
                                            {localAddons.some(a => a.id === addon.id) && <Check className="h-2.5 w-2.5 lg:h-3 lg:w-3 text-white" />}
                                        </div>
                                        <span className="text-sm lg:text-base">Agregar {addon.name} por <span className="text-[#4900FF]">${floorNumber(addon.price).toLocaleString('es-CL')}</span>/mes</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Channel Gallery Modal */}
            <ChannelGalleryModal
                isOpen={showChannelModal}
                onClose={() => setShowChannelModal(false)}
                channelSet={selectedChannelSet}
            />
        </>
    );
} 