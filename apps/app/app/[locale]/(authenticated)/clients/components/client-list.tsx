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
import { type ClientData } from '@repo/data-services';
import { type Dictionary } from '@repo/internationalization';
import { ClientForm } from './client-form';
import { getClientColumns } from './columns';
import { DataTable } from '@/components/data-table';
import { UserData } from '@repo/data-services/src/types/user';

interface ClientListProps {
    clients: ClientData[];
    dictionary: Dictionary;
    user: UserData;
    sellers: UserData[];
}

export function ClientList({ clients, dictionary, user, sellers }: ClientListProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientData | undefined>(undefined);
    const router = useRouter();

    const handleFormSuccess = () => {
        setIsDialogOpen(false);
        router.refresh();
    };

    const openDialog = (client?: ClientData) => {
        setSelectedClient(client);
        setIsDialogOpen(true);
    };

    const columns = useMemo(() => getClientColumns(openDialog), [openDialog]);

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button onClick={() => openDialog()}>
                    {dictionary.app.admin.clients.form.createTitle}
                </Button>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedClient
                                ? dictionary.app.admin.clients.form.editTitle
                                : dictionary.app.admin.clients.form.createTitle}
                        </DialogTitle>
                    </DialogHeader>
                    <ClientForm
                        client={selectedClient}
                        onSuccess={handleFormSuccess}
                        dictionary={dictionary}
                        user={user}
                        sellers={sellers}
                    />
                </DialogContent>
            </Dialog>

            <DataTable columns={columns} data={clients} />
        </div>
    );
} 