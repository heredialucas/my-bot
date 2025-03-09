import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Input } from "@repo/design-system/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Badge } from "@repo/design-system/components/ui/badge";
import { BookOpen, Download, Search, Clock, BookMarked, FileText } from "lucide-react";
import Link from "next/link";

export default function GuidesPage() {
    // Datos simulados de guías
    const guides = [
        {
            id: "G001",
            title: "Guía de facturación electrónica",
            category: "Facturación",
            readTime: "10 min",
            date: "15/04/2025",
            description: "Aprende a emitir facturas electrónicas correctamente cumpliendo con la normativa vigente.",
            downloadUrl: "/documents/guides/facturacion-electronica.pdf"
        },
        {
            id: "G002",
            title: "Cómo declarar correctamente el F29",
            category: "Impuestos Mensuales",
            readTime: "15 min",
            date: "10/03/2025",
            description: "Guía detallada para completar el formulario 29 de declaración mensual de IVA y PPM.",
            downloadUrl: "/documents/guides/declaracion-f29.pdf"
        },
        {
            id: "G003",
            title: "Regímenes tributarios en Chile",
            category: "Impuestos",
            readTime: "20 min",
            date: "05/02/2025",
            description: "Comparativa de los distintos regímenes tributarios disponibles para empresas en Chile.",
            downloadUrl: "/documents/guides/regimenes-tributarios.pdf"
        },
        {
            id: "G004",
            title: "Remuneraciones: Guía para empleadores",
            category: "RRHH",
            readTime: "25 min",
            date: "20/01/2025",
            description: "Todo lo que necesitas saber sobre la gestión de remuneraciones y obligaciones laborales.",
            downloadUrl: "/documents/guides/remuneraciones.pdf"
        },
    ];

    // Datos de tutoriales en video
    const videoTutorials = [
        {
            id: "V001",
            title: "Tutorial: Emisión de facturas electrónicas",
            category: "Facturación",
            duration: "8:45",
            date: "25/04/2025",
            thumbnail: "/images/tutorials/facturacion.jpg",
            videoUrl: "/videos/facturacion-electronica.mp4"
        },
        {
            id: "V002",
            title: "Cómo completar paso a paso el F29",
            category: "Impuestos Mensuales",
            duration: "12:30",
            date: "15/03/2025",
            thumbnail: "/images/tutorials/f29.jpg",
            videoUrl: "/videos/formulario-f29.mp4"
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Guías</h1>

                <div className="rounded-md border px-3 py-1 flex items-center gap-2 w-full md:w-64">
                    <Search className="h-4 w-4 text-gray-500" />
                    <input
                        className="border-0 bg-transparent text-sm focus:outline-none w-full"
                        placeholder="Buscar guías y tutoriales..."
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Guías Disponibles</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Documentos de ayuda</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tutoriales en Video</CardTitle>
                        <BookMarked className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">Videos explicativos</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Última Actualización</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15/04/2025</div>
                        <p className="text-xs text-muted-foreground">Guías actualizadas</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="guides">
                <TabsList className="mb-4">
                    <TabsTrigger value="guides">Guías PDF</TabsTrigger>
                    <TabsTrigger value="videos">Tutoriales en Video</TabsTrigger>
                    <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
                </TabsList>

                <TabsContent value="guides">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {guides.map((guide) => (
                            <Card key={guide.id} className="border border-gray-200 dark:border-gray-800 hover:border-[#FFE01B] transition-colors">
                                <CardHeader>
                                    <div className="flex justify-between">
                                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900">
                                            {guide.category}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                            <Clock className="h-3 w-3" />
                                            <span>{guide.readTime}</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-base mt-2">{guide.title}</CardTitle>
                                    <CardDescription>{guide.date}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {guide.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button variant="default" size="sm" className="bg-[#FFE01B] hover:bg-[#E5C800] text-black">
                                        <Download className="h-4 w-4 mr-2" />
                                        Descargar PDF
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="videos">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {videoTutorials.map((video) => (
                            <Card key={video.id} className="border border-gray-200 dark:border-gray-800 hover:border-[#FFE01B] transition-colors">
                                <div className="relative pb-[56.25%] bg-gray-100 dark:bg-gray-800">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                                            <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                        </div>
                                    </div>
                                </div>
                                <CardHeader>
                                    <div className="flex justify-between">
                                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900">
                                            {video.category}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                            <Clock className="h-3 w-3" />
                                            <span>{video.duration}</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-base mt-2">{video.title}</CardTitle>
                                    <CardDescription>{video.date}</CardDescription>
                                </CardHeader>
                                <CardFooter className="flex justify-end">
                                    <Button variant="default" size="sm" className="bg-[#FFE01B] hover:bg-[#E5C800] text-black">
                                        Ver Tutorial
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="faq">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preguntas Frecuentes</CardTitle>
                            <CardDescription>Respuestas a dudas comunes sobre temas tributarios</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                                <h3 className="font-medium mb-2">¿Cuándo debo declarar el IVA mensual?</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    La declaración y pago del IVA mensual (F29) debe realizarse hasta el día 12 de cada mes para contribuyentes electrónicos. Si el plazo cae en sábado, domingo o festivo, se extiende hasta el siguiente día hábil.
                                </p>
                            </div>

                            <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                                <h3 className="font-medium mb-2">¿Qué es el PPM y cómo se calcula?</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    El Pago Provisional Mensual (PPM) es un anticipo a cuenta del impuesto a la renta. Se calcula aplicando un porcentaje sobre los ingresos brutos mensuales. Este porcentaje se ajusta anualmente según los resultados de la declaración anual.
                                </p>
                            </div>

                            <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                                <h3 className="font-medium mb-2">¿Cuáles son las diferencias entre los regímenes tributarios?</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Existen principalmente tres regímenes: 1) Régimen General Semi Integrado (Art. 14A), con tasa de 27% y crédito parcial; 2) Régimen Pro-Pyme (Art. 14D), con tasa reducida de 25% e integración total; y 3) Régimen de Renta Presunta, para actividades específicas con facturación limitada.
                                </p>
                            </div>

                            <div className="pb-4">
                                <h3 className="font-medium mb-2">¿Cómo emito una factura electrónica?</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Puede emitir facturas electrónicas a través del sistema gratuito del SII o utilizando un software certificado. Para emitir una factura necesitará ingresar los datos del receptor, detalles de los productos/servicios, valores netos, IVA y total. El documento electrónico debe ser enviado al SII y al receptor.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 