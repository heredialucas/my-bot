import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { ArrowDownToLine, FileText, Calculator, Download, Calendar, BarChart } from "lucide-react";
import Link from "next/link";

export default function AnnualTaxesPage() {
    const years = [2025, 2024, 2023, 2022, 2021];
    const currentYear = 2025;

    // Datos simulados
    const annualDeclarations = [
        {
            year: 2024,
            status: "completed",
            declarationDate: "25/04/2025",
            taxableIncome: 120450000,
            taxAmount: 32521500,
            formNumber: "22"
        },
        {
            year: 2023,
            status: "completed",
            declarationDate: "22/04/2024",
            taxableIncome: 98760000,
            taxAmount: 26665200,
            formNumber: "22"
        },
        {
            year: 2022,
            status: "completed",
            declarationDate: "20/04/2023",
            taxableIncome: 85420000,
            taxAmount: 23063400,
            formNumber: "22"
        },
        {
            year: 2021,
            status: "completed",
            declarationDate: "18/04/2022",
            taxableIncome: 72340000,
            taxAmount: 19531800,
            formNumber: "22"
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Impuestos Anuales</h1>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                        <ArrowDownToLine className="h-4 w-4 mr-2" />
                        Exportar
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Año Tributario Actual</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2025</div>
                        <p className="text-xs text-muted-foreground">Correspondiente a operaciones de 2024</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Impuesto a la Renta</CardTitle>
                        <Calculator className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$32.521.500</div>
                        <p className="text-xs text-muted-foreground">Último año tributario</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Variación Anual</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">+21.9%</div>
                        <p className="text-xs text-muted-foreground">Respecto al año anterior</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Declaraciones Anuales</CardTitle>
                    <CardDescription>Historial de declaraciones anuales de impuestos</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="2024">
                        <TabsList className="mb-4">
                            {years.map((year) => (
                                <TabsTrigger key={year} value={year.toString()}>
                                    {year}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {years.map((year) => (
                            <TabsContent key={year} value={year.toString()}>
                                {year === currentYear ? (
                                    <div className="text-center p-8 border border-dashed rounded-lg border-gray-300 dark:border-gray-700">
                                        <h3 className="text-lg font-medium mb-2">Declaración Anual 2025</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                                            La declaración de impuestos para el año tributario 2025 estará disponible en abril de 2026.
                                        </p>
                                        <Button variant="default" className="bg-[#FFE01B] hover:bg-[#E5C800] text-black">
                                            <Calculator className="h-4 w-4 mr-2" />
                                            Simulador Tributario
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Año Tributario</TableHead>
                                                    <TableHead>Formulario</TableHead>
                                                    <TableHead>Fecha Declaración</TableHead>
                                                    <TableHead>Renta Imponible</TableHead>
                                                    <TableHead>Impuesto</TableHead>
                                                    <TableHead>Estado</TableHead>
                                                    <TableHead className="text-right">Acciones</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {annualDeclarations
                                                    .filter(decl => decl.year.toString() === year.toString())
                                                    .map((declaration) => (
                                                        <TableRow key={declaration.year}>
                                                            <TableCell className="font-medium">{declaration.year}</TableCell>
                                                            <TableCell>F-{declaration.formNumber}</TableCell>
                                                            <TableCell>{declaration.declarationDate}</TableCell>
                                                            <TableCell>${declaration.taxableIncome.toLocaleString()}</TableCell>
                                                            <TableCell>${declaration.taxAmount.toLocaleString()}</TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant="outline"
                                                                    className="border-green-500 text-green-500"
                                                                >
                                                                    Presentada
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                >
                                                                    <Download className="h-4 w-4 mr-2" />
                                                                    Descargar
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>

                                        <div className="p-4 bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-gray-800">
                                            <h4 className="font-medium mb-2">Desglose Tributario {year}</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div className="p-3 bg-white dark:bg-zinc-800 rounded border border-gray-200 dark:border-gray-700">
                                                    <div className="text-gray-500 dark:text-gray-400">Ingresos Brutos</div>
                                                    <div className="font-bold mt-1">
                                                        ${(annualDeclarations.find(d => d.year === year)?.taxableIncome || 0).toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className="p-3 bg-white dark:bg-zinc-800 rounded border border-gray-200 dark:border-gray-700">
                                                    <div className="text-gray-500 dark:text-gray-400">PPM Pagados</div>
                                                    <div className="font-bold mt-1">
                                                        ${Math.round((annualDeclarations.find(d => d.year === year)?.taxAmount || 0) * 0.85).toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className="p-3 bg-white dark:bg-zinc-800 rounded border border-gray-200 dark:border-gray-700">
                                                    <div className="text-gray-500 dark:text-gray-400">Pago Final</div>
                                                    <div className="font-bold mt-1">
                                                        ${Math.round((annualDeclarations.find(d => d.year === year)?.taxAmount || 0) * 0.15).toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Documentos Tributarios</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center p-3 border rounded-md border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="font-medium">Certificado de Situación Tributaria</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Actualizado: 10/05/2025</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex justify-between items-center p-3 border rounded-md border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="font-medium">Propuesta F22 (2024)</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Emitido: 01/04/2025</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex justify-between items-center p-3 border rounded-md border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="font-medium">Certificado de Exención</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Emitido: 15/03/2025</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Calendario Tributario</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center p-3 border rounded-md border-gray-200 dark:border-gray-800">
                            <div className="flex-1">
                                <p className="font-medium">Declaración DJ 1879</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Vence: 23/03/2026</p>
                            </div>
                            <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                                Próximamente
                            </Badge>
                        </div>

                        <div className="flex justify-between items-center p-3 border rounded-md border-gray-200 dark:border-gray-800">
                            <div className="flex-1">
                                <p className="font-medium">Declaración DJ 1887</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Vence: 19/03/2026</p>
                            </div>
                            <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                                Próximamente
                            </Badge>
                        </div>

                        <div className="flex justify-between items-center p-3 border rounded-md border-gray-200 dark:border-gray-800">
                            <div className="flex-1">
                                <p className="font-medium">Declaración Renta F22</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Vence: 30/04/2026</p>
                            </div>
                            <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                                Próximamente
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 