'use client';

import { Card, CardContent, CardDescription, CardHeader } from '@repo/design-system/components/ui/card';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Users, TrendingUp, Clock } from 'lucide-react';
import type { ClientCategoryStats, ClientBehaviorCategory, ClientSpendingCategory } from '@repo/data-services';
import type { Dictionary } from '@repo/internationalization';

interface ClientCategoryCardProps {
    category: ClientCategoryStats;
    type: 'behavior' | 'spending';
    dictionary: Dictionary;
}

const getCategoryColor = (category: ClientBehaviorCategory | ClientSpendingCategory, type: 'behavior' | 'spending'): string => {
    if (type === 'behavior') {
        const behaviorColors: Record<ClientBehaviorCategory, string> = {
            'new': 'bg-blue-100 text-blue-800 border-blue-200',
            'possible-active': 'bg-green-100 text-green-800 border-green-200',
            'possible-inactive': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'active': 'bg-emerald-100 text-emerald-800 border-emerald-200',
            'inactive': 'bg-orange-100 text-orange-800 border-orange-200',
            'recovered': 'bg-purple-100 text-purple-800 border-purple-200',
            'lost': 'bg-red-100 text-red-800 border-red-200',
            'tracking': 'bg-indigo-100 text-indigo-800 border-indigo-200'
        };
        return behaviorColors[category as ClientBehaviorCategory];
    } else {
        const spendingColors: Record<ClientSpendingCategory, string> = {
            'premium': 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-900 border-yellow-300',
            'standard': 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 border-blue-300',
            'basic': 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 border-gray-300'
        };
        return spendingColors[category as ClientSpendingCategory];
    }
};

const getCategoryIcon = (category: ClientBehaviorCategory | ClientSpendingCategory, type: 'behavior' | 'spending') => {
    if (type === 'behavior') {
        const icons: Record<ClientBehaviorCategory, React.ReactNode> = {
            'new': <Users className="h-4 w-4" />,
            'possible-active': <TrendingUp className="h-4 w-4" />,
            'possible-inactive': <Clock className="h-4 w-4" />,
            'active': <TrendingUp className="h-4 w-4" />,
            'inactive': <Clock className="h-4 w-4" />,
            'recovered': <TrendingUp className="h-4 w-4" />,
            'lost': <Users className="h-4 w-4" />,
            'tracking': <Clock className="h-4 w-4" />
        };
        return icons[category as ClientBehaviorCategory];
    } else {
        return <TrendingUp className="h-4 w-4" />;
    }
};

const getCategoryTitle = (category: ClientBehaviorCategory | ClientSpendingCategory, dictionary: Dictionary): string => {
    const categoriesDict = dictionary.app.admin?.clients?.categories || {};
    const titles: Record<string, string> = {
        'new': categoriesDict.new || 'Cliente Nuevo',
        'possible-active': categoriesDict.possibleActive || 'Posible Activo',
        'possible-inactive': categoriesDict.possibleInactive || 'Posible Inactivo',
        'active': categoriesDict.active || 'Cliente Activo',
        'inactive': categoriesDict.inactive || 'Cliente Inactivo',
        'recovered': categoriesDict.recovered || 'Cliente Recuperado',
        'lost': categoriesDict.lost || 'Cliente Perdido',
        'tracking': categoriesDict.tracking || 'En Seguimiento',
        'premium': categoriesDict.premium || 'Premium (A)',
        'standard': categoriesDict.standard || 'Estándar (B)',
        'basic': categoriesDict.basic || 'Básico (C)'
    };
    return titles[category] || category;
};

const getCategoryDescription = (category: ClientBehaviorCategory | ClientSpendingCategory, dictionary: Dictionary): string => {
    const descriptions: Record<string, string> = {
        'new': dictionary.app.admin.clients.categories.newDescription,
        'possible-active': dictionary.app.admin.clients.categories.possibleActiveDescription,
        'possible-inactive': dictionary.app.admin.clients.categories.possibleInactiveDescription,
        'active': dictionary.app.admin.clients.categories.activeDescription,
        'inactive': dictionary.app.admin.clients.categories.inactiveDescription,
        'recovered': dictionary.app.admin.clients.categories.recoveredDescription,
        'lost': dictionary.app.admin.clients.categories.lostDescription,
        'tracking': dictionary.app.admin.clients.categories.trackingDescription,
        'premium': dictionary.app.admin.clients.categories.premiumDescription,
        'standard': dictionary.app.admin.clients.categories.standardDescription,
        'basic': dictionary.app.admin.clients.categories.basicDescription
    };
    return descriptions[category] || '';
};

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(amount);
};

export function ClientCategoryCard({
    category,
    type,
    dictionary
}: ClientCategoryCardProps) {
    const colorClasses = getCategoryColor(category.category, type);
    const icon = getCategoryIcon(category.category, type);
    const title = getCategoryTitle(category.category, dictionary);
    const description = getCategoryDescription(category.category, dictionary);

    return (
        <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <Badge variant="outline" className={`${colorClasses} px-1 sm:px-2 py-1 text-[10px] xs:text-xs font-medium flex-shrink-0 max-w-[120px] xs:max-w-none`}>
                        <div className="flex items-center gap-1 min-w-0">
                            {icon}
                            <span className="hidden sm:inline truncate">{title}</span>
                            <span className="sm:hidden truncate text-[9px] xs:text-[10px]">
                                {title.includes('(') ? title.split('(')[0].trim() : title.split(' ')[0]}
                            </span>
                        </div>
                    </Badge>
                    <div className="text-right flex-shrink-0 min-w-[40px]">
                        <div className="text-lg xs:text-xl sm:text-2xl font-bold">{category.count}</div>
                        <div className="text-[10px] xs:text-xs text-muted-foreground">{category.percentage}%</div>
                    </div>
                </div>
                <CardDescription className="text-[11px] xs:text-xs sm:text-sm leading-relaxed">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] xs:text-xs sm:text-sm gap-2">
                        <span className="text-muted-foreground flex-shrink-0">Total:</span>
                        <span className="font-medium text-right truncate min-w-0">{formatCurrency(category.totalSpent)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] xs:text-xs sm:text-sm gap-2">
                        <span className="text-muted-foreground flex-shrink-0">Promedio:</span>
                        <span className="font-medium text-right truncate min-w-0">{formatCurrency(category.averageSpending)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 