'use client';

import { useState, useRef } from 'react';
import { X, Plus, Minus, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { createProduct, updateProduct } from '@repo/data-services';
import { uploadImage } from '@repo/data-services/src/services/uploadImage';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@repo/design-system/components/ui/carousel';
import { Skeleton } from '@repo/design-system/components/ui/skeleton';
import Image from 'next/image';
import type { Dictionary } from '@repo/internationalization';

interface Product {
    id: string;
    title: string;
    description: string;
    images: string[];
    status: string;
    size: string;
    detailedDescription: string;
    features: string[];
    technologies: string[];
    status_description: string;
}

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
    dictionary: Dictionary;
}

export default function ProductModal({ product, onClose, dictionary }: ProductModalProps) {
    // Configurar estado inicial basado en el producto recibido
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        title: product?.title || '',
        description: product?.description || '',
        images: product?.images || [''],
        status: product?.status || 'Draft',
        size: product?.size || 'Medium',
        detailedDescription: product?.detailedDescription || '',
        features: product?.features || [''],
        technologies: product?.technologies || [''],
        status_description: product?.status_description || ''
    });

    // File upload state
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState<{ [key: number]: boolean }>({});
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'features' | 'technologies') => {
        const newArray = [...formData[field]];
        newArray[index] = e.target.value;
        setFormData({
            ...formData,
            [field]: newArray,
        });
    };

    const addArrayItem = (field: 'features' | 'technologies') => {
        setFormData({
            ...formData,
            [field]: [...formData[field], ''],
        });
    };

    const removeArrayItem = (index: number, field: 'features' | 'technologies') => {
        const newArray = [...formData[field]];
        if (newArray.length > 1) {
            newArray.splice(index, 1);
            setFormData({
                ...formData,
                [field]: newArray,
            });
        }
    };

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFile = e.target.files[0];
            setSelectedFiles([...selectedFiles, newFile]);

            // Agregar la URL temporal para previsualización
            const newImages = [...formData.images];
            newImages.push(URL.createObjectURL(newFile));

            setFormData({
                ...formData,
                images: newImages
            });
        }
    };

    // Trigger file input click
    const handleSelectImage = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveImage = (index: number) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);

        const newSelectedFiles = [...selectedFiles];
        if (index >= formData.images.length - selectedFiles.length) {
            // Solo remover del array de archivos seleccionados si es uno nuevo
            const selectedFileIndex = index - (formData.images.length - selectedFiles.length);
            if (selectedFileIndex >= 0) {
                newSelectedFiles.splice(selectedFileIndex, 1);
            }
        }

        setFormData({
            ...formData,
            images: newImages.length > 0 ? newImages : [''] // Siempre mantener al menos un string vacío
        });
        setSelectedFiles(newSelectedFiles);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            let finalImageUrls = [...formData.images].filter(img => !img.startsWith('blob:') && img !== '');

            // Subir las nuevas imágenes seleccionadas
            if (selectedFiles.length > 0) {
                for (let i = 0; i < selectedFiles.length; i++) {
                    setUploading({ ...uploading, [i]: true });
                    console.log(`Subiendo imagen ${i + 1} de ${selectedFiles.length}...`);

                    const file = selectedFiles[i];
                    const uploadResult = await uploadImage({
                        name: `${formData.title || 'product-image'}-${i + 1}`,
                        description: formData.description || '',
                        alt: formData.title || 'Product Image',
                        url: '',
                        file: file,
                        folder: 'products'
                    });

                    if (uploadResult && uploadResult.url) {
                        finalImageUrls.push(uploadResult.url);
                    }

                    setUploading({ ...uploading, [i]: false });
                }
            }

            // Preparar datos para guardar
            const dataToSave = {
                ...formData,
                images: finalImageUrls.length > 0 ? finalImageUrls : ['']
            };

            console.log("Guardando producto con datos:", dataToSave);

            if (product) {
                // Actualizar producto existente
                await updateProduct(product.id, dataToSave);
            } else {
                // Crear nuevo producto
                await createProduct(dataToSave);
            }

            // Cerrar el modal después de guardar
            onClose();
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Error saving product. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl">
                <div className="flex justify-between items-center p-4 border-b dark:border-zinc-700">
                    <h2 className="text-xl font-semibold">
                        {product ? dictionary.app.admin.products.form.editTitle || 'Edit Product' : dictionary.app.admin.products.form.createTitle || 'Create New Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">{dictionary.app.admin.products.form.productTitle || 'Title'}</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">{dictionary.app.admin.products.form.status || 'Status'}</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600"
                                >
                                    <option value="Draft">{dictionary.app.admin.products.status.draft || 'Draft'}</option>
                                    <option value="Published">{dictionary.app.admin.products.status.published || 'Published'}</option>
                                    <option value="Archived">{dictionary.app.admin.products.status.archived || 'Archived'}</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">{dictionary.app.admin.products.form.size || 'Size'}</label>
                                <select
                                    name="size"
                                    value={formData.size}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600"
                                >
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">{dictionary.app.admin.products.form.statusDescription || 'Status Description'}</label>
                                <input
                                    type="text"
                                    name="status_description"
                                    value={formData.status_description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">{dictionary.app.admin.products.form.description || 'Description'}</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600"
                                rows={2}
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">{dictionary.app.admin.products.form.detailedDescription || 'Detailed Description'}</label>
                            <textarea
                                name="detailedDescription"
                                value={formData.detailedDescription}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600"
                                rows={3}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{dictionary.app.admin.products.form.productImages || 'Product Images'}</label>
                            {formData.images.length > 0 && formData.images[0] !== '' ? (
                                <div className="mb-4">
                                    <Carousel className="w-full">
                                        <CarouselContent>
                                            {formData.images.map((img, index) => (
                                                <CarouselItem key={index} className="relative">
                                                    {img.startsWith('blob:') || img !== '' ? (
                                                        <div className="w-full flex flex-col items-center">
                                                            <Image
                                                                src={img}
                                                                alt={`Product image ${index + 1}`}
                                                                className="max-h-40 max-w-full mb-4 rounded-md"
                                                                width={500}
                                                                height={500}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleRemoveImage(index);
                                                                }}
                                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <Skeleton className="h-40 w-full" />
                                                    )}
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="left-2" />
                                        <CarouselNext className="right-2" />
                                    </Carousel>
                                </div>
                            ) : null}

                            <div
                                className="border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                                onClick={handleSelectImage}
                            >
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{dictionary.app.admin.products.form.addImages || 'Click to add more images'}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">{dictionary.app.admin.products.form.imageRequirements || 'PNG, JPG, GIF up to 5MB'}</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium">{dictionary.app.admin.products.form.features || 'Features'}</label>
                                <button
                                    type="button"
                                    onClick={() => addArrayItem('features')}
                                    className="flex items-center text-blue-600 hover:text-blue-800 text-xs"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    {dictionary.app.admin.products.form.addFeature || 'Add Feature'}
                                </button>
                            </div>
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex mb-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleArrayInputChange(e, index, 'features')}
                                        className="flex-grow p-2 border rounded-l-md dark:bg-zinc-700 dark:border-zinc-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem(index, 'features')}
                                        className="px-3 py-2 bg-red-500 text-white rounded-r-md hover:bg-red-600"
                                        disabled={formData.features.length <= 1}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium">{dictionary.app.admin.products.form.technologies || 'Technologies'}</label>
                                <button
                                    type="button"
                                    onClick={() => addArrayItem('technologies')}
                                    className="flex items-center text-blue-600 hover:text-blue-800 text-xs"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    {dictionary.app.admin.products.form.addTechnology || 'Add Technology'}
                                </button>
                            </div>
                            {formData.technologies.map((tech, index) => (
                                <div key={index} className="flex mb-2">
                                    <input
                                        type="text"
                                        value={tech}
                                        onChange={(e) => handleArrayInputChange(e, index, 'technologies')}
                                        className="flex-grow p-2 border rounded-l-md dark:bg-zinc-700 dark:border-zinc-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem(index, 'technologies')}
                                        className="px-3 py-2 bg-red-500 text-white rounded-r-md hover:bg-red-600"
                                        disabled={formData.technologies.length <= 1}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t dark:border-zinc-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-700"
                                disabled={isSaving}
                            >
                                {dictionary.app.admin.products.form.cancel || 'Cancel'}
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isSaving}
                            >
                                {isSaving
                                    ? (dictionary.app.admin.products.form.saving || 'Saving...')
                                    : (product
                                        ? (dictionary.app.admin.products.form.update || 'Update')
                                        : (dictionary.app.admin.products.form.create || 'Create'))}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 