'use client';

import { type ColumnDef, type CellContext } from '@tanstack/react-table';
import type { Order } from '@repo/data-services/src/types/barfer';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Input } from '@repo/design-system/components/ui/input';

const statusTranslations: Record<Order['status'], string> = {
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
};

const paymentMethodTranslations: Record<string, string> = {
    cash: 'Efectivo',
    transfer: 'Transferencia',
    'bank-transfer': 'Transferencia Bancaria',
    'mercado-pago': 'Mercado Pago',
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: 'createdAt',
        header: 'Fecha',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const date = new Date(row.getValue('createdAt') as string);
            const day = date.getDay();
            const dayBg = {
                1: 'bg-green-100 text-green-900',    // Lunes
                2: 'bg-yellow-100 text-yellow-900',  // Martes
                3: 'bg-red-100 text-red-900',        // Miércoles
                4: 'bg-amber-200 text-amber-900',    // Jueves (marrón suave)
                6: 'bg-blue-100 text-blue-900',      // Sábado
            }[day] || '';

            return (
                <div className={`min-w-[10px] text-center rounded font-medium ${dayBg}`}>
                    {date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}
                </div>
            );
        }
    },
    {
        id: 'deliveryDay',
        header: 'Día Entrega',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const schedule = row.original.deliveryArea?.schedule;
            const createdAt = new Date(row.original.createdAt);

            if (!schedule || !createdAt) {
                return <div className="w-full text-center text-sm">N/A</div>;
            }

            const daysOfWeek: Record<string, number> = {
                domingo: 0, lunes: 1, martes: 2, miercoles: 3,
                jueves: 4, viernes: 5, sabado: 6
            };

            const daysRegex = /(Lunes|Martes|Mi[eé]rcoles|Jueves|Viernes|S[áa]bado|Domingo)/gi;
            const matches = schedule.match(daysRegex);

            if (!matches) {
                return <div className="w-full text-center text-sm">--</div>;
            }

            const deliveryDays = [...new Set(matches)].map(day => {
                const normalizedDay = day.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return daysOfWeek[normalizedDay];
            }).filter(day => day !== undefined);

            if (deliveryDays.length === 0) {
                return <div className="w-full text-center text-sm">--</div>;
            }

            let deliveryDate = new Date(createdAt);
            deliveryDate.setDate(deliveryDate.getDate() + 1); // Start checking from the next day

            while (!deliveryDays.includes(deliveryDate.getDay())) {
                deliveryDate.setDate(deliveryDate.getDate() + 1);
            }

            const formattedDeliveryDate = deliveryDate.toLocaleDateString('es-AR', {
                weekday: 'short',
                day: '2-digit',
                month: '2-digit',
            }).replace(/[,.]/g, '').toLowerCase();


            return (
                <div className="flex h-full w-full items-center justify-center text-center">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {formattedDeliveryDate || '--'}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: 'deliveryArea.schedule',
        header: 'Rango Horario',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const deliveryArea = row.original.deliveryArea;
            if (!deliveryArea?.schedule) return <div className="min-w-[90px] text-sm">N/A</div>;

            // Extraer solo las horas del schedule
            const schedule = deliveryArea.schedule;
            // Buscar patrones de horas como "10hs", "17hs", "10:00", etc.
            const hourMatches = schedule.match(/(\d{1,2})(?::\d{2})?(?:hs?)?/g);

            if (hourMatches && hourMatches.length >= 2) {
                const startHour = hourMatches[0].replace(/[^\d]/g, '');
                const endHour = hourMatches[hourMatches.length - 1].replace(/[^\d]/g, '');
                return <div className="min-w-[90px] text-sm whitespace-normal break-words">De {startHour} a {endHour}hs aprox</div>;
            }

            // Si no se puede extraer, mostrar el schedule original pero más corto
            return <div className="min-w-[90px] text-sm whitespace-normal break-words">{schedule.length > 20 ? schedule.substring(0, 20) + '...' : schedule}</div>;
        }
    },
    {
        accessorKey: 'notesOwn',
        header: 'Notas Cliente',
        cell: ({ row }: CellContext<Order, unknown>) => {
            return (
                <Input
                    placeholder="Nota..."
                    className="min-w-[100px] h-7 text-xs"
                    defaultValue=""
                />
            );
        }
    },
    {
        accessorKey: 'user.name',
        header: 'Cliente',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const user = row.original.user as Order['user'];
            return <div className="min-w-[120px] text-sm whitespace-normal break-words">{user ? `${user.name} ${user.lastName}` : 'N/A'}</div>;
        },
    },
    {
        accessorKey: 'address.address',
        header: 'Dirección',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const address = row.original.address as Order['address'];
            return <div className="min-w-[40px] text-sm whitespace-normal break-words">{address ? `${address.address}, ${address.city}` : 'N/A'}</div>;
        }
    },
    {
        accessorKey: 'address.phone',
        header: 'Teléfono',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const address = row.original.address as Order['address'];
            return <div className="min-w-[10px] text-sm">{address ? address.phone : 'N/A'}</div>;
        }
    },
    {
        accessorKey: 'items',
        header: 'Items',
        enableSorting: false,
        cell: ({ row }: CellContext<Order, unknown>) => {
            const items = row.original.items as Order['items'];
            return (
                <div className="min-w-[120px] text-sm whitespace-normal break-words">
                    {items.map((item, index) => (
                        <div key={`${item.id}-${index}`}>{item.name} x{(item.options[0] as any)?.quantity || 1}</div>
                    ))}
                </div>
            );
        }
    },
    {
        accessorKey: 'paymentMethod',
        header: 'Medio de pago',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const paymentMethod = row.original.paymentMethod || '';
            const translatedPaymentMethod = paymentMethodTranslations[paymentMethod.toLowerCase()] || paymentMethod;
            return <div className="min-w-[100px] text-sm">{translatedPaymentMethod}</div>;
        }
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const status = row.getValue('status') as Order['status'];
            const translatedStatus = statusTranslations[status] || status;
            return <Badge variant={status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">{translatedStatus}</Badge>;
        }
    },
    {
        accessorKey: 'total',
        header: () => <div className="w-full text-right">Total</div>,
        cell: ({ row }: CellContext<Order, unknown>) => {
            const amount = parseFloat(row.getValue('total') as string);
            const formatted = new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
            }).format(amount);
            return <div className="font-medium text-right min-w-[80px] text-sm">{formatted}</div>;
        }
    },
    {
        accessorKey: 'notes',
        header: 'Notas',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const address = row.original.address as Order['address'];
            const notes = row.original.notes || '';

            let addressInfo = '';
            if (address) {
                const parts = [];
                if (address.betweenStreets) parts.push(`Entre: ${address.betweenStreets}`);
                if (address.floorNumber) parts.push(`Piso: ${address.floorNumber}`);
                if (address.departmentNumber) parts.push(`Depto: ${address.departmentNumber}`);
                addressInfo = parts.join(' | ');
            }

            const allNotes = [notes, addressInfo].filter(Boolean).join(' | ');
            return <div className="min-w-[120px] text-sm whitespace-normal break-words">{allNotes || 'N/A'}</div>;
        }
    },
    {
        accessorKey: 'user.email',
        header: 'Mail',
        cell: ({ row }: CellContext<Order, unknown>) => {
            const user = row.original.user as Order['user'];
            return <div className="min-w-[10px] text-sm whitespace-normal break-words">{user ? user.email : 'N/A'}</div>;
        }
    },
]; 