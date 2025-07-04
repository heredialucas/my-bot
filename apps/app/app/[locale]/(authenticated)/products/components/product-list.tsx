'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@repo/design-system/components/ui/dialog';
import { Button } from '@repo/design-system/components/ui/button';
import { ProductData } from '@repo/data-services';
import { type Dictionary } from '@repo/internationalization';
import { getProductColumns } from './columns';
import { ProductForm } from './product-form';
import { DataTable } from '@/components/data-table';

interface ProductListProps {
    products: ProductData[];
    dictionary: Dictionary;
}

export function ProductList({ products, dictionary }: ProductListProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductData | undefined>(undefined);
    const router = useRouter();

    const handleFormSuccess = () => {
        setIsDialogOpen(false);
        router.refresh();
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
                    <ProductForm
                        product={selectedProduct}
                        onSuccess={handleFormSuccess}
                        dictionary={dictionary}
                    />
                </DialogContent>
            </Dialog>

            <DataTable columns={columns} data={products} />
        </div>
    );
} 