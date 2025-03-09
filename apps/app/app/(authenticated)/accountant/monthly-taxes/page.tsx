import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { FileText, Calendar, Download, ChevronRight, Filter, Plus } from "lucide-react";
import Link from "next/link";

export default function MonthlyTaxesPage() {
    // Datos simulados
    const taxes = [
        {
            id: 1,
            client: "Empresa ABC SpA",
            rut: "76.543.210-K",
            form: "F29",
            amount: 145900,
            dueDate: "12/06/2025",
            status: "pending"
        },
        {
            id: 2,
            client: "Comercial XYZ Ltda.",
            rut: "77.665.544-3",
            form: "F29",
            amount: 120500,
            dueDate: "12/06/2025",
            status: "pending"
        },
        {
            id: 3,
            client: "Constructora El Bloque",
            rut: "78.901.234-5",
            form: "F29",
            amount: 301350,
            dueDate: "12/05/2025",
            status: "completed"
        },
        {
            id: 4,
            client: "Servicios Tecnológicos S.A.",
            rut: "79.123.456-7",
            form: "F29",
            amount: 98250,
            dueDate: "12/05/2025",
            status: "completed"
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Impuestos Mensuales</h1>
                <div className="flex items-center gap-3">
                    <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Mayo 2025
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Declaración
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Declaraciones Pendientes</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            Vencen el 12/06/2025
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monto Total (F29)</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$665.000</div>
                        <p className="text-xs text-muted-foreground">
                            Mayo 2025
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completadas</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">16</div>
                        <p className="text-xs text-muted-foreground">
                            Último mes
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Declaraciones Mensuales</CardTitle>
                            <CardDescription>
                                Gestiona las declaraciones mensuales de tus clientes
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filtrar
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="pending">
                        <TabsList className="mb-4">
                            <TabsTrigger value="pending">Pendientes</TabsTrigger>
                            <TabsTrigger value="completed">Completadas</TabsTrigger>
                            <TabsTrigger value="all">Todas</TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending">
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>RUT</TableHead>
                                            <TableHead>Formulario</TableHead>
                                            <TableHead>Monto</TableHead>
                                            <TableHead>Vencimiento</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {taxes.filter(tax => tax.status === 'pending').map((tax) => (
                                            <TableRow key={tax.id}>
                                                <TableCell className="font-medium">{tax.client}</TableCell>
                                                <TableCell>{tax.rut}</TableCell>
                                                <TableCell>{tax.form}</TableCell>
                                                <TableCell>${tax.amount.toLocaleString()}</TableCell>
                                                <TableCell>{tax.dueDate}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-amber-100 text-amber-800 border-amber-200"
                                                    >
                                                        Pendiente
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm">
                                                            <Download className="h-4 w-4 mr-2" />
                                                            F29
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link href={`/accountant/monthly-taxes/${tax.id}`}>
                                                                <ChevronRight className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="completed">
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>RUT</TableHead>
                                            <TableHead>Formulario</TableHead>
                                            <TableHead>Monto</TableHead>
                                            <TableHead>Vencimiento</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {taxes.filter(tax => tax.status === 'completed').map((tax) => (
                                            <TableRow key={tax.id}>
                                                <TableCell className="font-medium">{tax.client}</TableCell>
                                                <TableCell>{tax.rut}</TableCell>
                                                <TableCell>{tax.form}</TableCell>
                                                <TableCell>${tax.amount.toLocaleString()}</TableCell>
                                                <TableCell>{tax.dueDate}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-green-100 text-green-800 border-green-200"
                                                    >
                                                        Completada
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm">
                                                            <Download className="h-4 w-4 mr-2" />
                                                            F29
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link href={`/accountant/monthly-taxes/${tax.id}`}>
                                                                <ChevronRight className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="all">
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>RUT</TableHead>
                                            <TableHead>Formulario</TableHead>
                                            <TableHead>Monto</TableHead>
                                            <TableHead>Vencimiento</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {taxes.map((tax) => (
                                            <TableRow key={tax.id}>
                                                <TableCell className="font-medium">{tax.client}</TableCell>
                                                <TableCell>{tax.rut}</TableCell>
                                                <TableCell>{tax.form}</TableCell>
                                                <TableCell>${tax.amount.toLocaleString()}</TableCell>
                                                <TableCell>{tax.dueDate}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={tax.status === 'completed'
                                                            ? "bg-green-100 text-green-800 border-green-200"
                                                            : "bg-amber-100 text-amber-800 border-amber-200"
                                                        }
                                                    >
                                                        {tax.status === 'completed' ? 'Completada' : 'Pendiente'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm">
                                                            <Download className="h-4 w-4 mr-2" />
                                                            F29
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link href={`/accountant/monthly-taxes/${tax.id}`}>
                                                                <ChevronRight className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
} 