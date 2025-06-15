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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {dish.imageUrl && (
                <div className="w-full h-48 relative">
                    <Image
                        src={dish.imageUrl}
                        alt={dish.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
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
                                <span className="text-lg font-bold text-red-600 whitespace-nowrap">
                                    ${dish.promotionalPrice.toFixed(2)}
                                </span>
                                <span className="bg-red-100 text-red-800 text-xs font-semibold px-1.5 py-0.5 rounded-full mt-1">
                                    OFERTA
                                </span>
                            </>
                        ) : (
                            <span className={`text-lg font-bold ${themeColors.accent} whitespace-nowrap`}>
                                ${dish.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{dish.description}</p>

                {/* Botón de WhatsApp */}
                {whatsappLink && (
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium w-full justify-center"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Consultar por WhatsApp
                    </a>
                )}
            </div>
        </div>
    );
} 