// ==========================================
// AVM Platform - Mock Events Data
// ==========================================

import type { Event } from '@/lib/types';

export const mockEvents: Event[] = [
    {
        id: '1',
        title: {
            tr: 'Yaz Konserleri Serisi',
            en: 'Summer Concert Series',
            ru: 'Серия летних концертов',
            ar: 'سلسلة حفلات الصيف',
        },
        slug: 'yaz-konserleri',
        description: {
            tr: 'Türkiye\'nin en sevilen sanatçıları bu yaz AVM\'de! Her Cumartesi akşamı ücretsiz konserler.',
            en: 'Turkey\'s most beloved artists at the mall this summer! Free concerts every Saturday evening.',
            ru: 'Самые любимые артисты Турции в торговом центре этим летом! Бесплатные концерты каждую субботу вечером.',
            ar: 'أحب فنانين تركيا في المول هذا الصيف! حفلات مجانية كل مساء سبت.',
        },
        image: '/images/events/summer-concerts.jpg',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-08-31'),
        location: 'Ana Meydan (Zemin Kat)',
        seo: {
            metaTitle: {
                tr: 'Yaz Konserleri | AVM Platform',
                en: 'Summer Concerts | AVM Platform',
                ru: 'Летние концерты | AVM Platform',
                ar: 'حفلات الصيف | AVM Platform',
            },
            metaDescription: {
                tr: 'AVM\'de her Cumartesi ücretsiz yaz konserleri. En sevilen sanatçılar sahne alıyor.',
                en: 'Free summer concerts every Saturday at the mall. Most beloved artists on stage.',
                ru: 'Бесплатные летние концерты каждую субботу в торговом центре. Любимые артисты на сцене.',
                ar: 'حفلات صيفية مجانية كل سبت في المول. أحب الفنانين على المسرح.',
            },
        },
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: '2',
        title: {
            tr: 'Çocuk Tiyatro Festivali',
            en: 'Children\'s Theater Festival',
            ru: 'Детский театральный фестиваль',
            ar: 'مهرجان مسرح الأطفال',
        },
        slug: 'cocuk-tiyatro-festivali',
        description: {
            tr: 'Miniklere özel eğlenceli tiyatro gösterileri. Her Pazar saat 14:00\'te ücretsiz gösterimler.',
            en: 'Fun theater shows for little ones. Free shows every Sunday at 2:00 PM.',
            ru: 'Веселые театральные представления для малышей. Бесплатные показы каждое воскресенье в 14:00.',
            ar: 'عروض مسرحية ممتعة للصغار. عروض مجانية كل أحد الساعة 2:00 مساءً.',
        },
        image: '/images/events/kids-theater.jpg',
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-09-01'),
        location: 'Etkinlik Alanı (3. Kat)',
        seo: {
            metaTitle: {
                tr: 'Çocuk Tiyatro Festivali | AVM Platform',
                en: 'Children\'s Theater Festival | AVM Platform',
                ru: 'Детский театральный фестиваль | AVM Platform',
                ar: 'مهرجان مسرح الأطفال | AVM Platform',
            },
            metaDescription: {
                tr: 'Çocuklara özel ücretsiz tiyatro gösterileri her Pazar AVM\'de.',
                en: 'Free theater shows for children every Sunday at the mall.',
                ru: 'Бесплатные театральные представления для детей каждое воскресенье в торговом центре.',
                ar: 'عروض مسرحية مجانية للأطفال كل أحد في المول.',
            },
        },
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: '3',
        title: {
            tr: 'Moda Haftası',
            en: 'Fashion Week',
            ru: 'Неделя моды',
            ar: 'أسبوع الموضة',
        },
        slug: 'moda-haftasi',
        description: {
            tr: 'En yeni sezon trendleri, ünlü tasarımcılar ve defile gösterileri.',
            en: 'Latest season trends, famous designers and fashion shows.',
            ru: 'Последние тренды сезона, известные дизайнеры и показы мод.',
            ar: 'أحدث صيحات الموسم والمصممين المشهورين وعروض الأزياء.',
        },
        image: '/images/events/fashion-week.jpg',
        startDate: new Date('2024-09-15'),
        endDate: new Date('2024-09-22'),
        location: 'Defile Salonu (1. Kat)',
        seo: {
            metaTitle: {
                tr: 'Moda Haftası | AVM Platform',
                en: 'Fashion Week | AVM Platform',
                ru: 'Неделя моды | AVM Platform',
                ar: 'أسبوع الموضة | AVM Platform',
            },
            metaDescription: {
                tr: 'AVM\'de Moda Haftası! En yeni trendler ve tasarımcılar.',
                en: 'Fashion Week at the mall! Latest trends and designers.',
                ru: 'Неделя моды в торговом центре! Последние тренды и дизайнеры.',
                ar: 'أسبوع الموضة في المول! أحدث الصيحات والمصممين.',
            },
        },
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: '4',
        title: {
            tr: 'Teknoloji Günleri',
            en: 'Technology Days',
            ru: 'Дни технологий',
            ar: 'أيام التكنولوجيا',
        },
        slug: 'teknoloji-gunleri',
        description: {
            tr: 'En yeni teknolojik ürünleri deneyin, workshoplara katılın ve özel fırsatları yakalayın.',
            en: 'Try the latest technological products, join workshops and catch special opportunities.',
            ru: 'Попробуйте новейшие технологические продукты, участвуйте в мастер-классах и ловите специальные предложения.',
            ar: 'جرب أحدث المنتجات التقنية، شارك في ورش العمل واغتنم الفرص الخاصة.',
        },
        image: '/images/events/tech-days.jpg',
        startDate: new Date('2024-10-01'),
        endDate: new Date('2024-10-07'),
        location: 'Teknoloji Alanı (Zemin Kat)',
        seo: {
            metaTitle: {
                tr: 'Teknoloji Günleri | AVM Platform',
                en: 'Technology Days | AVM Platform',
                ru: 'Дни технологий | AVM Platform',
                ar: 'أيام التكنولوجيا | AVM Platform',
            },
            metaDescription: {
                tr: 'AVM\'de Teknoloji Günleri! En yeni ürünler ve workshoplar.',
                en: 'Technology Days at the mall! Latest products and workshops.',
                ru: 'Дни технологий в торговом центре! Новейшие продукты и мастер-классы.',
                ar: 'أيام التكنولوجيا في المول! أحدث المنتجات وورش العمل.',
            },
        },
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
];
