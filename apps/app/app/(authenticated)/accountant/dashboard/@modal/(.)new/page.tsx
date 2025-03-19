'use client';

import { Button } from "@repo/design-system/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@repo/design-system/components/ui/dialog"
import { Input } from "@repo/design-system/components/ui/input"
import { Label } from "@repo/design-system/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select"
import Link from "next/link"

export default function NewClientModal() {
    return (
        <Dialog open>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nuevo Cliente</DialogTitle>
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
                            placeholder="Nombre del cliente"
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
                                <SelectItem value="individual">Persona Natural</SelectItem>
                                <SelectItem value="company">Empresa</SelectItem>
                                <SelectItem value="nonprofit">ONG</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" asChild>
                        <Link href="/accountant/dashboard">
                            Cancelar
                        </Link>
                    </Button>
                    <Button>Crear Cliente</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 