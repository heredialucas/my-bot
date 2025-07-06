import { database } from '@repo/database';
import type { Scraping, Website, User } from '@repo/database';

export interface ScrapingFormData {
    websiteId: string;
    status?: string;
    data?: any;
}

export interface ScrapingWithWebsite extends Scraping {
    website: Website;
}

export interface ScrapingWithWebsiteAndUser extends Scraping {
    website: Website;
    user: User;
}

export async function getScrapings(userId: string): Promise<ScrapingWithWebsite[]> {
    try {
        const scrapings = await database.scraping.findMany({
            where: { userId },
            include: { website: true },
            orderBy: { startedAt: 'desc' },
        });
        return scrapings;
    } catch (error) {
        console.error('Error fetching scrapings:', error);
        throw new Error('Failed to fetch scrapings');
    }
}

export async function getScrapingsByWebsite(websiteId: string, userId: string): Promise<Scraping[]> {
    try {
        const scrapings = await database.scraping.findMany({
            where: { websiteId, userId },
            orderBy: { startedAt: 'desc' },
        });
        return scrapings;
    } catch (error) {
        console.error('Error fetching scrapings by website:', error);
        throw new Error('Failed to fetch scrapings by website');
    }
}

export async function getScrapingById(scrapingId: string, userId: string): Promise<ScrapingWithWebsite | null> {
    try {
        const scraping = await database.scraping.findFirst({
            where: { id: scrapingId, userId },
            include: { website: true },
        });
        return scraping;
    } catch (error) {
        console.error('Error fetching scraping:', error);
        throw new Error('Failed to fetch scraping');
    }
}

export async function createScraping(data: ScrapingFormData, userId: string): Promise<Scraping> {
    try {
        const scraping = await database.scraping.create({
            data: {
                ...data,
                userId,
                status: data.status || 'pending',
            },
        });
        return scraping;
    } catch (error) {
        console.error('Error creating scraping:', error);
        throw new Error('Failed to create scraping');
    }
}

export async function updateScrapingStatus(
    scrapingId: string,
    status: string,
    userId: string,
    data?: any,
    error?: string
): Promise<Scraping> {
    try {
        const updateData: any = { status };

        if (status === 'completed' || status === 'failed') {
            updateData.completedAt = new Date();
        }

        if (data) {
            updateData.data = data;
        }

        if (error) {
            updateData.error = error;
        }

        const scraping = await database.scraping.update({
            where: { id: scrapingId, userId },
            data: updateData,
        });
        return scraping;
    } catch (error) {
        console.error('Error updating scraping status:', error);
        throw new Error('Failed to update scraping status');
    }
}

export async function deleteScraping(scrapingId: string, userId: string): Promise<void> {
    try {
        const existingScraping = await database.scraping.findFirst({
            where: { id: scrapingId, userId },
        });

        if (!existingScraping) {
            throw new Error('Scraping not found');
        }

        await database.scraping.delete({
            where: { id: scrapingId },
        });
    } catch (error) {
        console.error('Error deleting scraping:', error);
        throw new Error('Failed to delete scraping');
    }
}

export async function getScrapingStats(userId: string): Promise<{
    total: number;
    completed: number;
    failed: number;
    pending: number;
}> {
    try {
        const [total, completed, failed, pending] = await Promise.all([
            database.scraping.count({ where: { userId } }),
            database.scraping.count({ where: { userId, status: 'completed' } }),
            database.scraping.count({ where: { userId, status: 'failed' } }),
            database.scraping.count({ where: { userId, status: 'pending' } }),
        ]);

        return { total, completed, failed, pending };
    } catch (error) {
        console.error('Error fetching scraping stats:', error);
        throw new Error('Failed to fetch scraping stats');
    }
} 