import { prisma } from '@/lib/db';
import { Shop, ShopFilters, ShopInput } from '@/lib/types';
import { Prisma } from '@prisma/client';
import { mockShops } from '../mock/shops';

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
    try {
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
            // Default behavior for listing: show all active
            // Note: deleted original logic that was removing isActive if no filters
        }

        const shops = await prisma.shop.findMany({
            where,
            orderBy: {
                name: 'asc',
            },
        });

        return shops.map(mapPrismaShopToShop);
    } catch (error) {
        console.warn('DB Connection failed in getShops. Falling back to mock data.');
        return mockShops.filter(s => s.isActive);
    }
}

export async function getShopBySlug(slug: string): Promise<Shop | null> {
    try {
        const shop = await prisma.shop.findUnique({
            where: { slug },
        });

        if (!shop) {
            // Check mock data as secondary fallback for pre-rendering
            return mockShops.find(s => s.slug === slug) || null;
        }
        return mapPrismaShopToShop(shop);
    } catch (error) {
        console.warn(`DB Connection failed in getShopBySlug for ${slug}. Falling back to mock data.`);
        return mockShops.find(s => s.slug === slug) || null;
    }
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
    try {
        const shops = await prisma.shop.findMany({
            where: { isActive: true, featured: true },
            orderBy: { name: 'asc' },
            take: limit,
        });
        return shops.map(mapPrismaShopToShop);
    } catch (error) {
        console.warn('DB Connection failed in getFeaturedShops. Falling back to mock data.');
        const featured = mockShops.filter(s => s.isActive && s.featured);
        return limit ? featured.slice(0, limit) : featured;
    }
}

export async function deleteShop(id: string): Promise<void> {
    await prisma.shop.delete({
        where: { id },
    });
}
