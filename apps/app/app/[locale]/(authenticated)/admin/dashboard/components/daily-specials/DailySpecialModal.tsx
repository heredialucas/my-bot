'use client';

import { useState } from 'react';
import { DailySpecialData, createDailySpecial, updateDailySpecial } from '@repo/data-services/src/services/dailySpecialService';
import { DishData } from '@repo/data-services/src/services/dishService';
import { getCurrentUserId } from '@repo/data-services/src/services/authService';

interface DailySpecialModalProps {
    special: DailySpecialData | null;
    dishes: DishData[];
    dictionary: any;
    onClose: () => void;
}

export default function DailySpecialModal({ special, dishes, dictionary, onClose }: DailySpecialModalProps) {
    const [formData, setFormData] = useState({
        date: special?.date ? new Date(special.date).toISOString().split('T')[0] : '',
        dishIds: special ? [special.dish.id] : [] as string[],
        isActive: special?.isActive ?? true
    });
    const [loading, setLoading] = useState(false);

    const isEditing = Boolean(special);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing && special) {
                const dailySpecialData = {
                    date: new Date(formData.date),
                    dishId: formData.dishIds[0],
                    isActive: formData.isActive
                };
                await updateDailySpecial(special.id, dailySpecialData);
            } else {
                const createdById = await getCurrentUserId();
                if (!createdById) {
                    throw new Error('Usuario no autenticado');
                }

                const promises = formData.dishIds.map(dishId =>
                    createDailySpecial({
                        date: new Date(formData.date),
                        dishId,
                        isActive: formData.isActive
                    }, createdById)
                );

                await Promise.all(promises);
            }

            onClose();
        } catch (error) {
            console.error('Error saving special:', error);
            // TODO: Show error message to user
        } finally {
            setLoading(false);
        }
    };

    const handleDishSelection = (dishId: string) => {
        setFormData(prev => ({
            ...prev,
            dishIds: prev.dishIds.includes(dishId)
                ? prev.dishIds.filter(id => id !== dishId)
                : [...prev.dishIds, dishId]
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const activeDishes = dishes.filter(dish => dish.status === 'ACTIVE');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                        {isEditing ? dictionary.form.editTitle : dictionary.form.createTitle}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {dictionary.form.date}
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {dictionary.form.dish}
                        </label>
                        {isEditing ? (
                            <select
                                name="dishId"
                                value={formData.dishIds[0] || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, dishIds: [e.target.value] }))}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Seleccionar plato</option>
                                {activeDishes.map(dish => (
                                    <option key={dish.id} value={dish.id}>
                                        {dish.name} - ${dish.price.toFixed(2)} {dish.categoryName && `(${dish.categoryName})`}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-md p-2">
                                {activeDishes.map(dish => (
                                    <label key={dish.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                                        <input
                                            type="checkbox"
                                            checked={formData.dishIds.includes(dish.id)}
                                            onChange={() => handleDishSelection(dish.id)}
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mr-3"
                                        />
                                        <span className="text-sm">
                                            {dish.name} - ${dish.price.toFixed(2)} {dish.categoryName && `(${dish.categoryName})`}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                        {!isEditing && (
                            <p className="text-xs text-gray-500 mt-1">
                                Selecciona múltiples platos para crear varios especiales del día
                            </p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            {dictionary.form.active}
                        </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            {dictionary.form.cancel}
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? dictionary.form.saving :
                                isEditing ? dictionary.form.update : dictionary.form.create}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 