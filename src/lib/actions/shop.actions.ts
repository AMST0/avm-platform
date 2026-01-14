"use server";

import { revalidatePath } from 'next/cache';
import * as shopRepository from '../data/repositories/shop.repository';
import { Shop, ShopFilters, ShopInput } from '../types';

export async function getShopsAction(filters?: ShopFilters): Promise<Shop[]> {
    return await shopRepository.getShops(filters);
}

export async function getShopBySlugAction(slug: string): Promise<Shop | null> {
    return await shopRepository.getShopBySlug(slug);
}

export async function createShopAction(data: ShopInput): Promise<Shop> {
    const shop = await shopRepository.createShop(data);
    revalidatePath('/[locale]/admin/shops', 'page');
    revalidatePath('/[locale]/shops', 'page');
    return shop;
}

export async function updateShopAction(id: string, data: Partial<ShopInput>): Promise<Shop> {
    const shop = await shopRepository.updateShop(id, data);
    revalidatePath('/[locale]/admin/shops', 'page');
    revalidatePath('/[locale]/shops', 'page');
    return shop;
}

export async function deleteShopAction(id: string): Promise<void> {
    await shopRepository.deleteShop(id);
    revalidatePath('/[locale]/admin/shops', 'page');
    revalidatePath('/[locale]/shops', 'page');
}

export async function toggleShopActiveAction(id: string, isActive: boolean): Promise<Shop> {
    const shop = await shopRepository.updateShop(id, { isActive });
    revalidatePath('/[locale]/admin/shops', 'page');
    revalidatePath('/[locale]/shops', 'page');
    return shop;
}
