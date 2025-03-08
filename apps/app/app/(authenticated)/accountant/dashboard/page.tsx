import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { BarChart3Icon, UsersIcon, CalendarIcon, AlertTriangleIcon, ChevronRightIcon, FileTextIcon, ClockIcon } from "lucide-react";
import Link from "next/link";

export default function AccountantDashboard() {
    // Datos de ejemplo
    const clientesActivos = 24;
    const documentosPendientes = 12;
    const impuestosProximos = 8;

    const clientes = [
        { id: 1, nombre: "Empresa ABC SpA", documentosPendientes: 3, proximoPago: "15/05/2025", monto: "$650.893" },
        { id: 2, nombre: "Comercial XYZ Ltda.", documentosPendientes: 1, proximoPago: "20/05/2025", monto: "$120.500" },
        { id: 3, nombre: "Constructora El Bloque", documentosPendientes: 2, proximoPago: "30/04/2025", monto: "$1.500.500" },
        { id: 4, nombre: "Servicios Tecnológicos S.A.", documentosPendientes: 0, proximoPago: "10/06/2025", monto: "$340.250" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard Contador</h1>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Mayo 2025</span>
                </div>
            </div>

            {/* Tarjetas resumen */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{clientesActivos}</div>
                        <p className="text-xs text-muted-foreground">
                            +2 este mes
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Documentos Pendientes</CardTitle>
                        <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{documentosPendientes}</div>
                        <p className="text-xs text-muted-foreground">
                            5 requieren atención urgente
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Impuestos Próximos</CardTitle>
                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{impuestosProximos}</div>
                        <p className="text-xs text-muted-foreground">
                            3 vencen esta semana
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Clientes que requieren atención */}
            <Card>
                <CardHeader>
                    <CardTitle>Clientes que requieren atención</CardTitle>
                    <CardDescription>
                        Clientes con documentos pendientes o pagos próximos.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {clientes.map((cliente) => (
                            <div key={cliente.id} className="flex items-center justify-between border-b pb-4">
                                <div className="space-y-1">
                                    <p className="font-medium">{cliente.nombre}</p>
                                    <div className="flex items-center gap-2">
                                        {cliente.documentosPendientes > 0 && (
                                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                                                {cliente.documentosPendientes} documentos pendientes
                                            </span>
                                        )}
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                            Pago: {cliente.proximoPago}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-sm font-semibold">{cliente.monto}</div>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/accountant/clients/${cliente.id}`}>
                                            <ChevronRightIcon className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Calendario de Impuestos */}
            <Card>
                <CardHeader>
                    <CardTitle>Calendario de Impuestos</CardTitle>
                    <CardDescription>
                        Próximos vencimientos de impuestos para todos los clientes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 rounded-md bg-amber-50 p-3 text-amber-900">
                            <AlertTriangleIcon className="h-5 w-5" />
                            <div className="text-sm font-medium">8 impuestos vencen en los próximos 15 días</div>
                        </div>

                        <div className="rounded-md border">
                            <div className="flex items-center justify-between border-b p-3">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-red-100 p-2">
                                        <CalendarIcon className="h-4 w-4 text-red-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">15/05/2025</div>
                                        <div className="text-sm text-muted-foreground">PREVIRED - 4 clientes</div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/accountant/taxes?date=2025-05-15&type=previred">
                                        Ver detalle
                                    </Link>
                                </Button>
                            </div>

                            <div className="flex items-center justify-between border-b p-3">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-amber-100 p-2">
                                        <CalendarIcon className="h-4 w-4 text-amber-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">20/05/2025</div>
                                        <div className="text-sm text-muted-foreground">SII - 3 clientes</div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/accountant/taxes?date=2025-05-20&type=sii">
                                        Ver detalle
                                    </Link>
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-green-100 p-2">
                                        <CalendarIcon className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">30/05/2025</div>
                                        <div className="text-sm text-muted-foreground">Declaración Mensual - 8 clientes</div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/accountant/taxes?date=2025-05-30&type=monthly">
                                        Ver detalle
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 