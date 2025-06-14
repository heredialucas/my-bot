import React from 'react';
import Image from 'next/image';
import DishCard from './DishCard';
import { Dictionary } from '@repo/internationalization';
import { Category } from './types';

interface Dish {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    status: string;
    order: number;
    category: {
        name: string;
    };
}

interface CategorySectionProps {
    category: Category;
    themeColors: {
        bg: string;
        text: string;
        accent: string;
    };
    dictionary: Dictionary;
    restaurantName: string;
    restaurantPhone?: string | null;
}

export default function CategorySection({ category, themeColors, dictionary, restaurantName, restaurantPhone }: CategorySectionProps) {
    if (category.dishes.length === 0) return null;

    return (
        <section className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Category Header */}
            <div className={`${themeColors.bg} ${themeColors.text} p-6`}>
                <div className="flex items-center gap-4">
                    {category.imageUrl && (
                        <div className="w-16 h-16 relative">
                            <Image
                                src={category.imageUrl}
                                alt={category.name}
                                fill
                                className="object-cover rounded-lg"
                                sizes="64px"
                            />
                        </div>
                    )}
                    <div>
                        <h3 className="text-2xl font-bold">{category.name}</h3>
                        {category.description && (
                            <p className="text-lg opacity-90">{category.description}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Dishes Grid */}
            <div className="p-6">
                {category.dishes.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.dishes.map((dish) => (
                            <DishCard
                                key={dish.id}
                                dish={dish}
                                themeColors={themeColors}
                                dictionary={dictionary}
                                restaurantName={restaurantName}
                                restaurantPhone={restaurantPhone}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">
                            {dictionary.web?.menu?.categories?.noDishes || 'No hay platos disponibles en esta categoría'}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
} 