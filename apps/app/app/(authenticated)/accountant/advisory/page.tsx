import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { MessageSquare, Calendar, ChevronRight, Filter, Plus, Clock, Users, Search } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar";

export default function AdvisoryPage() {
    // Datos simulados
    const consultations = [
        {
            id: 1,
            client: "Empresa ABC SpA",
            subject: "Consulta sobre régimen tributario",
            date: "15/05/2025",
            status: "pending",
            priority: "high",
            messages: 3
        },
        {
            id: 2,
            client: "Comercial XYZ Ltda.",
            subject: "Duda sobre facturación electrónica",
            date: "12/05/2025",
            status: "in-progress",
            priority: "medium",
            messages: 5
        },
        {
            id: 3,
            client: "Constructora El Bloque",
            subject: "Consulta sobre IVA en construcción",
            date: "10/05/2025",
            status: "completed",
            priority: "low",
            messages: 8
        },
        {
            id: 4,
            client: "Servicios Tecnológicos S.A.",
            subject: "Duda sobre exención tributaria",
            date: "05/05/2025",
            status: "completed",
            priority: "medium",
            messages: 4
        },
    ];

    const meetings = [
        {
            id: 1,
            client: "Empresa ABC SpA",
            subject: "Revisión de estados financieros",
            date: "20/05/2025",
            time: "10:00 - 11:30",
            type: "virtual",
            status: "scheduled"
        },
        {
            id: 2,
            client: "Comercial XYZ Ltda.",
            subject: "Planificación tributaria anual",
            date: "22/05/2025",
            time: "14:00 - 15:30",
            type: "in-person",
            status: "scheduled"
        },
        {
            id: 3,
            client: "Constructora El Bloque",
            subject: "Revisión de obligaciones fiscales",
            date: "18/05/2025",
            time: "09:00 - 10:00",
            type: "virtual",
            status: "scheduled"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Asesoría</h1>
                <div className="flex items-center gap-3">
                    <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar Reunión
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Consulta
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Consultas Pendientes</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            2 de alta prioridad
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reuniones Programadas</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">
                            Próximos 7 días
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tiempo de Respuesta</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.5 hrs</div>
                        <p className="text-xs text-muted-foreground">
                            Promedio último mes
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="consultations">
                <TabsList className="mb-4">
                    <TabsTrigger value="consultations">Consultas</TabsTrigger>
                    <TabsTrigger value="meetings">Reuniones</TabsTrigger>
                </TabsList>

                <TabsContent value="consultations">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Consultas de Clientes</CardTitle>
                                    <CardDescription>
                                        Gestiona las consultas y dudas de tus clientes
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="search"
                                            placeholder="Buscar consulta..."
                                            className="pl-9 h-9 w-[250px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filtrar
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Asunto</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Mensajes</TableHead>
                                            <TableHead>Prioridad</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {consultations.map((consultation) => (
                                            <TableRow key={consultation.id}>
                                                <TableCell className="font-medium">{consultation.client}</TableCell>
                                                <TableCell>{consultation.subject}</TableCell>
                                                <TableCell>{consultation.date}</TableCell>
                                                <TableCell>{consultation.messages}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            consultation.priority === 'high'
                                                                ? "bg-red-100 text-red-800 border-red-200"
                                                                : consultation.priority === 'medium'
                                                                    ? "bg-amber-100 text-amber-800 border-amber-200"
                                                                    : "bg-green-100 text-green-800 border-green-200"
                                                        }
                                                    >
                                                        {consultation.priority === 'high'
                                                            ? 'Alta'
                                                            : consultation.priority === 'medium'
                                                                ? 'Media'
                                                                : 'Baja'
                                                        }
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            consultation.status === 'pending'
                                                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                                                : consultation.status === 'in-progress'
                                                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                                                    : "bg-green-100 text-green-800 border-green-200"
                                                        }
                                                    >
                                                        {consultation.status === 'pending'
                                                            ? 'Pendiente'
                                                            : consultation.status === 'in-progress'
                                                                ? 'En Proceso'
                                                                : 'Completada'
                                                        }
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={`/accountant/advisory/consultation/${consultation.id}`}>
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
                </TabsContent>

                <TabsContent value="meetings">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Reuniones Programadas</CardTitle>
                                    <CardDescription>
                                        Gestiona tus reuniones con clientes
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filtrar
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {meetings.map((meeting) => (
                                    <Card key={meeting.id} className="overflow-hidden">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="bg-muted p-4 md:w-48 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r">
                                                <div className="text-2xl font-bold">{meeting.date.split('/')[0]}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {`${meeting.date.split('/')[1]}/${meeting.date.split('/')[2]}`}
                                                </div>
                                                <div className="mt-2 text-sm font-medium">{meeting.time}</div>
                                            </div>
                                            <div className="p-4 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-medium">{meeting.subject}</h3>
                                                        <p className="text-sm text-muted-foreground">{meeting.client}</p>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className={meeting.type === 'virtual'
                                                            ? "bg-blue-100 text-blue-800 border-blue-200"
                                                            : "bg-purple-100 text-purple-800 border-purple-200"
                                                        }
                                                    >
                                                        {meeting.type === 'virtual' ? 'Virtual' : 'Presencial'}
                                                    </Badge>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex -space-x-2">
                                                        <Avatar className="border-2 border-background">
                                                            <AvatarFallback>JD</AvatarFallback>
                                                        </Avatar>
                                                        <Avatar className="border-2 border-background">
                                                            <AvatarFallback>AB</AvatarFallback>
                                                        </Avatar>
                                                        <Avatar className="border-2 border-background">
                                                            <AvatarFallback>+2</AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm">
                                                            Reprogramar
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link href={`/accountant/advisory/meeting/${meeting.id}`}>
                                                                <ChevronRight className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 