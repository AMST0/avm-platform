import { prisma } from '@/lib/db';
import { Popup, PopupInput } from '@/lib/types';
import { mockPopups } from '../mock/popups';

function mapPrismaPopupToPopup(prismaPopup: any): Popup {
    return {
        id: prismaPopup.id,
        title: {
            tr: prismaPopup.titleTr,
            en: prismaPopup.titleEn,
            ru: prismaPopup.titleRu,
            ar: prismaPopup.titleAr,
        },
        image: prismaPopup.image,
        link: prismaPopup.link || undefined,
        frequency: prismaPopup.frequency as 'once' | 'always',
        isActive: prismaPopup.isActive,
        createdAt: prismaPopup.createdAt,
        updatedAt: prismaPopup.updatedAt,
    };
}

export async function getActivePopup(): Promise<Popup | null> {
    try {
        const popup = await prisma.popup.findFirst({
            where: { isActive: true },
            orderBy: { updatedAt: 'desc' }, // Get the most recently updated active popup
        });

        if (!popup) {
            return mockPopups.find(p => p.isActive) || null;
        }
        return mapPrismaPopupToPopup(popup);
    } catch (error) {
        console.warn('DB Connection failed in getActivePopup. Falling back to mock data.');
        return mockPopups.find(p => p.isActive) || null;
    }
}

export async function getPopups(): Promise<Popup[]> {
    const popups = await prisma.popup.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return popups.map(mapPrismaPopupToPopup);
}

export async function getPopupById(id: string): Promise<Popup | null> {
    try {
        const popup = await prisma.popup.findUnique({ where: { id } });
        if (!popup) {
            return mockPopups.find(p => p.id === id) || null;
        }
        return mapPrismaPopupToPopup(popup);
    } catch (error) {
        console.warn(`DB Connection failed in getPopupById for ${id}. Falling back to mock data.`);
        return mockPopups.find(p => p.id === id) || null;
    }
}

export async function createPopup(data: PopupInput): Promise<Popup> {
    // Logic: If new popup is active, maybe deactivate others? 
    // Usually only one main popup is shown. But let's stick to simple CRUD.

    const popup = await prisma.popup.create({
        data: {
            titleTr: data.title.tr,
            titleEn: data.title.en,
            titleRu: data.title.ru,
            titleAr: data.title.ar,
            image: data.image,
            link: data.link,
            frequency: data.frequency,
            isActive: data.isActive ?? true,
        },
    });
    return mapPrismaPopupToPopup(popup);
}

export async function updatePopup(id: string, data: Partial<PopupInput>): Promise<Popup> {
    const updateData: any = {};
    if (data.image) updateData.image = data.image;
    if (data.link !== undefined) updateData.link = data.link;
    if (data.frequency) updateData.frequency = data.frequency;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    if (data.title) {
        if (data.title.tr) updateData.titleTr = data.title.tr;
        if (data.title.en) updateData.titleEn = data.title.en;
        if (data.title.ru) updateData.titleRu = data.title.ru;
        if (data.title.ar) updateData.titleAr = data.title.ar;
    }

    const popup = await prisma.popup.update({
        where: { id },
        data: updateData,
    });
    return mapPrismaPopupToPopup(popup);
}

export async function deletePopup(id: string): Promise<void> {
    await prisma.popup.delete({ where: { id } });
}
