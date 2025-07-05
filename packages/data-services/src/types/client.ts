import { Prisma } from "@repo/database";

export type ClientData = {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    accountBalance: number;
    createdAt: Date;
    updatedAt: Date;
    sellerId: string;
};

export type ClientFormData = {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    address?: string;
    sellerId: string;
}; 