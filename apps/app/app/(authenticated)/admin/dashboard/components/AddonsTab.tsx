"use client";

import { Button } from "@repo/design-system/components/ui/button"
import { PlusIcon, PencilIcon, TrashIcon, Check, MonitorIcon, WifiIcon, PlusCircle } from "lucide-react"
import Link from "next/link"
import { getAllAddons, deleteAddon } from "@repo/data-services"
import { revalidatePath } from "next/cache"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card"
import { useState } from "react";

interface Addon {
    id: string;
    name: string;
    price: number;
    icon?: string | null;
    color?: string | null;
}

// Modify the component interface to accept onDeleteAddon
interface AddonsTabProps {
    addons: Addon[];
    onDeleteAddon?: (id: string) => Promise<void>;
}

// Componente para previsualizar cómo se verá el addon en el front
function AddonPreview({ addon, isSelected }: { addon: Addon, isSelected: boolean }) {
    // Renderizar el icono correcto según el nombre
    const renderIcon = () => {
        switch (addon.icon) {
            case 'Wifi': return <WifiIcon className="h-5 w-5 text-indigo-600" />;
            case 'Monitor': return <MonitorIcon className="h-5 w-5 text-indigo-600" />;
            default: return <PlusCircle className="h-5 w-5 text-indigo-600" />;
        }
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center max-w-2xl mx-auto md:justify-between md:px-5 px-4 md:py-5 py-3 md:border-4 border md:border-dashed border-gray-200 md:border-gray-300 rounded-lg md:rounded-3xl mb-3 md:mb-4 last:mb-0 relative">
            <div className="text-base text-center md:text-left md:text-lg font-medium mb-2 md:mb-0">
                ¿Quiere llevar un {addon.name}?
            </div>
            <div className="flex md:hidden items-center justify-center">
                <div className="text-sm flex items-center gap-2">
                    Agregar por <span className="text-indigo-600 font-bold">${addon.price.toLocaleString('es-CL')}</span>/mes
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="sr-only peer"
                        />
                        <div className="w-4 h-4 border-2 border-gray-400 rounded-sm peer-checked:bg-indigo-600 peer-checked:border-0 relative z-10 flex items-center justify-center after:content-['✓'] after:hidden peer-checked:after:block after:text-white after:text-xs"></div>
                    </label>
                </div>
            </div>
            <div className="hidden md:flex items-center mt-0">
                <div className="mr-4">
                    Agregar por <span className="text-indigo-600 font-bold">${addon.price.toLocaleString('es-CL')}</span>/mes
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-sm peer-checked:bg-indigo-600 peer-checked:border-0 relative z-10 flex items-center justify-center after:content-['✓'] after:hidden peer-checked:after:block after:text-white after:text-xs"></div>
                </label>
            </div>
        </div>
    );
}

