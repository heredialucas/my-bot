import { DialogContent, DialogTitle } from '@repo/design-system/components/ui/dialog';
import { getDictionary } from '@repo/internationalization';
import { ToCall } from './components/toCall';
import DialogWrapper from './components/dialog-wrapper';

type ToCallModalProps = {
    params: Promise<{
        locale: string;
    }>;
};

export default async function ToCallModal({ params }: ToCallModalProps) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale as any);

    return (
        <DialogWrapper>
            <DialogContent className="max-w-md w-11/12 p-6 border-none">
                <DialogTitle className="text-2xl font-bold text-center mb-4">
                    ¿Quieres que te llamemos?
                </DialogTitle>
                <ToCall dictionary={dictionary} />
            </DialogContent>
        </DialogWrapper>
    );
} 