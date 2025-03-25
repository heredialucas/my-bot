// Tipos compartidos para los componentes de features

// Tipo para los complementos/addons
export type AddOn = {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    icon?: string | null;
    color?: string | null;
    // Opcionales para compatibilidad con la API
    createdAt?: Date;
    updatedAt?: Date;
}; 