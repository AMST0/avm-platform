// ==========================================
// AVM Platform - Mock Sliders Data
// ==========================================

import type { Slider } from '@/lib/types';

export const mockSliders: Slider[] = [
    {
        id: '1',
        slug: 'yaz-kampanyasi-basladi',
        title: {
            tr: 'Yaz Kampanyası Başladı!',
            en: 'Summer Campaign Started!',
            ru: 'Летняя кампания началась!',
            ar: 'بدأت حملة الصيف!',
        },
        subtitle: {
            tr: 'Tüm mağazalarda %50\'ye varan indirimler',
            en: 'Up to 50% off in all stores',
            ru: 'Скидки до 50% во всех магазинах',
            ar: 'خصومات تصل إلى 50% في جميع المتاجر',
        },
        image: '/images/sliders/summer-campaign.jpg',
        mobileImage: '/images/sliders/summer-campaign-mobile.jpg',
        link: '/tr/shops',
        order: 1,
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: '2',
        slug: 'yeni-sezon-koleksiyonlari',
        title: {
            tr: 'Yeni Sezon Koleksiyonları',
            en: 'New Season Collections',
            ru: 'Коллекции нового сезона',
            ar: 'مجموعات الموسم الجديد',
        },
        subtitle: {
            tr: 'En trend parçalar moda mağazalarımızda',
            en: 'Trendiest pieces in our fashion stores',
            ru: 'Самые модные вещи в наших магазинах моды',
            ar: 'أحدث القطع في متاجر الأزياء لدينا',
        },
        image: '/images/sliders/new-season.jpg',
        mobileImage: '/images/sliders/new-season-mobile.jpg',
        link: '/tr/shops?cat=fashion',
        order: 2,
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: '3',
        slug: 'teknoloji-festivali',
        title: {
            tr: 'Teknoloji Festivali',
            en: 'Technology Festival',
            ru: 'Технологический фестиваль',
            ar: 'مهرجان التكنولوجيا',
        },
        subtitle: {
            tr: 'En son teknoloji ürünleri bir arada',
            en: 'Latest technology products together',
            ru: 'Новейшие технологические продукты вместе',
            ar: 'أحدث المنتجات التقنية معًا',
        },
        image: '/images/sliders/tech-festival.jpg',
        mobileImage: '/images/sliders/tech-festival-mobile.jpg',
        link: '/tr/shops?cat=electronics',
        order: 3,
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: '4',
        slug: 'lezzet-soleni',
        title: {
            tr: 'Lezzet Şöleni',
            en: 'Taste Festival',
            ru: 'Праздник вкуса',
            ar: 'مهرجان الطعم',
        },
        subtitle: {
            tr: 'Dünya mutfaklarını keşfedin',
            en: 'Discover world cuisines',
            ru: 'Откройте для себя мировые кухни',
            ar: 'اكتشف مطابخ العالم',
        },
        image: '/images/sliders/food-festival.jpg',
        mobileImage: '/images/sliders/food-festival-mobile.jpg',
        link: '/tr/shops?cat=food',
        order: 4,
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
];
