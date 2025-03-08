import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";

export default function AdminAccountantsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Gestión de Contadores</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Información de Contadores</CardTitle>
                    <CardDescription>
                        Esta sección permitirá administrar los contadores registrados en el sistema.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-zinc-400">
                    <p>Esta funcionalidad será implementada próximamente.</p>
                    <p className="mt-4 text-sm text-zinc-500">Aquí podrás:</p>
                    <ul className="list-disc ml-5 mt-2 text-sm text-zinc-500 space-y-1">
                        <li>Ver y gestionar todos los contadores del sistema</li>
                        <li>Asignar clientes a contadores</li>
                        <li>Revisar métricas de desempeño</li>
                        <li>Administrar permisos y accesos</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
} 