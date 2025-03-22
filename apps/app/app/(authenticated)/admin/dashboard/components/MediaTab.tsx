import { Button } from "@repo/design-system/components/ui/button"
import { PlusIcon, PencilIcon, TrashIcon, ImageIcon, VideoIcon } from "lucide-react"
import Link from "next/link"
import { getAllMedia, deleteMedia } from "../../server/mediaActions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card"

export default async function MediaTab() {
    // Obtener todos los medios
    const mediaItems = await getAllMedia()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Medios</h2>
                <Link href="/admin/dashboard/new-media">
                    <Button className="flex items-center gap-2">
                        <PlusIcon className="h-4 w-4" />
                        Nuevo Medio
                    </Button>
                </Link>
            </div>

            {mediaItems.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No hay medios registrados</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mediaItems.map((media) => (
                        <Card key={media.id}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        {media.type === "IMAGE" ? (
                                            <ImageIcon className="h-4 w-4 text-blue-500" />
                                        ) : (
                                            <VideoIcon className="h-4 w-4 text-red-500" />
                                        )}
                                        <CardTitle className="text-lg">
                                            {media.name}
                                        </CardTitle>
                                    </div>
                                    <div className="flex gap-1">
                                        <Link href={`/admin/dashboard/edit-media/${media.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <form action={async () => {
                                            "use server"
                                            await deleteMedia(media.id)
                                        }}>
                                            <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-600">
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                                <CardDescription>
                                    {media.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="flex flex-col">
                                    <div className="text-sm text-muted-foreground truncate">
                                        URL: {media.url}
                                    </div>
                                    {media.alt && (
                                        <div className="text-sm text-muted-foreground">
                                            Alt: {media.alt}
                                        </div>
                                    )}
                                    <div className="text-sm text-muted-foreground">
                                        Tipo: {media.type}
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