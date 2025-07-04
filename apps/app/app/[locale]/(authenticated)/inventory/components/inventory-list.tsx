'use client';

import { useState, useMemo } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@repo/design-system/components/ui/dialog';
import { Button } from '@repo/design-system/components/ui/button';
import { type InventoryData } from '@repo/data-services/src/types/product';
import { type Dictionary } from '@repo/internationalization';
import { getInventoryColumns } from './columns';
import { DataTable } from '@/components/data-table';
// Asumo que existirá un InventoryForm
// import { InventoryForm } from './inventory-form';

interface InventoryListProps {
    inventory: InventoryData[];
    dictionary: Dictionary;
}

export function InventoryList({ inventory, dictionary }: InventoryListProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InventoryData | undefined>(undefined);

    const handleFormSuccess = () => {
        setIsDialogOpen(false);
    };

    const openDialog = (item?: InventoryData) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    const columns = useMemo(() => getInventoryColumns(openDialog, dictionary.app.admin.inventory), [dictionary]);

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dictionary.app.admin.inventory.form.title}
                        </DialogTitle>
                    </DialogHeader>
                    {/* <InventoryForm
                        item={selectedItem}
                        onSuccess={handleFormSuccess}
                        dictionary={dictionary}
                    /> */}
                    <div>Inventory form will be here</div>
                </DialogContent>
            </Dialog>

            <DataTable columns={columns} data={inventory} />
        </div>
    );
} 