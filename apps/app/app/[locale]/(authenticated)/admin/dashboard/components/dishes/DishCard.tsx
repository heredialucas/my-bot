'use client';

import { DishData, deleteDish } from '@repo/data-services/src/services/dishService';
import Image from 'next/image';

interface DishCardProps {
    dish: DishData;
    dictionary: any;
    onEdit: (dish: DishData) => void;
}

export default function DishCard({ dish, dictionary, onEdit }: DishCardProps) {
    const handleDelete = async () => {
        if (confirm(dictionary.deleteConfirmation)) {
            try {
                await deleteDish(dish.id);
            } catch (error) {
                console.error('Error deleting dish:', error);
                // TODO: Show error message to user
            }
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg border shadow-sm">
            {dish.imageUrl && (
                <Image
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                    width={100}
                    height={100}
                />
            )}
            <h3 className="font-medium text-gray-900">{dish.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{dish.description}</p>
            <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-green-600">
                    ${dish.price.toFixed(2)}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${dish.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {dish.status === 'ACTIVE' ? dictionary.status.active : dictionary.status.inactive}
                </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
                Categoría: {dish.categoryName}
            </p>
            <div className="flex justify-end space-x-2 mt-3">
                <button
                    onClick={() => onEdit(dish)}
                    className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                >
                    {dictionary.edit}
                </button>
                <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-800 text-sm transition-colors"
                >
                    {dictionary.delete}
                </button>
            </div>
        </div>
    );
} 