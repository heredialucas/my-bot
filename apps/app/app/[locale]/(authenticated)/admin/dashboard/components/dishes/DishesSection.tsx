'use client';

import { useState } from 'react';
import { DishData } from '@repo/data-services/src/services/dishService';
import { CategoryData } from '@repo/data-services/src/services/categoryService';
import DishCard from './DishCard';
import DishModal from './DishModal';

interface DishesSectionProps {
    dishes: DishData[];
    categories: CategoryData[];
    dictionary: any;
}

export default function DishesSection({ dishes, categories, dictionary }: DishesSectionProps) {
    const [showModal, setShowModal] = useState(false);
    const [editingDish, setEditingDish] = useState<DishData | null>(null);

    const handleCreate = () => {
        setEditingDish(null);
        setShowModal(true);
    };

    const handleEdit = (dish: DishData) => {
        setEditingDish(dish);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingDish(null);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">{dictionary.title}</h2>
                <button
                    onClick={handleCreate}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                    {dictionary.new}
                </button>
            </div>

            {dishes.length === 0 ? (
                <p className="text-gray-500 text-center py-8">{dictionary.noDishes}</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {dishes.map((dish) => (
                        <DishCard
                            key={dish.id}
                            dish={dish}
                            dictionary={dictionary}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}

            {showModal && (
                <DishModal
                    dish={editingDish}
                    categories={categories}
                    dictionary={dictionary}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
} 