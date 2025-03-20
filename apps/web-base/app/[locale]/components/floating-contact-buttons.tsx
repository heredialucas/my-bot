'use client';

import { Phone, Headphones } from 'lucide-react';
import Link from 'next/link';
import { useServiceStore } from '@/store';

export const FloatingContactButtons = () => {
    const { selectedOption } = useServiceStore();

    if (selectedOption === 'internet-tv') {
        return (
            <div className="fixed right-0 top-1/2 z-50 flex flex-col gap-1 animate-slide-in overflow-visible">
                {/* Botón de llamada */}
                <Link
                    href="/te-llamamos"
                    className="flex flex-col items-center justify-center bg-[#5829E3] text-white p-3 w-24 h-24 text-center text-sm transition-transform hover:scale-105 rounded-l-lg shadow-md"
                >
                    <Headphones className="h-8 w-8 mb-1" />
                    <span>¿Te llamamos?</span>
                </Link>

                {/* Botón de chat */}
                <Link
                    href="/chat"
                    className="flex flex-col items-center justify-center bg-[#5829E3] text-white p-3 w-24 h-24 text-center text-sm transition-transform hover:scale-105 rounded-l-lg shadow-md"
                >
                    <Phone className="h-8 w-8 mb-1" />
                    <span>Quiero chatear</span>
                </Link>
            </div>
        )
    }

    return null;
};


