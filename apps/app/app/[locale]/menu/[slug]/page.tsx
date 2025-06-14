import { notFound } from 'next/navigation';
import { getDictionary } from '@repo/internationalization';
import { getAllCategoriesWithDishes } from '@repo/data-services/src/services/categoryService';
import { getAllDailySpecials } from '@repo/data-services/src/services/dailySpecialService';
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

    // Primero obtener la configuración del restaurante para obtener el userId
    const restaurantConfig = await getRestaurantConfigBySlug(slug);

    // Verificar si el restaurante existe
    if (!restaurantConfig) {
        notFound();
    }

    // Obtener datos del menú usando el userId del restaurante
    const [dictionary, categoriesWithDishes, dailySpecials] = await Promise.all([
        getDictionary(locale),
        getAllCategoriesWithDishes(restaurantConfig.createdById),
        getAllDailySpecials(restaurantConfig.createdById)
    ]);

    // Encontrar el especial de hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaySpecial = dailySpecials.find(special => {
        const specialDate = new Date(special.date);
        specialDate.setHours(0, 0, 0, 0);
        return specialDate.getTime() === today.getTime() && special.isActive;
    }) || null;

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