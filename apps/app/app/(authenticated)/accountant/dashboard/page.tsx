import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Users, FileText, Calendar, ChevronRight, Filter, Plus, Clock, BarChart, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AccountantDashboard() {
    // Datos simulados
    const clientsRequiringAttention = [
        {
            id: 1,
            name: "Empresa ABC SpA",
            pendingDocs: 3,
            upcomingPayment: "12/06/2025",
            amount: 145900
        },
        {
            id: 2,
            name: "Comercial XYZ Ltda.",
            pendingDocs: 5,
            upcomingPayment: "12/06/2025",
            amount: 120500
        },
        {
            id: 3,
            name: "Constructora El Bloque",
            pendingDocs: 2,
            upcomingPayment: "15/06/2025",
            amount: 301350
        },
    ];

    const taxCalendar = [
        {
            id: 1,
            type: "F29 - IVA",
            dueDate: "12/06/2025",
            clients: 12,
            status: "upcoming"
        },
        {
            id: 2,
            type: "Impuesto a la Renta",
            dueDate: "30/04/2025",
            clients: 8,
            status: "completed"
        },
        {
            id: 3,
            type: "Declaración Jurada 1879",
            dueDate: "19/06/2025",
            clients: 5,
            status: "urgent"
        },
        {
            id: 4,
            type: "Pago PPM",
            dueDate: "12/06/2025",
            clients: 10,
            status: "upcoming"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Panel Principal</h1>
                <div className="flex items-center gap-3">
                    <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Mayo 2025
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Cliente
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">42</div>
                        <p className="text-xs text-muted-foreground">
                            +3 este mes
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Documentos Pendientes</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground">
                            De 8 clientes
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Impuestos Próximos</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            Vencen en 7 días
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Clientes que Requieren Atención</CardTitle>
                        <CardDescription>
                            Clientes con documentos pendientes o pagos próximos
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead>Docs. Pendientes</TableHead>
                                        <TableHead>Próximo Pago</TableHead>
                                        <TableHead>Monto</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clientsRequiringAttention.map((client) => (
                                        <TableRow key={client.id}>
                                            <TableCell className="font-medium">{client.name}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-amber-100 text-amber-800 border-amber-200"
                                                >
                                                    {client.pendingDocs}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{client.upcomingPayment}</TableCell>
                                            <TableCell>${client.amount.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={`/accountant/clients/${client.id}`}>
                                                        <ChevronRight className="h-4 w-4" />
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

                <Card>
                    <CardHeader>
                        <CardTitle>Calendario Tributario</CardTitle>
                        <CardDescription>
                            Próximos vencimientos de impuestos
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {taxCalendar.map((tax) => (
                                <div
                                    key={tax.id}
                                    className={`flex items-center justify-between p-3 rounded-md border ${tax.status === 'urgent'
                                        ? 'bg-red-50 border-red-200'
                                        : tax.status === 'upcoming'
                                            ? 'bg-amber-50 border-amber-200'
                                            : 'bg-green-50 border-green-200'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {tax.status === 'urgent' ? (
                                            <AlertCircle className="h-5 w-5 text-red-500" />
                                        ) : tax.status === 'upcoming' ? (
                                            <Calendar className="h-5 w-5 text-amber-500" />
                                        ) : (
                                            <FileText className="h-5 w-5 text-green-500" />
                                        )}
                                        <div>
                                            <div className="font-medium">{tax.type}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {tax.clients} clientes - Vence: {tax.dueDate}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        asChild
                                    >
                                        <Link href={`/accountant/monthly-taxes`}>
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                        <CardDescription>
                            Últimas acciones realizadas en la plataforma
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="min-w-10 min-h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Declaración F29 completada</p>
                                    <p className="text-sm text-muted-foreground">
                                        Se ha completado la declaración de IVA para Empresa ABC SpA
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">Hace 2 horas</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="min-w-10 min-h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Nuevo cliente registrado</p>
                                    <p className="text-sm text-muted-foreground">
                                        Se ha registrado un nuevo cliente: Servicios Tecnológicos S.A.
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">Hace 5 horas</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="min-w-10 min-h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <Calendar className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Reunión agendada</p>
                                    <p className="text-sm text-muted-foreground">
                                        Se ha agendado una reunión con Comercial XYZ Ltda. para el 22/05/2025
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">Hace 1 día</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="min-w-10 min-h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Documentos subidos</p>
                                    <p className="text-sm text-muted-foreground">
                                        Se han subido 5 nuevos documentos a la carpeta de Constructora El Bloque
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">Hace 2 días</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recordatorios</CardTitle>
                        <CardDescription>
                            Tareas pendientes para hoy
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-2">
                                <div className="min-w-5 pt-1">
                                    <div className="h-5 w-5 rounded-full border-2 border-red-500"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Revisar declaración F22</p>
                                    <p className="text-xs text-muted-foreground">
                                        Empresa ABC SpA - Alta prioridad
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="min-w-5 pt-1">
                                    <div className="h-5 w-5 rounded-full border-2 border-amber-500"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Preparar liquidaciones de sueldo</p>
                                    <p className="text-xs text-muted-foreground">
                                        Comercial XYZ Ltda. - Media prioridad
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="min-w-5 pt-1">
                                    <div className="h-5 w-5 rounded-full border-2 border-amber-500"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Responder consulta tributaria</p>
                                    <p className="text-xs text-muted-foreground">
                                        Constructora El Bloque - Media prioridad
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="min-w-5 pt-1">
                                    <div className="h-5 w-5 rounded-full border-2 border-green-500"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Actualizar carpeta tributaria</p>
                                    <p className="text-xs text-muted-foreground">
                                        Servicios Tecnológicos S.A. - Baja prioridad
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Recordatorio
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 