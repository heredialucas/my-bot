'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@repo/design-system/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@repo/design-system/components/ui/form';
import { Input } from '@repo/design-system/components/ui/input';
import { Button } from '@repo/design-system/components/ui/button';
import { Textarea } from '@repo/design-system/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@repo/design-system/components/ui/select';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { createPaymentAction } from '../../payments/actions';
import { Plus } from 'lucide-react';

const addPaymentSchema = z.object({
    amount: z.coerce.number().positive('El monto debe ser mayor a 0'),
    paymentMethod: z.enum(['CASH', 'CREDIT_CARD', 'BANK_TRANSFER', 'OTHER'], {
        required_error: 'Selecciona un método de pago',
    }),
    receiptNumber: z.string().optional(),
    notes: z.string().optional(),
});

type AddPaymentFormValues = z.infer<typeof addPaymentSchema>;

type AddPaymentDialogProps = {
    orderId: string;
    orderTotal: number;
    currentPayments: number;
    children?: React.ReactNode;
};

export function AddPaymentDialog({
    orderId,
    orderTotal,
    currentPayments,
    children
}: AddPaymentDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const form = useForm<AddPaymentFormValues>({
        resolver: zodResolver(addPaymentSchema),
        defaultValues: {
            amount: Math.max(0, orderTotal - currentPayments),
            paymentMethod: 'CASH',
            receiptNumber: '',
            notes: '',
        },
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(amount);
    };

    const paymentMethodLabels = {
        CASH: 'Efectivo',
        CREDIT_CARD: 'Tarjeta de Crédito',
        BANK_TRANSFER: 'Transferencia Bancaria',
        OTHER: 'Otro método'
    };

    const onSubmit = (values: AddPaymentFormValues) => {
        startTransition(async () => {
            try {
                const result = await createPaymentAction({
                    orderId,
                    ...values,
                });

                if (result.success) {
                    toast({
                        title: 'Éxito',
                        description: 'Pago registrado correctamente.',
                    });
                    form.reset();
                    setIsOpen(false);
                    // Recargar la página para mostrar los cambios
                    window.location.reload();
                } else {
                    toast({
                        title: 'Error',
                        description: result.message || 'Error al registrar el pago.',
                        variant: 'destructive',
                    });
                }
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Error al registrar el pago.',
                    variant: 'destructive',
                });
            }
        });
    };

    const remainingAmount = orderTotal - currentPayments;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Pago
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Agregar Pago</DialogTitle>
                    <DialogDescription>
                        Registra un nuevo pago para este pedido.
                        Monto pendiente: <span className="font-semibold">{formatCurrency(remainingAmount)}</span>
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Monto</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max={remainingAmount}
                                            placeholder="0.00"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Método de Pago</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un método..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.entries(paymentMethodLabels).map(([key, label]) => (
                                                <SelectItem key={key} value={key}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="receiptNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número de Recibo (opcional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ej: 001-0001234"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notas (opcional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Notas adicionales sobre el pago..."
                                            rows={3}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? 'Registrando...' : 'Registrar Pago'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 