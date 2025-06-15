'use client';

import { CategoryData, deleteCategory } from '@repo/data-services/src/services/categoryService';

interface CategoryCardProps {
    category: CategoryData;
    dictionary: any;
    onEdit: (category: CategoryData) => void;
}

export default function CategoryCard({ category, dictionary, onEdit }: CategoryCardProps) {
    const handleDelete = async () => {
        if (confirm(dictionary.deleteConfirmation)) {
            try {
                await deleteCategory(category.id);
            } catch (error) {
                console.error('Error deleting category:', error);
                // TODO: Show error message to user
            }
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-gray-200 dark:border-zinc-700 shadow-sm">
            <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
            {category.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{category.description}</p>
            )}
            <div className="flex justify-between items-center mt-3">
                <span className={`text-xs px-2 py-1 rounded-full ${category.isActive
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                    {category.isActive ? 'Activa' : 'Inactiva'}
                </span>
                <div className="space-x-2">
                    <button
                        onClick={() => onEdit(category)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors"
                    >
                        {dictionary.edit}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm transition-colors"
                    >
                        {dictionary.delete}
                    </button>
                </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {category.dishCount} platos
            </p>
        </div>
    );
} 