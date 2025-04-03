// Tipo para usuarios
export type UserData = {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    createdAt: Date;
    updatedAt: Date;
};

// Tipo para crear/actualizar usuarios
export type UserFormData = {
    name: string;
    email: string;
    password?: string;
    role?: 'ADMIN' | 'USER';
}; 