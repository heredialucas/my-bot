import { Card, CardContent, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Input } from "@repo/design-system/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { ArrowDownToLine, FileText, Search, Download, Eye } from "lucide-react";
import Link from "next/link";

export default function InvoicesPage() {
    // Datos simulados
    const invoices = [
        { id: "F001-235", date: "15/05/2025", type: "emitted", client: "Cliente ABC", amount: 250000, status: "paid" },
        { id: "F001-234", date: "10/05/2025", type: "emitted", client: "Cliente XYZ", amount: 180000, status: "paid" },
        { id: "F001-233", date: "05/05/2025", type: "emitted", client: "Cliente DEF", amount: 320000, status: "pending" },
        { id: "F001-232", date: "30/04/2025", type: "emitted", client: "Cliente GHI", amount: 145000, status: "paid" },
        { id: "F001-231", date: "25/04/2025", type: "emitted", client: "Cliente JKL", amount: 210000, status: "paid" },
    ];

    const receivedInvoices = [
        { id: "E123-456", date: "12/05/2025", type: "received", supplier: "Proveedor A", amount: 120000, status: "paid" },
        { id: "E234-567", date: "08/05/2025", type: "received", supplier: "Proveedor B", amount: 85000, status: "paid" },
        { id: "E345-678", date: "03/05/2025", type: "received", supplier: "Proveedor C", amount: 195000, status: "pending" },
        { id: "E456-789", date: "28/04/2025", type: "received", supplier: "Proveedor D", amount: 142000, status: "paid" },
        { id: "E567-890", date: "22/04/2025", type: "received", supplier: "Proveedor E", amount: 76000, status: "paid" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Mis Facturas</h1>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                        <ArrowDownToLine className="h-4 w-4 mr-2" />
                        Exportar
                    </Button>
                    <Button variant="default" className="bg-[#FFE01B] hover:bg-[#E5C800] text-black">
                        <FileText className="h-4 w-4 mr-2" />
                        Nueva Factura
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Resumen de Facturas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Facturas Emitidas</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$1.105.000</div>
                                <p className="text-xs text-muted-foreground">Mayo 2025</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Facturas Recibidas</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$400.000</div>
                                <p className="text-xs text-muted-foreground">Mayo 2025</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">IVA a Pagar</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$133.950</div>
                                <p className="text-xs text-muted-foreground">Mayo 2025</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="emitted">
                <TabsList className="mb-4">
                    <TabsTrigger value="emitted">Facturas Emitidas</TabsTrigger>
                    <TabsTrigger value="received">Facturas Recibidas</TabsTrigger>
                </TabsList>

                <TabsContent value="emitted">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Facturas Emitidas</CardTitle>
                                <div className="rounded-md border px-3 py-1 flex items-center gap-2">
                                    <Search className="h-4 w-4 text-gray-500" />
                                    <input
                                        className="border-0 bg-transparent text-sm focus:outline-none"
                                        placeholder="Buscar factura..."
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>N° Documento</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Monto</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {invoices.map((invoice) => (
                                            <TableRow key={invoice.id}>
                                                <TableCell className="font-medium">{invoice.id}</TableCell>
                                                <TableCell>{invoice.date}</TableCell>
                                                <TableCell>{invoice.client}</TableCell>
                                                <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            invoice.status === 'paid'
                                                                ? "border-green-500 text-green-500"
                                                                : "border-yellow-500 text-yellow-500"
                                                        }
                                                    >
                                                        {invoice.status === 'paid' ? 'Pagada' : 'Pendiente'}
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
                                                            <Link href={`/client/tax-profile/invoices/${invoice.id}`}>
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
                </TabsContent>

                <TabsContent value="received">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Facturas Recibidas</CardTitle>
                                <div className="rounded-md border px-3 py-1 flex items-center gap-2">
                                    <Search className="h-4 w-4 text-gray-500" />
                                    <input
                                        className="border-0 bg-transparent text-sm focus:outline-none"
                                        placeholder="Buscar factura..."
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>N° Documento</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Proveedor</TableHead>
                                            <TableHead>Monto</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {receivedInvoices.map((invoice) => (
                                            <TableRow key={invoice.id}>
                                                <TableCell className="font-medium">{invoice.id}</TableCell>
                                                <TableCell>{invoice.date}</TableCell>
                                                <TableCell>{invoice.supplier}</TableCell>
                                                <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            invoice.status === 'paid'
                                                                ? "border-green-500 text-green-500"
                                                                : "border-yellow-500 text-yellow-500"
                                                        }
                                                    >
                                                        {invoice.status === 'paid' ? 'Pagada' : 'Pendiente'}
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
                                                            <Link href={`/client/tax-profile/invoices/${invoice.id}`}>
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
                </TabsContent>
            </Tabs>
        </div>
    );
} 