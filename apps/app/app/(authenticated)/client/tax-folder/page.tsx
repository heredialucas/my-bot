import { Card, CardContent, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { ArrowDownToLine, FileText, Download, Eye, Folder, Search } from "lucide-react";
import Link from "next/link";

export default function TaxFolderPage() {
    // Datos simulados
    const documents = [
        { id: "DOC001", name: "Libro de Compras", type: "PDF", date: "15/05/2025", size: "2.3 MB", category: "Compras y Ventas" },
        { id: "DOC002", name: "Libro de Ventas", type: "PDF", date: "15/05/2025", size: "1.8 MB", category: "Compras y Ventas" },
        { id: "DOC003", name: "Certificado Tributario", type: "PDF", date: "10/05/2025", size: "534 KB", category: "Certificados" },
        { id: "DOC004", name: "Balance General", type: "PDF", date: "30/04/2025", size: "1.2 MB", category: "Contabilidad" },
        { id: "DOC005", name: "Estado de Resultados", type: "PDF", date: "30/04/2025", size: "980 KB", category: "Contabilidad" },
        { id: "DOC006", name: "Carpeta Tributaria Electrónica", type: "ZIP", date: "25/04/2025", size: "4.7 MB", category: "SII" },
        { id: "DOC007", name: "Declaración F22 (2024)", type: "PDF", date: "25/04/2025", size: "1.5 MB", category: "Declaraciones" },
        { id: "DOC008", name: "Declaración F29 (Abril)", type: "PDF", date: "12/05/2025", size: "750 KB", category: "Declaraciones" },
    ];

    const categories = [
        { name: "Todos", count: documents.length },
        { name: "Compras y Ventas", count: documents.filter(d => d.category === "Compras y Ventas").length },
        { name: "Certificados", count: documents.filter(d => d.category === "Certificados").length },
        { name: "Contabilidad", count: documents.filter(d => d.category === "Contabilidad").length },
        { name: "Declaraciones", count: documents.filter(d => d.category === "Declaraciones").length },
        { name: "SII", count: documents.filter(d => d.category === "SII").length },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Carpeta Tributaria</h1>

                <div className="flex flex-col md:flex-row gap-3">
                    <div className="rounded-md border px-3 py-1 flex items-center gap-2">
                        <Search className="h-4 w-4 text-gray-500" />
                        <input
                            className="border-0 bg-transparent text-sm focus:outline-none w-40"
                            placeholder="Buscar documento..."
                        />
                    </div>

                    <Button variant="outline" size="sm">
                        <ArrowDownToLine className="h-4 w-4 mr-2" />
                        Descargar Todo
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Sidebar */}
                <div className="md:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Categorías</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-200 dark:divide-gray-800">
                                {categories.map((category) => (
                                    <button
                                        key={category.name}
                                        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Folder className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm">{category.name}</span>
                                        </div>
                                        <Badge variant="secondary" className="bg-gray-100 dark:bg-zinc-800">
                                            {category.count}
                                        </Badge>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Solicitar Documento</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    ¿No encuentras un documento? Solicítalo a tu contador.
                                </p>
                                <Button className="w-full bg-[#FFE01B] hover:bg-[#E5C800] text-black">
                                    Solicitar
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-9">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Documentos</CardTitle>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Ordenar por:</span>
                                <select className="text-sm bg-transparent border rounded-md border-gray-200 dark:border-gray-800 px-2 py-1">
                                    <option>Más reciente</option>
                                    <option>Nombre</option>
                                    <option>Categoría</option>
                                </select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Categoría</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Tamaño</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {documents.map((doc) => (
                                            <TableRow key={doc.id}>
                                                <TableCell className="font-medium">{doc.name}</TableCell>
                                                <TableCell>{doc.category}</TableCell>
                                                <TableCell>{doc.date}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {doc.type}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{doc.size}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            asChild
                                                        >
                                                            <Link href={`/client/tax-folder/${doc.id}`}>
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
                </div>
            </div>
        </div>
    );
} 