import React from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { Dictionary } from '@repo/internationalization';
import { Dish } from './types';
import { generateWhatsAppLinkForDish } from './utils';

interface DishCardProps {
    dish: Dish;
    themeColors: {
        bg: string;
        text: string;
        accent: string;
        priceColor: string;
        promotionalPriceColor: string;
        offerBadge: string;
        gradients: {
            header: string;
            category: string;
            special: string;
            overlay: string;
            badge: string;
        };
        decorative: {
            primary: string;
            secondary: string;
            tertiary: string;
            accent: string;
        };
    };
    dictionary: Dictionary;
    restaurantName: string;
    restaurantPhone?: string | null;
    specialDishIds: Set<string>;
}

export default function DishCard({ dish, themeColors, dictionary, restaurantName, restaurantPhone, specialDishIds }: DishCardProps) {
    const whatsappLink = restaurantPhone ? generateWhatsAppLinkForDish(restaurantPhone, dish.name, restaurantName) : '';
    const isSpecialDish = specialDishIds.has(dish.id);

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group hover:scale-105">
            {dish.imageUrl && (
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={dish.imageUrl}
                        alt={dish.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
            )}

            <div className="p-4">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-lg font-semibold text-gray-800 flex-1">{dish.name}</h3>
                    <div className="flex flex-col items-end text-right shrink-0">
                        {isSpecialDish && dish.promotionalPrice && dish.promotionalPrice > 0 ? (
                            <>
                                <span className="text-sm text-gray-400 line-through whitespace-nowrap">
                                    ${dish.price.toFixed(2)}
                                </span>
                                <span className={`text-lg font-bold ${themeColors.promotionalPriceColor} whitespace-nowrap`}>
                                    ${dish.promotionalPrice.toFixed(2)}
                                </span>
                                <span className={`${themeColors.offerBadge} text-xs font-semibold px-1.5 py-0.5 rounded-full mt-1`}>
                                    OFERTA
                                </span>
                            </>
                        ) : (
                            <span className={`text-lg font-bold ${themeColors.priceColor} whitespace-nowrap`}>
                                ${dish.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{dish.description}</p>

                {/* Botón de WhatsApp con colores temáticos */}
                {whatsappLink && (
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2 ${themeColors.bg} hover:opacity-90 ${themeColors.text} rounded-lg transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg`}
                    >
                        <MessageCircle className="w-4 h-4" />
                        Consultar
                    </a>
                )}
            </div>
        </div>
    );
} 