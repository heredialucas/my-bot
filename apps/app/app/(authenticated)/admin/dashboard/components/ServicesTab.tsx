import { Button } from "@repo/design-system/components/ui/button"
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { getAllServices, deleteService } from "../../server/serviceActions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card"

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
                                        }}>
                                            <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-600">
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                                <CardDescription>
                                    {service.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="flex items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Icono: {service.icon}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
} 