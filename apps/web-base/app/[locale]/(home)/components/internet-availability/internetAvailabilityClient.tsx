'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import type { Dictionary } from '@repo/internationalization';
import { useState } from 'react';
import Image from 'next/image';
import phoneImage from '@/public/phone.png';
import { ChevronDown } from 'lucide-react';

type InternetAvailabilityClientProps = {
    dictionary: Dictionary;
    bestDeal?: any; // Usamos any por ahora
};

type AccordionItemProps = {
    title: string;
    content: string;
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem = ({ title, content, isOpen, onToggle }: AccordionItemProps) => {
    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between py-4 sm:py-5 px-4 sm:px-6 text-left"
            >
                <span className="text-sm sm:text-base font-medium">{title}</span>
                <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm text-gray-600">
                    <p>{content}</p>
                </div>
            )}
        </div>
    );
};

export function InternetAvailabilityClient({ dictionary, bestDeal }: InternetAvailabilityClientProps) {
    const [formData, setFormData] = useState({
        region: '',
        comuna: '',
        address: '',
        rut: '',
        phone: '',
    });

    const [accordionState, setAccordionState] = useState({
        item1: false,
        item2: false,
        item3: false,
        item4: false
    });

    const toggleAccordion = (item: keyof typeof accordionState) => {
        setAccordionState(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission, API call, etc.
        console.log('Form submitted:', formData);
    };

    // Valores a mostrar, con fallbacks
    const displaySpeed = bestDeal?.speed || 300;
    const displayPrice = bestDeal?.price ? new Intl.NumberFormat('es-CL').format(bestDeal.price) : '14.990';

    // Data para el acordeón
    const accordionData = [
        {
            id: 'item1',
            title: '¿Qué es un extensor WiFi?',
            content: 'Un extensor WiFi es un dispositivo que toma la señal de tu router y la retransmite, con el fin de ampliar su cobertura y poder llegar a todos los rincones de tu hogar.'
        },
        {
            id: 'item2',
            title: '¿Qué velocidad de descarga y de subida alcanza el extensor Wifi de Netfull?',
            content: 'Nuestro extensor es dual band, es decir navega en las redes 2,4 y 5 Ghz. La velocidades de subida y bajada en la red de 2,4GHz es hasta 50Mbps y en la de 5GHz, hasta 500Mbps. La red en la que el extensor navega dependerá de la señal que alcanza a obtener del router. Ahora bien, tu dispositivo (como teléfono, tablet o PC) cambiará de red automáticamente según la distancia que se encuentra del router o extensor. Importante: No olvides que tu dispositivo operará en la red 5GHz y alcanzará las velocidades mencionadas siempre y cuando sea compatible con éstas y el extensor vaya cableado al router.'
        },
        {
            id: 'item3',
            title: '¿Cuándo utilizar un extensor wifi?',
            content: 'Te recomendamos que arriendes un extensor si tu hogar cuenta con más de 1 piso y/o 3 o más habitaciones. De todas formas, nuestro técnico durante la instalación puede sugerirte uno si lo consideras necesario.'
        },
        {
            id: 'item4',
            title: '¿Cómo instalar un extensor wifi?',
            content: 'Un técnico se encargará de instalarlo en la ubicación óptima para que disfrutes una mejor experiencia de navegación en tu hogar. Importante: Nuestros extensores van cableados al router con el fin de asegurar la mejor experiencia.'
        }
    ];

    return (
        <div className="w-full py-8 sm:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Fiber Optic Plans Heading */}
                <div className="text-center mb-3 sm:mb-4">
                    <h2 className="text-2xl sm:text-4xl font-bold">Planes fibra óptica</h2>
                </div>

                {/* Speed and Price */}
                <div className="text-center mb-8 sm:mb-12">
                    <p className="text-3xl sm:text-5xl font-bold">
                        <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 text-transparent bg-clip-text">{displaySpeed} Megas a ${displayPrice}</span>
                    </p>
                    <p className="mt-3 sm:mt-5 text-gray-700 space-y-1 sm:space-y-2">
                        <span className="block mb-2 sm:mb-3 text-sm sm:text-base">Descubre los mejores planes de internet</span>
                        <span className="block text-sm sm:text-base">Fibra Óptica de alta velocidad para tu hogar</span>
                    </p>
                </div>

                {/* Availability Checker Form */}
                <div className="mt-8 sm:mt-12 max-w-xl mx-auto">
                    <div className="rounded-lg shadow-lg relative overflow-hidden">
                        {/* Background image with phone.png */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-10"></div>
                            <div className="relative w-full h-full">
                                <Image
                                    src={phoneImage}
                                    alt="Background Image"
                                    fill
                                    className="object-cover"
                                    quality={100}
                                    priority
                                />
                            </div>
                        </div>

                        {/* Form content */}
                        <div className="relative z-20 px-5 sm:px-10 py-8 sm:py-12">
                            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-10 text-white">
                                ¿La internet fibra óptica NetFull llega a mi casa?
                            </h3>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-5 sm:space-y-7">
                                    <div className="relative">
                                        <Input
                                            name="region"
                                            value={formData.region}
                                            onChange={handleChange}
                                            placeholder="Región*"
                                            className="bg-transparent border-0 border-b border-cyan-400/60 focus:border-cyan-400 rounded-none focus:ring-0 pl-0 text-white/90 placeholder-cyan-300/70 pb-2 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Input
                                            name="comuna"
                                            value={formData.comuna}
                                            onChange={handleChange}
                                            placeholder="Comuna*"
                                            className="bg-transparent border-0 border-b border-cyan-400/60 focus:border-cyan-400 rounded-none focus:ring-0 pl-0 text-white/90 placeholder-cyan-300/70 pb-2 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Calle y número*"
                                            className="bg-transparent border-0 border-b border-cyan-400/60 focus:border-cyan-400 rounded-none focus:ring-0 pl-0 text-white/90 placeholder-cyan-300/70 pb-2 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Input
                                            name="rut"
                                            value={formData.rut}
                                            onChange={handleChange}
                                            placeholder="RUT*"
                                            className="bg-transparent border-0 border-b border-cyan-400/60 focus:border-cyan-400 rounded-none focus:ring-0 pl-0 text-white/90 placeholder-cyan-300/70 pb-2 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Teléfono*"
                                            className="bg-transparent border-0 border-b border-cyan-400/60 focus:border-cyan-400 rounded-none focus:ring-0 pl-0 text-white/90 placeholder-cyan-300/70 pb-2 text-sm sm:text-base"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mt-10 sm:mt-14 flex justify-center">
                                    <Button
                                        type="submit"
                                        className="bg-cyan-400 hover:bg-cyan-500 text-indigo-900 font-semibold px-6 sm:px-10 py-2.5 sm:py-3 rounded-md transition-colors text-sm sm:text-base"
                                    >
                                        Consultar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* WiFi Extenders Accordion Section */}
                <div className="mt-16 sm:mt-28">
                    <div className="text-center mb-6 sm:mb-10">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-1">
                            Extensores Wifi para
                        </h3>
                        <p className="text-2xl sm:text-3xl">
                            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 text-transparent bg-clip-text font-bold">fibra óptica NetFull</span>
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto border rounded-lg shadow-sm">
                        {accordionData.map((item) => (
                            <AccordionItem
                                key={item.id}
                                title={item.title}
                                content={item.content}
                                isOpen={accordionState[item.id as keyof typeof accordionState]}
                                onToggle={() => toggleAccordion(item.id as keyof typeof accordionState)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 