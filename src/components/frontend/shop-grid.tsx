'use client';

import { CATEGORY_LABELS, FLOOR_LABELS, type Shop, type Locale } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store, MapPin, ArrowRight } from 'lucide-react';
import { useShopPopupStore } from '@/lib/store';

interface ShopGridProps {
    shops: Shop[];
    locale: Locale;
}

export function ShopGrid({ shops, locale }: ShopGridProps) {
    const openPopup = useShopPopupStore((state) => state.open);

    const handleShopClick = (shop: Shop) => {
        openPopup(shop);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {shops.map((shop) => (
                    <div
                        key={shop.id}
                        onClick={() => handleShopClick(shop)}
                        className="group cursor-pointer"
                    >
                        <Card className="h-full overflow-hidden border-border/50 hover:border-gold/50 transition-all hover:shadow-lg hover:shadow-gold/5 flex flex-col">
                            {/* Image/Logo Area */}
                            <div className="relative aspect-[4/3] bg-gradient-to-br from-accent to-muted flex items-center justify-center overflow-hidden">
                                {shop.logo ? (
                                    <div className="w-3/4 h-3/4 bg-white rounded-2xl p-4 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <img
                                            src={shop.logo}
                                            alt={shop.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                                        <Store className="h-10 w-10 text-gold" />
                                    </div>
                                )}

                                {/* Category Badge */}
                                <Badge className="absolute top-3 end-3 bg-black/50 backdrop-blur-md text-white border-0">
                                    {CATEGORY_LABELS[shop.category]?.[locale] || shop.category}
                                </Badge>

                                {/* Featured Badge */}
                                {shop.featured && (
                                    <Badge className="absolute top-3 start-3 bg-gold text-black border-0">
                                        Öne Çıkan
                                    </Badge>
                                )}
                            </div>

                            <CardContent className="p-3">
                                {/* Title & Floor */}
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-semibold text-lg group-hover:text-gold transition-colors line-clamp-1">
                                        {shop.name}
                                    </h3>
                                    <Badge variant="outline" className="shrink-0">
                                        <MapPin className="h-3 w-3 me-1" />
                                        {FLOOR_LABELS[shop.floor]?.[locale] || `${shop.floor}. Kat`}
                                    </Badge>
                                </div>

                                {/* No description to show */}

                                {/* View Details */}
                                <div className="flex items-center text-sm font-medium text-gold group-hover:underline mt-4">
                                    Detayları Gör
                                    <ArrowRight className="h-4 w-4 ms-1 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}
