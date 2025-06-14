'use client';

import { useState } from 'react';
import { CategoryData, createCategory, updateCategory } from '@repo/data-services/src/services/categoryService';
import { getCurrentUserId } from '@repo/data-services/src/services/authService';

interface CategoryModalProps {
    category: CategoryData | null;
    dictionary: any;
    onClose: () => void;
}

export default function CategoryModal({ category, dictionary, onClose }: CategoryModalProps) {
    const [formData, setFormData] = useState({
        name: category?.name || '',
        description: category?.description || '',
        isActive: category?.isActive ?? true
    });
    const [loading, setLoading] = useState(false);

    const isEditing = Boolean(category);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing && category) {
                await updateCategory(category.id, formData);
            } else {
                const createdById = await getCurrentUserId();
                if (!createdById) {
                    throw new Error('Usuario no autenticado');
                }
                await createCategory(formData, createdById);
            }

            onClose();
        } catch (error) {
            console.error('Error saving category:', error);
            // TODO: Show error message to user
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) :
                type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

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
                            {dictionary.form.name}
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {dictionary.form.description}
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
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