import { Link } from '@/i18n/navigation';
import { CATEGORY_LABELS, FLOOR_LABELS, type Shop, type Locale } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store, MapPin, ArrowRight } from 'lucide-react';

interface ShopGridProps {
    shops: Shop[];
    locale: Locale;
}

export function ShopGrid({ shops, locale }: ShopGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
                <Link
                    key={shop.id}
                    href={`/shops/${shop.slug}`}
                    className="group"
                >
                    <Card className="h-full overflow-hidden border-border/50 hover:border-gold/50 transition-all hover:shadow-lg hover:shadow-gold/5">
                        {/* Image/Logo Area */}
                        <div className="relative h-40 bg-gradient-to-br from-accent to-muted flex items-center justify-center overflow-hidden">
                            {shop.banner ? (
                                <img
                                    src={shop.banner}
                                    alt={shop.name}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
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

                        <CardContent className="p-4">
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

                            {/* Description */}
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {shop.description[locale]}
                            </p>

                            {/* View Details */}
                            <div className="flex items-center text-sm font-medium text-gold group-hover:underline">
                                Detayları Gör
                                <ArrowRight className="h-4 w-4 ms-1 transition-transform group-hover:translate-x-1" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
