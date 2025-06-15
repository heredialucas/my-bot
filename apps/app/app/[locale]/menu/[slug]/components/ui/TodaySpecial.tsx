import React from 'react';
import Image from 'next/image';
import { Clock, Star, MessageCircle } from 'lucide-react';
import { Dictionary } from '@repo/internationalization';
import { generateWhatsAppLinkForDish } from './utils';

interface Dish {
    id: string;
    name: string;
    description: string;
    price: number;
    promotionalPrice?: number | null;
    imageUrl?: string | null;
    category?: {
        name: string;
    } | null;
}

interface TodaySpecialData {
    id: string;
    date: Date;
    isActive: boolean;
    dish: Dish;
}

interface TodaySpecialProps {
    todaySpecial: TodaySpecialData;
    themeColors: {
        bg: string;
        text: string;
        accent: string;
    };
    dictionary: Dictionary;
    restaurantName: string;
    restaurantPhone?: string | null;
}

export default function TodaySpecial({ todaySpecial, themeColors, dictionary, restaurantName, restaurantPhone }: TodaySpecialProps) {
    const whatsappLink = restaurantPhone ? generateWhatsAppLinkForDish(restaurantPhone, todaySpecial.dish.name, restaurantName) : '';

    return (
        <section className="relative bg-gradient-to-br from-orange-50 to-red-50 border-b">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 to-red-200/20"></div>
            <div className="relative max-w-6xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-semibold mb-2">
                        <Star className="animate-pulse mr-2 w-4 h-4" />
                        {dictionary.web?.menu?.todaySpecial || 'Plato del Día'}
                        <Star className="animate-pulse ml-2 w-4 h-4" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                        {dictionary.web?.menu?.todaySpecial || 'Plato del Día'}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {dictionary.web?.menu?.specialDescription || 'Descubre nuestro plato especial del día'}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {todaySpecial.dish.imageUrl && (
                            <div className="lg:w-1/2 relative h-80 lg:h-96">
                                <Image
                                    src={todaySpecial.dish.imageUrl}
                                    alt={todaySpecial.dish.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        )}
                        <div className={`${todaySpecial.dish.imageUrl ? 'lg:w-1/2' : 'w-full'} p-8 lg:p-12 flex flex-col justify-center`}>
                            <div className="mb-4">
                                {todaySpecial.dish.category && (
                                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${themeColors.bg} ${themeColors.text}`}>
                                        {todaySpecial.dish.category.name}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                {todaySpecial.dish.name}
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                {todaySpecial.dish.description}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    {todaySpecial.dish.promotionalPrice && todaySpecial.dish.promotionalPrice > 0 ? (
                                        <>
                                            <span className="text-2xl font-medium text-gray-400 line-through">
                                                ${todaySpecial.dish.price.toFixed(2)}
                                            </span>
                                            <span className="text-4xl font-bold text-red-600">
                                                ${todaySpecial.dish.promotionalPrice.toFixed(2)}
                                            </span>
                                            <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded-full">
                                                ¡OFERTA!
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-4xl font-bold text-orange-600">
                                            ${todaySpecial.dish.price.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center text-sm text-gray-500 whitespace-nowrap">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {dictionary.web?.menu?.todayOnly || 'Solo por hoy'}
                                </div>
                            </div>

                            {/* Botón de WhatsApp */}
                            {whatsappLink && (
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Consultar Plato Especial
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 