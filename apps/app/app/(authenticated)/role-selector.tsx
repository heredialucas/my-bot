'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { UserCog, UserIcon, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RoleSelector() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black p-4">
            <div className="w-full max-w-3xl mx-auto mb-8 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg text-center">
                <p className="text-yellow-400 font-semibold">
                    NOTA: Este selector es solo provisional para facilitar las pruebas.
                    En producción, los usuarios serán redirigidos automáticamente según su rol.
                </p>
            </div>

            <Card className="w-full max-w-3xl bg-zinc-900 text-white border-zinc-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-[#FFE01B]">SOPY</CardTitle>
                    <CardDescription className="text-zinc-400 text-lg mt-2">
                        Selecciona un rol para acceder al sistema
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* <Link href="/admin/dashboard" className="block">
                            <div className="bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl p-6 h-full flex flex-col items-center justify-center text-center gap-4 border border-zinc-700 hover:border-zinc-600">
                                <UserCog className="h-12 w-12 text-blue-400" />
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Administrador</h3>
                                    <p className="text-zinc-400 text-sm">Gestión global del sistema</p>
                                </div>
                            </div>
                        </Link> */}

                        <Link href="/accountant/dashboard" className="block">
                            <div className="bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl p-6 h-full flex flex-col items-center justify-center text-center gap-4 border border-zinc-700 hover:border-zinc-600">
                                <UserPlus className="h-12 w-12 text-green-400" />
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Contador</h3>
                                    <p className="text-zinc-400 text-sm">Gestión de clientes y documentos</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/client/dashboard" className="block">
                            <div className="bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl p-6 h-full flex flex-col items-center justify-center text-center gap-4 border border-zinc-700 hover:border-zinc-600">
                                <UserIcon className="h-12 w-12 text-yellow-400" />
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Cliente</h3>
                                    <p className="text-zinc-400 text-sm">Acceso a documentos e impuestos</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-zinc-500 mb-4">
                            En producción, los roles se asignarán en la base de datos o mediante metadatos de usuario.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 