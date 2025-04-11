'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import ProductModal from './ProductModal';
import { deleteProduct } from '@repo/data-services';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@repo/design-system/components/ui/carousel';
import { Skeleton } from '@repo/design-system/components/ui/skeleton';
import type { Dictionary } from '@repo/internationalization';

interface Product {
    id: string;
    title: string;
    description: string;
    images: string[];
    status: string;
    size: string;
    detailedDescription: string;
    features: string[];
    technologies: string[];
    status_description: string;
}

interface ProductsClientProps {
    initialProducts: Product[];
    showModal: boolean;
    editingProduct: Product | null;
    dictionary: Dictionary;
}

export default function ProductsClient({ initialProducts, showModal, editingProduct, dictionary }: ProductsClientProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleOpenCreate = () => {
        router.push(`${pathname}?modal=create`);
    };

    const handleOpenEdit = (product: Product) => {
        router.push(`${pathname}?modal=edit&productId=${product.id}`);
    };

    const handleCloseModal = () => {
        router.push(pathname);
    };

    const handleDelete = async (id: string) => {
        if (confirm(dictionary.app.admin.products.deleteConfirmation || '¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                await deleteProduct(id);
                // No es necesario actualizar el estado local, ya que revalidate se encarga de eso
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    // Function to render the status badge with appropriate color
    const renderStatusBadge = (status: string) => {
        let colorClass = '';

        switch (status) {
            case 'Published':
                colorClass = 'bg-green-100 text-green-800';
                break;
            case 'Draft':
                colorClass = 'bg-yellow-100 text-yellow-800';
                break;
            case 'Archived':
                colorClass = 'bg-gray-100 text-gray-800';
                break;
            default:
                colorClass = 'bg-blue-100 text-blue-800';
        }

        return (
            <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
                {dictionary.app.admin.products.status?.[status.toLowerCase() as keyof typeof dictionary.app.admin.products.status] || status}
            </span>
        );
    };

    return (
        <div className="space-y-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">{dictionary.app.admin.products.title || 'Product Dashboard'}</h1>
                <button
                    onClick={handleOpenCreate}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-300 transition ease-in-out duration-150"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    {dictionary.app.admin.products.newProduct || 'New Product'}
                </button>
            </div>

            {initialProducts.length === 0 ? (
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400">{dictionary.app.admin.products.noProducts || 'No products found. Create your first product!'}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialProducts.map((product) => (
                        <div key={product.id} className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden transition-all hover:shadow-md">
                            <div className="aspect-video w-full overflow-hidden relative">
                                <Carousel className="w-full h-full">
                                    <CarouselContent className="h-full">
                                        {product.images.length > 0 ? (
                                            product.images.map((image, index) => (
                                                <CarouselItem key={index} className="h-full">
                                                    <div className="h-full w-full flex items-center justify-center overflow-hidden">
                                                        <Image
                                                            src={image || ''}
                                                            alt={`${product.title} - image ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                            width={500}
                                                            height={300}
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                </CarouselItem>
                                            ))
                                        ) : (
                                            <CarouselItem className="h-full">
                                                <Skeleton className="w-full h-full" />
                                            </CarouselItem>
                                        )}
                                    </CarouselContent>
                                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8" />
                                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8" />
                                </Carousel>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-lg font-medium truncate">{product.title}</h2>
                                    {renderStatusBadge(product.status)}
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 mb-3 text-sm line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="mb-3">
                                    <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">{dictionary.app.admin.products.technologies || 'Technologies'}</h3>
                                    <div className="flex flex-wrap gap-1">
                                        {product.technologies.map((tech, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-zinc-700 rounded text-xs">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2 mt-4">
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="p-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-zinc-700"
                                        title={dictionary.app.admin.products.delete || 'Delete'}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleOpenEdit(product)}
                                        className="p-2 rounded-md text-blue-600 hover:bg-blue-50 dark:hover:bg-zinc-700"
                                        title={dictionary.app.admin.products.edit || 'Edit'}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Product Modal for Create/Edit */}
            {showModal && (
                <ProductModal
                    product={editingProduct}
                    onClose={handleCloseModal}
                    dictionary={dictionary}
                />
            )}
        </div>
    );
}