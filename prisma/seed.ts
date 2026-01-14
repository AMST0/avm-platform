
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // --- Shops ---
    const zara = await prisma.shop.create({
        data: {
            name: 'Zara',
            slug: 'zara',
            category: 'fashion',
            floor: 1,
            logo: 'https://utfs.io/f/key-here-fake', // Placeholder or copy from mock
            phone: '+90 212 555 01 01',
            website: 'https://www.zara.com',
            workingHours: '10:00 - 22:00',
            featured: true,
            isActive: true,
        }
    })

    const starbucks = await prisma.shop.create({
        data: {
            name: 'Starbucks',
            slug: 'starbucks',
            category: 'food',
            floor: 0,
            logo: 'https://utfs.io/f/key-here-fake',
            phone: '+90 212 555 01 02',
            workingHours: '08:00 - 23:00',
            featured: true,
            isActive: true,
        }
    })

    // --- Events ---
    await prisma.event.create({
        data: {
            slug: 'summer-fest',
            titleTr: 'Yaz Festivali',
            titleEn: 'Summer Festival',
            titleRu: 'Летний фестиваль',
            titleAr: 'مهرجان الصيف',
            descTr: 'Yaz boyunca sürecek müzik ve eğlence dolu festival.',
            descEn: 'A festival full of music and fun all summer long.',
            descRu: 'Фестиваль, полный музыки и веселья все лето.',
            descAr: 'مهرجان مليء بالموسيقى والمرح طوال الصيف.',
            image: 'https://utfs.io/f/key-here-fake',
            startDate: new Date('2024-06-01'),
            endDate: new Date('2024-08-31'),
            location: 'Main Square',
            isActive: true,
        }
    })

    // --- Sliders ---
    await prisma.slider.create({
        data: {
            titleTr: 'Büyük İndirim Günleri',
            titleEn: 'Big Sale Days',
            titleRu: 'Дни больших скидок',
            titleAr: 'أيام التخفيضات الكبرى',
            subtitleTr: '%50\'ye varan indirimler',
            subtitleEn: 'Discounts up to 50%',
            subtitleRu: 'Скидки до 50%',
            subtitleAr: 'خصومات تصل إلى 50٪',
            image: 'https://utfs.io/f/key-here-fake',
            order: 1,
            isActive: true,
        }
    })

    // --- Popups ---
    await prisma.popup.create({
        data: {
            titleTr: 'Hoşgeldiniz',
            titleEn: 'Welcome',
            titleRu: 'Добро пожаловать',
            titleAr: 'أهلاً بك',
            image: 'https://utfs.io/f/key-here-fake',
            frequency: 'once',
            isActive: true,
        }
    })

    console.log('Seeding finished.')
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
