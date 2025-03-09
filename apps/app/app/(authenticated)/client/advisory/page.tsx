import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { ArrowDownToLine, MessageSquare, Video, Calendar, Clock, Users, CalendarDays } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar";
import { Badge } from "@repo/design-system/components/ui/badge";
import Link from "next/link";

export default function AdvisoryPage() {
    // Datos simulados
    const meetings = [
        { id: 1, type: "video", title: "Revisión Mensual Mayo", date: "20/05/2025", time: "10:00", duration: "45 min", status: "scheduled", accountant: "María González", accountantAvatar: "/avatars/maria.jpg", notes: "Revisión de estados financieros y planificación fiscal" },
        { id: 2, type: "video", title: "Preparación Declaración Anual", date: "15/04/2025", time: "11:30", duration: "60 min", status: "completed", accountant: "Carlos Pérez", accountantAvatar: "/avatars/carlos.jpg", notes: "Revisión de documentos para declaración anual" },
        { id: 3, type: "in-person", title: "Reunión Estratégica", date: "05/04/2025", time: "15:00", duration: "90 min", status: "completed", accountant: "María González", accountantAvatar: "/avatars/maria.jpg", notes: "Planificación fiscal para el segundo semestre" },
    ];

    const services = [
        { id: 1, title: "Asesoría Tributaria", description: "Consultas ilimitadas sobre temas tributarios", price: "$120.000/mes", included: true },
        { id: 2, title: "Declaraciones Mensuales", description: "Preparación y presentación de F29", price: "$80.000/mes", included: true },
        { id: 3, title: "Declaración Anual", description: "Preparación y presentación de F22", price: "$250.000/año", included: true },
        { id: 4, title: "Contabilidad Completa", description: "Gestión contable mensual", price: "$200.000/mes", included: true },
        { id: 5, title: "Auditoría Fiscal", description: "Revisión completa de cumplimiento fiscal", price: "$500.000", included: false },
        { id: 6, title: "Planificación Tributaria", description: "Estrategias de optimización fiscal", price: "$350.000", included: false },
    ];

    const team = [
        { id: 1, name: "María González", role: "Contador Senior", avatar: "/avatars/maria.jpg", specialty: "Impuestos Corporativos", email: "maria@firma.cl", phone: "+56 9 1234 5678" },
        { id: 2, name: "Carlos Pérez", role: "Contador Tributario", avatar: "/avatars/carlos.jpg", specialty: "Planificación Fiscal", email: "carlos@firma.cl", phone: "+56 9 8765 4321" },
        { id: 3, name: "Ana Silva", role: "Asistente Contable", avatar: "/avatars/ana.jpg", specialty: "Documentación Fiscal", email: "ana@firma.cl", phone: "+56 9 2345 6789" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Asesoría</h1>

                <Button variant="default" className="bg-[#FFE01B] hover:bg-[#E5C800] text-black">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Reunión
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Próxima Reunión</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="text-xl font-bold">20/05/2025</div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">10:00 - 10:45</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Reunión por Zoom</span>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 w-full">
                            Ver Detalles
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tu Equipo Contable</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/maria.jpg" />
                                <AvatarFallback>MG</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="text-sm font-medium">María González</div>
                                <div className="text-xs text-muted-foreground">Contador Asignado</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/carlos.jpg" />
                                <AvatarFallback>CP</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="text-sm font-medium">Carlos Pérez</div>
                                <div className="text-xs text-muted-foreground">Especialista Tributario</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 w-full">
                            Ver Equipo Completo
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Plan Contratado</CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">Plan Premium</div>
                        <p className="text-xs text-muted-foreground">Asesoría integral tributaria y contable</p>
                        <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">
                            Activo
                        </Badge>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="meetings">
                <TabsList className="mb-4">
                    <TabsTrigger value="meetings">Reuniones</TabsTrigger>
                    <TabsTrigger value="team">Equipo</TabsTrigger>
                    <TabsTrigger value="services">Servicios</TabsTrigger>
                </TabsList>

                <TabsContent value="meetings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Historial de Reuniones</CardTitle>
                            <CardDescription>Reuniones pasadas y programadas con tu equipo contable</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {meetings.map((meeting) => (
                                <div
                                    key={meeting.id}
                                    className="p-4 border rounded-lg border-gray-200 dark:border-gray-800"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                        <div>
                                            <h3 className="font-medium">{meeting.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-500">{meeting.date}</span>
                                                <span className="text-sm text-gray-500">{meeting.time}</span>
                                                <span className="text-sm text-gray-500">({meeting.duration})</span>
                                            </div>
                                        </div>
                                        <Badge
                                            className={
                                                meeting.status === 'scheduled'
                                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                                    : "bg-green-100 text-green-800 hover:bg-green-100"
                                            }
                                        >
                                            {meeting.status === 'scheduled' ? 'Programada' : 'Completada'}
                                        </Badge>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={meeting.accountantAvatar} />
                                            <AvatarFallback>
                                                {meeting.accountant?.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="font-medium text-sm">{meeting.accountant}</div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {meeting.notes}
                                            </p>
                                        </div>
                                    </div>

                                    {meeting.status === 'scheduled' && (
                                        <div className="flex gap-2 mt-4 justify-end">
                                            <Button variant="outline" size="sm">
                                                Reagendar
                                            </Button>
                                            <Button variant="default" size="sm" className="bg-[#FFE01B] hover:bg-[#E5C800] text-black">
                                                <Video className="h-4 w-4 mr-2" />
                                                Unirse
                                            </Button>
                                        </div>
                                    )}

                                    {meeting.status === 'completed' && (
                                        <div className="flex gap-2 mt-4 justify-end">
                                            <Button variant="outline" size="sm">
                                                Ver Informe
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button variant="outline">
                                Cargar Más Reuniones
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="team">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {team.map((member) => (
                            <Card key={member.id}>
                                <CardHeader className="text-center pb-0">
                                    <Avatar className="h-20 w-20 mx-auto">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>
                                            {member.name?.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="mt-4">{member.name}</CardTitle>
                                    <CardDescription>{member.role}</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center pt-0">
                                    <Badge className="my-2">
                                        {member.specialty}
                                    </Badge>
                                    <div className="space-y-2 mt-4 text-sm">
                                        <p className="text-gray-500 dark:text-gray-400">{member.email}</p>
                                        <p className="text-gray-500 dark:text-gray-400">{member.phone}</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-center">
                                    <Button variant="outline">Contactar</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="services">
                    <Card>
                        <CardHeader>
                            <CardTitle>Servicios Disponibles</CardTitle>
                            <CardDescription>Servicios incluidos en tu plan y servicios adicionales</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {services.map((service) => (
                                    <div
                                        key={service.id}
                                        className="p-4 border rounded-lg border-gray-200 dark:border-gray-800"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{service.title}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    {service.description}
                                                </p>
                                            </div>
                                            <Badge
                                                variant={service.included ? "default" : "outline"}
                                                className={
                                                    service.included
                                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                        : "border-gray-300 text-gray-600"
                                                }
                                            >
                                                {service.included ? 'Incluido' : 'Adicional'}
                                            </Badge>
                                        </div>
                                        <div className="mt-3 flex justify-between items-center">
                                            <div className="font-semibold">{service.price}</div>
                                            {!service.included && (
                                                <Button variant="outline" size="sm">
                                                    Contratar
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 