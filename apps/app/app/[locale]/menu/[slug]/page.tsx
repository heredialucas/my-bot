import { notFound } from 'next/navigation';
import { getDictionary } from '@repo/internationalization';
import { getAllCategoriesWithDishes } from '@repo/data-services/src/services/categoryService';
import { getTodaySpecial } from '@repo/data-services/src/services/dailySpecialService';
import { getRestaurantConfigBySlug } from '@repo/data-services/src/services/restaurantConfigService';
import MenuLanding from './components/MenuLanding';

interface PageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export default async function MenuPage({ params }: PageProps) {
    const paramsData = await params;
    const { locale, slug } = paramsData;

    // Obtener datos del menú y traducciones
    const [dictionary, categoriesWithDishes, todaySpecial, restaurantConfig] = await Promise.all([
        getDictionary(locale),
        getAllCategoriesWithDishes(),
        getTodaySpecial(),
        getRestaurantConfigBySlug(slug)
    ]);

    // Verificar si el restaurante existe
    if (!restaurantConfig) {
        notFound();
    }

    return (
        <MenuLanding
            locale={locale}
            slug={slug}
            restaurantConfig={restaurantConfig}
            categories={categoriesWithDishes}
            todaySpecial={todaySpecial}
            dictionary={dictionary}
        />
    );
}

// Generar metadatos dinámicos
export async function generateMetadata({ params }: PageProps) {
    const paramsData = await params;
    const { slug } = paramsData;

    const restaurantConfig = await getRestaurantConfigBySlug(slug);

    if (!restaurantConfig) {
        return {
            title: 'Restaurant not found',
            description: 'This restaurant does not exist.',
        };
    }

    return {
        title: `${restaurantConfig.name} - Menu`,
        description: restaurantConfig.description || `Check out the menu at ${restaurantConfig.name}`,
    };
} 