'use client';

import { useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { type ProductData } from '@repo/data-services';
import { type Dictionary } from '@repo/internationalization';
import { deleteProductAction } from '../actions';

export const getProductColumns = (
    openDialog: (product?: ProductData) => void,
    dictionary: Dictionary['app']['admin']['products'],
): ColumnDef<ProductData>[] => [
        {
            accessorKey: 'name',
            header: dictionary.table.name,
        },
        {
            accessorKey: 'sku',
            header: 'Código',
        },
        {
            accessorKey: 'price',
            header: dictionary.table.price,
            cell: ({ row }) => {
                const price = parseFloat(row.getValue('price'));
                const formatted = new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                }).format(price);
                return <div className="font-medium">{formatted}</div>;
            },
        },
        {
            accessorKey: 'quantityInStock',
            header: dictionary.table.stock,
            cell: ({ row }) => {
                const stock = row.getValue('quantityInStock') as number;
                return (
                    <div className={`font-medium ${stock <= 10 ? 'text-red-600' : stock <= 50 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {stock}
                    </div>
                );
            },
        },
        {
            accessorKey: 'description',
            header: 'Descripción',
            cell: ({ row }) => {
                const description = row.getValue('description') as string | null;
                return (
                    <div className="max-w-32 truncate">
                        {description || '-'}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const product = row.original;
                const router = useRouter();
                const { toast } = useToast();
                const [isDeleting, setIsDeleting] = useState(false);

                const handleDelete = async () => {
                    if (!confirm(`¿Estás seguro de que quieres eliminar el producto "${product.name}"?`)) {
                        return;
                    }

                    setIsDeleting(true);
                    try {
                        const result = await deleteProductAction(product.id);
                        if (result.success) {
                            toast({
                                title: 'Éxito',
                                description: result.message,
                            });
                            router.refresh();
                        } else {
                            toast({
                                title: 'Error',
                                description: result.message,
                                variant: 'destructive',
                            });
                        }
                    } catch (error) {
                        toast({
                            title: 'Error',
                            description: 'No se pudo eliminar el producto.',
                            variant: 'destructive',
                        });
                    } finally {
                        setIsDeleting(false);
                    }
                };

                return (
                    <div className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openDialog(product)}>
                                    {dictionary.table.edit}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push(`/products/${product.id}`)}>
                                    Ver Detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleDelete}
                                    className="text-red-600 focus:text-red-600"
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Eliminando...' : 'Eliminar Producto'}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ]; 