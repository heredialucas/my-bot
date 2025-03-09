import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { BarChart3, Calendar, Download, FileText, Printer, ChevronRight, BarChart2, PieChart, LineChart, Users } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";

export default function ReportsPage() {
    // Datos simulados
    const recentReports = [
        {
            id: 1,
            name: "Resumen de Actividad Mensual",
            date: "05/05/2025",
            type: "Sistema",
            format: "PDF",
            size: "1.2 MB",
            downloads: 12
        },
        {
            id: 2,
            name: "Desempeño de Contadores",
            date: "01/05/2025",
            type: "Recursos Humanos",
            format: "XLSX",
            size: "845 KB",
            downloads: 8
        },
        {
            id: 3,
            name: "Declaraciones F29 - Abril 2025",
            date: "30/04/2025",
            type: "Tributario",
            format: "PDF",
            size: "3.1 MB",
            downloads: 15
        },
        {
            id: 4,
            name: "Análisis de Clientes por Sector",
            date: "25/04/2025",
            type: "Estadístico",
            format: "XLSX",
            size: "1.8 MB",
            downloads: 6
        },
        {
            id: 5,
            name: "Auditoría de Cambios Críticos",
            date: "20/04/2025",
            type: "Seguridad",
            format: "PDF",
            size: "2.4 MB",
            downloads: 9
        },
    ];

    const reportTypes = [
        {
            id: 1,
            name: "Actividad del Sistema",
            description: "Resumen de todas las acciones realizadas en la plataforma",
            icon: BarChart2,
            frequency: "Diario, Semanal, Mensual"
        },
        {
            id: 2,
            name: "Desempeño de Contadores",
            description: "Análisis del rendimiento de cada contador, incluyendo clientes y documentos procesados",
            icon: Users,
            frequency: "Semanal, Mensual"
        },
        {
            id: 3,
            name: "Declaraciones Tributarias",
            description: "Resumen de todas las declaraciones procesadas por tipo y estado",
            icon: FileText,
            frequency: "Mensual, Trimestral"
        },
        {
            id: 4,
            name: "Análisis de Clientes",
            description: "Distribución de clientes por sector, régimen tributario y actividad",
            icon: PieChart,
            frequency: "Mensual, Trimestral"
        },
        {
            id: 5,
            name: "Auditoría de Seguridad",
            description: "Registro de cambios críticos, accesos y actividades sospechosas",
            icon: LineChart,
            frequency: "Diario, Semanal"
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Reportes</h1>
                <div className="flex items-center gap-3">
                    <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Mayo 2025
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <FileText className="h-4 w-4 mr-2" />
                        Generar Reporte
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reportes Generados</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-muted-foreground">
                            En los últimos 30 días
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Descargas Totales</CardTitle>
                        <Download className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">584</div>
                        <p className="text-xs text-muted-foreground">
                            +15% desde el mes anterior
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reportes Programados</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            Generación automática
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="recent">
                <TabsList>
                    <TabsTrigger value="recent">Reportes Recientes</TabsTrigger>
                    <TabsTrigger value="types">Tipos de Reportes</TabsTrigger>
                    <TabsTrigger value="scheduled">Reportes Programados</TabsTrigger>
                </TabsList>

                <TabsContent value="recent" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Reportes Recientes</CardTitle>
                            <CardDescription>
                                Últimos reportes generados en la plataforma
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Formato</TableHead>
                                            <TableHead>Tamaño</TableHead>
                                            <TableHead>Descargas</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentReports.map((report) => (
                                            <TableRow key={report.id}>
                                                <TableCell className="font-medium">{report.name}</TableCell>
                                                <TableCell>{report.date}</TableCell>
                                                <TableCell>{report.type}</TableCell>
                                                <TableCell>{report.format}</TableCell>
                                                <TableCell>{report.size}</TableCell>
                                                <TableCell>{report.downloads}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm">
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Descargar
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            <Printer className="h-4 w-4 mr-2" />
                                                            Imprimir
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex items-center justify-end space-x-2 py-4">
                                <div className="flex-1 text-sm text-muted-foreground">
                                    Mostrando <strong>5</strong> de <strong>128</strong> reportes
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

                <TabsContent value="types" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tipos de Reportes</CardTitle>
                            <CardDescription>
                                Reportes disponibles para generación
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4">
                                {reportTypes.map((type) => (
                                    <Card key={type.id} className="overflow-hidden">
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <div className="flex items-center gap-3 p-4 md:p-6 md:w-72 bg-muted">
                                                <div className="rounded-full bg-primary/10 p-2 flex items-center justify-center">
                                                    <type.icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <h3 className="font-medium text-lg">{type.name}</h3>
                                            </div>
                                            <div className="p-4 md:p-6 flex-1">
                                                <div className="space-y-2">
                                                    <p className="text-sm text-muted-foreground">{type.description}</p>
                                                    <div className="text-sm">
                                                        <span className="font-medium">Frecuencia:</span> {type.frequency}
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex gap-2">
                                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                        <FileText className="h-4 w-4 mr-2" />
                                                        Generar Ahora
                                                    </Button>
                                                    <Button variant="outline">
                                                        <Calendar className="h-4 w-4 mr-2" />
                                                        Programar
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="scheduled" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Reportes Programados</CardTitle>
                            <CardDescription>
                                Reportes configurados para generación automática
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="rounded-md border p-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h3 className="font-medium text-lg">Resumen de Actividad del Sistema</h3>
                                            <p className="text-sm text-muted-foreground">Reporte semanal automático - Todos los lunes a las 07:00</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <FileText className="h-4 w-4 mr-2" />
                                                Editar
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                                Cancelar
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm">
                                        <span className="text-muted-foreground">Próxima generación:</span> 22/05/2025
                                    </div>
                                </div>

                                <div className="rounded-md border p-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h3 className="font-medium text-lg">Desempeño de Contadores</h3>
                                            <p className="text-sm text-muted-foreground">Reporte mensual automático - Primer día del mes a las 08:00</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <FileText className="h-4 w-4 mr-2" />
                                                Editar
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                                Cancelar
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm">
                                        <span className="text-muted-foreground">Próxima generación:</span> 01/06/2025
                                    </div>
                                </div>

                                <div className="rounded-md border p-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h3 className="font-medium text-lg">Análisis de Clientes por Sector</h3>
                                            <p className="text-sm text-muted-foreground">Reporte trimestral automático - Primer día del trimestre a las 09:00</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <FileText className="h-4 w-4 mr-2" />
                                                Editar
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                                Cancelar
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm">
                                        <span className="text-muted-foreground">Próxima generación:</span> 01/07/2025
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Programar Nuevo Reporte
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>Vista Previa de Reporte</CardTitle>
                    <CardDescription>
                        Previsualización del reporte de actividad del sistema
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="h-[400px] flex flex-col items-center justify-center bg-muted/20 border-t p-6 text-center">
                        <BarChart3 className="h-16 w-16 text-blue-500 mb-4" />
                        <h3 className="text-lg font-medium">Previsualización de Gráficos</h3>
                        <p className="text-sm text-muted-foreground mt-2 max-w-md">
                            Aquí se mostraría una previsualización del reporte seleccionado con gráficos,
                            tablas y datos relevantes basados en las métricas del sistema.
                        </p>
                        <div className="mt-6 flex gap-2">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <FileText className="h-4 w-4 mr-2" />
                                Ver Reporte Completo
                            </Button>
                            <Button variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Descargar PDF
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 