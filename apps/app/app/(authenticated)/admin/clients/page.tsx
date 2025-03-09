import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Users, ChevronRight, Filter, Plus, Search, MoreHorizontal, TrashIcon, EditIcon, Eye, Building } from "lucide-react";
import Link from "next/link";
import { Input } from "@repo/design-system/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@repo/design-system/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";

export default function ClientsPage() {
    // Datos simulados
    const clients = [
        {
            id: 1,
            name: "Empresa ABC SpA",
            rut: "76.543.210-K",
            taxRegime: "Régimen Semi Integrado",
            accountant: "Juan Pérez",
            status: "active",
            pendingDocs: 2,
            lastActivity: "Hoy, 10:15"
        },
        {
            id: 2,
            name: "Comercial XYZ Ltda.",
            rut: "77.665.544-3",
            taxRegime: "Régimen Pro PYME",
            accountant: "María González",
            status: "active",
            pendingDocs: 0,
            lastActivity: "Ayer, 15:30"
        },
        {
            id: 3,
            name: "Constructora El Bloque",
            rut: "78.901.234-5",
            taxRegime: "Régimen Semi Integrado",
            accountant: "Juan Pérez",
            status: "pending",
            pendingDocs: 5,
            lastActivity: "Hace 3 días"
        },
        {
            id: 4,
            name: "Servicios Tecnológicos S.A.",
            rut: "79.123.456-7",
            taxRegime: "Régimen Semi Integrado",
            accountant: "Ana Muñoz",
            status: "active",
            pendingDocs: 1,
            lastActivity: "Hoy, 09:20"
        },
        {
            id: 5,
            name: "Importadora Global Ltda.",
            rut: "77.888.999-0",
            taxRegime: "Régimen Pro PYME",
            accountant: "Pedro Soto",
            status: "inactive",
            pendingDocs: 8,
            lastActivity: "Hace 1 semana"
        },
    ];

    const accountants = [
        "Juan Pérez",
        "María González",
        "Pedro Soto",
        "Ana Muñoz",
        "Roberto Díaz"
    ];

    const taxRegimes = [
        "Régimen Semi Integrado",
        "Régimen Pro PYME",
        "Régimen Transparente",
        "Régimen 14 TER"
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Gestión de Clientes</h1>
                <div className="flex items-center gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Cliente
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">354</div>
                        <p className="text-xs text-muted-foreground">
                            Registrados en la plataforma
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">320</div>
                        <p className="text-xs text-muted-foreground">
                            90% del total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Documentos Pendientes</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">156</div>
                        <p className="text-xs text-muted-foreground">
                            En espera de procesamiento
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clientes por Contador</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12.6</div>
                        <p className="text-xs text-muted-foreground">
                            Promedio por contador
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de Clientes</CardTitle>
                    <CardDescription>
                        Administra los clientes registrados en la plataforma
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Buscar cliente por nombre o RUT..."
                                    className="pl-9 w-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="active">Activos</SelectItem>
                                    <SelectItem value="pending">Pendientes</SelectItem>
                                    <SelectItem value="inactive">Inactivos</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Contador" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    {accountants.map((accountant, index) => (
                                        <SelectItem key={index} value={accountant.toLowerCase().replace(/\s+/g, '-')}>
                                            {accountant}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>Régimen Tributario</TableHead>
                                    <TableHead>Contador Asignado</TableHead>
                                    <TableHead>Documentos Pendientes</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Última Actividad</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clients.map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{client.name}</div>
                                                <div className="text-sm text-muted-foreground">{client.rut}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{client.taxRegime}</TableCell>
                                        <TableCell>{client.accountant}</TableCell>
                                        <TableCell>
                                            {client.pendingDocs > 0 ? (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-amber-100 text-amber-800 border-amber-200"
                                                >
                                                    {client.pendingDocs}
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-green-100 text-green-800 border-green-200"
                                                >
                                                    0
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    client.status === 'active'
                                                        ? "bg-green-100 text-green-800 border-green-200"
                                                        : client.status === 'pending'
                                                            ? "bg-amber-100 text-amber-800 border-amber-200"
                                                            : "bg-red-100 text-red-800 border-red-200"
                                                }
                                            >
                                                {client.status === 'active'
                                                    ? 'Activo'
                                                    : client.status === 'pending'
                                                        ? 'Pendiente'
                                                        : 'Inactivo'
                                                }
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{client.lastActivity}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        Ver detalles
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <EditIcon className="h-4 w-4 mr-2" />
                                                        Editar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Users className="h-4 w-4 mr-2" />
                                                        Cambiar contador
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        {client.status === 'active' ? (
                                                            <>
                                                                <TrashIcon className="h-4 w-4 mr-2 text-red-600" />
                                                                <span className="text-red-600">Desactivar</span>
                                                            </>
                                                        ) : client.status === 'inactive' ? (
                                                            <>
                                                                <Building className="h-4 w-4 mr-2 text-green-600" />
                                                                <span className="text-green-600">Activar</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Building className="h-4 w-4 mr-2 text-green-600" />
                                                                <span className="text-green-600">Aprobar</span>
                                                            </>
                                                        )}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="flex-1 text-sm text-muted-foreground">
                            Mostrando <strong>5</strong> de <strong>354</strong> clientes
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled
                            >
                                Anterior
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                            >
                                Siguiente
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 