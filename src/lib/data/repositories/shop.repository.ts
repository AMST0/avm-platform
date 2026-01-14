import { prisma } from '@/lib/db';
import { Shop, ShopFilters, ShopInput } from '@/lib/types';
import { Prisma } from '@prisma/client';

function mapPrismaShopToShop(prismaShop: any): Shop {
    return {
        id: prismaShop.id,
        name: prismaShop.name,
        slug: prismaShop.slug,
        category: prismaShop.category as any,
        floor: prismaShop.floor,
        logo: prismaShop.logo,
        phone: prismaShop.phone || undefined,
        website: prismaShop.website || undefined,
        featured: prismaShop.featured,
        isActive: prismaShop.isActive,
        createdAt: prismaShop.createdAt,
        updatedAt: prismaShop.updatedAt,
    };
}

export async function getShops(filters?: ShopFilters): Promise<Shop[]> {
    const where: Prisma.ShopWhereInput = {
        isActive: true,
    };

    if (filters) {
        if (filters.category) {
            where.category = filters.category;
        }
        if (filters.floor !== undefined) {
            where.floor = filters.floor;
        }
        if (filters.search) {
            where.name = {
                contains: filters.search,
                mode: 'insensitive',
            };
        }
        if (filters.featured !== undefined) {
            where.featured = filters.featured;
        }
        if (filters.isActive === undefined) {
            delete where.isActive;
        } else {
            where.isActive = filters.isActive;
        }
    } else {
        delete where.isActive;
    }

    const shops = await prisma.shop.findMany({
        where,
        orderBy: {
            name: 'asc',
        },
    });

    return shops.map(mapPrismaShopToShop);
}

export async function getShopBySlug(slug: string): Promise<Shop | null> {
    const shop = await prisma.shop.findUnique({
        where: { slug },
    });

    if (!shop) return null;
    return mapPrismaShopToShop(shop);
}

export async function createShop(data: ShopInput): Promise<Shop> {
    const shop = await prisma.shop.create({
        data: {
            name: data.name,
            slug: data.slug,
            category: data.category,
            floor: data.floor,
            logo: data.logo,
            phone: data.phone,
            website: data.website,
            featured: data.featured || false,
            isActive: data.isActive ?? true,
        },
    });
    return mapPrismaShopToShop(shop);
}

export async function updateShop(id: string, data: Partial<ShopInput>): Promise<Shop> {
    const updateData: any = { ...data };
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const shop = await prisma.shop.update({
        where: { id },
        data: updateData,
    });
    return mapPrismaShopToShop(shop);
}

export async function getFeaturedShops(limit?: number): Promise<Shop[]> {
    const shops = await prisma.shop.findMany({
        where: { isActive: true, featured: true },
        orderBy: { name: 'asc' },
        take: limit,
    });
    return shops.map(mapPrismaShopToShop);
}

export async function deleteShop(id: string): Promise<void> {
    await prisma.shop.delete({
        where: { id },
    });
}
