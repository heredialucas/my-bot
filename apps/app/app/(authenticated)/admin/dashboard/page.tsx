import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Users, UserCheck, FileText, Calendar, ChevronRight, Plus, AlertCircle, BarChart3, Activity } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    // Datos simulados
    const recentAccountants = [
        {
            id: 1,
            name: "Juan Pérez",
            email: "juan.perez@sopy.cl",
            clients: 15,
            status: "active",
            lastActivity: "Hace 2 horas"
        },
        {
            id: 2,
            name: "María González",
            email: "maria.gonzalez@sopy.cl",
            clients: 8,
            status: "active",
            lastActivity: "Hace 5 horas"
        },
        {
            id: 3,
            name: "Pedro Soto",
            email: "pedro.soto@sopy.cl",
            clients: 12,
            status: "inactive",
            lastActivity: "Hace 3 días"
        },
    ];

    const recentClients = [
        {
            id: 1,
            name: "Empresa ABC SpA",
            rut: "76.543.210-K",
            accountant: "Juan Pérez",
            status: "active",
            lastActivity: "Hace 1 hora"
        },
        {
            id: 2,
            name: "Comercial XYZ Ltda.",
            rut: "77.665.544-3",
            accountant: "María González",
            status: "active",
            lastActivity: "Hace 3 horas"
        },
        {
            id: 3,
            name: "Constructora El Bloque",
            rut: "78.901.234-5",
            accountant: "Juan Pérez",
            status: "pending",
            lastActivity: "Hace 1 día"
        },
    ];

    const alerts = [
        {
            id: 1,
            type: "Auditoría",
            message: "5 declaraciones requieren revisión",
            severity: "high",
            date: "Hoy"
        },
        {
            id: 2,
            type: "Sistema",
            message: "Actualización programada para el 15/06/2025",
            severity: "medium",
            date: "2 días"
        },
        {
            id: 3,
            type: "Clientes",
            message: "3 nuevos clientes pendientes de aprobación",
            severity: "medium",
            date: "1 día"
        },
        {
            id: 4,
            type: "Contadores",
            message: "1 contador inactivo por más de 30 días",
            severity: "low",
            date: "1 semana"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Panel de Administración</h1>
                <div className="flex items-center gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Contador
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Contadores</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">28</div>
                        <p className="text-xs text-muted-foreground">
                            +2 este mes
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">354</div>
                        <p className="text-xs text-muted-foreground">
                            +15 este mes
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Declaraciones Procesadas</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,285</div>
                        <p className="text-xs text-muted-foreground">
                            Este mes
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            3 de alta prioridad
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Actividad Reciente de Contadores</CardTitle>
                        <CardDescription>
                            Los contadores más activos en la plataforma
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Clientes</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Última Actividad</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentAccountants.map((accountant) => (
                                        <TableRow key={accountant.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{accountant.name}</div>
                                                    <div className="text-sm text-muted-foreground">{accountant.email}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{accountant.clients}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={accountant.status === 'active'
                                                        ? "bg-green-100 text-green-800 border-green-200"
                                                        : "bg-red-100 text-red-800 border-red-200"
                                                    }
                                                >
                                                    {accountant.status === 'active' ? 'Activo' : 'Inactivo'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{accountant.lastActivity}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={`/admin/accountants/${accountant.id}`}>
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button variant="outline" asChild>
                                <Link href="/admin/accountants">
                                    Ver todos los contadores
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Clientes Recientes</CardTitle>
                        <CardDescription>
                            Últimos clientes registrados en la plataforma
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Empresa</TableHead>
                                        <TableHead>Contador</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Última Actividad</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentClients.map((client) => (
                                        <TableRow key={client.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{client.name}</div>
                                                    <div className="text-sm text-muted-foreground">{client.rut}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{client.accountant}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={client.status === 'active'
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
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={`/admin/clients/${client.id}`}>
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button variant="outline" asChild>
                                <Link href="/admin/clients">
                                    Ver todos los clientes
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Estadísticas de Uso</CardTitle>
                        <CardDescription>
                            Actividad general del sistema en los últimos 30 días
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex flex-col items-center justify-center border rounded-md p-6 text-center">
                            <BarChart3 className="h-16 w-16 text-blue-500 mb-4" />
                            <h3 className="text-lg font-medium">Datos Estadísticos</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                Aquí se mostraría un gráfico con las estadísticas de uso de la plataforma,
                                incluyendo número de declaraciones procesadas, usuarios activos, y actividad general.
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-center">
                                        <Activity className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                                        <div className="text-2xl font-bold">85%</div>
                                        <p className="text-xs text-muted-foreground">Contadores activos</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-center">
                                        <FileText className="h-5 w-5 text-green-500 mx-auto mb-2" />
                                        <div className="text-2xl font-bold">3,421</div>
                                        <p className="text-xs text-muted-foreground">Documentos procesados</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-center">
                                        <Users className="h-5 w-5 text-amber-500 mx-auto mb-2" />
                                        <div className="text-2xl font-bold">92%</div>
                                        <p className="text-xs text-muted-foreground">Satisfacción</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Alertas del Sistema</CardTitle>
                        <CardDescription>
                            Notificaciones importantes que requieren atención
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {alerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={`flex items-start p-3 rounded-md border ${alert.severity === 'high'
                                            ? 'bg-red-50 border-red-200'
                                            : alert.severity === 'medium'
                                                ? 'bg-amber-50 border-amber-200'
                                                : 'bg-blue-50 border-blue-200'
                                        }`}
                                >
                                    <div className="mr-3">
                                        <AlertCircle className={`h-5 w-5 ${alert.severity === 'high'
                                                ? 'text-red-500'
                                                : alert.severity === 'medium'
                                                    ? 'text-amber-500'
                                                    : 'text-blue-500'
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="font-medium text-sm">{alert.type}</div>
                                            <div className="text-xs text-muted-foreground">{alert.date}</div>
                                        </div>
                                        <p className="text-sm mt-1">{alert.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                            Ver todas las alertas
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 