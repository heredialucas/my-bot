'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import type { Dictionary } from '@repo/internationalization';
import { useState } from 'react';
import Image from 'next/image';
import phoneImage from '@/public/phone.png';

type InternetAvailabilityClientProps = {
    dictionary: Dictionary;
    bestDeal?: any; // Usamos any por ahora
};

export function InternetAvailabilityClient({ dictionary, bestDeal }: InternetAvailabilityClientProps) {
    const [formData, setFormData] = useState({
        region: '',
        comuna: '',
        address: '',
        rut: '',
        phone: '',
    });

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

    return (
        <div className="w-full py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Fiber Optic Plans Heading */}
                <div className="text-center mb-4">
                    <h2 className="text-4xl font-bold">Planes fibra óptica</h2>
                </div>

                {/* Speed and Price */}
                <div className="text-center mb-12">
                    <p className="text-5xl font-bold">
                        <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 text-transparent bg-clip-text">{displaySpeed} Megas a ${displayPrice}</span>
                    </p>
                    <p className="mt-5 text-gray-700 space-y-2">
                        <span className="block mb-3">Descubre los mejores planes de internet</span>
                        <span className="block">Fibra Óptica de alta velocidad para tu hogar</span>
                    </p>
                </div>

                {/* Availability Checker Form */}
                <div className="mt-12 max-w-xl mx-auto">
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
                        <div className="relative z-20 px-10 py-12">
                            <h3 className="text-2xl font-bold text-center mb-10 text-white">
                                ¿La internet fibra óptica NetFull llega a mi casa?
                            </h3>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-7">
                                    <div className="relative">
                                        <Input
                                            name="region"
                                            value={formData.region}
                                            onChange={handleChange}
                                            placeholder="Región*"
                                            className="bg-transparent border-0 border-b border-cyan-400/60 focus:border-cyan-400 rounded-none focus:ring-0 pl-0 text-white/90 placeholder-cyan-300/70 pb-2"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Input
                                            name="comuna"
                                            value={formData.comuna}
                                            onChange={handleChange}
                                            placeholder="Comuna*"
                                            className="bg-transparent border-0 border-b border-cyan-400/60 focus:border-cyan-400 rounded-none focus:ring-0 pl-0 text-white/90 placeholder-cyan-300/70 pb-2"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Calle y número*"
                                            className="bg-transparent border-0 border-b border-cyan-400/60 focus:border-cyan-400 rounded-none focus:ring-0 pl-0 text-white/90 placeholder-cyan-300/70 pb-2"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Input
                                            name="rut"
                                            value={formData.rut}
                                            onChange={handleChange}
                                            placeholder="RUT*"
                                            className="bg-transparent border-0 border-b border-cyan-400/60 focus:border-cyan-400 rounded-none focus:ring-0 pl-0 text-white/90 placeholder-cyan-300/70 pb-2"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Teléfono*"
                                            className="bg-transparent border-0 border-b border-cyan-400/60 focus:border-cyan-400 rounded-none focus:ring-0 pl-0 text-white/90 placeholder-cyan-300/70 pb-2"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mt-14 flex justify-center">
                                    <Button
                                        type="submit"
                                        className="bg-cyan-400 hover:bg-cyan-500 text-indigo-900 font-semibold px-10 py-3 rounded-md transition-colors text-base"
                                    >
                                        Consultar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* WiFi Extenders Section */}
                <div className="mt-28 text-center">
                    <h3 className="text-3xl font-bold mb-1">
                        Extensores Wifi para
                    </h3>
                    <p className="text-3xl mb-6">
                        <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 text-transparent bg-clip-text font-bold">fibra óptica NetFull</span>
                    </p>

                    <div className="mt-8 flex justify-center">
                        <Button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full flex items-center transition-colors"
                        >
                            Conocer más
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 