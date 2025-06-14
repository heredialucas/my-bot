'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DishData, createDish, updateDish } from '@repo/data-services/src/services/dishService';
import { CategoryData } from '@repo/data-services/src/services/categoryService';
import { getCurrentUserId } from '@repo/data-services/src/services/authService';
import { uploadR2Image } from '@repo/data-services/src/services/uploadR2Image';

interface DishModalProps {
    dish: DishData | null;
    categories: CategoryData[];
    dictionary: any;
    onClose: () => void;
}

export default function DishModal({ dish, categories, dictionary, onClose }: DishModalProps) {
    const [formData, setFormData] = useState({
        name: dish?.name || '',
        description: dish?.description || '',
        price: dish?.price || 0,
        promotionalPrice: dish?.promotionalPrice || 0,
        categoryId: dish?.categoryId || '',
        status: dish?.status || 'ACTIVE',
        imageUrl: dish?.imageUrl || ''
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const isEditing = Boolean(dish);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalFormData = {
                ...formData,
                // Si promotionalPrice es 0, guardarlo como null
                promotionalPrice: formData.promotionalPrice === 0 ? null : formData.promotionalPrice
            };

            // Si hay una imagen seleccionada, subirla primero
            if (selectedFile) {
                setUploadingImage(true);
                try {
                    const uploadResult = await uploadR2Image({
                        name: formData.name,
                        description: formData.description,
                        alt: formData.name,
                        url: '', // No necesario para file upload
                        file: selectedFile,
                        folder: 'dishes'
                    });
                    finalFormData.imageUrl = uploadResult.url;
                } catch (uploadError) {
                    console.error('Error uploading image:', uploadError);
                    throw new Error('Error al subir la imagen');
                } finally {
                    setUploadingImage(false);
                }
            }

            if (isEditing && dish) {
                await updateDish(dish.id, finalFormData);
            } else {
                const createdById = await getCurrentUserId();
                if (!createdById) {
                    throw new Error('Usuario no autenticado');
                }
                await createDish(finalFormData, createdById);
            }

            onClose();
        } catch (error) {
            console.error('Error saving dish:', error);
            // TODO: Show error message to user
        } finally {
            setLoading(false);
            setUploadingImage(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // Preview de la imagen
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    imageUrl: event.target?.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
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
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Precio Regular
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Precio Promocional
                        </label>
                        <input
                            type="number"
                            name="promotionalPrice"
                            value={formData.promotionalPrice}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            placeholder="Opcional - Deja en 0 si no hay promoción"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Si agregas un precio promocional, se mostrará como oferta especial
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {dictionary.form.category}
                        </label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Seleccionar categoría</option>
                            {categories.filter(cat => cat.isActive).map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Imagen
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {formData.imageUrl && (
                            <div className="mt-2 relative w-full h-32 rounded-md overflow-hidden">
                                <Image
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 400px) 100vw, 400px"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {dictionary.form.status}
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="ACTIVE">{dictionary.status.active}</option>
                            <option value="INACTIVE">{dictionary.status.inactive}</option>
                        </select>
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
                            disabled={loading || uploadingImage}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                            {uploadingImage ? 'Subiendo imagen...' :
                                loading ? dictionary.form.saving :
                                    isEditing ? dictionary.form.update : dictionary.form.create}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 