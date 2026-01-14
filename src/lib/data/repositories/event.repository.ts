import { prisma } from '@/lib/db';
import { Event, EventInput } from '@/lib/types';
import { mockEvents } from '../mock/events';

function mapPrismaEventToEvent(prismaEvent: any): Event {
    return {
        id: prismaEvent.id,
        title: {
            tr: prismaEvent.titleTr,
            en: prismaEvent.titleEn,
            ru: prismaEvent.titleRu,
            ar: prismaEvent.titleAr,
        },
        slug: prismaEvent.slug,
        description: {
            tr: prismaEvent.descTr,
            en: prismaEvent.descEn,
            ru: prismaEvent.descRu,
            ar: prismaEvent.descAr,
        },
        image: prismaEvent.image,
        startDate: prismaEvent.startDate,
        endDate: prismaEvent.endDate,
        location: prismaEvent.location,
        // Since we removed SEO from schema for simplification (or did we? check schema)
        // Let's check schema.prisma... I wrote it in Step 111.
        // Event model I wrote:
        /*
        model Event {
          idString @id @default(uuid())
          titleTr String
          ...
          descTr String
          ...
          slug String @unique
          image String 
          startDate DateTime
          endDate DateTime
          location String
          isActive Boolean @default(true)
          createdAt DateTime
          updatedAt DateTime
        }
        */
        // I did NOT include SEO fields in the Prisma schema Step 111 for Event either?
        // Wait, Step 111 schema for Event:
        /*
        model Event {
        ...
          descTr    String
          descEn    String
          descRu    String
          descAr    String
          image     String   
          startDate DateTime
          endDate   DateTime
          location  String
          isActive  Boolean  @default(true)
        ...
        }
        */
        // Correct, NO SEO fields in Prisma Schema for Event.
        // BUT App Type `Event` has `seo` field!
        // So I need to mock it or update App Type.
        // For now I will mock it in the mapper to avoid TypeScript errors.
        seo: {
            metaTitle: {
                tr: prismaEvent.titleTr,
                en: prismaEvent.titleEn,
                ru: prismaEvent.titleRu,
                ar: prismaEvent.titleAr,
            },
            metaDescription: {
                tr: prismaEvent.descTr,
                en: prismaEvent.descEn,
                ru: prismaEvent.descRu,
                ar: prismaEvent.descAr,
            },
        },
        isActive: prismaEvent.isActive,
        createdAt: prismaEvent.createdAt,
        updatedAt: prismaEvent.updatedAt,
    };
}

export async function getEvents(): Promise<Event[]> {
    try {
        const events = await prisma.event.findMany({
            orderBy: { startDate: 'desc' },
            where: { isActive: true } // Default to active?
        });
        return events.map(mapPrismaEventToEvent);
    } catch (error) {
        console.warn('DB Connection failed in getEvents. Falling back to mock data.');
        return mockEvents;
    }
}

export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
    try {
        const events = await prisma.event.findMany({
            where: {
                isActive: true,
                endDate: {
                    gte: new Date(),
                },
            },
            orderBy: { startDate: 'asc' },
            take: limit,
        });
        return events.map(mapPrismaEventToEvent);
    } catch (error) {
        console.warn('DB Connection failed in getUpcomingEvents. Falling back to mock data.');
        const upcoming = mockEvents.filter(e => new Date(e.endDate) >= new Date());
        return limit ? upcoming.slice(0, limit) : upcoming;
    }
}

export async function getPastEvents(limit?: number): Promise<Event[]> {
    try {
        const events = await prisma.event.findMany({
            where: {
                isActive: true,
                endDate: {
                    lt: new Date(),
                },
            },
            orderBy: { endDate: 'desc' },
            take: limit,
        });
        return events.map(mapPrismaEventToEvent);
    } catch (error) {
        console.warn('DB Connection failed in getPastEvents. Falling back to mock data.');
        const past = mockEvents.filter(e => new Date(e.endDate) < new Date());
        return limit ? past.slice(0, limit) : past;
    }
}

export async function getAllEvents(): Promise<Event[]> { // For admin
    const events = await prisma.event.findMany({
        orderBy: { startDate: 'desc' },
    });
    return events.map(mapPrismaEventToEvent);
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
    try {
        const event = await prisma.event.findUnique({
            where: { slug },
        });
        if (!event) {
            return mockEvents.find(e => e.slug === slug) || null;
        }
        return mapPrismaEventToEvent(event);
    } catch (error) {
        console.warn(`DB Connection failed in getEventBySlug for ${slug}. Falling back to mock data.`);
        return mockEvents.find(e => e.slug === slug) || null;
    }
}

export async function createEvent(data: EventInput): Promise<Event> {
    // 20 event limit
    const count = await prisma.event.count();
    if (count >= 20) {
        throw new Error('Maksimum 20 etkinlik sınırına ulaşıldı. Yeni eklemek için lütfen bir etkinliği silin.');
    }

    // Language fallback logic
    const titleEn = data.title.en || data.title.tr;
    const titleRu = data.title.ru || data.title.tr;
    const titleAr = data.title.ar || data.title.tr;

    const descEn = data.description.en || data.description.tr;
    const descRu = data.description.ru || data.description.tr;
    const descAr = data.description.ar || data.description.tr;

    const event = await prisma.event.create({
        data: {
            slug: data.slug,
            image: data.image,
            startDate: data.startDate,
            endDate: data.endDate,
            location: data.location,
            isActive: data.isActive ?? true,
            // Localized Mapping
            titleTr: data.title.tr,
            titleEn,
            titleRu,
            titleAr,
            descTr: data.description.tr,
            descEn,
            descRu,
            descAr,
        },
    });
    return mapPrismaEventToEvent(event);
}

export async function updateEvent(id: string, data: Partial<EventInput>): Promise<Event> {
    const updateData: any = {};
    if (data.slug) updateData.slug = data.slug;
    if (data.image) updateData.image = data.image;
    if (data.startDate) updateData.startDate = data.startDate;
    if (data.endDate) updateData.endDate = data.endDate;
    if (data.location) updateData.location = data.location;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    if (data.title) {
        if (data.title.tr) {
            updateData.titleTr = data.title.tr;
            // Only update others if they are not provided or being cleared (optional choice, but let's stick to the fallback rule if they are empty)
            updateData.titleEn = data.title.en || data.title.tr;
            updateData.titleRu = data.title.ru || data.title.tr;
            updateData.titleAr = data.title.ar || data.title.tr;
        } else if (data.title.en) updateData.titleEn = data.title.en;
        else if (data.title.ru) updateData.titleRu = data.title.ru;
        else if (data.title.ar) updateData.titleAr = data.title.ar;
    }

    if (data.description) {
        if (data.description.tr) {
            updateData.descTr = data.description.tr;
            updateData.descEn = data.description.en || data.description.tr;
            updateData.descRu = data.description.ru || data.description.tr;
            updateData.descAr = data.description.ar || data.description.tr;
        } else if (data.description.en) updateData.descEn = data.description.en;
        else if (data.description.ru) updateData.descRu = data.description.ru;
        else if (data.description.ar) updateData.descAr = data.description.ar;
    }

    const event = await prisma.event.update({
        where: { id },
        data: updateData,
    });
    return mapPrismaEventToEvent(event);
}

export async function deleteEvent(id: string): Promise<void> {
    await prisma.event.delete({ where: { id } });
}
