import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs";
import { User, Receipt, FileQuestion, BookOpen } from "lucide-react";
import Link from "next/link";

export default function TaxProfilePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Perfil Tributario</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/client/tax-profile/data">
                    <Card className="border border-gray-200 dark:border-gray-800 hover:border-[#FFE01B] transition-colors cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Mis Datos</CardTitle>
                            <User className="h-4 w-4 text-[#FFE01B]" />
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Gestiona tu información personal y tributaria.</CardDescription>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/client/tax-profile/invoices">
                    <Card className="border border-gray-200 dark:border-gray-800 hover:border-[#FFE01B] transition-colors cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Mis Facturas</CardTitle>
                            <Receipt className="h-4 w-4 text-[#FFE01B]" />
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Visualiza y descarga todas tus facturas emitidas y recibidas.</CardDescription>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/client/tax-profile/queries">
                    <Card className="border border-gray-200 dark:border-gray-800 hover:border-[#FFE01B] transition-colors cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Mis Consultas</CardTitle>
                            <FileQuestion className="h-4 w-4 text-[#FFE01B]" />
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Historial de consultas realizadas a tu contador.</CardDescription>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/client/tax-profile/guides">
                    <Card className="border border-gray-200 dark:border-gray-800 hover:border-[#FFE01B] transition-colors cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Guías</CardTitle>
                            <BookOpen className="h-4 w-4 text-[#FFE01B]" />
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Documentación y tutoriales sobre temas tributarios.</CardDescription>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            <Card className="border-none shadow-sm">
                <CardHeader className="bg-[#7dd3c8] py-4 rounded-t-xl">
                    <CardTitle className="text-lg font-bold">RESUMEN TRIBUTARIO</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <Tabs defaultValue="current">
                        <TabsList className="mb-4">
                            <TabsTrigger value="current">Año en curso</TabsTrigger>
                            <TabsTrigger value="previous">Año anterior</TabsTrigger>
                        </TabsList>

                        <TabsContent value="current">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">RÉGIMEN TRIBUTARIO</div>
                                        <div className="text-lg font-bold mt-1">Régimen Semi Integrado</div>
                                    </div>
                                    <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">CAPITAL PROPIO TRIBUTARIO</div>
                                        <div className="text-lg font-bold mt-1">$152.450.000</div>
                                    </div>
                                </div>

                                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">OBLIGACIONES TRIBUTARIAS</div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm">Declaración Mensual (F29)</span>
                                            <span className="font-medium text-green-600 dark:text-green-400">Al día</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm">Declaración Anual (F22)</span>
                                            <span className="font-medium text-green-600 dark:text-green-400">Al día</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm">Declaración Jurada</span>
                                            <span className="font-medium text-yellow-600 dark:text-yellow-400">Pendiente</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="previous">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">RÉGIMEN TRIBUTARIO</div>
                                        <div className="text-lg font-bold mt-1">Régimen Semi Integrado</div>
                                    </div>
                                    <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">CAPITAL PROPIO TRIBUTARIO</div>
                                        <div className="text-lg font-bold mt-1">$120.780.000</div>
                                    </div>
                                </div>

                                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">OBLIGACIONES TRIBUTARIAS</div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm">Declaración Mensual (F29)</span>
                                            <span className="font-medium text-green-600 dark:text-green-400">Cumplido</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm">Declaración Anual (F22)</span>
                                            <span className="font-medium text-green-600 dark:text-green-400">Cumplido</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm">Declaración Jurada</span>
                                            <span className="font-medium text-green-600 dark:text-green-400">Cumplido</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
} 