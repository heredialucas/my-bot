'use client';

import { useState } from 'react';
import { DailySpecialData } from '@repo/data-services/src/services/dailySpecialService';
import { DishData } from '@repo/data-services/src/services/dishService';
import DailySpecialCard from './DailySpecialCard';
import DailySpecialModal from './DailySpecialModal';

interface DailySpecialsSectionProps {
    dailySpecials: DailySpecialData[];
    dishes: DishData[];
    dictionary: any;
}

export default function DailySpecialsSection({ dailySpecials, dishes, dictionary }: DailySpecialsSectionProps) {
    const [showModal, setShowModal] = useState(false);
    const [editingSpecial, setEditingSpecial] = useState<DailySpecialData | null>(null);

    const handleCreate = () => {
        setEditingSpecial(null);
        setShowModal(true);
    };

    const handleEdit = (special: DailySpecialData) => {
        setEditingSpecial(special);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingSpecial(null);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">{dictionary.title}</h2>
                <button
                    onClick={handleCreate}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                    {dictionary.new}
                </button>
            </div>

            {dailySpecials.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">{dictionary.noSpecials}</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {dailySpecials.map((special) => (
                        <DailySpecialCard
                            key={special.id}
                            special={special}
                            dictionary={dictionary}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}

            {showModal && (
                <DailySpecialModal
                    special={editingSpecial}
                    dishes={dishes}
                    dictionary={dictionary}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
} 