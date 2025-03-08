import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";

export default function AdminAuditPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Auditoría</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Registro de Actividades</CardTitle>
                    <CardDescription>
                        Sistema de seguimiento y auditoría de todas las operaciones realizadas.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-zinc-400">
                    <p>Esta funcionalidad será implementada próximamente.</p>
                    <p className="mt-4 text-sm text-zinc-500">Aquí podrás:</p>
                    <ul className="list-disc ml-5 mt-2 text-sm text-zinc-500 space-y-1">
                        <li>Revisar el historial de acciones en el sistema</li>
                        <li>Monitorear cambios y modificaciones</li>
                        <li>Verificar accesos y actividades sospechosas</li>
                        <li>Generar informes de cumplimiento</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
} 