import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Label } from "@repo/design-system/components/ui/label";
import { Input } from "@repo/design-system/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
    const contactMethods = [
        {
            id: 1,
            title: "Correo Electrónico",
            icon: Mail,
            value: "contacto@sopy.cl",
            description: "Para consultas generales",
            response: "24-48 horas"
        },
        {
            id: 2,
            title: "Teléfono",
            icon: Phone,
            value: "+56 2 2123 4567",
            description: "Horario de atención: 9:00 - 18:00",
            response: "Inmediata"
        },
        {
            id: 3,
            title: "Oficina Central",
            icon: MapPin,
            value: "Av. Providencia 1760, Providencia, Santiago",
            description: "De lunes a viernes",
            response: "Con cita previa"
        },
    ];

    const contactHistory = [
        {
            id: "C001",
            subject: "Consulta sobre facturación electrónica",
            date: "15/05/2025",
            status: "answered",
            department: "Soporte Técnico",
            message: "Tengo problemas para emitir facturas electrónicas desde la plataforma. Me sale un error al intentar firmar con mi certificado digital.",
            response: "Estimado cliente, hemos revisado su caso y el problema se debe a que su certificado digital ha expirado. Por favor renueve su certificado y vuelva a intentarlo.",
            agent: "Carlos Méndez",
            agentAvatar: "/avatars/carlos.jpg"
        },
        {
            id: "C002",
            subject: "Solicitud de información sobre servicios",
            date: "10/05/2025",
            status: "answered",
            department: "Ventas",
            message: "Quisiera recibir más información sobre los planes de asesoría contable mensual que ofrecen.",
            response: "Gracias por su interés en nuestros servicios. Le hemos enviado a su correo electrónico un detalle de nuestros planes y precios. También puede agendar una reunión con uno de nuestros ejecutivos para resolver cualquier duda adicional.",
            agent: "María Soto",
            agentAvatar: "/avatars/maria.jpg"
        },
        {
            id: "C003",
            subject: "Problema con acceso a plataforma",
            date: "05/05/2025",
            status: "pending",
            department: "Soporte Técnico",
            message: "No puedo acceder a mi cuenta en la plataforma. Ingreso mis credenciales pero me sale un mensaje de error.",
            response: null,
            agent: null,
            agentAvatar: null
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Contacto</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contactMethods.map((method) => (
                    <Card key={method.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{method.title}</CardTitle>
                            <method.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-xl font-medium">{method.value}</div>
                            <p className="text-xs text-muted-foreground">{method.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Tiempo de respuesta: {method.response}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="newMessage">
                <TabsList className="mb-4">
                    <TabsTrigger value="newMessage">Nuevo Mensaje</TabsTrigger>
                    <TabsTrigger value="history">Historial de Mensajes</TabsTrigger>
                </TabsList>

                <TabsContent value="newMessage">
                    <Card>
                        <CardHeader>
                            <CardTitle>Enviar Mensaje</CardTitle>
                            <CardDescription>
                                Complete el formulario para enviar una consulta a nuestro equipo
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Completo</Label>
                                    <Input id="name" placeholder="Su nombre completo" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input id="email" type="email" placeholder="ejemplo@correo.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="department">Departamento</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione un departamento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tech">Soporte Técnico</SelectItem>
                                        <SelectItem value="sales">Ventas</SelectItem>
                                        <SelectItem value="billing">Facturación</SelectItem>
                                        <SelectItem value="accounting">Contabilidad</SelectItem>
                                        <SelectItem value="general">Consultas Generales</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Asunto</Label>
                                <Input id="subject" placeholder="Asunto de su mensaje" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Mensaje</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Escriba su mensaje aquí..."
                                    className="min-h-32"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="attachment">Adjuntar Archivo (opcional)</Label>
                                <Input id="attachment" type="file" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button variant="default" className="bg-[#FFE01B] hover:bg-[#E5C800] text-black">
                                <Send className="h-4 w-4 mr-2" />
                                Enviar Mensaje
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Historial de Mensajes</CardTitle>
                            <CardDescription>
                                Consultas enviadas anteriormente y sus respuestas
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {contactHistory.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="p-4 border rounded-lg border-gray-200 dark:border-gray-800"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                        <div>
                                            <h3 className="font-medium">{contact.subject}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline" className="text-xs">
                                                    {contact.department}
                                                </Badge>
                                                <span className="text-sm text-gray-500">{contact.date}</span>
                                            </div>
                                        </div>
                                        <Badge
                                            className={
                                                contact.status === 'answered'
                                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                            }
                                        >
                                            {contact.status === 'answered' ? 'Respondido' : 'Pendiente'}
                                        </Badge>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-zinc-900 p-3 rounded-md">
                                        <p className="text-sm">{contact.message}</p>
                                    </div>

                                    {contact.response && (
                                        <div className="flex gap-3 mt-4">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={contact.agentAvatar} alt="Agent" />
                                                <AvatarFallback>{contact.agent?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md text-sm">
                                                <div className="font-medium mb-1 text-blue-700 dark:text-blue-400">{contact.agent}</div>
                                                <p>{contact.response}</p>
                                            </div>
                                        </div>
                                    )}

                                    {contact.status === 'answered' && (
                                        <div className="flex gap-2 mt-4 justify-end">
                                            <Button variant="outline" size="sm">
                                                <MessageSquare className="h-4 w-4 mr-2" />
                                                Responder
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card>
                <CardHeader>
                    <CardTitle>Preguntas Frecuentes</CardTitle>
                    <CardDescription>
                        Respuestas a las consultas más habituales
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                        <h3 className="font-medium mb-2">¿Cómo puedo cambiar mi plan?</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Para cambiar su plan, puede contactar con nuestro departamento de ventas o solicitarlo directamente desde la sección "Planes" en su perfil. Un ejecutivo se pondrá en contacto con usted para gestionar el cambio.
                        </p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                        <h3 className="font-medium mb-2">¿Cuál es el horario de atención?</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 horas. Para consultas fuera de horario, puede dejar un mensaje y le responderemos a la brevedad durante el siguiente día hábil.
                        </p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                        <h3 className="font-medium mb-2">¿Cómo puedo solicitar una reunión con mi contador?</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Puede solicitar una reunión con su contador asignado desde la sección "Asesoría" en el menú principal. Allí encontrará la opción "Agendar Reunión" donde podrá seleccionar fecha y hora según disponibilidad.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">¿Qué hacer si olvidé mi contraseña?</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Si olvidó su contraseña, puede hacer clic en "¿Olvidó su contraseña?" en la pantalla de inicio de sesión. Se le enviará un enlace a su correo electrónico registrado para crear una nueva contraseña.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 