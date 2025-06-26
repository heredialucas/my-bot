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
                                                index === 1 ? '115px' : // Día Entrega
                                                    index === 2 ? '100px' : // Rango Horario
                                                        index === 3 ? '110px' : // Notas Cliente
                                                            index === 4 ? '140px' : // Cliente
                                                                index === 5 ? '140px' : // Dirección
                                                                    index === 6 ? '100px' : // Teléfono
                                                                        index === 7 ? '180px' : // Mail
                                                                            index === 8 ? '200px' : // Items
                                                                                index === 9 ? '100px' : // Medio de pago
                                                                                    index === 10 ? '95px' : // Estado
                                                                                        index === 11 ? '100px' :// Total
                                                                                            '150px'  // Notas
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
                                    {row.getVisibleCells().map((cell, index) => (
                                        <TableCell
                                            key={cell.id}
                                            className="p-1 border-r border-border"
                                            style={{
                                                width: index === 0 ? '60px' :  // Fecha
                                                    index === 1 ? '115px' : // Día Entrega
                                                        index === 2 ? '100px' : // Rango Horario
                                                            index === 3 ? '110px' : // Notas Cliente
                                                                index === 4 ? '140px' : // Cliente
                                                                    index === 5 ? '140px' : // Dirección
                                                                        index === 6 ? '100px' : // Teléfono
                                                                            index === 7 ? '180px' : // Mail
                                                                                index === 8 ? '200px' : // Items
                                                                                    index === 9 ? '100px' : // Medio de pago
                                                                                        index === 10 ? '95px' : // Estado
                                                                                            index === 11 ? '100px' :// Total
                                                                                                '150px'  // Notas
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
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