'use client';

import { useState, useMemo } from 'react';
import { useFormStatus } from 'react-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@repo/design-system/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@repo/design-system/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@repo/design-system/components/ui/alert-dialog"
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import { ProductData } from '@repo/data-services';
import { type Dictionary } from '@repo/internationalization';
import { getProductColumns } from './columns';
import { DataTable } from '@/components/data-table';
import { deleteProductAction } from '../actions';

interface ProductListProps {
    products: ProductData[];
    dictionary: Dictionary;
}

function DeleteButton({ productId }: { productId: string }) {
    const { pending } = useFormStatus();
    const { toast } = useToast();

    const handleDelete = async () => {
        const result = await deleteProductAction(productId);
        toast({
            title: result.success ? 'Éxito' : 'Error',
            description: result.message,
            variant: result.success ? 'default' : 'destructive',
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={pending}>Eliminar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente el producto.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Sí, eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function ProductList({ products, dictionary }: ProductListProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductData | undefined>(undefined);

    const handleFormSuccess = () => {
        setIsDialogOpen(false);
    };

    const openDialog = (product?: ProductData) => {
        setSelectedProduct(product);
        setIsDialogOpen(true);
    };

    const columns = useMemo(() => getProductColumns(openDialog, dictionary.app.admin.products), [dictionary]);

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button onClick={() => openDialog()}>
                    {dictionary.app.admin.products.newProduct}
                </Button>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedProduct
                                ? dictionary.app.admin.products.form.editTitle
                                : dictionary.app.admin.products.form.createTitle}
                        </DialogTitle>
                    </DialogHeader>
                    {/* <ProductForm
                        product={selectedProduct}
                        onSuccess={handleFormSuccess}
                        dictionary={dictionary}
                    /> */}
                    <div>Product form will be here</div>
                </DialogContent>
            </Dialog>

            <DataTable columns={columns} data={products} />
        </div>
    );
} 