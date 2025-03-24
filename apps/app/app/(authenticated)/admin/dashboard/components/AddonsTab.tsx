import { Button } from "@repo/design-system/components/ui/button"
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { getAllAddons, deleteAddon } from "@repo/data-services"
import { revalidatePath } from "next/cache"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card"

export default async function AddonsTab() {
    // Obtener todos los complementos
    const addons = await getAllAddons()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Complementos</h2>
                <Link href="/admin/dashboard/new-addon">
                    <Button className="flex items-center gap-2">
                        <PlusIcon className="h-4 w-4" />
                        Nuevo Complemento
                    </Button>
                </Link>
            </div>

            {addons.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No hay complementos registrados</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {addons.map((addon) => (
                        <Card key={addon.id}>
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
                                        <form action={async () => {
                                            "use server"
                                            await deleteAddon(addon.id)
                                            revalidatePath('/admin/dashboard')
                                        }}>
                                            <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-600">
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                                <CardDescription>
                                    {addon.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="text-sm text-muted-foreground">
                                        Precio: ${addon.price}
                                    </div>
                                    {addon.icon && (
                                        <div className="text-sm text-muted-foreground">
                                            Icono: {addon.icon}
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