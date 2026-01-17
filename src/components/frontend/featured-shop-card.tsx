'use client';

import { Shop, Locale } from '@/lib/types';
import { useShopPopupStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { Store } from 'lucide-react';
import { useLocale } from 'next-intl';

interface FeaturedShopCardProps {
    shop: Shop;
    index: number;
}

export function FeaturedShopCard({ shop, index }: FeaturedShopCardProps) {
    const openPopup = useShopPopupStore((state) => state.open);
    const locale = useLocale() as Locale;

    return (
        <div
            onClick={() => openPopup(shop)}
            className={`group relative overflow-hidden rounded-2xl border border-border/50 hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-1 cursor-pointer ${index === 0 ? 'md:col-span-2 md:row-span-2 min-h-[300px] lg:min-h-[400px]' : 'min-h-[200px]'
                }`}
        >
            {/* Background Image - Banner or Logo */}
            {shop.banner ? (
                <div className="absolute inset-0">
                    <img
                        src={shop.banner}
                        alt={shop.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
            ) : shop.logo ? (
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
                    <img
                        src={shop.logo}
                        alt={shop.name}
                        className={`absolute object-contain transition-all duration-500 group-hover:scale-110 ${index === 0
                            ? 'w-48 h-48 lg:w-64 lg:h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-40'
                            : 'w-32 h-32 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 group-hover:opacity-35'
                            }`}
                    />
                </div>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-navy/90 to-navy-dark" />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative h-full p-6 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center border border-white/20 overflow-hidden">
                        {shop.logo ? (
                            <img
                                src={shop.logo}
                                alt={shop.name}
                                className="w-10 h-10 object-contain"
                            />
                        ) : (
                            <Store className="h-6 w-6 text-gold" />
                        )}
                    </div>
                    <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-0 font-medium">
                        {shop.floor}. Kat
                    </Badge>
                </div>

                <h3 className={`font-bold text-white group-hover:text-gold transition-colors ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                    }`}>
                    {shop.name}
                </h3>

                {shop.description?.[locale] && (
                    <p className="text-white/70 text-sm mt-2 line-clamp-2">
                        {shop.description[locale]}
                    </p>
                )}
            </div>
        </div>
    );
}
