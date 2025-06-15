'use client';

import { useState } from 'react';
import { CategoryData } from '@repo/data-services/src/services/categoryService';
import CategoryCard from './CategoryCard';
import CategoryModal from './CategoryModal';

interface CategoriesSectionProps {
    categories: CategoryData[];
    dictionary: any;
}

export default function CategoriesSection({ categories, dictionary }: CategoriesSectionProps) {
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);

    const handleCreate = () => {
        setEditingCategory(null);
        setShowModal(true);
    };

    const handleEdit = (category: CategoryData) => {
        setEditingCategory(category);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingCategory(null);
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

            {categories.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">{dictionary.noCategories}</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            dictionary={dictionary}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}

            {showModal && (
                <CategoryModal
                    category={editingCategory}
                    dictionary={dictionary}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
} 