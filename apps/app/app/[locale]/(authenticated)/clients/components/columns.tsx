"use client"

import { ColumnDef } from "@tanstack/react-table"
import { type ClientData } from "@repo/data-services"
import { Button } from "@repo/design-system/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/design-system/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useToast } from "@repo/design-system/hooks/use-toast"
import { deleteClientAction } from "../actions"
import { useState } from "react"

// Esta función se puede exportar y usar para pasar props al componente de acciones
export const getClientColumns = (
    onEdit: (client: ClientData) => void,
    isAdmin: boolean = false
): ColumnDef<ClientData>[] => [
        {
            accessorKey: "firstName",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nombre
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const client = row.original
                return `${client.firstName} ${client.lastName}`
            }
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        ...(isAdmin ? [{
            accessorKey: "seller",
            header: "Vendedor",
            cell: ({ row }: { row: { original: ClientData } }) => {
                const client = row.original;
                return client.seller
                    ? `${client.seller.name} ${client.seller.lastName}`
                    : 'Sin asignar';
            },
        }] : []),
        {
            accessorKey: "address",
            header: "Dirección",
        },
        {
            accessorKey: "phone",
            header: "Teléfono",
        },
        {
            accessorKey: "accountBalance",
            header: () => <div className="text-right">Saldo</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("accountBalance"))
                const formatted = new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                }).format(amount)

                return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const client = row.original
                const router = useRouter()
                const { toast } = useToast()
                const [isDeleting, setIsDeleting] = useState(false)

                const handleDelete = async () => {
                    if (!confirm(`¿Estás seguro de que quieres eliminar el cliente ${client.firstName} ${client.lastName}?`)) {
                        return;
                    }

                    setIsDeleting(true);
                    try {
                        const result = await deleteClientAction(client.id);
                        if (result.success) {
                            toast({
                                title: 'Éxito',
                                description: result.message,
                            });
                            router.refresh();
                        } else {
                            toast({
                                title: 'Error',
                                description: result.message,
                                variant: 'destructive',
                            });
                        }
                    } catch (error) {
                        toast({
                            title: 'Error',
                            description: 'No se pudo eliminar el cliente.',
                            variant: 'destructive',
                        });
                    } finally {
                        setIsDeleting(false);
                    }
                };

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menú</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(client)}>
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/clients/${client.id}`)}>
                                Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleDelete}
                                className="text-red-600 focus:text-red-600"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Eliminando...' : 'Eliminar Cliente'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ] 