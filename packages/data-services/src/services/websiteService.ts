import { database } from '@repo/database';
import type { Website, User } from '@repo/database';

export interface WebsiteFormData {
    name: string;
    url: string;
    description?: string;
    isActive?: boolean;
}

export interface WebsiteWithUser extends Website {
    user: User;
}

export async function getWebsites(userId: string): Promise<Website[]> {
    try {
        const websites = await database.website.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        return websites;
    } catch (error) {
        console.error('Error fetching websites:', error);
        throw new Error('Failed to fetch websites');
    }
}

export async function getWebsiteById(websiteId: string, userId: string): Promise<Website | null> {
    try {
        const website = await database.website.findFirst({
            where: { id: websiteId, userId },
        });
        return website;
    } catch (error) {
        console.error('Error fetching website:', error);
        throw new Error('Failed to fetch website');
    }
}

export async function createWebsite(data: WebsiteFormData, userId: string): Promise<Website> {
    try {
        const website = await database.website.create({
            data: {
                ...data,
                userId,
                isActive: data.isActive ?? true,
            },
        });
        return website;
    } catch (error) {
        console.error('Error creating website:', error);
        throw new Error('Failed to create website');
    }
}

export async function updateWebsite(
    websiteId: string,
    data: Partial<WebsiteFormData>,
    userId: string
): Promise<Website> {
    try {
        const existingWebsite = await database.website.findFirst({
            where: { id: websiteId, userId },
        });

        if (!existingWebsite) {
            throw new Error('Website not found');
        }

        const website = await database.website.update({
            where: { id: websiteId },
            data,
        });
        return website;
    } catch (error) {
        console.error('Error updating website:', error);
        throw new Error('Failed to update website');
    }
}

export async function deleteWebsite(websiteId: string, userId: string): Promise<void> {
    try {
        const existingWebsite = await database.website.findFirst({
            where: { id: websiteId, userId },
        });

        if (!existingWebsite) {
            throw new Error('Website not found');
        }

        await database.website.delete({
            where: { id: websiteId },
        });
    } catch (error) {
        console.error('Error deleting website:', error);
        throw new Error('Failed to delete website');
    }
}

export async function toggleWebsiteStatus(websiteId: string, userId: string): Promise<Website> {
    try {
        const existingWebsite = await database.website.findFirst({
            where: { id: websiteId, userId },
        });

        if (!existingWebsite) {
            throw new Error('Website not found');
        }

        const website = await database.website.update({
            where: { id: websiteId },
            data: { isActive: !existingWebsite.isActive },
        });
        return website;
    } catch (error) {
        console.error('Error toggling website status:', error);
        throw new Error('Failed to toggle website status');
    }
} 