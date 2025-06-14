'use client';

import { useState } from 'react';
import { Dictionary } from '@repo/internationalization';
import { CategoryData } from '@repo/data-services/src/services/categoryService';
import { DishData } from '@repo/data-services/src/services/dishService';
import { DailySpecialData } from '@repo/data-services/src/services/dailySpecialService';
import { RestaurantConfigData } from '@repo/data-services/src/services/restaurantConfigService';
import CategoriesSection from './categories/CategoriesSection';
import DishesSection from './dishes/DishesSection';
import DailySpecialsSection from './daily-specials/DailySpecialsSection';
import RestaurantConfigSection from './restaurant-config/RestaurantConfigSection';

interface MenuDashboardProps {
    categories: CategoryData[];
    dishes: DishData[];
    dailySpecials: DailySpecialData[];
    restaurantConfig: RestaurantConfigData | null;
    dictionary: Dictionary;
}

export default function MenuDashboard({
    categories,
    dishes,
    dailySpecials,
    restaurantConfig,
    dictionary
}: MenuDashboardProps) {
    const [activeTab, setActiveTab] = useState<'config' | 'categories' | 'dishes' | 'dailySpecials'>('config');

    const tabs = [
        { id: 'config', label: '⚙️ Configuración' },
        { id: 'categories', label: '📂 Categorías' },
        { id: 'dishes', label: '🍽️ Platos' },
        { id: 'dailySpecials', label: '⭐ Especiales del Día' }
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    {dictionary.app.admin.menu.title}
                </h1>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            {activeTab === 'config' && (
                <RestaurantConfigSection
                    restaurantConfig={restaurantConfig}
                    dictionary={dictionary}
                />
            )}

            {activeTab === 'categories' && (
                <CategoriesSection
                    categories={categories}
                    dictionary={dictionary.app.admin.menu.categories}
                />
            )}

            {activeTab === 'dishes' && (
                <DishesSection
                    dishes={dishes}
                    categories={categories}
                    dictionary={dictionary.app.admin.menu.dishes}
                />
            )}

            {activeTab === 'dailySpecials' && (
                <DailySpecialsSection
                    dailySpecials={dailySpecials}
                    dishes={dishes}
                    dictionary={dictionary.app.admin.menu.dailySpecials}
                />
            )}
        </div>
    );
} 