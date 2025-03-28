// Exportar todos los servicios
export * from './services/planService';
export * from './services/addonService';
export * from './services/serviceService';
export * from './services/promotionService';
export * from './services/imageService';

// Exportar todos los tipos
export * from './types';

export {
    getAllPromotions,
    createPromotion,
    getPromotionById,
    updatePromotion,
    deletePromotion,
    getActivePromotionsWithDetails,
    getAllPromotionsWithDetails
} from './services/promotionService'; 