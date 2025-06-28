'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/design-system/components/ui/select';

export function ClientTypeFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentClientType = searchParams.get('clientType') || 'all';

    const handleClientTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value && value !== 'all') {
            params.set('clientType', value);
        } else {
            params.delete('clientType');
        }

        // Reset to first page when filtering
        params.set('page', '1');

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Tipo Cliente:</span>
            <Select value={currentClientType} onValueChange={handleClientTypeChange}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="minorista">Minorista</SelectItem>
                    <SelectItem value="mayorista">Mayorista</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
} 