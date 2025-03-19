'use client';
import { Button } from "@repo/design-system/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@repo/design-system/components/ui/dialog"
import { Input } from "@repo/design-system/components/ui/input"
import { Label } from "@repo/design-system/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select"
import { Textarea } from "@repo/design-system/components/ui/textarea"
import Link from "next/link"

export default function NewProjectModal() {
    return (
        <Dialog open>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nuevo Proyecto</DialogTitle>
                    <DialogDescription>
                        Este es un ejemplo de interceptor en Next.js 15 usando el patrón @modal con captura de grupos (.).
                        Los interceptores permiten mostrar contenido de otra ruta sin perder el contexto de la página actual.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            placeholder="Nombre del proyecto"
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Tipo
                        </Label>
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="development">Desarrollo</SelectItem>
                                <SelectItem value="design">Diseño</SelectItem>
                                <SelectItem value="consulting">Consultoría</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Descripción
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Describe el proyecto..."
                            className="col-span-3"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" asChild>
                        <Link href="/client/dashboard">
                            Cancelar
                        </Link>
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Crear Proyecto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 