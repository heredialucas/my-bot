import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import { PlusCircle, MessageSquare, Send } from "lucide-react";

export default function QueriesPage() {
    // Datos simulados
    const queries = [
        {
            id: "Q001",
            title: "Consulta sobre declaración mensual",
            status: "answered",
            date: "15/05/2025",
            category: "Impuestos mensuales",
            message: "Tengo una duda sobre cómo declarar gastos de representación en el formulario F29.",
            response: "Los gastos de representación se declaran en la línea 33 del formulario F29, pero recuerda que solo son deducibles hasta un 1.5% de los ingresos brutos anuales con un tope de 1.000 UTM.",
            accountant: "María González",
            accountantAvatar: "/avatars/accountant.jpg"
        },
        {
            id: "Q002",
            title: "Duda sobre facturación electrónica",
            status: "pending",
            date: "10/05/2025",
            category: "Facturación",
            message: "¿Es posible emitir una factura electrónica a un cliente extranjero? ¿Qué requisitos debo cumplir?",
            response: null,
            accountant: null,
            accountantAvatar: null
        },
        {
            id: "Q003",
            title: "Retención de impuestos a honorarios",
            status: "answered",
            date: "01/05/2025",
            category: "Retenciones",
            message: "Necesito aclarar el monto de retención que debo aplicar a servicios profesionales.",
            response: "Para servicios profesionales independientes la retención es del 10.75% a partir de enero 2025. Recuerda que debe ser declarada en el F29 en la línea correspondiente a retenciones de segunda categoría.",
            accountant: "Carlos Pérez",
            accountantAvatar: "/avatars/accountant2.jpg"
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Mis Consultas</h1>

                <Button variant="default" className="bg-[#FFE01B] hover:bg-[#E5C800] text-black">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nueva Consulta
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Consultas</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Últimos 30 días</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Consultas Pendientes</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground">Pendiente de respuesta</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tiempo Promedio Respuesta</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24h</div>
                        <p className="text-xs text-muted-foreground">Tiempo de respuesta</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Nueva Consulta</CardTitle>
                    <CardDescription>Envía tu consulta a nuestro equipo de contadores</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Categoría</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="monthly">Impuestos mensuales</SelectItem>
                                <SelectItem value="annual">Impuestos anuales</SelectItem>
                                <SelectItem value="billing">Facturación</SelectItem>
                                <SelectItem value="payroll">Nómina</SelectItem>
                                <SelectItem value="other">Otros</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Asunto</label>
                        <input
                            className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FFE01B] bg-transparent"
                            placeholder="Escribe un título para tu consulta"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Mensaje</label>
                        <Textarea
                            placeholder="Describe tu consulta con el mayor detalle posible"
                            className="min-h-32"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button variant="default" className="bg-[#FFE01B] hover:bg-[#E5C800] text-black">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Consulta
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Consultas</CardTitle>
                    <CardDescription>Consultas realizadas previamente</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all">
                        <TabsList className="mb-4">
                            <TabsTrigger value="all">Todas</TabsTrigger>
                            <TabsTrigger value="pending">Pendientes</TabsTrigger>
                            <TabsTrigger value="answered">Respondidas</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="space-y-4">
                            {queries.map((query) => (
                                <Card key={query.id} className="border border-gray-200 dark:border-gray-800">
                                    <CardHeader className="flex flex-row items-start justify-between">
                                        <div>
                                            <CardTitle className="text-base">{query.title}</CardTitle>
                                            <CardDescription>
                                                {query.date} • {query.category}
                                            </CardDescription>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className={
                                                query.status === 'answered'
                                                    ? "border-green-500 text-green-500"
                                                    : "border-yellow-500 text-yellow-500"
                                            }
                                        >
                                            {query.status === 'answered' ? 'Respondida' : 'Pendiente'}
                                        </Badge>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="bg-gray-50 dark:bg-zinc-900 p-3 rounded-md">
                                            <p className="text-sm">{query.message}</p>
                                        </div>

                                        {query.response && (
                                            <div className="flex gap-3 mt-4">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={query.accountantAvatar} alt="Accountant" />
                                                    <AvatarFallback>{query.accountant?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md text-sm">
                                                    <div className="font-medium mb-1 text-blue-700 dark:text-blue-400">{query.accountant}</div>
                                                    <p>{query.response}</p>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                    {query.status === 'answered' && (
                                        <CardFooter>
                                            <Button variant="outline" size="sm" className="ml-auto">
                                                <MessageSquare className="h-4 w-4 mr-2" />
                                                Responder
                                            </Button>
                                        </CardFooter>
                                    )}
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value="pending" className="space-y-4">
                            {queries.filter(q => q.status === 'pending').map((query) => (
                                <Card key={query.id} className="border border-gray-200 dark:border-gray-800">
                                    <CardHeader className="flex flex-row items-start justify-between">
                                        <div>
                                            <CardTitle className="text-base">{query.title}</CardTitle>
                                            <CardDescription>
                                                {query.date} • {query.category}
                                            </CardDescription>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="border-yellow-500 text-yellow-500"
                                        >
                                            Pendiente
                                        </Badge>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="bg-gray-50 dark:bg-zinc-900 p-3 rounded-md">
                                            <p className="text-sm">{query.message}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value="answered" className="space-y-4">
                            {queries.filter(q => q.status === 'answered').map((query) => (
                                <Card key={query.id} className="border border-gray-200 dark:border-gray-800">
                                    <CardHeader className="flex flex-row items-start justify-between">
                                        <div>
                                            <CardTitle className="text-base">{query.title}</CardTitle>
                                            <CardDescription>
                                                {query.date} • {query.category}
                                            </CardDescription>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="border-green-500 text-green-500"
                                        >
                                            Respondida
                                        </Badge>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="bg-gray-50 dark:bg-zinc-900 p-3 rounded-md">
                                            <p className="text-sm">{query.message}</p>
                                        </div>

                                        <div className="flex gap-3 mt-4">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={query.accountantAvatar} alt="Accountant" />
                                                <AvatarFallback>{query.accountant?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md text-sm">
                                                <div className="font-medium mb-1 text-blue-700 dark:text-blue-400">{query.accountant}</div>
                                                <p>{query.response}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" size="sm" className="ml-auto">
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            Responder
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
} 