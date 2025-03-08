import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Ajustes del Sistema</CardTitle>
                    <CardDescription>
                        Configuración general y ajustes administrativos de la plataforma.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-zinc-400">
                    <p>Esta funcionalidad será implementada próximamente.</p>
                    <p className="mt-4 text-sm text-zinc-500">Aquí podrás:</p>
                    <ul className="list-disc ml-5 mt-2 text-sm text-zinc-500 space-y-1">
                        <li>Administrar configuraciones globales</li>
                        <li>Gestionar integraciones y APIs</li>
                        <li>Configurar políticas de seguridad</li>
                        <li>Personalizar la apariencia del sistema</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
} 