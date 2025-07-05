'use client';

import { useState, useTransition } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@repo/design-system/components/ui/select';
import { Button } from '@repo/design-system/components/ui/button';
import { Badge } from '@repo/design-system/components/ui/badge';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { updateOrderStatusAction } from '../actions';
import { CheckCircle, AlertCircle } from 'lucide-react';

type OrderStatus = 'PENDING' | 'DELIVERED' | 'CANCELLED';

const statusLabels = {
    PENDING: 'Pendiente',
    DELIVERED: 'Entregado',
    CANCELLED: 'Cancelado'
};

const statusVariants = {
    PENDING: 'secondary',
    DELIVERED: 'default',
    CANCELLED: 'destructive'
} as const;

type OrderStatusSelectProps = {
    orderId: string;
    currentStatus: OrderStatus;
    hasPayments: boolean;
    onStatusChange?: (newStatus: OrderStatus) => void;
};

export function OrderStatusSelect({
    orderId,
    currentStatus,
    hasPayments,
    onStatusChange
}: OrderStatusSelectProps) {
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(currentStatus);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleStatusChange = (newStatus: OrderStatus) => {
        setSelectedStatus(newStatus);

        startTransition(async () => {
            try {
                const result = await updateOrderStatusAction(orderId, newStatus);

                if (result.success) {
                    toast({
                        title: 'Estado actualizado',
                        description: `El pedido ahora está ${statusLabels[newStatus].toLowerCase()}.`,
                    });

                    // Si se cambió a entregado y no había pagos, mostrar mensaje especial
                    if (newStatus === 'DELIVERED' && !hasPayments) {
                        toast({
                            title: 'Pago automático generado',
                            description: 'Se ha generado automáticamente un pago por el monto total del pedido.',
                        });
                    }

                    onStatusChange?.(newStatus);
                } else {
                    toast({
                        title: 'Error',
                        description: result.message || 'Error al actualizar el estado.',
                        variant: 'destructive',
                    });
                    // Revertir el estado si hubo error
                    setSelectedStatus(currentStatus);
                }
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Error al actualizar el estado del pedido.',
                    variant: 'destructive',
                });
                setSelectedStatus(currentStatus);
            }
        });
    };

    return (
        <div className="flex items-center gap-2">
            <Select
                value={selectedStatus}
                onValueChange={(value) => handleStatusChange(value as OrderStatus)}
                disabled={isPending}
            >
                <SelectTrigger className="w-48">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(statusLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                                <Badge variant={statusVariants[key as keyof typeof statusVariants]}>
                                    {label}
                                </Badge>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {selectedStatus === 'DELIVERED' && !hasPayments && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Pago automático</span>
                </div>
            )}

            {selectedStatus === 'DELIVERED' && hasPayments && (
                <div className="flex items-center gap-1 text-sm text-blue-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>Pagos existentes</span>
                </div>
            )}
        </div>
    );
} 