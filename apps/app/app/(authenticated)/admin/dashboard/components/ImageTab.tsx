import { Button } from "@repo/design-system/components/ui/button"
import { PlusIcon, PencilIcon, TrashIcon, ImageIcon } from "lucide-react"
import Link from "next/link"
import { getAllImages, deleteImage } from "../../server/imageActions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card"

export default async function ImageTab() {
    const imageItems = await getAllImages()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Imágenes</h2>
                <Link href="/admin/dashboard/new-image">
                    <Button className="flex items-center gap-2">
                        <PlusIcon className="h-4 w-4" />
                        Nueva Imagen
                    </Button>
                </Link>
            </div>

            {imageItems.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No hay imágenes registradas</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {imageItems.map((image) => (
                        <Card key={image.id}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4 text-blue-500" />
                                        <CardTitle className="text-lg">
                                            {image.name}
                                        </CardTitle>
                                    </div>
                                    <div className="flex gap-1">
                                        <Link href={`/admin/dashboard/edit-image/${image.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <form action={async () => {
                                            "use server"
                                            await deleteImage(image.id)
                                        }}>
                                            <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-600">
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                                <CardDescription>
                                    {image.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="flex flex-col">
                                    <div className="text-sm text-muted-foreground truncate">
                                        URL: {image.url}
                                    </div>
                                    {image.alt && (
                                        <div className="text-sm text-muted-foreground">
                                            Alt: {image.alt}
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