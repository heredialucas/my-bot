'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState,
    type PaginationState,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@repo/design-system/components/ui/table';
import { Input } from '@repo/design-system/components/ui/input';
import { Button } from '@repo/design-system/components/ui/button';
import { Select } from '@repo/design-system/components/ui/select';
import { Badge } from '@repo/design-system/components/ui/badge';
import { updateOrderAction } from '../actions';

interface DataTableProps<TData extends { _id: string }, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageCount: number;
    total: number;
    pagination: PaginationState;
    sorting: SortingState;
}

export function OrdersDataTable<TData extends { _id: string }, TValue>({
    columns,
    data,
    pageCount,
    total,
    pagination,
    sorting,
}: DataTableProps<TData, TValue>) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Estado local para el valor del input de búsqueda
    const [globalFilter, setGlobalFilter] = React.useState(searchParams.get('search') ?? '');
    const [editingRowId, setEditingRowId] = React.useState<string | null>(null);
    const [editValues, setEditValues] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false);

    // Función para determinar si una fila debe ser roja
    const shouldHighlightRow = (row: any) => {
        const status = row.original.status;
        const paymentMethod = row.original.paymentMethod?.toLowerCase();

        return status === 'pending' && (
            paymentMethod === 'mercado pago' ||
            paymentMethod === 'transferencia bancaria' ||
            paymentMethod === 'bank-transfer'
        );
    };

    const table = useReactTable({
        data,
        columns,
        pageCount,
        state: {
            sorting,
            pagination,
            globalFilter,
        },
        getRowId: (row) => row._id,
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: (updater) => {
            const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
            const params = new URLSearchParams(searchParams);
            params.set('page', (newPagination.pageIndex + 1).toString());
            params.set('pageSize', newPagination.pageSize.toString());
            router.push(`${pathname}?${params.toString()}`);
        },
        onSortingChange: (updater) => {
            const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
            const params = new URLSearchParams(searchParams);
            if (newSorting.length > 0) {
                params.set('sort', `${newSorting[0].id}.${newSorting[0].desc ? 'desc' : 'asc'}`);
            } else {
                params.delete('sort');
            }
            router.push(`${pathname}?${params.toString()}`);
        },
    });

    // Debounce para la búsqueda
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            params.set('page', '1');
            params.set('search', globalFilter);
            router.push(`${pathname}?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timeout);
    }, [globalFilter, pathname, router, searchParams]);

    const handleEditClick = (row: any) => {
        setEditingRowId(row.id);
        setEditValues({
            notes: row.original.notes || '',
            notesOwn: row.original.notesOwn || '',
            status: row.original.status || '',
            address: row.original.address?.address || '',
            city: row.original.address?.city || '',
            phone: row.original.address?.phone || '',
            paymentMethod: row.original.paymentMethod || '',
            userName: row.original.user?.name || '',
            userLastName: row.original.user?.lastName || '',
            userEmail: row.original.user?.email || '',
            total: row.original.total || 0,
            subTotal: row.original.subTotal || 0,
            shippingPrice: row.original.shippingPrice || 0,
            deliveryAreaSchedule: row.original.deliveryArea?.schedule || '',
        });
    };

    const handleCancel = () => {
        setEditingRowId(null);
        setEditValues({});
    };

    const handleChange = (field: string, value: any) => {
        setEditValues((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSave = async (row: any) => {
        setLoading(true);
        try {
            const result = await updateOrderAction(row.id, {
                notes: editValues.notes,
                notesOwn: editValues.notesOwn,
                status: editValues.status,
                paymentMethod: editValues.paymentMethod,
                total: Number(editValues.total),
                subTotal: Number(editValues.subTotal),
                shippingPrice: Number(editValues.shippingPrice),
                address: {
                    ...row.original.address,
                    address: editValues.address,
                    city: editValues.city,
                    phone: editValues.phone,
                },
                user: {
                    ...row.original.user,
                    name: editValues.userName,
                    lastName: editValues.userLastName,
                    email: editValues.userEmail,
                },
                deliveryArea: {
                    ...row.original.deliveryArea,
                    schedule: editValues.deliveryAreaSchedule,
                },
            });
            if (!result.success) throw new Error(result.error || 'Error al guardar');
            setEditingRowId(null);
            setEditValues({});
            router.refresh();
        } catch (e) {
            alert(e instanceof Error ? e.message : 'Error al guardar los cambios');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Buscar en todas las columnas..."
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table className="table-fixed w-full border-collapse">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => (
                                    <TableHead
                                        key={header.id}
                                        className="p-1 text-xs border-r border-border"
                                        style={{
                                            width: index === 0 ? '60px' :  // Fecha
                                                index === 1 ? '90px' : // Día Entrega
                                                    index === 2 ? '100px' : // Rango Horario
                                                        index === 3 ? '110px' : // Notas Cliente
                                                            index === 4 ? '130px' : // Cliente
                                                                index === 5 ? '140px' : // Dirección
                                                                    index === 6 ? '100px' : // Teléfono
                                                                        index === 7 ? '125px' : // Items
                                                                            index === 8 ? '100px' : // Medio de pago
                                                                                index === 9 ? '95px' : // Estado
                                                                                    index === 10 ? '100px' :// Total
                                                                                        index === 11 ? '150px' : // Notas
                                                                                            index === 12 ? '180px' : // Mail
                                                                                                '150px'
                                        }}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <Button
                                                variant="ghost"
                                                onClick={header.column.getToggleSortingHandler()}
                                                disabled={!header.column.getCanSort()}
                                                className="h-6 px-1 text-xs"
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </Button>
                                        )}
                                    </TableHead>
                                ))}
                                <TableHead className="p-1 text-xs border-r border-border" style={{ width: '80px' }}>Acciones</TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className={shouldHighlightRow(row) ? 'bg-red-100 dark:bg-red-900/40' : ''}
                                >
                                    {row.getVisibleCells().map((cell, index) => {
                                        let extraClass = '';
                                        if (index === 0) {
                                            const createdAtObj = (row.original as any)['createdAt'];
                                            let date: Date | null = null;
                                            if (createdAtObj instanceof Date) {
                                                date = createdAtObj;
                                            } else if (createdAtObj?.$date) {
                                                date = new Date(createdAtObj.$date);
                                            } else if (typeof createdAtObj === 'string' || typeof createdAtObj === 'number') {
                                                date = new Date(createdAtObj);
                                            }
                                            if (date) {
                                                const day = date.getDay();
                                                extraClass = {
                                                    1: 'bg-green-100',    // Lunes (verde suave)
                                                    2: 'bg-yellow-100',   // Martes (amarillo suave)
                                                    3: 'bg-red-100',      // Miércoles (rojo suave)
                                                    4: 'bg-amber-200',    // Jueves (ámbar/marrón suave)
                                                    6: 'bg-blue-100',     // Sábado (azul suave)
                                                }[day] || '';
                                            }
                                        }
                                        // Edición inline para campos editables
                                        if (editingRowId === row.id) {
                                            console.log('Columna:', cell.column.id);
                                            if (cell.column.id === 'notes') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Input
                                                            value={editValues.notes}
                                                            onChange={e => handleChange('notes', e.target.value)}
                                                            className="w-full text-xs"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'notesOwn') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Input
                                                            value={editValues.notesOwn}
                                                            onChange={e => handleChange('notesOwn', e.target.value)}
                                                            className="w-full text-xs"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'status') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Select
                                                            value={editValues.status}
                                                            onValueChange={val => handleChange('status', val)}
                                                        >
                                                            <option value="pending">Pendiente</option>
                                                            <option value="confirmed">Confirmado</option>
                                                            <option value="delivered">Entregado</option>
                                                            <option value="cancelled">Cancelado</option>
                                                        </Select>
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'paymentMethod') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Input
                                                            value={editValues.paymentMethod}
                                                            onChange={e => handleChange('paymentMethod', e.target.value)}
                                                            className="w-full text-xs"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'total') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Input
                                                            type="number"
                                                            value={editValues.total}
                                                            onChange={e => handleChange('total', e.target.value)}
                                                            className="w-full text-xs"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'subTotal') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Input
                                                            type="number"
                                                            value={editValues.subTotal}
                                                            onChange={e => handleChange('subTotal', e.target.value)}
                                                            className="w-full text-xs"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'shippingPrice') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Input
                                                            type="number"
                                                            value={editValues.shippingPrice}
                                                            onChange={e => handleChange('shippingPrice', e.target.value)}
                                                            className="w-full text-xs"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'address_address') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Input
                                                            value={editValues.address}
                                                            onChange={e => handleChange('address', e.target.value)}
                                                            className="w-full text-xs"
                                                            placeholder="Dirección"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'address_city') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Input
                                                            value={editValues.city}
                                                            onChange={e => handleChange('city', e.target.value)}
                                                            className="w-full text-xs"
                                                            placeholder="Ciudad"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'address_phone') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Input
                                                            value={editValues.phone}
                                                            onChange={e => handleChange('phone', e.target.value)}
                                                            className="w-full text-xs"
                                                            placeholder="Teléfono"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'user_name' || cell.column.id === 'name') {
                                                console.log('DEBUG user_name:', { id: cell.column.id, editValues });
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <div className="flex gap-1">
                                                            <Input
                                                                value={editValues.userName}
                                                                onChange={e => handleChange('userName', e.target.value)}
                                                                className="w-1/2 text-xs"
                                                                placeholder="Nombre"
                                                            />
                                                            <Input
                                                                value={editValues.userLastName}
                                                                onChange={e => handleChange('userLastName', e.target.value)}
                                                                className="w-1/2 text-xs"
                                                                placeholder="Apellido"
                                                            />
                                                        </div>
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'user_lastName') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Input
                                                            value={editValues.userLastName}
                                                            onChange={e => handleChange('userLastName', e.target.value)}
                                                            className="w-full text-xs"
                                                            placeholder="Apellido"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'user_email' || cell.column.id === 'email') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Input
                                                            value={editValues.userEmail}
                                                            onChange={e => handleChange('userEmail', e.target.value)}
                                                            className="w-full text-xs"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            if (cell.column.id === 'deliveryArea.schedule') {
                                                return (
                                                    <TableCell key={cell.id} className="p-1 border-r border-border">
                                                        <Input
                                                            value={editValues.deliveryAreaSchedule}
                                                            onChange={e => handleChange('deliveryAreaSchedule', e.target.value)}
                                                            className="w-full text-xs"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                        }
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={`p-1 border-r border-border ${extraClass}`}
                                                style={{
                                                    width: index === 0 ? '60px' :  // Fecha
                                                        index === 1 ? '90px' : // Día Entrega
                                                            index === 2 ? '100px' : // Rango Horario
                                                                index === 3 ? '110px' : // Notas Cliente
                                                                    index === 4 ? '130px' : // Cliente
                                                                        index === 5 ? '140px' : // Dirección
                                                                            index === 6 ? '100px' : // Teléfono
                                                                                index === 7 ? '180px' : // Mail
                                                                                    index === 8 ? '125px' : // Items
                                                                                        index === 9 ? '100px' : // Medio de pago
                                                                                            index === 10 ? '95px' : // Estado
                                                                                                index === 11 ? '100px' :// Total
                                                                                                    '150px'  // Notas
                                                }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}
                                    {/* Botón de acción */}
                                    <TableCell className="p-1 border-r border-border">
                                        {editingRowId === row.id ? (
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="default" onClick={() => handleSave(row)} disabled={loading}>Guardar</Button>
                                                <Button size="sm" variant="outline" onClick={handleCancel} disabled={loading}>Cancelar</Button>
                                            </div>
                                        ) : (
                                            <Button size="sm" variant="outline" onClick={() => handleEditClick(row)}>Editar</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                                    No se encontraron resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                    Mostrando {table.getRowModel().rows.length} de {total} órdenes.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    );
} 