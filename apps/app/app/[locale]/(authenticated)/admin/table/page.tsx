import { getOrders } from '@repo/data-services/src/services/barfer';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@repo/design-system/components/ui/table';
import { Badge } from '@repo/design-system/components/ui/badge';
import { getDictionary } from '@repo/internationalization';
import type { Locale } from '@repo/internationalization';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@repo/design-system/components/ui/pagination';

const ITEMS_PER_PAGE = 20;

export default async function TablePage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: Locale }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { locale } = await params;
    const { page } = await searchParams || { page: '1' };
    const currentPage = Number(page) || 1;
    const { orders, total } = await getOrders(currentPage, ITEMS_PER_PAGE);
    const dictionary = await getDictionary(locale);
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return (
        <div className="p-4 sm:p-6 flex flex-col h-full">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    {/* TODO: Move to dictionary */}
                    Tabla de Órdenes
                </h1>
                <p className="text-muted-foreground">
                    {/* TODO: Move to dictionary */}
                    Una lista de todas las órdenes. Mostrando {orders.length} de {total}.
                </p>
            </div>
            <div className="flex-grow overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Dirección</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Fecha de Entrega</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell className="font-medium">{order.user ? `${order.user.name} ${order.user.lastName}` : 'N/A'}</TableCell>
                                <TableCell>{order.address ? `${order.address.address}, ${order.address.city}` : 'N/A'}</TableCell>
                                <TableCell>
                                    <ul>
                                        {order.items.map(item => (
                                            <li key={item.id}>{item.name} x {(item.options[0] as any)?.quantity || 1}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>{order.deliveryArea?.schedule || 'No especificada'}</TableCell>
                                <TableCell>
                                    <Badge variant={order.status === 'confirmed' ? 'default' : 'secondary'}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>${order.total.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-auto pt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={`/admin/table?page=${currentPage - 1}`}
                                className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                        {/* Basic pagination numbers - can be improved later */}
                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink href={`/admin/table?page=${i + 1}`} isActive={currentPage === i + 1}>
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}
                        <PaginationItem>
                            <PaginationNext
                                href={`/admin/table?page=${currentPage + 1}`}
                                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
} 