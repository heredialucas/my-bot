import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Input } from "@repo/design-system/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import { UsersIcon, PlusIcon, Search, ChevronRightIcon, CheckIcon, AlertCircleIcon } from "lucide-react";
import Link from "next/link";

export default function ClientsPage() {
    // Datos de ejemplo
    const clients = [
        {
            id: 1,
            name: "Empresa ABC SpA",
            rut: "76.543.210-K",
            contact: "Juan Pérez",
            email: "juan.perez@empresaabc.cl",
            phone: "+56 9 8765 4321",
            status: "active",
            taxRegime: "Semi Integrado",
            nextTax: "15/05/2025",
            pendingDocs: 3
        },
        {
            id: 2,
            name: "Comercial XYZ Ltda.",
            rut: "77.665.544-3",
            contact: "María González",
            email: "maria@comercialxyz.cl",
            phone: "+56 9 1234 5678",
            status: "active",
            taxRegime: "Pro-Pyme",
            nextTax: "20/05/2025",
            pendingDocs: 1
        },
        {
            id: 3,
            name: "Constructora El Bloque",
            rut: "78.901.234-5",
            contact: "Carlos Rodríguez",
            email: "carlos@elbloque.cl",
            phone: "+56 9 5555 6666",
            status: "active",
            taxRegime: "Semi Integrado",
            nextTax: "30/04/2025",
            pendingDocs: 2
        },
        {
            id: 4,
            name: "Servicios Tecnológicos S.A.",
            rut: "79.123.456-7",
            contact: "Ana Muñoz",
            email: "ana@servicios-tec.cl",
            phone: "+56 9 7777 8888",
            status: "active",
            taxRegime: "Pro-Pyme",
            nextTax: "10/06/2025",
            pendingDocs: 0
        },
        {
            id: 5,
            name: "Distribuidora Santiago",
            rut: "80.234.567-8",
            contact: "Pedro Soto",
            email: "pedro@dist-santiago.cl",
            phone: "+56 9 9999 0000",
            status: "inactive",
            taxRegime: "Semi Integrado",
            nextTax: "-",
            pendingDocs: 0
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Nuevo Cliente
                </Button>
            </div>

            {/* Estadísticas de clientes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">
                            +2 este mes
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Régimen Semi Integrado</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">14</div>
                        <p className="text-xs text-muted-foreground">
                            58.3% del total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Régimen Pro-Pyme</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10</div>
                        <p className="text-xs text-muted-foreground">
                            41.7% del total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clientes con Pendientes</CardTitle>
                        <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">6</div>
                        <p className="text-xs text-muted-foreground">
                            25% del total
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Filtros */}
            <Card>
                <CardHeader>
                    <CardTitle>Buscar Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    placeholder="Buscar por nombre, RUT o contacto"
                                    className="w-full pl-9"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-48">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="active">Activos</SelectItem>
                                    <SelectItem value="inactive">Inactivos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full md:w-48">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Régimen" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="semi">Semi Integrado</SelectItem>
                                    <SelectItem value="pyme">Pro-Pyme</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button variant="outline" className="w-full md:w-auto">
                            Filtrar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Lista de clientes */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Clientes</CardTitle>
                    <CardDescription>
                        Gestiona los perfiles y obligaciones tributarias de tus clientes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>RUT</TableHead>
                                    <TableHead>Contacto</TableHead>
                                    <TableHead>Régimen</TableHead>
                                    <TableHead>Próx. Vencimiento</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clients.map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell className="font-medium">{client.name}</TableCell>
                                        <TableCell>{client.rut}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{client.contact}</span>
                                                <span className="text-xs text-muted-foreground">{client.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{client.taxRegime}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {client.nextTax !== "-" && (
                                                    <>
                                                        {client.nextTax}
                                                        {client.pendingDocs > 0 && (
                                                            <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800 border-amber-200">
                                                                {client.pendingDocs} docs.
                                                            </Badge>
                                                        )}
                                                    </>
                                                )}
                                                {client.nextTax === "-" && (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={client.status === 'active'
                                                    ? "bg-green-100 text-green-800 border-green-200"
                                                    : "bg-gray-100 text-gray-800 border-gray-200"
                                                }
                                            >
                                                {client.status === 'active' ? (
                                                    <div className="flex items-center gap-1">
                                                        <CheckIcon className="h-3 w-3" />
                                                        <span>Activo</span>
                                                    </div>
                                                ) : (
                                                    'Inactivo'
                                                )}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                asChild
                                            >
                                                <Link href={`/accountant/clients/${client.id}`}>
                                                    <ChevronRightIcon className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 