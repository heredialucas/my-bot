import React from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { RestaurantConfigData } from '@repo/data-services/src/services/restaurantConfigService';
import { Dictionary } from '@repo/internationalization';
import { generateWhatsAppLink } from './utils';

interface MenuHeaderProps {
    restaurantConfig: RestaurantConfigData;
    themeColors: {
        bg: string;
        text: string;
        accent: string;
    };
    dictionary: Dictionary;
}

export default function MenuHeader({ restaurantConfig, themeColors, dictionary }: MenuHeaderProps) {
    const whatsappLink = restaurantConfig.phone ? generateWhatsAppLink(restaurantConfig.phone) : '';

    return (
        <header className={`${themeColors.bg} ${themeColors.text} shadow-lg`}>
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4">
                        {restaurantConfig.logoUrl && (
                            <div className="w-16 h-16 relative">
                                <Image
                                    src={restaurantConfig.logoUrl}
                                    alt={`${restaurantConfig.name} logo`}
                                    fill
                                    className="object-contain rounded-lg"
                                    sizes="64px"
                                />
                            </div>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold">{restaurantConfig.name}</h1>
                            {restaurantConfig.description && (
                                <p className="text-lg opacity-90">{restaurantConfig.description}</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right">
                        <div className="space-y-1">
                            {restaurantConfig.address && (
                                <p className="text-sm opacity-90">📍 {restaurantConfig.address}</p>
                            )}
                            {restaurantConfig.email && (
                                <p className="text-sm opacity-90">✉️ {restaurantConfig.email}</p>
                            )}
                        </div>

                        {/* Botón de WhatsApp */}
                        {whatsappLink && (
                            <div className="mt-3">
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Contactar por WhatsApp
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
} 