import { getDictionary } from '@repo/internationalization';
import { type Locale } from '@repo/internationalization';

export default async function InventoryPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);

    return (
        <div>
            <h1 className="text-2xl font-bold">
                {dictionary.app.admin.navigation.inventory}
            </h1>
            <p>{/* Contenido de la página de inventario aquí */}</p>
        </div>
    );
} 