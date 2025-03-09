import { Card, CardContent, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { ChevronRightIcon, Download, CalendarIcon } from "lucide-react";
import Link from "next/link";

export default function ClientDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Panel Principal</h1>

            {/* Próximos Pagos */}
            <section>
                <Card className="overflow-hidden border-none shadow-sm">
                    <CardHeader className="bg-[#FFE01B] py-4">
                        <CardTitle className="text-center text-xl font-bold text-black">
                            PRÓXIMOS PAGOS
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                            {/* SII */}
                            <div className="flex items-center rounded-xl">
                                <div className="flex-1 bg-[#7dd3c8] rounded-l-xl py-4 px-5">
                                    <div className="text-xl font-bold">$120.500</div>
                                    <div className="text-sm">
                                        FECHA DE VENCIMIENTO<br />
                                        20/05/2025
                                    </div>
                                </div>
                                <div className="bg-[#FFB800] rounded-r-xl p-6 flex items-center justify-center w-24 h-24">
                                    <span className="font-bold text-sm break-words text-center">SII</span>
                                </div>
                            </div>

                            {/* PREVIRED */}
                            <div className="flex items-center rounded-xl">
                                <div className="flex-1 bg-[#7dd3c8] rounded-l-xl py-4 px-5">
                                    <div className="text-xl font-bold">$650.893</div>
                                    <div className="text-sm">
                                        FECHA DE VENCIMIENTO<br />
                                        15/05/2025, 15:45 HORAS
                                    </div>
                                </div>
                                <div className="bg-[#FFB800] rounded-r-xl p-6 flex items-center justify-center w-24 h-24">
                                    <span className="font-bold text-sm break-words text-center">PREVIRED</span>
                                </div>
                            </div>

                            {/* RENTA */}
                            <div className="flex items-center rounded-xl">
                                <div className="flex-1 bg-[#7dd3c8] rounded-l-xl py-4 px-5">
                                    <div className="text-xl font-bold">$1.500.500</div>
                                    <div className="text-sm">
                                        FECHA DE VENCIMIENTO<br />
                                        30/04/2025
                                    </div>
                                </div>
                                <div className="bg-[#FFB800] rounded-r-xl p-6 flex items-center justify-center w-24 h-24">
                                    <span className="font-bold text-sm break-words text-center">RENTA</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Resumen Financiero */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Compras y Ventas */}
                <Card className="border-none shadow-sm">
                    <CardHeader className="bg-[#7dd3c8] py-4 flex flex-row items-center justify-between rounded-t-xl">
                        <CardTitle className="text-lg font-bold">COMPRAS Y VENTAS</CardTitle>
                        <div className="bg-[#FFB800] rounded-full p-3 font-bold">2025</div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div>
                                <div className="text-lg font-bold">$2.501.262</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">COMPRAS NETAS</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold">$3.200.300</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">VENTAS NETAS</div>
                            </div>
                            <div className="pt-2">
                                <div className="text-lg font-bold">$699.038</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">MARGEN NETO</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* PPM Pagados */}
                <Card className="border-none shadow-sm">
                    <CardHeader className="bg-[#7dd3c8] py-4 flex flex-row items-center justify-between rounded-t-xl">
                        <CardTitle className="text-lg font-bold">PPM PAGADOS</CardTitle>
                        <div className="bg-[#FFB800] rounded-full p-3 font-bold">2025</div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-2">
                            {['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO'].map((month) => (
                                <div key={month} className="flex justify-between items-center">
                                    <div className="font-medium">{month} 2025</div>
                                    <div className="font-bold">$92.000</div>
                                </div>
                            ))}
                            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-4 flex justify-between items-center">
                                <div className="font-bold">TOTAL PPM</div>
                                <div className="font-bold">$552.000</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Documentos Recientes */}
            <section className="grid grid-cols-1 gap-6">
                <Card className="border-none shadow-sm">
                    <CardHeader className="bg-[#7dd3c8] py-4 flex flex-row items-center justify-between rounded-t-xl">
                        <CardTitle className="text-lg font-bold">CERTIFICADOS MENSUALES</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO'].map((month) => (
                                <div key={month} className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
                                    <div>
                                        <div className="font-medium">{month} 2025</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">FORMULARIO COMPACTO</div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300" asChild>
                                        <Link href={`/client/tax-profile/invoices/${month.toLowerCase()}-2025.pdf`}>
                                            <Download className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
} 