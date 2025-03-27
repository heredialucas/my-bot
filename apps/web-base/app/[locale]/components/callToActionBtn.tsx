'use client';

import Link from 'next/link';
import { useServiceStore } from '@/store';

export const CallToActionBtn = ({ className, options }: { className?: string, options?: string[] }) => {
    // Usar el store para obtener la selección formateada
    const { getFormattedSelectionText } = useServiceStore();

    // Si se pasan opciones específicas, usarlas, de lo contrario obtener del store
    const message = options && options.length > 0
        ? options[0]
        : getFormattedSelectionText();

    const formattedText = encodeURIComponent(message);

    return (
        <Link
            href={`https://api.whatsapp.com/send?phone=56994833938&text=${formattedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center text-center text-sm w-44 bg-cyan-300 text-black hover:bg-cyan-400 rounded-full py-2 font-semibold ${className}`}
        >
            Lo quiero
        </Link>
    )
};


