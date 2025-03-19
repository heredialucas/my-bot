import { Alert, AlertDescription, AlertTitle } from "@repo/design-system/components/ui/alert"
import { Info, CheckCircle2, LightbulbIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@repo/design-system/components/ui/card"

export default async function DashboardContent() {
    // This component is a server component, so it can fetch data directly
    // The async keyword here demonstrates that this is a Server Component

    return (
        <div className="space-y-6">
            <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-5 w-5 text-blue-600" />
                <AlertTitle className="text-blue-800 font-medium">Área del Cliente - Starter Kit</AlertTitle>
                <AlertDescription className="text-blue-700">
                    Este es un componente servidor de ejemplo para la vista de cliente en el starter kit.
                    Hemos creado un interceptor modal para demostrar las mejores prácticas en Next.js 15.
                </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Características</CardTitle>
                        <CardDescription>Elementos incluidos en este starter kit</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Server Components</p>
                                <p className="text-sm text-muted-foreground">Carga de datos directa sin estados cliente</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Estructura escalable</p>
                                <p className="text-sm text-muted-foreground">Componentes organizados según roles funcionales</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Design System integrado</p>
                                <p className="text-sm text-muted-foreground">Componentes UI reutilizables y accesibles</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Modal de Ejemplo</CardTitle>
                        <CardDescription>Ver interceptor creado en @modal/(.)/new-project</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-start gap-2">
                            <LightbulbIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Haz clic en "Nuevo Proyecto"</p>
                                <p className="text-sm text-muted-foreground">Para ver el interceptor modal en acción</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <LightbulbIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Estructura de carpetas</p>
                                <p className="text-sm text-muted-foreground">Utiliza las convenciones de Next.js 15 con @ y (.)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <LightbulbIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Personalizable</p>
                                <p className="text-sm text-muted-foreground">Este starter kit sirve como base para tus proyectos</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 