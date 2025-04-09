import { getAllProducts, getProductById } from '@repo/data-services';
import ProductsClient from './components/ProductsClient';
import { Suspense } from 'react';
import { getDictionary } from '@repo/internationalization';

export default async function AdminDashboard({
    params,
    searchParams
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{
        modal?: string;
        productId?: string;
    }>
}) {
    // Obtener productos desde la base de datos
    const products = await getAllProducts();
    const searchParamsData = await searchParams;
    const paramsData = await params;
    const dictionary = await getDictionary(paramsData.locale);

    // Determinar si debemos mostrar un modal y qué producto editar
    let editingProduct = null;
    if (searchParamsData.modal === 'edit' && searchParamsData.productId) {
        editingProduct = await getProductById(searchParamsData.productId);
    }

    const showModal = searchParamsData.modal === 'create' || searchParamsData.modal === 'edit';

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductsClient
                initialProducts={products}
                showModal={showModal}
                editingProduct={editingProduct}
                dictionary={dictionary}
            />
        </Suspense>
    );
}