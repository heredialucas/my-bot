import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';

export default async function OrdersPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return (
        <div>
            <h1 className="text-2xl font-bold">
                {dictionary.app.admin.navigation.orders}
            </h1>
            <p>{/* Contenido de la página de pedidos aquí */}</p>
        </div>
    );
} 