// Update the component function to accept and use onDeleteAddon
export default function AddonsTab({ addons, onDeleteAddon }: AddonsTabProps) {
    // Estado para los addons seleccionados
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    // Estado para el addon seleccionado para previsualizar
    const [selectedPreviewId, setSelectedPreviewId] = useState<string | null>(addons.length > 0 ? addons[0]?.id : null);
    // Estado para mostrar vista previa en móvil
    const [showPreviewMobile, setShowPreviewMobile] = useState(false);

    // Update handleDelete to use the prop
    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este complemento?')) {
            try {
                if (onDeleteAddon) {
                    await onDeleteAddon(id);
                } else {
                    // Fallback to direct API call if prop not provided
                    await deleteAddon(id);
                    window.location.reload();
                }
            } catch (error) {
                console.error("Error al eliminar el complemento:", error);
                alert("Hubo un error al eliminar el complemento");
            }
        }
    };

    // Función para alternar la selección de un addon
    const toggleAddon = (id: string) => {
        setSelectedAddons(prev =>
            prev.includes(id)
                ? prev.filter(addonId => addonId !== id)
                : [...prev, id]
        );
    };

    // Alternar la vista previa en móvil
    const toggleMobilePreview = () => {
        setShowPreviewMobile(!showPreviewMobile);
    };

    // Encontrar el addon seleccionado para previsualizar
    const selectedPreviewAddon = addons.find(addon => addon.id === selectedPreviewId);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl font-bold">Complementos</h2>
                <div className="flex gap-2">
                    {/* Botón para mostrar/ocultar vista previa en móvil */}
                    {selectedPreviewAddon && (
                        <Button
                            className="flex items-center gap-2 lg:hidden"
                            variant="outline"
                            onClick={toggleMobilePreview}
                        >
                            {showPreviewMobile ? 'Ocultar Vista' : 'Ver Vista Previa'}
                        </Button>
                    )}
                    <Link href="/admin/dashboard/new-addon">
                        <Button className="flex items-center gap-2">
                            <PlusIcon className="h-4 w-4" />
                            Nuevo Complemento
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Vista previa móvil togglable */}
            {showPreviewMobile && selectedPreviewAddon && (
                <div className="lg:hidden mb-4">
                    <h3 className="text-sm font-medium mb-2 text-gray-500">Vista previa</h3>
                    <div className="border rounded-lg overflow-hidden">
                        <AddonPreview
                            addon={selectedPreviewAddon}
                            isSelected={selectedAddons.includes(selectedPreviewAddon.id)}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Vista previa de cómo se verá este complemento en la web pública
                    </p>
                </div>
            )}

            {addons.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No hay complementos registrados</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Columna izquierda y central - Lista de addons */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addons.map((addon) => (
                            <Card
                                key={addon.id}
                                className={`cursor-pointer transition-colors ${selectedPreviewId === addon.id ? 'ring-2 ring-primary' : 'hover:bg-gray-50'}`}
                                onClick={() => {
                                    setSelectedPreviewId(addon.id);
                                    // En móvil, mostrar automáticamente la vista previa al seleccionar
                                    if (!showPreviewMobile && window.innerWidth < 1024) {
                                        setShowPreviewMobile(true);
                                    }
                                }}
                            >
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">
                                            {addon.name}
                                        </CardTitle>
                                        <div className="flex gap-1">
                                            <Link href={`/admin/dashboard/edit-addon/${addon.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <PencilIcon className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(addon.id);
                                                }}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-700 mr-2">Precio:</span>
                                                <span className="text-indigo-600 font-bold">${addon.price.toLocaleString('es-CL')}</span>
                                                <span className="text-gray-500 text-sm ml-1">/mes</span>
                                            </div>
                                            {addon.icon && (
                                                <div className="text-sm text-gray-500 flex items-center">
                                                    <span className="mr-1">Icono:</span>
                                                    {addon.icon === 'Wifi' && <WifiIcon className="h-4 w-4 text-indigo-600" />}
                                                    {addon.icon === 'Monitor' && <MonitorIcon className="h-4 w-4 text-indigo-600" />}
                                                    {!['Wifi', 'Monitor'].includes(addon.icon) && <span>{addon.icon}</span>}
                                                </div>
                                            )}
                                        </div>

                                        {/* Checkbox estilizado */}
                                        <div className="flex items-center">
                                            <label
                                                className="relative inline-flex items-center cursor-pointer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAddons.includes(addon.id)}
                                                    onChange={() => toggleAddon(addon.id)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-5 h-5 border-2 border-gray-400 rounded-sm peer-checked:bg-indigo-600 peer-checked:border-0 relative z-10 flex items-center justify-center after:content-['✓'] after:hidden peer-checked:after:block after:text-white after:text-xs"></div>
                                            </label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Columna derecha - Vista previa (solo en desktop) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-4">
                            <h3 className="text-sm font-medium mb-2 text-gray-500">Vista previa</h3>
                            <div className="border rounded-lg overflow-hidden">
                                {selectedPreviewAddon ? (
                                    <AddonPreview
                                        addon={selectedPreviewAddon}
                                        isSelected={selectedAddons.includes(selectedPreviewAddon.id)}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-[200px] bg-gray-50 text-gray-500">
                                        <p>Selecciona un complemento para ver la vista previa</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Vista previa de cómo se verá este complemento en la web pública
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 