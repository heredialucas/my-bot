import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { ClipboardCheck, Filter, Search, Calendar, Download, FileText, AlertCircle, Eye, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@repo/design-system/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";

export default function AuditPage() {
    // Datos simulados
    const auditLogs = [
        {
            id: 1,
            date: "18/05/2025 15:30:22",
            user: "Juan Pérez",
            userType: "Contador",
            action: "Declaración F29 modificada",
            client: "Empresa ABC SpA",
            details: "Cambio en monto de IVA: de $1.250.000 a $1.350.000",
            severity: "high"
        },
        {
            id: 2,
            date: "18/05/2025 14:15:10",
            user: "María González",
            userType: "Contador",
            action: "Documento subido",
            client: "Comercial XYZ Ltda.",
            details: "Factura de compra #4592",
            severity: "low"
        },
        {
            id: 3,
            date: "18/05/2025 10:05:45",
            user: "Pedro Soto",
            userType: "Contador",
            action: "Cambio de régimen tributario",
            client: "Constructora El Bloque",
            details: "Cambio de Régimen Semi Integrado a Régimen Pro PYME",
            severity: "medium"
        },
        {
            id: 4,
            date: "17/05/2025 16:28:33",
            user: "Ana Muñoz",
            userType: "Contador",
            action: "Declaración jurada enviada",
            client: "Servicios Tecnológicos S.A.",
            details: "Declaración Jurada 1879",
            severity: "low"
        },
        {
            id: 5,
            date: "17/05/2025 11:42:09",
            user: "Roberto Díaz",
            userType: "Contador",
            action: "Eliminación de documento",
            client: "Importadora Global Ltda.",
            details: "Factura de venta #1285 - Razón: Documento duplicado",
            severity: "high"
        },
    ];

    const taxAnomalies = [
        {
            id: 1,
            date: "18/05/2025",
            client: "Empresa ABC SpA",
            type: "Inconsistencia IVA",
            description: "Diferencia entre libro de compras y declaración F29",
            amount: "$245.000",
            status: "pending",
            accountant: "Juan Pérez",
            severity: "high"
        },
        {
            id: 2,
            date: "17/05/2025",
            client: "Comercial XYZ Ltda.",
            type: "Factura duplicada",
            description: "Factura #37842 registrada dos veces",
            amount: "$120.500",
            status: "resolved",
            accountant: "María González",
            severity: "medium"
        },
        {
            id: 3,
            date: "16/05/2025",
            client: "Constructora El Bloque",
            type: "Gasto rechazado",
            description: "Gasto personal registrado como operacional",
            amount: "$350.000",
            status: "pending",
            accountant: "Juan Pérez",
            severity: "high"
        },
        {
            id: 4,
            date: "15/05/2025",
            client: "Servicios Tecnológicos S.A.",
            type: "Inconsistencia PPM",
            description: "Cálculo incorrecto del PPM",
            amount: "$56.300",
            status: "pending",
            accountant: "Ana Muñoz",
            severity: "medium"
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Auditoría</h1>
                <div className="flex items-center gap-3">
                    <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        18/05/2025
                    </Button>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Acciones</CardTitle>
                        <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,284</div>
                        <p className="text-xs text-muted-foreground">
                            En los últimos 30 días
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Anomalías Detectadas</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            8 pendientes de revisión
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Modificaciones Críticas</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">
                            Requieren aprobación
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
                        <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">32</div>
                        <p className="text-xs text-muted-foreground">
                            Realizaron acciones hoy
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="logs">
                <TabsList>
                    <TabsTrigger value="logs">Registro de Actividades</TabsTrigger>
                    <TabsTrigger value="anomalies">Anomalías Tributarias</TabsTrigger>
                </TabsList>

                <TabsContent value="logs" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Registro de Actividades</CardTitle>
                            <CardDescription>
                                Acciones realizadas por los usuarios en la plataforma
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Buscar en el registro de actividades..."
                                            className="pl-9 w-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Tipo de Usuario" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todos</SelectItem>
                                            <SelectItem value="accountant">Contadores</SelectItem>
                                            <SelectItem value="client">Clientes</SelectItem>
                                            <SelectItem value="admin">Administradores</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Severidad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas</SelectItem>
                                            <SelectItem value="high">Alta</SelectItem>
                                            <SelectItem value="medium">Media</SelectItem>
                                            <SelectItem value="low">Baja</SelectItem>
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
                                            <TableHead>Fecha y Hora</TableHead>
                                            <TableHead>Usuario</TableHead>
                                            <TableHead>Acción</TableHead>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Severidad</TableHead>
                                            <TableHead className="text-right">Detalles</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {auditLogs.map((log) => (
                                            <TableRow key={log.id}>
                                                <TableCell>
                                                    <div className="font-medium">{log.date}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div>{log.user}</div>
                                                        <div className="text-sm text-muted-foreground">{log.userType}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{log.action}</TableCell>
                                                <TableCell>{log.client}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            log.severity === 'high'
                                                                ? "bg-red-100 text-red-800 border-red-200"
                                                                : log.severity === 'medium'
                                                                    ? "bg-amber-100 text-amber-800 border-amber-200"
                                                                    : "bg-blue-100 text-blue-800 border-blue-200"
                                                        }
                                                    >
                                                        {log.severity === 'high'
                                                            ? 'Alta'
                                                            : log.severity === 'medium'
                                                                ? 'Media'
                                                                : 'Baja'
                                                        }
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={`/admin/audit/logs/${log.id}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex items-center justify-end space-x-2 py-4">
                                <div className="flex-1 text-sm text-muted-foreground">
                                    Mostrando <strong>5</strong> de <strong>1,284</strong> registros
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
                </TabsContent>

                <TabsContent value="anomalies" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Anomalías Tributarias</CardTitle>
                            <CardDescription>
                                Inconsistencias detectadas que requieren revisión
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Buscar anomalías..."
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
                                            <SelectItem value="pending">Pendientes</SelectItem>
                                            <SelectItem value="resolved">Resueltas</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Severidad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas</SelectItem>
                                            <SelectItem value="high">Alta</SelectItem>
                                            <SelectItem value="medium">Media</SelectItem>
                                            <SelectItem value="low">Baja</SelectItem>
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
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Monto</TableHead>
                                            <TableHead>Contador</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Severidad</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {taxAnomalies.map((anomaly) => (
                                            <TableRow key={anomaly.id}>
                                                <TableCell>
                                                    <div className="font-medium">{anomaly.date}</div>
                                                </TableCell>
                                                <TableCell>{anomaly.client}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div>{anomaly.type}</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1" title={anomaly.description}>
                                                            {anomaly.description}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{anomaly.amount}</TableCell>
                                                <TableCell>{anomaly.accountant}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            anomaly.status === 'pending'
                                                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                                                : "bg-green-100 text-green-800 border-green-200"
                                                        }
                                                    >
                                                        {anomaly.status === 'pending' ? 'Pendiente' : 'Resuelta'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            anomaly.severity === 'high'
                                                                ? "bg-red-100 text-red-800 border-red-200"
                                                                : anomaly.severity === 'medium'
                                                                    ? "bg-amber-100 text-amber-800 border-amber-200"
                                                                    : "bg-blue-100 text-blue-800 border-blue-200"
                                                        }
                                                    >
                                                        {anomaly.severity === 'high'
                                                            ? 'Alta'
                                                            : anomaly.severity === 'medium'
                                                                ? 'Media'
                                                                : 'Baja'
                                                        }
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={`/admin/audit/anomalies/${anomaly.id}`}>
                                                            <ChevronRight className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex items-center justify-end space-x-2 py-4">
                                <div className="flex-1 text-sm text-muted-foreground">
                                    Mostrando <strong>4</strong> de <strong>12</strong> anomalías
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
                </TabsContent>
            </Tabs>
        </div>
    );
} 