import { Button } from "@repo/design-system/components/ui/button"
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { getAllPromotions, deletePromotion } from "@repo/data-services"
import { revalidatePath } from "next/cache"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card"
import { Badge } from "@repo/design-system/components/ui/badge"

export default async function PromotionsTab() {
    // Obtener todas las promociones
    const promotions = await getAllPromotions()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Promociones</h2>
                <Link href="/admin/dashboard/new-promotion">
                    <Button className="flex items-center gap-2">
                        <PlusIcon className="h-4 w-4" />
                        Nueva Promoción
                    </Button>
                </Link>
            </div>

            {promotions.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No hay promociones registradas</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {promotions.map((promotion) => (
                        <Card key={promotion.id} className="overflow-hidden">
                            {promotion.color && (
                                <div
                                    className="h-2 w-full"
                                    style={{ backgroundColor: promotion.color }}
                                ></div>
                            )}
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            {promotion.name}
                                            <Badge variant={promotion.active ? "default" : "outline"}>
                                                {promotion.active ? "Activa" : "Inactiva"}
                                            </Badge>
                                        </CardTitle>
                                    </div>
                                    <div className="flex gap-1">
                                        <Link href={`/admin/dashboard/edit-promotion/${promotion.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <form action={async () => {
                                            "use server"
                                            await deletePromotion(promotion.id)
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
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="font-medium">Descuento:</span> {promotion.discount}%
                                    </div>
                                    <div>
                                        <span className="font-medium">Duración:</span> {promotion.duration} meses
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