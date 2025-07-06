import { database } from '@repo/database';
import type { Schedule, Website, User } from '@repo/database';

export interface ScheduleFormData {
    guideName: string;
    date: Date;
    startTime: string;
    endTime: string;
    tourType?: string;
    notes?: string;
    isAvailable?: boolean;
    websiteId: string;
}

export interface ScheduleWithWebsite extends Schedule {
    website: Website;
}

export interface ScheduleWithWebsiteAndUser extends Schedule {
    website: Website;
    user: User;
}

export async function getSchedules(userId: string): Promise<ScheduleWithWebsite[]> {
    try {
        const schedules = await database.schedule.findMany({
            where: { userId },
            include: { website: true },
            orderBy: { date: 'desc' },
        });
        return schedules;
    } catch (error) {
        console.error('Error fetching schedules:', error);
        throw new Error('Failed to fetch schedules');
    }
}

export async function getSchedulesByWebsite(websiteId: string, userId: string): Promise<Schedule[]> {
    try {
        const schedules = await database.schedule.findMany({
            where: { websiteId, userId },
            orderBy: { date: 'desc' },
        });
        return schedules;
    } catch (error) {
        console.error('Error fetching schedules by website:', error);
        throw new Error('Failed to fetch schedules by website');
    }
}

export async function getSchedulesByDateRange(
    startDate: Date,
    endDate: Date,
    userId: string
): Promise<ScheduleWithWebsite[]> {
    try {
        const schedules = await database.schedule.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: { website: true },
            orderBy: { date: 'asc' },
        });
        return schedules;
    } catch (error) {
        console.error('Error fetching schedules by date range:', error);
        throw new Error('Failed to fetch schedules by date range');
    }
}

export async function getScheduleById(scheduleId: string, userId: string): Promise<ScheduleWithWebsite | null> {
    try {
        const schedule = await database.schedule.findFirst({
            where: { id: scheduleId, userId },
            include: { website: true },
        });
        return schedule;
    } catch (error) {
        console.error('Error fetching schedule:', error);
        throw new Error('Failed to fetch schedule');
    }
}

export async function createSchedule(data: ScheduleFormData, userId: string): Promise<Schedule> {
    try {
        const schedule = await database.schedule.create({
            data: {
                ...data,
                userId,
                isAvailable: data.isAvailable ?? true,
            },
        });
        return schedule;
    } catch (error) {
        console.error('Error creating schedule:', error);
        throw new Error('Failed to create schedule');
    }
}

export async function updateSchedule(
    scheduleId: string,
    data: Partial<ScheduleFormData>,
    userId: string
): Promise<Schedule> {
    try {
        const existingSchedule = await database.schedule.findFirst({
            where: { id: scheduleId, userId },
        });

        if (!existingSchedule) {
            throw new Error('Schedule not found');
        }

        const schedule = await database.schedule.update({
            where: { id: scheduleId },
            data,
        });
        return schedule;
    } catch (error) {
        console.error('Error updating schedule:', error);
        throw new Error('Failed to update schedule');
    }
}

export async function deleteSchedule(scheduleId: string, userId: string): Promise<void> {
    try {
        const existingSchedule = await database.schedule.findFirst({
            where: { id: scheduleId, userId },
        });

        if (!existingSchedule) {
            throw new Error('Schedule not found');
        }

        await database.schedule.delete({
            where: { id: scheduleId },
        });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        throw new Error('Failed to delete schedule');
    }
}

export async function toggleScheduleAvailability(scheduleId: string, userId: string): Promise<Schedule> {
    try {
        const existingSchedule = await database.schedule.findFirst({
            where: { id: scheduleId, userId },
        });

        if (!existingSchedule) {
            throw new Error('Schedule not found');
        }

        const schedule = await database.schedule.update({
            where: { id: scheduleId },
            data: { isAvailable: !existingSchedule.isAvailable },
        });
        return schedule;
    } catch (error) {
        console.error('Error toggling schedule availability:', error);
        throw new Error('Failed to toggle schedule availability');
    }
}

export async function getSchedulesByGuide(guideName: string, userId: string): Promise<ScheduleWithWebsite[]> {
    try {
        const schedules = await database.schedule.findMany({
            where: {
                userId,
                guideName: {
                    contains: guideName,
                    mode: 'insensitive',
                },
            },
            include: { website: true },
            orderBy: { date: 'desc' },
        });
        return schedules;
    } catch (error) {
        console.error('Error fetching schedules by guide:', error);
        throw new Error('Failed to fetch schedules by guide');
    }
}

export async function getScheduleStats(userId: string): Promise<{
    total: number;
    available: number;
    unavailable: number;
    today: number;
}> {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const [total, available, unavailable, todayCount] = await Promise.all([
            database.schedule.count({ where: { userId } }),
            database.schedule.count({ where: { userId, isAvailable: true } }),
            database.schedule.count({ where: { userId, isAvailable: false } }),
            database.schedule.count({
                where: {
                    userId,
                    date: {
                        gte: today,
                        lt: tomorrow,
                    },
                },
            }),
        ]);

        return { total, available, unavailable, today: todayCount };
    } catch (error) {
        console.error('Error fetching schedule stats:', error);
        throw new Error('Failed to fetch schedule stats');
    }
} 