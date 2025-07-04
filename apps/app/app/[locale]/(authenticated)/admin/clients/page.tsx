import { getDictionary } from '@repo/internationalization';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { ClientList } from './components/ClientList';
import type { Client } from '@repo/database';
import { Decimal } from '@prisma/client/runtime/library';

const title = 'Clientes';
const description = 'Administra tus clientes y sus datos de contacto.';

export const metadata: Metadata = createMetadata({
    title,
    description,
});

// --- Mock Data ---
const mockClientsData: Client[] = [
    {
        id: '1',
        firstName: 'Juan',
        lastName: 'Perez',
        email: 'juan.perez@example.com',
        phone: '11-1234-5678',
        address: 'Av. Corrientes 1234',
        accountBalance: new Decimal('2500.50'),
        sellerId: 'seller-1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        firstName: 'Maria',
        lastName: 'Gomez',
        email: 'maria.gomez@example.com',
        phone: '11-8765-4321',
        address: 'Calle Falsa 123',
        accountBalance: new Decimal('0'),
        sellerId: 'seller-1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '3',
        firstName: 'Carlos',
        lastName: 'Rodriguez',
        email: 'carlos.r@example.com',
        phone: '11-5555-5555',
        address: 'Av. de Mayo 567',
        accountBalance: new Decimal('-150.00'),
        sellerId: 'seller-2',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
// -----------------

export default async function ClientsPage({
    params: { locale },
}: {
    params: { locale: string };
}) {
    const dictionary = await getDictionary(locale);
    // En un futuro, estos datos vendrán de un service:
    // Serializamos el campo 'accountBalance' a string para pasarlo al Client Component
    const clients = mockClientsData.map(client => ({
        ...client,
        accountBalance: client.accountBalance.toString(),
    }));

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <ClientList clients={clients} />
        </div>
    );
} 