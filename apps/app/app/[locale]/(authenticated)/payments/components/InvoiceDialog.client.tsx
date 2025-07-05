'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@repo/design-system/components/ui/dialog';
import { Button } from '@repo/design-system/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Separator } from '@repo/design-system/components/ui/separator';
import { PrinterIcon, DownloadIcon } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import type { PaymentData } from './columns';
import { InvoicePDF } from './InvoicePDF';

type InvoiceDialogProps = {
    payment: PaymentData;
    isOpen: boolean;
    onClose: () => void;
};

export function InvoiceDialog({ payment, isOpen, onClose }: InvoiceDialogProps) {
    const [isGenerating, setIsGenerating] = useState(false);

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

    const formatDateTime = (date: Date) => {
        return new Intl.DateTimeFormat('es-AR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    };

    const paymentMethodLabels = {
        CASH: 'Efectivo',
        CREDIT_CARD: 'Tarjeta de Crédito',
        BANK_TRANSFER: 'Transferencia Bancaria',
        OTHER: 'Otro método'
    };

    const handlePrint = () => {
        setIsGenerating(true);
        // Simular tiempo de generación
        setTimeout(() => {
            window.print();
            setIsGenerating(false);
        }, 1000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Factura - Pago #{payment.receiptNumber || payment.id.slice(-8)}</span>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePrint}
                                disabled={isGenerating}
                            >
                                <PrinterIcon className="h-4 w-4 mr-2" />
                                Imprimir
                            </Button>
                            <PDFDownloadLink
                                document={<InvoicePDF payment={payment} />}
                                fileName={`factura-${payment.receiptNumber || payment.id.slice(-8)}.pdf`}
                            >
                                {({ loading }) => (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={loading || isGenerating}
                                    >
                                        <DownloadIcon className="h-4 w-4 mr-2" />
                                        {loading ? 'Generando...' : 'Descargar PDF'}
                                    </Button>
                                )}
                            </PDFDownloadLink>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 print:space-y-4">
                    {/* Encabezado de la empresa */}
                    <Card className="print:shadow-none print:border-0">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-bold text-primary">
                                Repartito
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Sistema de Gestión de Repartos
                            </p>
                        </CardHeader>
                    </Card>

                    {/* Información del pago */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Datos del Pago</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div>
                                    <span className="font-medium">Fecha de Pago:</span>{' '}
                                    {formatDate(payment.paymentDate)}
                                </div>
                                <div>
                                    <span className="font-medium">Monto:</span>{' '}
                                    <span className="text-lg font-bold text-green-600">
                                        {formatCurrency(payment.amount)}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium">Método de Pago:</span>{' '}
                                    {paymentMethodLabels[payment.paymentMethod]}
                                </div>
                                {payment.receiptNumber && (
                                    <div>
                                        <span className="font-medium">Número de Recibo:</span>{' '}
                                        {payment.receiptNumber}
                                    </div>
                                )}
                                {payment.notes && (
                                    <div>
                                        <span className="font-medium">Notas:</span>{' '}
                                        {payment.notes}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Información del Cliente</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div>
                                    <span className="font-medium">Nombre:</span>{' '}
                                    {payment.order.client.firstName} {payment.order.client.lastName}
                                </div>
                                {payment.order.client.email && (
                                    <div>
                                        <span className="font-medium">Email:</span>{' '}
                                        {payment.order.client.email}
                                    </div>
                                )}
                                <div>
                                    <span className="font-medium">Vendedor:</span>{' '}
                                    {payment.order.seller.name} {payment.order.seller.lastName}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Información del pedido */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Información del Reparto</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <span className="font-medium">ID del Reparto:</span>{' '}
                                {payment.order.id}
                            </div>
                            <div>
                                <span className="font-medium">Fecha del Reparto:</span>{' '}
                                {formatDate(payment.order.orderDate)}
                            </div>
                            <div>
                                <span className="font-medium">Total del Reparto:</span>{' '}
                                <span className="font-bold">
                                    {formatCurrency(payment.order.totalAmount)}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">Total Pagado:</span>{' '}
                                <span className="font-bold text-green-600">
                                    {formatCurrency(payment.amount)}
                                </span>
                            </div>
                            {payment.amount < payment.order.totalAmount && (
                                <div>
                                    <span className="font-medium">Pendiente:</span>{' '}
                                    <span className="font-bold text-orange-600">
                                        {formatCurrency(payment.order.totalAmount - payment.amount)}
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Productos del reparto */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Productos del Reparto</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {payment.order.items?.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div className="flex-1">
                                            <div className="font-medium">{item.product.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                SKU: {item.product.sku}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">{item.quantity} unidades</div>
                                        </div>
                                    </div>
                                ))}
                                <Separator />
                                <div className="flex justify-between items-center font-medium">
                                    <span>Total de productos:</span>
                                    <span>{payment.order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0} unidades</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Resumen del pago */}
                    <Card className="border-2 border-primary">
                        <CardHeader>
                            <CardTitle className="text-lg text-primary">Resumen del Pago</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center text-lg">
                                <span className="font-medium">Monto Pagado:</span>
                                <span className="font-bold text-green-600">
                                    {formatCurrency(payment.amount)}
                                </span>
                            </div>
                            <Separator className="my-4" />
                            <div className="text-sm text-muted-foreground">
                                Factura generada el {formatDateTime(new Date())}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pie de página */}
                    <div className="text-center text-sm text-muted-foreground print:mt-8">
                        <p>Gracias por su pago</p>
                        <p>Repartito - Sistema de Gestión de Repartos</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
} 