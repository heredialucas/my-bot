import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { FileText, Calendar, Download, ChevronRight, Filter, Plus, Folder, FolderOpen, Search } from "lucide-react";
import Link from "next/link";

export default function TaxFolderPage() {
    // Datos simulados
    const clients = [
        {
            id: 1,
            name: "Empresa ABC SpA",
            rut: "76.543.210-K",
            lastUpdate: "15/05/2025",
            documents: 24,
            status: "complete"
        },
        {
            id: 2,
            name: "Comercial XYZ Ltda.",
            rut: "77.665.544-3",
            lastUpdate: "10/05/2025",
            documents: 18,
            status: "incomplete"
        },
        {
            id: 3,
            name: "Constructora El Bloque",
            rut: "78.901.234-5",
            lastUpdate: "05/05/2025",
            documents: 22,
            status: "complete"
        },
        {
            id: 4,
            name: "Servicios Tecnológicos S.A.",
            rut: "79.123.456-7",
            lastUpdate: "01/05/2025",
            documents: 15,
            status: "incomplete"
        },
    ];

    const documents = [
        {
            id: 1,
            name: "F29 - Abril 2025",
            client: "Empresa ABC SpA",
            type: "Declaración Mensual",
            date: "30/04/2025",
            size: "1.2 MB"
        },
        {
            id: 2,
            name: "F22 - Año Tributario 2025",
            client: "Empresa ABC SpA",
            type: "Declaración Anual",
            date: "25/04/2025",
            size: "2.8 MB"
        },
        {
            id: 3,
            name: "Certificado de Situación Tributaria",
            client: "Comercial XYZ Ltda.",
            type: "Certificado",
            date: "20/04/2025",
            size: "0.5 MB"
        },
        {
            id: 4,
            name: "Libro de Compras - Abril 2025",
            client: "Constructora El Bloque",
            type: "Libro Contable",
            date: "15/04/2025",
            size: "3.5 MB"
        },
        {
            id: 5,
            name: "Libro de Ventas - Abril 2025",
            client: "Constructora El Bloque",
            type: "Libro Contable",
            date: "15/04/2025",
            size: "2.1 MB"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Carpeta Tributaria</h1>
                <div className="flex items-center gap-3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Subir Documento
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Documentos</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">248</div>
                        <p className="text-xs text-muted-foreground">
                            En 12 carpetas
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Carpetas Completas</CardTitle>
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            De 12 carpetas
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Documentos Recientes</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15</div>
                        <p className="text-xs text-muted-foreground">
                            Últimos 7 días
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="clients">
                <TabsList className="mb-4">
                    <TabsTrigger value="clients">Carpetas por Cliente</TabsTrigger>
                    <TabsTrigger value="documents">Documentos Recientes</TabsTrigger>
                </TabsList>

                <TabsContent value="clients">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Carpetas Tributarias por Cliente</CardTitle>
                                    <CardDescription>
                                        Accede a las carpetas tributarias organizadas por cliente
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="search"
                                            placeholder="Buscar cliente..."
                                            className="pl-9 h-9 w-[250px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filtrar
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>RUT</TableHead>
                                            <TableHead>Última Actualización</TableHead>
                                            <TableHead>Documentos</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {clients.map((client) => (
                                            <TableRow key={client.id}>
                                                <TableCell className="font-medium">{client.name}</TableCell>
                                                <TableCell>{client.rut}</TableCell>
                                                <TableCell>{client.lastUpdate}</TableCell>
                                                <TableCell>{client.documents}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={client.status === 'complete'
                                                            ? "bg-green-100 text-green-800 border-green-200"
                                                            : "bg-amber-100 text-amber-800 border-amber-200"
                                                        }
                                                    >
                                                        {client.status === 'complete' ? 'Completa' : 'Incompleta'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={`/accountant/tax-folder/client/${client.id}`}>
                                                            <Folder className="h-4 w-4 mr-2" />
                                                            Abrir Carpeta
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

                <TabsContent value="documents">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Documentos Recientes</CardTitle>
                                    <CardDescription>
                                        Documentos agregados o actualizados recientemente
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="search"
                                            placeholder="Buscar documento..."
                                            className="pl-9 h-9 w-[250px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filtrar
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Documento</TableHead>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Tamaño</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {documents.map((document) => (
                                            <TableRow key={document.id}>
                                                <TableCell className="font-medium">{document.name}</TableCell>
                                                <TableCell>{document.client}</TableCell>
                                                <TableCell>{document.type}</TableCell>
                                                <TableCell>{document.date}</TableCell>
                                                <TableCell>{document.size}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm">
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Descargar
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link href={`/accountant/tax-folder/document/${document.id}`}>
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
            </Tabs>
        </div>
    );
} 