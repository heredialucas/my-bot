import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";
import { Button } from "@repo/design-system/components/ui/button";
import { BarChart2, UserCheck, Users, BarChart, TrendingUp, Activity, CheckCheck } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Panel de Administración</h1>
                <Button variant="outline">Descargar Reporte</Button>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Contadores</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            +3 desde el último mes
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">248</div>
                        <p className="text-xs text-muted-foreground">
                            +15 desde el último mes
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Documentos Procesados</CardTitle>
                        <CheckCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,429</div>
                        <p className="text-xs text-muted-foreground">
                            +22% desde el mes pasado
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Actividad del Sistema</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">89%</div>
                        <p className="text-xs text-muted-foreground">
                            +7% desde el mes pasado
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Gráfico de Actividad (simulado) */}
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Actividad del Sistema</CardTitle>
                    <CardDescription>
                        Actividad de contadores y clientes en los últimos 30 días
                    </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[200px] sm:h-[300px]">
                        <div className="flex h-full items-end gap-2 pb-4">
                            {Array.from({ length: 30 }).map((_, i) => {
                                const height = 10 + Math.floor(Math.random() * 90);
                                return (
                                    <div
                                        key={i}
                                        className="bg-primary/10 hover:bg-primary/20 relative flex-1 rounded-md transition-colors"
                                        style={{ height: `${height}%` }}
                                    >
                                        {i % 5 === 0 && (
                                            <div className="absolute -bottom-6 text-[10px] text-muted-foreground w-full text-center">
                                                {i + 1}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Contadores activos */}
            <Card>
                <CardHeader>
                    <CardTitle>Contadores Más Activos</CardTitle>
                    <CardDescription>
                        Contadores con más actividad en el último periodo
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {[
                            { nombre: "Ana Rodríguez", clientes: 35, documentos: 182, actividad: 92 },
                            { nombre: "Carlos Méndez", clientes: 28, documentos: 145, actividad: 86 },
                            { nombre: "María González", clientes: 24, documentos: 120, actividad: 78 },
                            { nombre: "Roberto Sánchez", clientes: 18, documentos: 98, actividad: 65 }
                        ].map((contador, i) => (
                            <div key={i} className="flex items-center">
                                <div className="mr-4 rounded-full bg-blue-100 p-3 text-blue-600">
                                    {i + 1}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="font-medium leading-none">{contador.nombre}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {contador.clientes} clientes | {contador.documentos} documentos
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    {contador.actividad}%
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Últimas actividades del sistema */}
            <Card>
                <CardHeader>
                    <CardTitle>Últimas Actividades del Sistema</CardTitle>
                    <CardDescription>
                        Registro de acciones recientes en la plataforma
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { tipo: "Nuevo Cliente", usuario: "Ana Rodríguez", tiempo: "hace 5 minutos", accion: "Agregó a Constructora Pacífico SpA" },
                            { tipo: "Documento", usuario: "Carlos Méndez", tiempo: "hace 12 minutos", accion: "Subió declaración mensual para Servicios Digitales S.A." },
                            { tipo: "Actualización", usuario: "Sistema", tiempo: "hace 30 minutos", accion: "Actualización automática de estado de impuestos" },
                            { tipo: "Inicio de Sesión", usuario: "María González", tiempo: "hace 45 minutos", accion: "Inicio de sesión desde nueva ubicación" },
                            { tipo: "Pago", usuario: "Roberto Sánchez", tiempo: "hace 1 hora", accion: "Registró pago de $1.250.000 para Inmobiliaria Norte" }
                        ].map((actividad, i) => (
                            <div key={i} className="flex items-start">
                                <div className="mr-4 mt-0.5 rounded-full bg-primary/10 p-1">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {actividad.tipo} - <span className="font-semibold">{actividad.usuario}</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {actividad.accion}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {actividad.tiempo}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 