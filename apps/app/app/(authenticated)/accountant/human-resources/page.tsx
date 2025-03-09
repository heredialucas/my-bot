import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Users, FileText, Download, ChevronRight, Filter, Plus, UserPlus, FileCheck } from "lucide-react";
import Link from "next/link";

export default function HumanResourcesPage() {
    // Datos simulados
    const employees = [
        {
            id: 1,
            name: "Juan Pérez",
            rut: "12.345.678-9",
            position: "Gerente Comercial",
            company: "Empresa ABC SpA",
            contractType: "Indefinido",
            salary: 1800000,
            status: "active"
        },
        {
            id: 2,
            name: "María González",
            rut: "14.567.890-1",
            position: "Contador",
            company: "Empresa ABC SpA",
            contractType: "Indefinido",
            salary: 1500000,
            status: "active"
        },
        {
            id: 3,
            name: "Pedro Soto",
            rut: "16.789.012-3",
            position: "Vendedor",
            company: "Comercial XYZ Ltda.",
            contractType: "Plazo Fijo",
            salary: 950000,
            status: "active"
        },
        {
            id: 4,
            name: "Ana Muñoz",
            rut: "18.901.234-5",
            position: "Asistente Administrativo",
            company: "Servicios Tecnológicos S.A.",
            contractType: "Indefinido",
            salary: 850000,
            status: "inactive"
        },
    ];

    const payrolls = [
        {
            id: 1,
            month: "Mayo 2025",
            company: "Empresa ABC SpA",
            employees: 12,
            totalGross: 18500000,
            totalNet: 14800000,
            status: "pending"
        },
        {
            id: 2,
            month: "Mayo 2025",
            company: "Comercial XYZ Ltda.",
            employees: 8,
            totalGross: 9200000,
            totalNet: 7360000,
            status: "pending"
        },
        {
            id: 3,
            month: "Abril 2025",
            company: "Empresa ABC SpA",
            employees: 12,
            totalGross: 18500000,
            totalNet: 14800000,
            status: "completed"
        },
        {
            id: 4,
            month: "Abril 2025",
            company: "Comercial XYZ Ltda.",
            employees: 8,
            totalGross: 9200000,
            totalNet: 7360000,
            status: "completed"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Recursos Humanos</h1>
                <div className="flex items-center gap-3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Nuevo Empleado
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
                        <div className="text-2xl font-bold">42</div>
                        <p className="text-xs text-muted-foreground">
                            En 5 empresas
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Liquidaciones Pendientes</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            Mayo 2025
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Contratos por Renovar</CardTitle>
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">
                            Próximos 30 días
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="payrolls">
                <TabsList className="mb-4">
                    <TabsTrigger value="payrolls">Liquidaciones</TabsTrigger>
                    <TabsTrigger value="employees">Empleados</TabsTrigger>
                    <TabsTrigger value="contracts">Contratos</TabsTrigger>
                </TabsList>

                <TabsContent value="payrolls">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Liquidaciones de Sueldo</CardTitle>
                                    <CardDescription>
                                        Gestiona las liquidaciones de sueldo de tus clientes
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filtrar
                                    </Button>
                                    <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Nueva Liquidación
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Mes</TableHead>
                                            <TableHead>Empresa</TableHead>
                                            <TableHead>Empleados</TableHead>
                                            <TableHead>Total Bruto</TableHead>
                                            <TableHead>Total Líquido</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {payrolls.map((payroll) => (
                                            <TableRow key={payroll.id}>
                                                <TableCell>{payroll.month}</TableCell>
                                                <TableCell className="font-medium">{payroll.company}</TableCell>
                                                <TableCell>{payroll.employees}</TableCell>
                                                <TableCell>${payroll.totalGross.toLocaleString()}</TableCell>
                                                <TableCell>${payroll.totalNet.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={payroll.status === 'completed'
                                                            ? "bg-green-100 text-green-800 border-green-200"
                                                            : "bg-amber-100 text-amber-800 border-amber-200"
                                                        }
                                                    >
                                                        {payroll.status === 'completed' ? 'Completada' : 'Pendiente'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm">
                                                            <Download className="h-4 w-4 mr-2" />
                                                            PDF
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link href={`/accountant/human-resources/payrolls/${payroll.id}`}>
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
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="employees">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Empleados</CardTitle>
                                    <CardDescription>
                                        Gestiona los empleados de tus clientes
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filtrar
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>RUT</TableHead>
                                            <TableHead>Cargo</TableHead>
                                            <TableHead>Empresa</TableHead>
                                            <TableHead>Tipo Contrato</TableHead>
                                            <TableHead>Sueldo Base</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {employees.map((employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell className="font-medium">{employee.name}</TableCell>
                                                <TableCell>{employee.rut}</TableCell>
                                                <TableCell>{employee.position}</TableCell>
                                                <TableCell>{employee.company}</TableCell>
                                                <TableCell>{employee.contractType}</TableCell>
                                                <TableCell>${employee.salary.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={employee.status === 'active'
                                                            ? "bg-green-100 text-green-800 border-green-200"
                                                            : "bg-red-100 text-red-800 border-red-200"
                                                        }
                                                    >
                                                        {employee.status === 'active' ? 'Activo' : 'Inactivo'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={`/accountant/human-resources/employees/${employee.id}`}>
                                                            <ChevronRight className="h-4 w-4" />
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
                </TabsContent>

                <TabsContent value="contracts">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Contratos</CardTitle>
                                    <CardDescription>
                                        Gestiona los contratos de trabajo
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filtrar
                                    </Button>
                                    <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Nuevo Contrato
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center p-12">
                                <div className="text-center">
                                    <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h3 className="mt-4 text-lg font-medium">No hay contratos por renovar</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Todos los contratos están al día. Puedes crear un nuevo contrato o revisar los existentes.
                                    </p>
                                    <Button className="mt-4" variant="outline">
                                        Ver todos los contratos
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 