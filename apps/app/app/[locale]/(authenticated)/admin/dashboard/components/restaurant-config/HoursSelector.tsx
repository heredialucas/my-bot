'use client';

import { useState, useEffect, useRef } from 'react';

interface TimeRange {
    openTime: string;
    closeTime: string;
}

interface DaySchedule {
    isOpen: boolean;
    openTime: string;
    closeTime: string;
    ranges?: TimeRange[]; // Rangos adicionales
}

interface WeekSchedule {
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
    sunday: DaySchedule;
}

interface HoursSelectorProps {
    value: string;
    onChange: (hours: string) => void;
}

const DAYS = [
    { key: 'monday', label: 'Lunes' },
    { key: 'tuesday', label: 'Martes' },
    { key: 'wednesday', label: 'Miércoles' },
    { key: 'thursday', label: 'Jueves' },
    { key: 'friday', label: 'Viernes' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
];

export default function HoursSelector({ value, onChange }: HoursSelectorProps) {
    const [schedule, setSchedule] = useState<WeekSchedule>({
        monday: { isOpen: true, openTime: '09:00', closeTime: '22:00', ranges: [] },
        tuesday: { isOpen: true, openTime: '09:00', closeTime: '22:00', ranges: [] },
        wednesday: { isOpen: true, openTime: '09:00', closeTime: '22:00', ranges: [] },
        thursday: { isOpen: true, openTime: '09:00', closeTime: '22:00', ranges: [] },
        friday: { isOpen: true, openTime: '09:00', closeTime: '22:00', ranges: [] },
        saturday: { isOpen: true, openTime: '09:00', closeTime: '22:00', ranges: [] },
        sunday: { isOpen: true, openTime: '09:00', closeTime: '22:00', ranges: [] }
    });
    const [isInitialized, setIsInitialized] = useState(false);

    // Parsear el valor inicial y establecer como inicializado
    useEffect(() => {
        if (value && value.trim() !== '') {
            try {
                const parsed = JSON.parse(value);
                if (parsed && typeof parsed === 'object') {
                    const convertedSchedule: WeekSchedule = {} as WeekSchedule;
                    DAYS.forEach(({ key }) => {
                        const day = parsed[key];
                        if (day) {
                            if (day.ranges && Array.isArray(day.ranges) && day.ranges.length > 0) {
                                // Formato nuevo con ranges
                                convertedSchedule[key as keyof WeekSchedule] = {
                                    isOpen: day.isOpen,
                                    openTime: day.ranges[0].openTime,
                                    closeTime: day.ranges[0].closeTime,
                                    ranges: day.ranges.slice(1) // Rangos adicionales
                                };
                            } else {
                                // Formato original
                                convertedSchedule[key as keyof WeekSchedule] = {
                                    isOpen: day.isOpen,
                                    openTime: day.openTime || '09:00',
                                    closeTime: day.closeTime || '22:00',
                                    ranges: []
                                };
                            }
                        }
                    });
                    setSchedule(convertedSchedule);
                    setIsInitialized(true);
                    return;
                }
            } catch (error) {
                console.warn('Error parsing hours JSON:', error);
            }
        }

        // Si no hay valor válido, usar valores por defecto y marcar como inicializado
        setIsInitialized(true);
    }, [value]);

    // Notificar cambios al componente padre - siempre después de la inicialización
    useEffect(() => {
        if (isInitialized) {
            onChange(generateHoursData(schedule));
        }
    }, [schedule, onChange, isInitialized]);

    // Generar string de horarios para mostrar
    const generateHoursString = (schedule: WeekSchedule): string => {
        const openDays: string[] = [];

        DAYS.forEach(({ key, label }) => {
            const day = schedule[key as keyof WeekSchedule];
            if (day.isOpen) {
                const timeRanges = [`${day.openTime} - ${day.closeTime}`];
                if (day.ranges && day.ranges.length > 0) {
                    day.ranges.forEach(range => {
                        timeRanges.push(`${range.openTime} - ${range.closeTime}`);
                    });
                }
                openDays.push(`${label}: ${timeRanges.join(', ')}`);
            }
        });

        return openDays.length > 0 ? openDays.join('\n') : 'Cerrado';
    };

    // Generar JSON para guardar en la base de datos
    const generateHoursData = (schedule: WeekSchedule): string => {
        const formattedSchedule: any = {};

        DAYS.forEach(({ key }) => {
            const day = schedule[key as keyof WeekSchedule];
            const allRanges = [
                { openTime: day.openTime, closeTime: day.closeTime },
                ...(day.ranges || [])
            ];

            formattedSchedule[key] = {
                isOpen: day.isOpen,
                ranges: day.isOpen ? allRanges : []
            };
        });

        return JSON.stringify(formattedSchedule);
    };

    const handleDayToggle = (day: string) => {
        setSchedule(prev => {
            const updated = {
                ...prev,
                [day]: {
                    ...prev[day as keyof WeekSchedule],
                    isOpen: !prev[day as keyof WeekSchedule].isOpen
                }
            };
            return updated;
        });
    };

    const handleTimeChange = (day: string, timeType: 'openTime' | 'closeTime', value: string) => {
        setSchedule(prev => {
            const updated = {
                ...prev,
                [day]: {
                    ...prev[day as keyof WeekSchedule],
                    [timeType]: value
                }
            };
            return updated;
        });
    };

    const handleRangeTimeChange = (day: string, rangeIndex: number, timeType: 'openTime' | 'closeTime', value: string) => {
        setSchedule(prev => {
            const daySchedule = prev[day as keyof WeekSchedule];
            const updatedRanges = [...(daySchedule.ranges || [])];
            updatedRanges[rangeIndex] = {
                ...updatedRanges[rangeIndex],
                [timeType]: value
            };

            const updated = {
                ...prev,
                [day]: {
                    ...daySchedule,
                    ranges: updatedRanges
                }
            };
            return updated;
        });
    };

    const addTimeRange = (day: string) => {
        setSchedule(prev => {
            const daySchedule = prev[day as keyof WeekSchedule];
            const updated = {
                ...prev,
                [day]: {
                    ...daySchedule,
                    ranges: [
                        ...(daySchedule.ranges || []),
                        { openTime: '18:00', closeTime: '22:00' }
                    ]
                }
            };
            return updated;
        });
    };

    const removeTimeRange = (day: string, rangeIndex: number) => {
        setSchedule(prev => {
            const daySchedule = prev[day as keyof WeekSchedule];
            const updatedRanges = [...(daySchedule.ranges || [])];
            updatedRanges.splice(rangeIndex, 1);

            const updated = {
                ...prev,
                [day]: {
                    ...daySchedule,
                    ranges: updatedRanges
                }
            };
            return updated;
        });
    };

    const setAllDays = (isOpen: boolean) => {
        setSchedule(prev => {
            const updated = { ...prev };
            DAYS.forEach(({ key }) => {
                updated[key as keyof WeekSchedule] = {
                    ...updated[key as keyof WeekSchedule],
                    isOpen
                };
            });
            return updated;
        });
    };

    const setCommonHours = (openTime: string, closeTime: string) => {
        setSchedule(prev => {
            const updated = { ...prev };
            DAYS.forEach(({ key }) => {
                if (updated[key as keyof WeekSchedule].isOpen) {
                    updated[key as keyof WeekSchedule] = {
                        ...updated[key as keyof WeekSchedule],
                        openTime,
                        closeTime
                    };
                }
            });
            return updated;
        });
    };

    return (
        <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mb-3 sm:mb-4">
                <button
                    type="button"
                    onClick={() => setAllDays(true)}
                    className="px-2 sm:px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                >
                    Abrir todos
                </button>
                <button
                    type="button"
                    onClick={() => setAllDays(false)}
                    className="px-2 sm:px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                    Cerrar todos
                </button>
                <button
                    type="button"
                    onClick={() => setCommonHours('09:00', '22:00')}
                    className="px-2 sm:px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                    9:00 - 22:00
                </button>
                <button
                    type="button"
                    onClick={() => setCommonHours('08:00', '23:00')}
                    className="px-2 sm:px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                    8:00 - 23:00
                </button>
            </div>

            <div className="space-y-2 sm:space-y-3">
                {DAYS.map(({ key, label }) => {
                    const day = schedule[key as keyof WeekSchedule];
                    return (
                        <div key={key} className="p-2 sm:p-3 border border-gray-200 rounded-lg">
                            {/* Día y toggle principal */}
                            <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                                <div className="flex items-center gap-2 min-w-[80px] sm:min-w-[100px]">
                                    <input
                                        type="checkbox"
                                        checked={day.isOpen}
                                        onChange={() => handleDayToggle(key)}
                                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                    />
                                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                                        {label}
                                    </label>
                                </div>
                            </div>

                            {day.isOpen && (
                                <div className="space-y-2 ml-4 sm:ml-6">
                                    {/* Horario principal */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                        <span className="text-xs text-gray-500 min-w-[60px] sm:min-w-[70px]">Horario 1:</span>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="time"
                                                value={day.openTime}
                                                onChange={(e) => handleTimeChange(key, 'openTime', e.target.value)}
                                                className="px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 flex-1 sm:flex-none"
                                            />
                                            <span className="text-gray-500 text-xs sm:text-sm">-</span>
                                            <input
                                                type="time"
                                                value={day.closeTime}
                                                onChange={(e) => handleTimeChange(key, 'closeTime', e.target.value)}
                                                className="px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 flex-1 sm:flex-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Horarios adicionales */}
                                    {day.ranges && day.ranges.map((range, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className="text-xs text-gray-500 min-w-[60px] sm:min-w-[70px]">Horario {index + 2}:</span>
                                            <div className="flex items-center gap-2 flex-1">
                                                <input
                                                    type="time"
                                                    value={range.openTime}
                                                    onChange={(e) => handleRangeTimeChange(key, index, 'openTime', e.target.value)}
                                                    className="px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 flex-1 sm:flex-none"
                                                />
                                                <span className="text-gray-500 text-xs sm:text-sm">-</span>
                                                <input
                                                    type="time"
                                                    value={range.closeTime}
                                                    onChange={(e) => handleRangeTimeChange(key, index, 'closeTime', e.target.value)}
                                                    className="px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 flex-1 sm:flex-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeTimeRange(key, index)}
                                                    className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors flex-shrink-0"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Botón para agregar horario */}
                                    <button
                                        type="button"
                                        onClick={() => addTimeRange(key)}
                                        className="w-full sm:w-auto px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                                    >
                                        + Agregar horario
                                    </button>
                                </div>
                            )}

                            {!day.isOpen && (
                                <div className="ml-4 sm:ml-6">
                                    <span className="text-gray-400 text-xs sm:text-sm">Cerrado</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Preview */}
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Vista previa:</h4>
                <div className="text-xs sm:text-sm text-gray-600 whitespace-pre-line">
                    {generateHoursString(schedule)}
                </div>
            </div>
        </div>
    );
} 