import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Users } from 'lucide-react';

export default function ClientsPage() {
    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">Gestión de Clientes</h1>
                <div className="text-sm text-muted-foreground">
                    Próximamente
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Clientes
                    </CardTitle>
                    <CardDescription>
                        Esta sección estará disponible próximamente
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center min-h-[200px] md:h-64 text-muted-foreground p-4">
                        <div className="text-center max-w-md">
                            <Users className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 opacity-50" />
                            <p className="text-base md:text-lg font-medium mb-2">Gestión de Clientes</p>
                            <p className="text-sm text-center">
                                Aquí podrás gestionar toda la información de tus clientes
                            </p>
                            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                <p className="text-xs text-muted-foreground">
                                    📋 Funcionalidades que incluirá:
                                </p>
                                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                                    <li>• Lista de clientes registrados</li>
                                    <li>• Historial de pedidos por cliente</li>
                                    <li>• Información de contacto</li>
                                    <li>• Estadísticas de compra</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 