import React from 'react';
import { RestaurantConfigData } from '@repo/data-services/src/services/restaurantConfigService';
import { Dictionary } from '@repo/internationalization';

interface MenuFooterProps {
    restaurantConfig: RestaurantConfigData;
    dictionary: Dictionary;
}

// Función para formatear horarios con soporte a múltiples rangos
function formatHoursAsJSX(hours: string, dictionary: Dictionary): React.ReactElement {
    try {
        const parsed = JSON.parse(hours);
        if (parsed && typeof parsed === 'object') {
            const DAYS = [
                { key: 'monday', label: 'Lunes' },
                { key: 'tuesday', label: 'Martes' },
                { key: 'wednesday', label: 'Miércoles' },
                { key: 'thursday', label: 'Jueves' },
                { key: 'friday', label: 'Viernes' },
                { key: 'saturday', label: 'Sábado' },
                { key: 'sunday', label: 'Domingo' }
            ];

            const openDays = DAYS.filter(({ key }) => {
                const day = parsed[key];
                return day && day.isOpen;
            }).map(({ key, label }) => {
                const day = parsed[key];

                // Soporte para múltiples rangos horarios
                if (day.ranges && Array.isArray(day.ranges) && day.ranges.length > 0) {
                    const ranges = day.ranges.map((range: any, index: number) => (
                        <span key={index}>
                            {range.openTime} - {range.closeTime}
                            {index < day.ranges.length - 1 && ', '}
                        </span>
                    ));
                    return (
                        <div key={key} className="flex justify-between items-center py-1">
                            <span className="font-medium">{label}:</span>
                            <span>{ranges}</span>
                        </div>
                    );
                }

                // Compatibilidad con formato anterior (openTime/closeTime directos)
                if (day.openTime && day.closeTime) {
                    return (
                        <div key={key} className="flex justify-between items-center py-1">
                            <span className="font-medium">{label}:</span>
                            <span>{day.openTime} - {day.closeTime}</span>
                        </div>
                    );
                }

                return null;
            }).filter(Boolean);

            return openDays.length > 0 ? (
                <div className="space-y-1">
                    {openDays}
                </div>
            ) : (
                <div className="text-gray-300">
                    {dictionary.web?.menu?.closed || 'Cerrado'}
                </div>
            );
        }
    } catch {
        return <div className="text-gray-300">{hours}</div>;
    }
    return <div className="text-gray-300">{hours}</div>;
}

export default function MenuFooter({ restaurantConfig, dictionary }: MenuFooterProps) {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h3 className="text-xl font-bold mb-2">{restaurantConfig.name}</h3>
                {restaurantConfig.description && (
                    <p className="text-gray-300 mb-4">{restaurantConfig.description}</p>
                )}
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {restaurantConfig.address && (
                        <div>
                            <h4 className="font-semibold mb-1">
                                {dictionary.web?.menu?.address || 'Dirección'}
                            </h4>
                            <p className="text-gray-300">{restaurantConfig.address}</p>
                        </div>
                    )}
                    {restaurantConfig.hours && (
                        <div>
                            <h4 className="font-semibold mb-1">
                                {dictionary.web?.menu?.hours || 'Horarios'}
                            </h4>
                            <div className="text-gray-300">
                                {formatHoursAsJSX(restaurantConfig.hours, dictionary)}
                            </div>
                        </div>
                    )}
                </div>
                {restaurantConfig.email && (
                    <div className="mt-4">
                        <p className="text-gray-300">
                            {dictionary.web?.menu?.contact || 'Contacto'}: {restaurantConfig.email}
                        </p>
                    </div>
                )}
                <div className="mt-6 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400">
                        {dictionary.web?.menu?.footer?.poweredBy || 'Menú digital creado con'} Ganga Menu
                    </p>
                </div>
            </div>
        </footer>
    );
} 