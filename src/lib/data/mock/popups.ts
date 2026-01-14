// ==========================================
// AVM Platform - Mock Popups Data
// ==========================================

import type { Popup } from '@/lib/types';

export const mockPopups: Popup[] = [
    {
        id: '1',
        title: {
            tr: 'Bültenimize Abone Olun!',
            en: 'Subscribe to Our Newsletter!',
            ru: 'Подпишитесь на нашу рассылку!',
            ar: 'اشترك في نشرتنا الإخبارية!',
        },
        image: '/images/popups/newsletter.jpg',
        link: '/newsletter',
        frequency: 'once',
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: '2',
        title: {
            tr: 'Yaz İndirimleri Başladı!',
            en: 'Summer Sales Started!',
            ru: 'Летние скидки начались!',
            ar: 'بدأت تخفيضات الصيف!',
        },
        image: '/images/popups/summer-sale.jpg',
        link: '/tr/shops',
        frequency: 'always',
        isActive: false,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
];
