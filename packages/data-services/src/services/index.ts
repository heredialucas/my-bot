// ==========================================
// SERVICIOS DEL SISTEMA (PostgreSQL/Prisma)
// ==========================================
export * from './authService';
export * from './dataService';
export * from './imageService';
export * from './uploadR2Image';
export * from './userService';

// ==========================================
// SERVICIOS DE BARFER E-COMMERCE (MongoDB)
// ==========================================
export * from './mongoService';

// Exportar servicios de Barfer con prefijo para evitar conflictos
export {
    getProducts as getBarferProducts,
    getProductById as getBarferProductById,
    getTopProducts as getBarferTopProducts,
    getCategories as getBarferCategories,
    getOrders as getBarferOrders,
    getOrderById as getBarferOrderById,
    getOrdersByStatus as getBarferOrdersByStatus,
    getRecentOrders as getBarferRecentOrders,
    getUsers as getBarferCustomers,        // Clientes del e-commerce
    getUserById as getBarferCustomerById,   // Cliente específico del e-commerce
    getDeliveryAreas,
    getEnabledDeliveryAreas,
    getCoupons,
    getActiveCoupons,
    getAddresses as getBarferAddresses,
    getAddressesByUserId as getBarferAddressesByUserId,
    getAllies,
    getBankInfo,
    getEvents,
    getActiveEvents,
    getDashboardStats,
    // Analytics functions
    getOrdersByDay,
    getRevenueByDay,
    getAverageOrderValue,
    getCustomerFrequency,
    getOrdersByMonth,
    getProductSales,
    getCategorySales,
    getPaymentMethodStats
} from './barferService';
