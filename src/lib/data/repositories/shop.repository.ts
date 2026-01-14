// ==========================================
// AVM Platform - Shop Repository
// Future-proof: Currently uses mock data, ready for DB swap
// ==========================================

import type { Shop, ShopCategory } from '@/lib/types';
import { mockShops } from '../mock/shops';

export interface ShopFilters {
    category?: ShopCategory;
    floor?: number;
    featured?: boolean;
    isActive?: boolean;
    search?: string;
}

/**
 * Get all shops with optional filtering
 * @param filters - Optional filters to apply
 * @returns Promise<Shop[]> - Array of shops
 */
export async function getShops(filters?: ShopFilters): Promise<Shop[]> {
    // Simulate async DB call
    let shops = [...mockShops];

    if (filters) {
        if (filters.category) {
            shops = shops.filter((shop) => shop.category === filters.category);
        }
        if (filters.floor !== undefined) {
            shops = shops.filter((shop) => shop.floor === filters.floor);
        }
        if (filters.featured !== undefined) {
            shops = shops.filter((shop) => shop.featured === filters.featured);
        }
        if (filters.isActive !== undefined) {
            shops = shops.filter((shop) => shop.isActive === filters.isActive);
        }
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            shops = shops.filter(
                (shop) =>
                    shop.name.toLowerCase().includes(searchLower) ||
                    shop.description.tr.toLowerCase().includes(searchLower) ||
                    shop.description.en.toLowerCase().includes(searchLower)
            );
        }
    }

    return shops;
}

/**
 * Get a single shop by slug
 * @param slug - Shop slug
 * @returns Promise<Shop | null>
 */
export async function getShopBySlug(slug: string): Promise<Shop | null> {
    const shop = mockShops.find((s) => s.slug === slug);
    return shop || null;
}

/**
 * Get a single shop by ID
 * @param id - Shop ID
 * @returns Promise<Shop | null>
 */
export async function getShopById(id: string): Promise<Shop | null> {
    const shop = mockShops.find((s) => s.id === id);
    return shop || null;
}

/**
 * Get featured shops
 * @param limit - Maximum number of shops to return
 * @returns Promise<Shop[]>
 */
export async function getFeaturedShops(limit?: number): Promise<Shop[]> {
    const featured = mockShops.filter((shop) => shop.featured && shop.isActive);
    return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get shops by category
 * @param category - Shop category
 * @returns Promise<Shop[]>
 */
export async function getShopsByCategory(category: ShopCategory): Promise<Shop[]> {
    return mockShops.filter((shop) => shop.category === category && shop.isActive);
}

/**
 * Get shops by floor
 * @param floor - Floor number
 * @returns Promise<Shop[]>
 */
export async function getShopsByFloor(floor: number): Promise<Shop[]> {
    return mockShops.filter((shop) => shop.floor === floor && shop.isActive);
}

/**
 * Get all unique categories that have active shops
 * @returns Promise<ShopCategory[]>
 */
export async function getActiveCategories(): Promise<ShopCategory[]> {
    const categories = new Set<ShopCategory>();
    mockShops.forEach((shop) => {
        if (shop.isActive) {
            categories.add(shop.category);
        }
    });
    return Array.from(categories);
}

/**
 * Get all floors that have active shops
 * @returns Promise<number[]>
 */
export async function getActiveFloors(): Promise<number[]> {
    const floors = new Set<number>();
    mockShops.forEach((shop) => {
        if (shop.isActive) {
            floors.add(shop.floor);
        }
    });
    return Array.from(floors).sort((a, b) => a - b);
}

// ==========================================
// Admin Functions (for future DB integration)
// ==========================================

/**
 * Create a new shop (Admin)
 * @param data - Shop data
 * @returns Promise<Shop>
 */
export async function createShop(data: Omit<Shop, 'id' | 'createdAt' | 'updatedAt'>): Promise<Shop> {
    const newShop: Shop = {
        ...data,
        id: `shop-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    // In real implementation, this would save to DB
    mockShops.push(newShop);
    return newShop;
}

/**
 * Update a shop (Admin)
 * @param id - Shop ID
 * @param data - Partial shop data to update
 * @returns Promise<Shop | null>
 */
export async function updateShop(
    id: string,
    data: Partial<Omit<Shop, 'id' | 'createdAt'>>
): Promise<Shop | null> {
    const index = mockShops.findIndex((s) => s.id === id);
    if (index === -1) return null;

    mockShops[index] = {
        ...mockShops[index],
        ...data,
        updatedAt: new Date(),
    };
    return mockShops[index];
}

/**
 * Delete a shop (Admin)
 * @param id - Shop ID
 * @returns Promise<boolean>
 */
export async function deleteShop(id: string): Promise<boolean> {
    const index = mockShops.findIndex((s) => s.id === id);
    if (index === -1) return false;

    mockShops.splice(index, 1);
    return true;
}
