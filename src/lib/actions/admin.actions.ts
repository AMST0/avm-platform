'use server';

import db from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

export async function getDashboardStatsAction() {
    try {
        const [
            shopCount,
            eventCount,
            sliderCount,
            popupCount,
            inquiryCount,
            latestShops,
            latestEvents,
            latestInquiries
        ] = await Promise.all([
            db.shop.count(),
            db.event.count(),
            db.slider.count(),
            db.popup.count(),
            db.inquiry.count(),
            db.shop.findMany({ orderBy: { updatedAt: 'desc' }, take: 2 }),
            db.event.findMany({ orderBy: { updatedAt: 'desc' }, take: 2 }),
            db.inquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 2 })
        ]);

        // Combine and sort activities
        const activities: any[] = [];

        latestShops.forEach((shop: { name: string, updatedAt: Date }) => {
            activities.push({
                text: `${shop.name} mağazası güncellendi`,
                time: formatDistanceToNow(new Date(shop.updatedAt), { addSuffix: true, locale: tr }),
                type: 'update',
                icon: 'Store',
                date: shop.updatedAt
            });
        });

        latestEvents.forEach((event: { titleTr: string, updatedAt: Date }) => {
            activities.push({
                text: `${event.titleTr} etkinliği güncellendi`,
                time: formatDistanceToNow(new Date(event.updatedAt), { addSuffix: true, locale: tr }),
                type: 'update',
                icon: 'Calendar',
                date: event.updatedAt
            });
        });

        latestInquiries.forEach((inquiry: { type: string, name: string, createdAt: Date }) => {
            activities.push({
                text: `Yeni ${inquiry.type === 'leasing' ? 'kiralama' : 'iletişim'} başvurusu: ${inquiry.name}`,
                time: formatDistanceToNow(new Date(inquiry.createdAt), { addSuffix: true, locale: tr }),
                type: 'create',
                icon: 'MessageSquare',
                date: inquiry.createdAt
            });
        });

        // Sort by date descending and take top 4
        const sortedActivities = activities
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 4);

        return {
            success: true,
            data: {
                shopCount,
                eventCount,
                sliderCount,
                popupCount,
                activities: sortedActivities
            }
        };
    } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        return { success: false, error: 'Veriler alınamadı' };
    }
}
