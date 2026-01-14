
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        const sliders = await prisma.slider.findMany()
        console.log('Sliders count:', sliders.length)
        console.log('Sliders:', JSON.stringify(sliders, null, 2))
    } catch (e) {
        console.error('Error fetching sliders:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
