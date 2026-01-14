
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding bulk data (Shops & Events) safely...')

    // --- Shops ---
    const shops = [
        {
            name: 'Zara',
            slug: 'zara',
            category: 'fashion',
            floor: 1,
            logo: 'https://www.google.com/s2/favicons?domain=zara.com&sz=128',
            phone: '+90 212 345 00 01',
            website: 'https://www.zara.com',
            featured: true,
        },
        {
            name: 'H&M',
            slug: 'hm',
            category: 'fashion',
            floor: 1,
            logo: 'https://www.google.com/s2/favicons?domain=hm.com&sz=128',
            phone: '+90 212 345 00 02',
            website: 'https://www.hm.com',
            featured: true,
        },
        {
            name: 'Massimo Dutti',
            slug: 'massimo-dutti',
            category: 'fashion',
            floor: 2,
            logo: 'https://www.google.com/s2/favicons?domain=massimodutti.com&sz=128',
            phone: '+90 212 345 00 03',
            website: 'https://www.massimodutti.com',
            featured: true,
        },
        {
            name: 'Apple Store',
            slug: 'apple-store',
            category: 'electronics',
            floor: 0,
            logo: 'https://www.google.com/s2/favicons?domain=apple.com&sz=128',
            phone: '+90 212 345 00 04',
            website: 'https://www.apple.com',
            featured: true,
        },
        {
            name: 'Samsung Experience',
            slug: 'samsung-experience',
            category: 'electronics',
            floor: 0,
            logo: 'https://www.google.com/s2/favicons?domain=samsung.com&sz=128',
            phone: '+90 212 345 00 05',
            website: 'https://www.samsung.com',
            featured: true,
        },
        {
            name: 'MediaMarkt',
            slug: 'mediamarkt',
            category: 'electronics',
            floor: -1,
            logo: 'https://www.google.com/s2/favicons?domain=mediamarkt.com&sz=128',
            phone: '+90 212 345 00 06',
            website: 'https://www.mediamarkt.com.tr',
            featured: true,
        },
        {
            name: 'Starbucks',
            slug: 'starbucks',
            category: 'food',
            floor: 0,
            logo: 'https://www.google.com/s2/favicons?domain=starbucks.com&sz=128',
            phone: '+90 212 345 00 07',
            website: 'https://www.starbucks.com.tr',
            featured: true,
        },
        {
            name: 'Big Chefs',
            slug: 'big-chefs',
            category: 'food',
            floor: 3,
            logo: 'https://www.google.com/s2/favicons?domain=bigchefs.com.tr&sz=128',
            phone: '+90 212 345 00 08',
            website: 'https://www.bigchefs.com.tr',
            featured: true,
        },
        {
            name: 'Wagamama',
            slug: 'wagamama',
            category: 'food',
            floor: 3,
            logo: 'https://www.google.com/s2/favicons?domain=wagamama.com&sz=128',
            phone: '+90 212 345 00 09',
            website: 'https://www.wagamama.com.tr',
            featured: true,
        },
        {
            name: 'Sephora',
            slug: 'sephora',
            category: 'cosmetics',
            floor: 1,
            logo: 'https://www.google.com/s2/favicons?domain=sephora.com&sz=128',
            phone: '+90 212 345 00 10',
            website: 'https://www.sephora.com.tr',
            featured: true,
        },
        {
            name: 'MAC Cosmetics',
            slug: 'mac-cosmetics',
            category: 'cosmetics',
            floor: 1,
            logo: 'https://www.google.com/s2/favicons?domain=maccosmetics.com&sz=128',
            phone: '+90 212 345 00 11',
            website: 'https://www.maccosmetics.com.tr',
            featured: true,
        },
        {
            name: 'Tiffany & Co.',
            slug: 'tiffany-co',
            category: 'jewelry',
            floor: 0,
            logo: 'https://www.google.com/s2/favicons?domain=tiffany.com&sz=128',
            phone: '+90 212 345 00 12',
            website: 'https://www.tiffany.com',
            featured: true,
        }
    ]

    for (const shop of shops) {
        await prisma.shop.upsert({
            where: { slug: shop.slug },
            update: { ...shop },
            create: {
                ...shop,
                workingHours: '10:00 - 22:00',
                isActive: true,
            }
        })
    }

    // --- Events ---
    const events = [
        {
            slug: 'jazz-festival-2026',
            titleTr: 'Yaz Caz Festivali',
            titleEn: 'Summer Jazz Festival',
            titleRu: 'Летний джазовый фестиваль',
            titleAr: 'مهرجان جاز الصيف',
            descTr: 'Ünlü sanatçıların katılımıyla muhteşem bir caz gecesi.',
            descEn: 'A magnificent jazz night with the participation of famous artists.',
            descRu: 'Великолепная джазовая ночь с участием известных артистов.',
            descAr: 'ليلة جاز رائعة بمشاركة فنانين مشهورين.',
            image: '/jazz_festival.png',
            startDate: new Date('2026-07-15'),
            endDate: new Date('2026-07-20'),
            location: 'Zemin Kat Etkinlik Alanı',
            isActive: true,
        },
        {
            slug: 'tech-expo-2026',
            titleTr: 'Geleceğin Teknolojileri Sergisi',
            titleEn: 'Future Tech Expo 2026',
            titleRu: 'Выставка технологий будущего',
            titleAr: 'معرض تقنيات المستقبل',
            descTr: 'Yapay zeka, robotik ve VR dünyasını keşfedin.',
            descEn: 'Explore the world of AI, robotics, and VR.',
            descRu: 'Исследуйте мир ИИ, робототехники и VR.',
            descAr: 'استكشف عالم الذكاء الاصطناعي والروبوتات والواقع الافتراضي.',
            image: '/tech_expo.png',
            startDate: new Date('2026-08-10'),
            endDate: new Date('2026-08-15'),
            location: '1. Kat Atrium',
            isActive: true,
        },
        {
            slug: 'kids-art-workshop',
            titleTr: 'Yaratıcı Çocuk Sanat Atölyesi',
            titleEn: 'Creative Kids Art Workshop',
            titleRu: 'Творческая детская художественная мастерская',
            titleAr: 'ورشة عمل فنية إبداعية للأطفال',
            descTr: 'Çocuklar hayallerini tuvale yansıtıyor.',
            descEn: 'Children reflect their dreams on canvas.',
            descRu: 'Дети отражают свои мечты на холсте.',
            descAr: 'الأطفال يعكسون أحلامهم على القماش.',
            image: '/kids_workshop.png',
            startDate: new Date('2026-09-05'),
            endDate: new Date('2026-09-06'),
            location: '3. Kat Çocuk Alanı',
            isActive: true,
        }
    ]

    for (const event of events) {
        await prisma.event.upsert({
            where: { slug: event.slug },
            update: { ...event },
            create: { ...event }
        })
    }

    // --- Sliders ---
    const sliders = [
        {
            slug: 'new-season-2026',
            titleTr: 'ALIŞVERİŞ',
            titleEn: 'SHOPPING',
            titleRu: 'ШОППИНГ',
            titleAr: 'تسوق',
            subtitleTr: 'Yeni Sezon Keşfi',
            subtitleEn: 'New Season Discovery',
            subtitleRu: 'Открытие нового сезона',
            subtitleAr: 'اكتشاف الموسم الجديد',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
            order: 0,
            isActive: true,
        },
        {
            slug: 'tech-world',
            titleTr: 'TEKNOLOJİ',
            titleEn: 'TECHNOLOGY',
            titleRu: 'ТЕХНОЛОГИИ',
            titleAr: 'تكنولوجيا',
            subtitleTr: 'Geleceği Keşfedin',
            subtitleEn: 'Discover the Future',
            subtitleRu: 'Откройте для себя будущее',
            subtitleAr: 'اكتشف المستقبل',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
            order: 1,
            isActive: true,
        }
    ]

    for (const slider of sliders) {
        await prisma.slider.upsert({
            where: { slug: slider.slug },
            update: { ...slider },
            create: { ...slider }
        })
    }

    console.log(`Successfully upserted shops, ${events.length} events, and ${sliders.length} sliders.`)

    console.log(`Successfully upserted shops and ${events.length} events with AI visuals.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
