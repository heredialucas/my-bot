import { Card, CardContent, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { ArrowDownToLine, FileText, Search, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import Link from "next/link";

export default function MonthlyTaxesPage() {
    const currentYear = new Date().getFullYear();

    // Simulación de datos
    const monthlyReports = [
        { month: 'Enero', year: 2025, status: 'completed', declaration: 'F29', amount: 125680, date: '10/02/2025' },
        { month: 'Febrero', year: 2025, status: 'completed', declaration: 'F29', amount: 142500, date: '10/03/2025' },
        { month: 'Marzo', year: 2025, status: 'completed', declaration: 'F29', amount: 131200, date: '10/04/2025' },
        { month: 'Abril', year: 2025, status: 'pending', declaration: 'F29', amount: 138750, date: '10/05/2025' },
        { month: 'Mayo', year: 2025, status: 'pending', declaration: 'F29', amount: 145900, date: '10/06/2025' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Impuestos Mensuales</h1>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>2025</span>
                    </Button>

                    <div className="flex items-center">
                        <Button variant="ghost" size="sm">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="mx-2 text-sm font-medium">May 2025</span>
                        <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Impuesto a Pagar (IVA)</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$145.900</div>
                        <p className="text-xs text-muted-foreground">Vence el 12/06/2025</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">PPM a Pagar</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$92.000</div>
                        <p className="text-xs text-muted-foreground">Vence el 12/06/2025</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total a Pagar</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$237.900</div>
                        <p className="text-xs text-muted-foreground">Mayo 2025</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Declaraciones</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                            <div className="rounded-md border px-3 py-1 flex items-center gap-2">
                                <Search className="h-4 w-4 text-gray-500" />
                                <input
                                    className="border-0 bg-transparent text-sm focus:outline-none"
                                    placeholder="Buscar..."
                                />
                            </div>

                            <Select defaultValue="2025">
                                <SelectTrigger className="w-28">
                                    <SelectValue placeholder="Año" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2023">2023</SelectItem>
                                    <SelectItem value="2024">2024</SelectItem>
                                    <SelectItem value="2025">2025</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button variant="outline" size="sm">
                            <ArrowDownToLine className="h-4 w-4 mr-2" />
                            Exportar
                        </Button>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Período</TableHead>
                                    <TableHead>Formulario</TableHead>
                                    <TableHead>Monto</TableHead>
                                    <TableHead>Fecha Pago</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Acción</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {monthlyReports.map((report) => (
                                    <TableRow key={`${report.month}-${report.year}`}>
                                        <TableCell className="font-medium">{report.month} {report.year}</TableCell>
                                        <TableCell>{report.declaration}</TableCell>
                                        <TableCell>${report.amount.toLocaleString()}</TableCell>
                                        <TableCell>{report.date}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    report.status === 'completed'
                                                        ? "border-green-500 text-green-500"
                                                        : "border-yellow-500 text-yellow-500"
                                                }
                                            >
                                                {report.status === 'completed' ? 'Pagado' : 'Pendiente'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                asChild
                                            >
                                                <Link href={`/client/monthly-taxes/${report.month.toLowerCase()}-${report.year}`}>
                                                    <Search className="h-4 w-4" />
                                                    <span className="sr-only">Ver</span>
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
                    <CardTitle>Resumen Anual</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="iva">
                        <TabsList className="mb-4">
                            <TabsTrigger value="iva">IVA</TabsTrigger>
                            <TabsTrigger value="ppm">PPM</TabsTrigger>
                            <TabsTrigger value="total">Total</TabsTrigger>
                        </TabsList>

                        <TabsContent value="iva">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">IVA Total Año</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$683.000</div>
                                        <p className="text-xs text-muted-foreground">Acumulado 2025</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Promedio Mensual</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$136.600</div>
                                        <p className="text-xs text-muted-foreground">5 meses</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Tendencia</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-green-600">↗ 3.2%</div>
                                        <p className="text-xs text-muted-foreground">vs mes anterior</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="ppm">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">PPM Total Año</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$460.000</div>
                                        <p className="text-xs text-muted-foreground">Acumulado 2025</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Promedio Mensual</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$92.000</div>
                                        <p className="text-xs text-muted-foreground">5 meses</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Tasa Actual</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">0.25%</div>
                                        <p className="text-xs text-muted-foreground">Sin cambios</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="total">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$1.143.000</div>
                                        <p className="text-xs text-muted-foreground">Acumulado 2025</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Promedio Mensual</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$228.600</div>
                                        <p className="text-xs text-muted-foreground">5 meses</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Proyección Anual</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$2.743.200</div>
                                        <p className="text-xs text-muted-foreground">12 meses</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
} 