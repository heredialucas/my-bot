import { Button } from "@repo/design-system/components/ui/button"
import { PlusIcon, PencilIcon, TrashIcon, Wifi, Monitor, Package, CheckCircle, Gauge, FileText, Calendar, Clock, Wrench } from "lucide-react"
import Link from "next/link"
import { getAllServices, deleteService } from "@repo/data-services"
import { revalidatePath } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/design-system/components/ui/card"

// Función para renderizar el ícono adecuado basado en el nombre
const renderIcon = (iconName: string | null) => {
    if (!iconName) return <CheckCircle className="h-4 w-4 mr-1" />;

    switch (iconName) {
        case 'Wifi': return <Wifi className="h-4 w-4 mr-1" />;
        case 'Monitor': return <Monitor className="h-4 w-4 mr-1" />;
        case 'Package': return <Package className="h-4 w-4 mr-1" />;
        case 'Gauge': return <Gauge className="h-4 w-4 mr-1" />;
        case 'FileText': return <FileText className="h-4 w-4 mr-1" />;
        case 'Calendar': return <Calendar className="h-4 w-4 mr-1" />;
        case 'Clock': return <Clock className="h-4 w-4 mr-1" />;
        case 'Wrench': return <Wrench className="h-4 w-4 mr-1" />;
        default: return <CheckCircle className="h-4 w-4 mr-1" />;
    }
};

export default async function ServicesTab() {
    // Obtener todos los servicios
    const services = await getAllServices()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Tipos de Servicio</h2>
                <Link href="/admin/dashboard/new-service">
                    <Button className="flex items-center gap-2">
                        <PlusIcon className="h-4 w-4" />
                        Nuevo Servicio
                    </Button>
                </Link>
            </div>

            {services.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No hay servicios registrados</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                        <Card key={service.id}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">
                                        {service.name}
                                    </CardTitle>
                                    <div className="flex gap-1">
                                        <Link href={`/admin/dashboard/edit-service/${service.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <form action={async () => {
                                            "use server"
                                            await deleteService(service.id)
                                            revalidatePath('/admin/dashboard')
                                        }}>
                                            <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-600">
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <div className="text-sm">
                                            <span className="font-medium">Icono:</span>
                                            <span className="inline-flex items-center ml-1 bg-gray-100 p-1 rounded-full">
                                                {renderIcon(service.icon)}
                                                <span className="ml-1">{service.icon || 'Ninguno'}</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Información básica del servicio */}
                                    {(service.speed || service.price || service.regularPrice) && (
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            {service.speed && (
                                                <div>
                                                    <span className="font-medium">Velocidad:</span> {service.speed} Mbps
                                                </div>
                                            )}
                                            {service.price && (
                                                <div>
                                                    <span className="font-medium">Precio:</span> ${service.price}
                                                </div>
                                            )}
                                            {service.regularPrice && (
                                                <div>
                                                    <span className="font-medium">Precio regular:</span> ${service.regularPrice}
                                                </div>
                                            )}
                                            {service.promoMonths && (
                                                <div>
                                                    <span className="font-medium">Meses promo:</span> {service.promoMonths}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Mostrar items del servicio */}
                                    {service.serviceItems && service.serviceItems.length > 0 && (
                                        <div className="mt-2">
                                            <h4 className="text-xs font-medium text-gray-500 mb-1">Características:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {service.serviceItems.map((item, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center"
                                                        title={item.description || ''}
                                                    >
                                                        {renderIcon(item.icon)}
                                                        {item.title}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
} 