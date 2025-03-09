import { Card, CardContent, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { ArrowDownToLine, FileText, Users, DollarSign, Building, Download, Eye } from "lucide-react";
import Link from "next/link";

export default function HumanResourcesPage() {
    // Datos simulados
    const employees = [
        { id: 1, name: "Ana Rodríguez", position: "Gerente Comercial", salary: 2500000, status: "active", hiringDate: "01/03/2022", department: "Comercial" },
        { id: 2, name: "Carlos Morales", position: "Desarrollador Senior", salary: 2100000, status: "active", hiringDate: "15/05/2023", department: "TI" },
        { id: 3, name: "María González", position: "Asistente Administrativo", salary: 850000, status: "active", hiringDate: "10/01/2024", department: "Administración" },
        { id: 4, name: "Juan Pérez", position: "Contador", salary: 1800000, status: "active", hiringDate: "20/06/2021", department: "Finanzas" },
        { id: 5, name: "Lucía Vega", position: "Diseñadora UX", salary: 1650000, status: "inactive", hiringDate: "05/04/2022", department: "TI" },
    ];

    const payrolls = [
        { id: "P202505", month: "Mayo", year: 2025, totalGross: 8900000, totalNet: 7300000, status: "pending", dueDate: "30/05/2025" },
        { id: "P202504", month: "Abril", year: 2025, totalGross: 8900000, totalNet: 7300000, status: "completed", dueDate: "30/04/2025" },
        { id: "P202503", month: "Marzo", year: 2025, totalGross: 8900000, totalNet: 7300000, status: "completed", dueDate: "30/03/2025" },
        { id: "P202502", month: "Febrero", year: 2025, totalGross: 8450000, totalNet: 6900000, status: "completed", dueDate: "28/02/2025" },
        { id: "P202501", month: "Enero", year: 2025, totalGross: 8450000, totalNet: 6900000, status: "completed", dueDate: "30/01/2025" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Recursos Humanos</h1>

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
                        <CardTitle className="text-sm font-medium">Total Empleados</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">4 activos, 1 inactivo</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Nómina Mensual</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$7.300.000</div>
                        <p className="text-xs text-muted-foreground">Monto neto</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Áreas de trabajo</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="employees">
                <TabsList className="mb-4">
                    <TabsTrigger value="employees">Empleados</TabsTrigger>
                    <TabsTrigger value="payroll">Nóminas</TabsTrigger>
                </TabsList>

                <TabsContent value="employees">
                    <Card>
                        <CardHeader>
                            <CardTitle>Lista de Empleados</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Cargo</TableHead>
                                            <TableHead>Departamento</TableHead>
                                            <TableHead>Fecha Contrato</TableHead>
                                            <TableHead>Sueldo</TableHead>
                                            <TableHead>Estado</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {employees.map((employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell className="font-medium">{employee.name}</TableCell>
                                                <TableCell>{employee.position}</TableCell>
                                                <TableCell>{employee.department}</TableCell>
                                                <TableCell>{employee.hiringDate}</TableCell>
                                                <TableCell>${employee.salary.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            employee.status === 'active'
                                                                ? "border-green-500 text-green-500"
                                                                : "border-red-500 text-red-500"
                                                        }
                                                    >
                                                        {employee.status === 'active' ? 'Activo' : 'Inactivo'}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payroll">
                    <Card>
                        <CardHeader>
                            <CardTitle>Historial de Nóminas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Período</TableHead>
                                            <TableHead>Total Bruto</TableHead>
                                            <TableHead>Total Neto</TableHead>
                                            <TableHead>Fecha Pago</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {payrolls.map((payroll) => (
                                            <TableRow key={payroll.id}>
                                                <TableCell className="font-medium">{payroll.id}</TableCell>
                                                <TableCell>{payroll.month} {payroll.year}</TableCell>
                                                <TableCell>${payroll.totalGross.toLocaleString()}</TableCell>
                                                <TableCell>${payroll.totalNet.toLocaleString()}</TableCell>
                                                <TableCell>{payroll.dueDate}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            payroll.status === 'completed'
                                                                ? "border-green-500 text-green-500"
                                                                : "border-yellow-500 text-yellow-500"
                                                        }
                                                    >
                                                        {payroll.status === 'completed' ? 'Pagada' : 'Pendiente'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            asChild
                                                        >
                                                            <Link href={`/client/human-resources/payroll/${payroll.id}`}>
                                                                <Eye className="h-4 w-4" />
                                                                <span className="sr-only">Ver</span>
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                            <span className="sr-only">Descargar</span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Documentos Laborales</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center p-3 border rounded-md border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <p className="font-medium">Libro de Remuneraciones</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Actualizado: Mayo 2025</p>
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
                                            <p className="font-medium">Certificados de Cotizaciones</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Actualizado: Mayo 2025</p>
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
                                            <p className="font-medium">Contratos Laborales</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Actualizado: Mayo 2025</p>
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
                                <CardTitle className="text-lg">Obligaciones Laborales</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center p-3 border rounded-md border-gray-200 dark:border-gray-800">
                                    <div className="flex-1">
                                        <p className="font-medium">Pago PREVIRED</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Vence: 10/06/2025</p>
                                    </div>
                                    <Badge variant="outline" className="border-green-500 text-green-500">
                                        Al día
                                    </Badge>
                                </div>

                                <div className="flex justify-between items-center p-3 border rounded-md border-gray-200 dark:border-gray-800">
                                    <div className="flex-1">
                                        <p className="font-medium">Pago Mutual de Seguridad</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Vence: 20/06/2025</p>
                                    </div>
                                    <Badge variant="outline" className="border-green-500 text-green-500">
                                        Al día
                                    </Badge>
                                </div>

                                <div className="flex justify-between items-center p-3 border rounded-md border-gray-200 dark:border-gray-800">
                                    <div className="flex-1">
                                        <p className="font-medium">Declaración Jurada Anual</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Vence: 19/03/2026</p>
                                    </div>
                                    <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                                        Próximamente
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
} 