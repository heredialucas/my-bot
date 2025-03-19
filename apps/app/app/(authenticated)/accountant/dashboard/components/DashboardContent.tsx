import { Alert, AlertDescription, AlertTitle } from "@repo/design-system/components/ui/alert"
import { Info, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@repo/design-system/components/ui/card"

export default async function DashboardContent() {
    // This component is a server component, so it can fetch data directly
    // The async keyword here demonstrates that this is a Server Component

    return (
        <div className="space-y-6">
            <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-5 w-5 text-blue-600" />
                <AlertTitle className="text-blue-800 font-medium">Componente Servidor Base</AlertTitle>
                <AlertDescription className="text-blue-700">
                    Este es un componente de servidor que se utiliza como base para crear dashboards en el starter kit.
                    Puedes realizar operaciones asíncronas directamente aquí sin useEffect.
                </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Componentes</CardTitle>
                        <CardDescription>Estructura recomendada para componentes</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Componentes de Servidor</p>
                                <p className="text-sm text-muted-foreground">Para operaciones de datos y renderizado inicial</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Componentes de Cliente</p>
                                <p className="text-sm text-muted-foreground">Solo cuando necesites interactividad con 'use client'</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Estructura por carpetas</p>
                                <p className="text-sm text-muted-foreground">Organizado según la nueva estructura de Next.js 15</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Interceptores</CardTitle>
                        <CardDescription>Ejemplo de interceptores basados en @modal</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Modalidad de Interceptación</p>
                                <p className="text-sm text-muted-foreground">Ejemplo en @modal/(.)/new para crear elementos</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Paralel Routes</p>
                                <p className="text-sm text-muted-foreground">Soporte para múltiples rutas en una sola URL</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium">Context Preservation</p>
                                <p className="text-sm text-muted-foreground">Mantiene el contexto de la página actual durante la navegación</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 