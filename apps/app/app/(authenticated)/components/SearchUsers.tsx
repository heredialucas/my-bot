'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Input } from '@repo/design-system/components/ui/input';
import { Button } from '@repo/design-system/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchUsersProps {
    onSearch?: (query: string) => void;
}

export const SearchUsers = ({ onSearch }: SearchUsersProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (onSearch) {
            // Si se proporciona onSearch, usamos el callback
            onSearch(searchTerm);
        } else {
            // Si no, usamos la navegación estándar
            router.push(`${pathname}?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className="my-6">
            <form
                onSubmit={handleSubmit}
                className="flex gap-2 items-center"
            >
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-zinc-400" />
                    <Input
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Buscar usuarios por nombre o email"
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button type="submit" variant="default">Buscar</Button>
            </form>
        </div>
    );
}; 