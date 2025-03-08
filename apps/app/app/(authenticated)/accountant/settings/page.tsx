import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card";

export default function AccountantSettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Preferencias de Contador</CardTitle>
                    <CardDescription>
                        Ajusta tu perfil y preferencias de trabajo en la plataforma.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-zinc-400">
                    <p>Esta funcionalidad será implementada próximamente.</p>
                    <p className="mt-4 text-sm text-zinc-500">Aquí podrás:</p>
                    <ul className="list-disc ml-5 mt-2 text-sm text-zinc-500 space-y-1">
                        <li>Personalizar tu perfil profesional</li>
                        <li>Configurar notificaciones y alertas</li>
                        <li>Establecer preferencias de visualización</li>
                        <li>Gestionar integraciones con sistemas externos</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
} 