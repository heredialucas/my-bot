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
import { type InventoryData } from '@repo/data-services/src/types/product';
import { type ProductData } from '@repo/data-services/src/types/product';
import { type Dictionary } from '@repo/internationalization';
import { getInventoryColumns } from './columns';
import { InventoryForm } from './inventory-form';
import { AddProductForm } from './add-product-form';
import { DataTable } from '@/components/data-table';

interface InventoryListProps {
    inventory: InventoryData[];
    availableProducts: ProductData[];
    dictionary: Dictionary;
}

export function InventoryList({ inventory, availableProducts, dictionary }: InventoryListProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InventoryData | undefined>(undefined);
    const router = useRouter();

    const handleFormSuccess = () => {
        setIsEditDialogOpen(false);
        setIsAddDialogOpen(false);
        router.refresh();
    };

    const openEditDialog = (item?: InventoryData) => {
        setSelectedItem(item);
        setIsEditDialogOpen(true);
    };

    const openAddDialog = () => {
        setIsAddDialogOpen(true);
    };

    // Filter products that are not already in the seller's inventory
    const productsNotInInventory = availableProducts.filter(
        product => !inventory.some(inv => inv.productId === product.id)
    );

    const columns = useMemo(() => getInventoryColumns(openEditDialog, dictionary.app.admin.inventory), [dictionary]);

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button onClick={openAddDialog}>
                    Agregar Producto al Inventario
                </Button>
            </div>

            {/* Edit Inventory Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dictionary.app.admin.inventory.form.title}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedItem && (
                        <InventoryForm
                            item={selectedItem}
                            onSuccess={handleFormSuccess}
                            dictionary={dictionary}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Add Product Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Agregar Producto al Inventario
                        </DialogTitle>
                    </DialogHeader>
                    <AddProductForm
                        availableProducts={productsNotInInventory}
                        onSuccess={handleFormSuccess}
                        dictionary={dictionary}
                    />
                </DialogContent>
            </Dialog>

            <DataTable columns={columns} data={inventory} />
        </div>
    );
} 