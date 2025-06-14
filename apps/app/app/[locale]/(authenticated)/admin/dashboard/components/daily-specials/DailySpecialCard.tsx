'use client';

import { DailySpecialData, deleteDailySpecial } from '@repo/data-services/src/services/dailySpecialService';

interface DailySpecialCardProps {
    special: DailySpecialData;
    dictionary: any;
    onEdit: (special: DailySpecialData) => void;
}

export default function DailySpecialCard({ special, dictionary, onEdit }: DailySpecialCardProps) {
    const handleDelete = async () => {
        if (confirm(dictionary.deleteConfirmation)) {
            try {
                await deleteDailySpecial(special.id);
            } catch (error) {
                console.error('Error deleting special:', error);
                // TODO: Show error message to user
            }
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900">
                            {new Date(special.date).toLocaleDateString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${special.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                            {special.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mt-1">
                        {special.dish.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {special.dish.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-lg font-bold text-green-600">
                            ${special.dish.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500">
                            {special.dish.category.name}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => onEdit(special)}
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
        </div>
    );
} 