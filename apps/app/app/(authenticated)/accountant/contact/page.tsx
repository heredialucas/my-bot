import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { MessageSquare, Calendar, ChevronRight, Filter, Plus, Clock, Users, Search, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar";
import { Input } from "@repo/design-system/components/ui/input";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Label } from "@repo/design-system/components/ui/label";

export default function ContactPage() {
    // Datos simulados
    const team = [
        {
            id: 1,
            name: "Juan Pérez",
            position: "Contador Senior",
            email: "juan.perez@sopy.cl",
            phone: "+56 9 1234 5678",
            avatar: "/avatars/juan.jpg"
        },
        {
            id: 2,
            name: "María González",
            position: "Especialista Tributario",
            email: "maria.gonzalez@sopy.cl",
            phone: "+56 9 8765 4321",
            avatar: "/avatars/maria.jpg"
        },
        {
            id: 3,
            name: "Pedro Soto",
            position: "Asesor Financiero",
            email: "pedro.soto@sopy.cl",
            phone: "+56 9 5555 6666",
            avatar: "/avatars/pedro.jpg"
        },
        {
            id: 4,
            name: "Ana Muñoz",
            position: "Especialista en RRHH",
            email: "ana.munoz@sopy.cl",
            phone: "+56 9 7777 8888",
            avatar: "/avatars/ana.jpg"
        }
    ];

    const offices = [
        {
            id: 1,
            name: "Oficina Central Santiago",
            address: "Av. Providencia 1234, Providencia, Santiago",
            phone: "+56 2 2345 6789",
            email: "contacto.santiago@sopy.cl",
            hours: "Lunes a Viernes: 9:00 - 18:00"
        },
        {
            id: 2,
            name: "Oficina Viña del Mar",
            address: "Av. Marina 567, Viña del Mar, Valparaíso",
            phone: "+56 32 234 5678",
            email: "contacto.vina@sopy.cl",
            hours: "Lunes a Viernes: 9:00 - 17:30"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Contacto</h1>
                <div className="flex items-center gap-3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Agendar Reunión
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="team">
                <TabsList className="mb-4">
                    <TabsTrigger value="team">Equipo</TabsTrigger>
                    <TabsTrigger value="offices">Oficinas</TabsTrigger>
                    <TabsTrigger value="message">Enviar Mensaje</TabsTrigger>
                </TabsList>

                <TabsContent value="team">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {team.map((member) => (
                            <Card key={member.id}>
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    <Avatar className="h-24 w-24 mb-4">
                                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-lg font-medium">{member.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{member.position}</p>
                                    <div className="space-y-2 w-full">
                                        <div className="flex items-center justify-center gap-2 text-sm">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span>{member.email}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 text-sm">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span>{member.phone}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Mail className="h-4 w-4 mr-2" />
                                            Contactar
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Agendar
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="offices">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {offices.map((office) => (
                            <Card key={office.id}>
                                <CardHeader>
                                    <CardTitle>{office.name}</CardTitle>
                                    <CardDescription>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            {office.address}
                                        </div>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm font-medium mb-1">Horario de Atención</div>
                                            <div className="text-sm text-muted-foreground">{office.hours}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium mb-1">Contacto</div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Phone className="h-4 w-4" />
                                                {office.phone}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <Mail className="h-4 w-4" />
                                                {office.email}
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <Button variant="outline" className="w-full">
                                                <MapPin className="h-4 w-4 mr-2" />
                                                Ver en Mapa
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="message">
                    <Card>
                        <CardHeader>
                            <CardTitle>Enviar Mensaje</CardTitle>
                            <CardDescription>
                                Completa el formulario para enviar un mensaje a nuestro equipo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nombre</Label>
                                        <Input id="name" placeholder="Tu nombre" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="tu@email.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Asunto</Label>
                                    <Input id="subject" placeholder="Asunto del mensaje" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Mensaje</Label>
                                    <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} />
                                </div>
                                <div className="flex justify-end">
                                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                                        <Mail className="h-4 w-4 mr-2" />
                                        Enviar Mensaje
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card>
                <CardHeader>
                    <CardTitle>Preguntas Frecuentes</CardTitle>
                    <CardDescription>
                        Respuestas a las preguntas más comunes
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-1">¿Cuáles son los horarios de atención?</h3>
                            <p className="text-sm text-muted-foreground">
                                Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 horas. Para consultas urgentes fuera de este horario, puedes enviar un mensaje a través del formulario de contacto.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-1">¿Cómo puedo agendar una reunión con mi contador?</h3>
                            <p className="text-sm text-muted-foreground">
                                Puedes agendar una reunión directamente desde la sección "Asesoría" o contactando a tu contador asignado a través de su correo electrónico o teléfono.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-1">¿Qué documentos necesito para iniciar mi declaración de impuestos?</h3>
                            <p className="text-sm text-muted-foreground">
                                Los documentos necesarios varían según tu situación fiscal. En general, necesitarás facturas de compra y venta, boletas de honorarios, certificados de sueldos y otros ingresos. Tu contador te proporcionará una lista detallada según tu caso.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-1">¿Cómo puedo enviar documentos a mi contador?</h3>
                            <p className="text-sm text-muted-foreground">
                                Puedes subir documentos directamente en la sección "Carpeta Tributaria" de la plataforma. También puedes enviarlos por correo electrónico o entregarlos personalmente en nuestras oficinas.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 