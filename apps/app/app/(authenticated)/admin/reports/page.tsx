import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";

export default function AdminReportsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Reportes</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Informes y Estadísticas</CardTitle>
                    <CardDescription>
                        Centro de reportes administrativos y métricas del sistema.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-zinc-400">
                    <p>Esta funcionalidad será implementada próximamente.</p>
                    <p className="mt-4 text-sm text-zinc-500">Aquí podrás:</p>
                    <ul className="list-disc ml-5 mt-2 text-sm text-zinc-500 space-y-1">
                        <li>Generar reportes de actividad del sistema</li>
                        <li>Ver estadísticas de uso y rendimiento</li>
                        <li>Analizar métricas de negocio</li>
                        <li>Exportar datos para análisis externos</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
} 