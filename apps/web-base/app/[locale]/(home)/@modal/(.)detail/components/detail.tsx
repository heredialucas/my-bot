"use client";

import { Check, Clock, FileText, Gauge, Wrench } from "lucide-react";
import { Button } from "@repo/design-system/components/ui/button";

export default function Detail() {
    return (
        <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden">
            {/* Left Section - Blue gradient */}
            <div className="bg-gradient-to-r from-indigo-700 to-blue-500 text-white p-8 lg:w-5/12">
                <h2 className="text-xl font-medium mb-1">Plan internet fibra</h2>
                <h1 className="text-5xl font-bold mb-6">300 Mbps</h1>

                <p className="mb-8">contrata este plan y tendrás</p>

                <div className="space-y-6">
                    <div className="flex items-center">
                        <div className="bg-blue-400/30 p-2 rounded-full mr-4">
                            <Gauge className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium">Velocidad semétrica</h3>
                            <p className="text-sm">Hasta 300 Mbps de subida y bajada</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="bg-blue-400/30 p-2 rounded-full mr-4">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium">Sin letra chica</h3>
                            <p className="text-sm">Cobros y boletas transparentes</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="bg-blue-400/30 p-2 rounded-full mr-4">
                            <Clock className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium">Contact center</h3>
                            <p className="text-sm">Lunes a viernes 9:00 a 20:00 hs</p>
                            <p className="text-sm">Sábados de 9:00 a 14:00 hs</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="bg-blue-400/30 p-2 rounded-full mr-4">
                            <Wrench className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium">Incluye</h3>
                            <p className="text-sm">LActivación y habilitación</p>
                            <p className="text-sm">¡Agenda tu instalación!</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/20 pt-4">
                    <p className="text-sm">Cliente cancela plan a contratar al momento de instalar</p>
                    <h2 className="text-4xl font-bold mt-2">$14.990</h2>
                    <p className="text-sm">¡Mes 6 pagas $16.990</p>

                    <Button className="w-full mt-4 bg-cyan-300 text-black hover:bg-cyan-400 rounded-full py-2">
                        Lo quiero!
                    </Button>
                </div>
            </div>

            {/* Right Section - White with plan details */}
            <div className="bg-white p-8 lg:w-7/12">
                <div className="text-center mb-8">
                    <h2 className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-6xl font-bold">$31.890</h2>
                    <p className="text-gray-700">Mensual / mes 6 pagás $33.890</p>
                </div>

                <div className="mb-8">
                    <h3 className="font-medium text-gray-800 mb-2">Detalles del servicio</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Fibra 300</span>
                            <span className="font-medium">$14.990</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Plan Televisión Fútbol</span>
                            <span className="font-medium">$16.900</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Extensor Wifi</span>
                            <span className="font-medium">$2.400</span>
                        </div>
                    </div>
                </div>

                <Button className="w-full bg-cyan-300 text-black hover:bg-cyan-400 rounded-full py-2 mb-8">
                    ¡Lo quiero!
                </Button>

                <div className="bg-rose-500 text-white p-4 text-center rounded-lg mb-6">
                    <h3 className="font-medium">TV Online. Elige tu plan ZAPPING</h3>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full"></div>
                            </div>
                            <span className="font-medium">Nacional</span>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">$5.900</p>
                            <p className="text-xs text-gray-500">primer mes</p>
                            <p className="text-xs text-gray-500">luego $7.900 /mes</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full border border-blue-600 bg-blue-600 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                            </div>
                            <span className="font-medium">Fútbol</span>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">$16.900</p>
                            <p className="text-xs text-gray-500">primer mes</p>
                            <p className="text-xs text-gray-500">luego $18.900 /mes</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full"></div>
                            </div>
                            <span className="font-medium">Plus</span>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">$17.900</p>
                            <p className="text-xs text-gray-500">primer mes</p>
                            <p className="text-xs text-gray-500">luego $19.900 /mes</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full"></div>
                            </div>
                            <span className="font-medium">Cine</span>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">$21.900</p>
                            <p className="text-xs text-gray-500">primer mes</p>
                            <p className="text-xs text-gray-500">luego $24.900 /mes</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6 border border-gray-300 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border border-gray-400 flex items-center justify-center">
                            <Check className="h-3 w-3" />
                        </div>
                        <span>Agregar extensor Wifi por $2.400/mes</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
