"use client";

import { Dialog, DialogContent, DialogTitle } from '@repo/design-system/components/ui/dialog';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

export default function DialogWrapper({ children, title }: { children: React.ReactNode, title: string }) {
    const router = useRouter();

    return (
        <Dialog
            open={true}
            onOpenChange={(open) => !open && router.back()}
        >
            <DialogContent className="max-w-xl h-[80vh] w-11/12 p-0 overflow-hidden">
                <DialogTitle className="sr-only">{title}</DialogTitle>
                <ScrollArea className="h-full max-h-[80vh] w-full">
                    {children}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}