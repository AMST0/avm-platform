'use client';

import { useShopPopupStore } from '@/lib/store';
import { ShopPopup } from './shop-popup';

export function GlobalShopPopup() {
    const { shop, isOpen, close } = useShopPopupStore();

    return (
        <ShopPopup
            shop={shop}
            open={isOpen}
            onOpenChange={(open) => !open && close()}
        />
    );
}
