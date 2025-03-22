"use client";

import { Dialog, DialogContent, DialogTitle } from '@repo/design-system/components/ui/dialog';
import Detail from './components/detail';
import { useRouter } from 'next/navigation';

export default function DetailModal() {
    const router = useRouter();

    return (
        <Dialog
            open={true}
            onOpenChange={(open) => !open && router.back()}
        >
            <DialogContent className="max-w-6xl w-11/12 p-0 overflow-hidden">
                <DialogTitle className="sr-only">Plan Details</DialogTitle>
                <Detail />
            </DialogContent>
        </Dialog>
    );
}