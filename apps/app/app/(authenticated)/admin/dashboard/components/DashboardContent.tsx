import { Alert, AlertDescription, AlertTitle } from "@repo/design-system/components/ui/alert"
import { Info, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@repo/design-system/components/ui/card"

export default async function DashboardContent() {
    return (
        <div className="space-y-6">
            <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-5 w-5 text-blue-600" />
                <AlertTitle className="text-blue-800 font-medium">Panel de Administración</AlertTitle>
                <AlertDescription className="text-blue-700">
                    Bienvenido al panel de administración. Aquí podrás gestionar usuarios y acceder a todas las funcionalidades administrativas.
                </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Gestión de Usuarios</CardTitle>
                        <CardDescription>Funcionalidades principales de usuarios</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Administradores</p>
                                <p className="text-sm text-muted-foreground">Gestión de permisos y roles administrativos</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Usuarios del Sistema</p>
                                <p className="text-sm text-muted-foreground">Control de accesos y permisos de usuarios</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Auditoría</p>
                                <p className="text-sm text-muted-foreground">Registro de actividades y cambios en el sistema</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Configuración del Sistema</CardTitle>
                        <CardDescription>Opciones generales de configuración</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Parámetros Globales</p>
                                <p className="text-sm text-muted-foreground">Configuración de variables del sistema</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Seguridad</p>
                                <p className="text-sm text-muted-foreground">Políticas de seguridad y acceso</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Respaldos</p>
                                <p className="text-sm text-muted-foreground">Gestión de copias de seguridad</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 