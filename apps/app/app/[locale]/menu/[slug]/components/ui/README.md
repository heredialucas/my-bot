# Componentes Modulares del Menú

Esta carpeta contiene todos los componentes modulares para el menú digital del restaurante.

## Estructura

### Componentes Principales

- **`MenuHeader.tsx`** - Encabezado del menú con logo y información básica (sin horarios)
- **`TodaySpecial.tsx`** - Sección destacada del plato del día
- **`MenuFilters.tsx`** - Filtros de búsqueda y categorías
- **`CategorySection.tsx`** - Sección individual de cada categoría
- **`DishCard.tsx`** - Tarjeta individual de cada plato
- **`EmptyState.tsx`** - Estado cuando no hay resultados
- **`MenuFooter.tsx`** - Footer con información completa del restaurante e horarios

### Archivos de Soporte

- **`types.ts`** - Tipos TypeScript compartidos
- **`utils.ts`** - Funciones utilitarias (temas, etc.)
- **`index.ts`** - Exportaciones centralizadas

## Características

### ✅ Traducciones Completas
Todos los componentes utilizan el sistema de traducciones de `@repo/internationalization` con fallbacks en español.

### ✅ Horarios Flexibles
El footer soporta múltiples formatos de horarios:
- **Formato anterior**: `{ monday: { isOpen: true, openTime: "09:00", closeTime: "22:00" } }`
- **Formato nuevo**: `{ monday: { isOpen: true, ranges: [{ openTime: "08:00", closeTime: "12:00" }, { openTime: "18:00", closeTime: "22:00" }] } }`

### ✅ Modularidad Completa
Cada componente es independiente y reutilizable.

### ✅ Diseño Responsivo
Todos los componentes están optimizados para móviles y desktop.

## Uso

```tsx
import {
    MenuHeader,
    TodaySpecial,
    MenuFilters,
    CategorySection,
    EmptyState,
    MenuFooter,
    getThemeColors,
    type Category,
    type Dish
} from './ui';
```

## Modificaciones Principales

1. **Header sin horarios** - Los horarios ahora solo aparecen en el footer
2. **Soporte para múltiples horarios** - Un restaurante puede tener horarios de mañana y tarde
3. **Traducciones completas** - Todas las cadenas de texto son traducibles
4. **Arquitectura modular** - Cada componente en su propio archivo 