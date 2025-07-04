import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getClientById } from '@repo/data-services';
import { notFound } from 'next/navigation';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Separator } from '@repo/design-system/components/ui/separator';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@repo/design-system/components/ui/button';

export default async function ClientDetailPage({
    params,
}: {
    params: Promise<{ locale: Locale; clientId: string }>;
}) {
    const { locale, clientId } = await params;
    const dictionary = await getDictionary(locale);
    const client = await getClientById(clientId);

    if (!client) {
        notFound();
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(amount);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(date));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Link href="/clients">
                        <Button variant="outline" size="icon">
                            <ArrowLeftIcon className="w-4 h-4" />
                        </Button>
                    </Link>
                    {client.firstName} {client.lastName}
                </h1>
                <Badge variant={client.accountBalance >= 0 ? 'default' : 'destructive'}>
                    {client.accountBalance >= 0 ? 'Saldo Positivo' : 'Saldo Negativo'}
                </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Información Personal */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información Personal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <span className="font-medium">Nombre completo:</span>{' '}
                            {client.firstName} {client.lastName}
                        </div>
                        {client.email && (
                            <div>
                                <span className="font-medium">Email:</span> {client.email}
                            </div>
                        )}
                        {client.phone && (
                            <div>
                                <span className="font-medium">Teléfono:</span> {client.phone}
                            </div>
                        )}
                        {client.address && (
                            <div>
                                <span className="font-medium">Dirección:</span> {client.address}
                            </div>
                        )}
                        <Separator />
                        <div>
                            <span className="font-medium">Cliente desde:</span>{' '}
                            {formatDate(client.createdAt)}
                        </div>
                        <div>
                            <span className="font-medium">Última actualización:</span>{' '}
                            {formatDate(client.updatedAt)}
                        </div>
                    </CardContent>
                </Card>

                {/* Información Financiera */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información Financiera</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <span className="font-medium">Saldo de cuenta:</span>{' '}
                            <span className={`text-lg font-bold ${client.accountBalance >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {formatCurrency(client.accountBalance)}
                            </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {client.accountBalance >= 0
                                ? 'El cliente tiene un saldo positivo en su cuenta.'
                                : 'El cliente tiene una deuda pendiente.'
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Historial de Pedidos */}
            <Card>
                <CardHeader>
                    <CardTitle>Historial de Pedidos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <p>El historial de pedidos estará disponible próximamente.</p>
                        <p className="text-sm">Esta funcionalidad se implementará en una futura actualización.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Estadísticas del Cliente */}
            <Card>
                <CardHeader>
                    <CardTitle>Estadísticas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-muted-foreground">-</div>
                            <div className="text-sm text-muted-foreground">Total de Pedidos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-muted-foreground">-</div>
                            <div className="text-sm text-muted-foreground">Total Gastado</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-muted-foreground">-</div>
                            <div className="text-sm text-muted-foreground">Último Pedido</div>
                        </div>
                    </div>
                    <div className="text-center mt-4 text-sm text-muted-foreground">
                        Las estadísticas detalladas estarán disponibles próximamente.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 