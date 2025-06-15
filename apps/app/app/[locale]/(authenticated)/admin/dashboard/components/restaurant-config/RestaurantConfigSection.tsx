'use client';

import { useState, useCallback } from 'react';
import { RestaurantConfigData, RestaurantConfigFormData, upsertRestaurantConfig } from '@repo/data-services/src/services/restaurantConfigService';
import { getCurrentUserId } from '@repo/data-services/src/services/authService';
import { uploadR2Image } from '@repo/data-services/src/services/uploadR2Image';
import HoursSelector from './HoursSelector';
import MenuShareWidget from '../../../../../../../components/MenuShareWidget';

interface RestaurantConfigSectionProps {
    restaurantConfig: RestaurantConfigData | null;
    dictionary: any;
    locale: string;
}



export default function RestaurantConfigSection({
    restaurantConfig,
    dictionary,
    locale
}: RestaurantConfigSectionProps) {
    const [formData, setFormData] = useState<RestaurantConfigFormData>({
        name: restaurantConfig?.name || '',
        description: restaurantConfig?.description || '',
        address: restaurantConfig?.address || '',
        phone: restaurantConfig?.phone || '',
        email: restaurantConfig?.email || '',
        hours: restaurantConfig?.hours || undefined,
        slug: restaurantConfig?.slug || 'mi-restaurante',
        themeColor: restaurantConfig?.themeColor || 'green',
    });

    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalFormData = { ...formData };

            // Si hay un logo seleccionado, subirlo primero
            if (selectedFile) {
                setUploadingLogo(true);
                try {
                    const uploadResult = await uploadR2Image({
                        name: formData.name,
                        description: 'Logo del restaurante',
                        alt: formData.name,
                        url: '',
                        file: selectedFile,
                        folder: 'logos'
                    });
                    finalFormData.logoUrl = uploadResult.url;
                } catch (uploadError) {
                    console.error('Error uploading logo:', uploadError);
                    throw new Error('Error al subir el logo');
                } finally {
                    setUploadingLogo(false);
                }
            }

            const createdById = await getCurrentUserId();
            if (!createdById) {
                throw new Error('Usuario no autenticado');
            }

            await upsertRestaurantConfig(finalFormData, createdById);
            // TODO: Mostrar mensaje de éxito
        } catch (error) {
            console.error('Error saving restaurant config:', error);
            // TODO: Mostrar mensaje de error
        } finally {
            setLoading(false);
            setUploadingLogo(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // Preview del logo
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    logoUrl: event.target?.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleHoursChange = useCallback((hours: string) => {
        setFormData(prev => ({
            ...prev,
            hours
        }));
    }, []);

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Widget de compartir menú */}
            <MenuShareWidget
                slug={formData.slug || 'mi-restaurante'}
                locale={locale}
                restaurantName={formData.name}
                compact={false}
            />

            {/* Formulario de configuración */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    ⚙️ Configuración del Restaurante
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Nombre del Restaurante *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Mi Restaurante"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Slug de la URL *
                            </label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="mi-restaurante"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Solo letras, números y guiones. Ej: mi-restaurante
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Descripción de tu restaurante..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Dirección
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Calle Ejemplo 123, Ciudad"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Teléfono / WhatsApp
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="+1 234 567 8900"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Este número se usará para contacto directo por WhatsApp desde el menú
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="contacto@mirestaurante.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Color del Tema
                            </label>
                            <select
                                name="themeColor"
                                value={formData.themeColor}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="green">Verde</option>
                                <option value="red">Rojo</option>
                                <option value="blue">Azul</option>
                                <option value="yellow">Amarillo</option>
                                <option value="brown">Marrón</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Logo del Restaurante
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {formData.logoUrl && (
                            <div className="mt-2">
                                <img
                                    src={formData.logoUrl}
                                    alt="Logo preview"
                                    className="w-20 h-20 object-contain rounded-md border"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                            Horarios de Atención
                        </label>
                        <HoursSelector
                            value={formData.hours || ''}
                            onChange={handleHoursChange}
                        />
                    </div>

                    <div className="flex justify-end pt-2 pb-20 sm:pb-8">
                        <button
                            type="submit"
                            disabled={loading || uploadingLogo}
                            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors text-sm sm:text-base"
                        >
                            {uploadingLogo ? 'Subiendo logo...' :
                                loading ? 'Guardando...' : 'Guardar Configuración'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 