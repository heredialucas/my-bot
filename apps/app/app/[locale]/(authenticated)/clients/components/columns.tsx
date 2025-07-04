"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ClientData } from "@repo/data-services"
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

// Esta función se puede exportar y usar para pasar props al componente de acciones
export const getClientColumns = (
    onEdit: (client: ClientData) => void
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

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menú</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(client.id)}
                            >
                                Copiar ID Cliente
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onEdit(client)}>
                                Editar Cliente
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/clients/${client.id}`)}>
                                Ver detalles
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ] 