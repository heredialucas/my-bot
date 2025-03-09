import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { FileText, User, Calendar, Download, FileIcon } from "lucide-react";

export default function TaxProfilePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Perfil Tributario</h1>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Generar Reporte
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">
                            Con perfiles tributarios activos
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Declaraciones Mensuales</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">144</div>
                        <p className="text-xs text-muted-foreground">
                            Presentadas en el año actual
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Documentos Tributarios</CardTitle>
                        <FileIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,248</div>
                        <p className="text-xs text-muted-foreground">
                            Documentos procesados
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Gestión Tributaria</CardTitle>
                    <CardDescription>
                        Administra los perfiles tributarios de tus clientes
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="regimes">
                        <TabsList className="mb-4">
                            <TabsTrigger value="regimes">Regímenes Tributarios</TabsTrigger>
                            <TabsTrigger value="certificates">Certificados</TabsTrigger>
                            <TabsTrigger value="obligations">Obligaciones</TabsTrigger>
                        </TabsList>
                        <TabsContent value="regimes">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Régimen</TableHead>
                                        <TableHead>Descripción</TableHead>
                                        <TableHead>Clientes</TableHead>
                                        <TableHead>Tasa Impuesto</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Régimen Semi Integrado</TableCell>
                                        <TableCell>Régimen general Art. 14 letra A</TableCell>
                                        <TableCell>14</TableCell>
                                        <TableCell>27%</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Régimen Pro-Pyme</TableCell>
                                        <TableCell>Régimen de transparencia tributaria Art. 14 letra D</TableCell>
                                        <TableCell>10</TableCell>
                                        <TableCell>25%</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TabsContent>
                        <TabsContent value="certificates">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <FileText className="h-8 w-8 text-green-500" />
                                        <div>
                                            <h3 className="font-medium">Certificado de Situación Tributaria</h3>
                                            <p className="text-sm text-muted-foreground">Informa el estado tributario de una empresa o persona</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-2" />
                                        Solicitar
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <FileText className="h-8 w-8 text-green-500" />
                                        <div>
                                            <h3 className="font-medium">Certificado de Renta</h3>
                                            <p className="text-sm text-muted-foreground">Informa los ingresos declarados en un periodo fiscal</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-2" />
                                        Solicitar
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <FileText className="h-8 w-8 text-green-500" />
                                        <div>
                                            <h3 className="font-medium">Certificado de Deudas Tributarias</h3>
                                            <p className="text-sm text-muted-foreground">Informa si existen deudas fiscales pendientes</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-2" />
                                        Solicitar
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="obligations">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Obligación</TableHead>
                                        <TableHead>Frecuencia</TableHead>
                                        <TableHead>Próximo Vencimiento</TableHead>
                                        <TableHead>Clientes Afectados</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Declaración de IVA (F29)</TableCell>
                                        <TableCell>Mensual</TableCell>
                                        <TableCell>12/06/2025</TableCell>
                                        <TableCell>24</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Declaración Jurada 1879</TableCell>
                                        <TableCell>Anual</TableCell>
                                        <TableCell>20/03/2026</TableCell>
                                        <TableCell>18</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Declaración de Renta (F22)</TableCell>
                                        <TableCell>Anual</TableCell>
                                        <TableCell>30/04/2026</TableCell>
                                        <TableCell>24</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
} 