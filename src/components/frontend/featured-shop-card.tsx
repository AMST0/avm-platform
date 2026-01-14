'use client';

import { Shop } from '@/lib/types';
import { useShopPopupStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { Store } from 'lucide-react';

interface FeaturedShopCardProps {
    shop: Shop;
    index: number;
}

export function FeaturedShopCard({ shop, index }: FeaturedShopCardProps) {
    const openPopup = useShopPopupStore((state) => state.open);

    return (
        <div
            onClick={() => openPopup(shop)}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-accent/5 border border-border/50 hover:border-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold/5 cursor-pointer ${index === 0 ? 'md:col-span-2 md:row-span-2 min-h-[250px] lg:min-h-[350px]' : 'min-h-[180px]'
                }`}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative h-full p-6 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-white/20 overflow-hidden">
                        {shop.logo ? (
                            <img
                                src={shop.logo}
                                alt={shop.name}
                                className="w-full h-full object-contain p-2"
                            />
                        ) : (
                            <Store className="h-6 w-6 text-gold" />
                        )}
                    </div>
                    <Badge variant="secondary" className="bg-white/10 backdrop-blur-md text-foreground border-0">
                        {shop.floor}. Kat
                    </Badge>
                </div>

                <h3 className={`font-bold text-foreground group-hover:text-gold transition-colors ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                    }`}>
                    {shop.name}
                </h3>
            </div>
        </div>
    );
}
