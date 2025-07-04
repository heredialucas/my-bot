import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';
import { getCurrentUser } from '@repo/data-services/src/services/authService';
import { getAllProducts } from '@repo/data-services';
import { redirect } from 'next/navigation';
import { ProductList } from './components/product-list';

export default async function ProductsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);
    const user = await getCurrentUser();

    if (user?.role !== 'admin') {
        redirect(`/${locale}/access-denied`);
    }

    const products = await getAllProducts();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    {dictionary.app.admin.products.title}
                </h1>
            </div>
            <ProductList products={products} dictionary={dictionary} />
        </div>
    );
} 