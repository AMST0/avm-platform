"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { CATEGORY_LABELS, FLOOR_LABELS, type ShopCategory, type Locale } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ShopFiltersProps {
    categories: ShopCategory[];
    floors: number[];
    selectedCategory?: string;
    selectedFloor?: string;
    searchQuery?: string;
    locale: Locale;
}

export function ShopFilters({
    categories,
    floors,
    selectedCategory,
    selectedFloor,
    searchQuery,
    locale,
}: ShopFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilter = useCallback(
        (key: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            router.push(`?${params.toString()}`);
        },
        [router, searchParams]
    );

    const clearFilters = useCallback(() => {
        router.push('?');
    }, [router]);

    const hasFilters = selectedCategory || selectedFloor || searchQuery;

    return (
        <Card className="sticky top-24">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Filter className="h-5 w-5" />
                        Filtreler
                    </CardTitle>
                    {hasFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-destructive hover:text-destructive"
                        >
                            <X className="h-4 w-4 me-1" />
                            Temizle
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Search */}
                <div>
                    <h4 className="font-medium mb-3 text-sm text-muted-foreground">
                        Mağaza Ara
                    </h4>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Mağaza adı..."
                            className="pl-9"
                            defaultValue={searchQuery}
                            onChange={(e) => {
                                // Debounced search would be better, but simple onChange for now
                                const val = e.target.value;
                                const timeoutId = setTimeout(() => updateFilter('search', val), 500);
                                return () => clearTimeout(timeoutId);
                            }}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="font-medium mb-3 text-sm text-muted-foreground">
                        Kategori
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Badge
                                key={category}
                                variant={selectedCategory === category ? 'default' : 'outline'}
                                className={`cursor-pointer transition-all ${selectedCategory === category
                                    ? 'bg-gold text-black hover:bg-gold-light'
                                    : 'hover:bg-accent'
                                    }`}
                                onClick={() =>
                                    updateFilter(
                                        'category',
                                        selectedCategory === category ? null : category
                                    )
                                }
                            >
                                {CATEGORY_LABELS[category]?.[locale] || category}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Floors */}
                <div>
                    <h4 className="font-medium mb-3 text-sm text-muted-foreground">
                        Kat
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {floors.map((floor) => (
                            <Badge
                                key={floor}
                                variant={selectedFloor === floor.toString() ? 'default' : 'outline'}
                                className={`cursor-pointer transition-all ${selectedFloor === floor.toString()
                                    ? 'bg-gold text-black hover:bg-gold-light'
                                    : 'hover:bg-accent'
                                    }`}
                                onClick={() =>
                                    updateFilter(
                                        'floor',
                                        selectedFloor === floor.toString() ? null : floor.toString()
                                    )
                                }
                            >
                                {FLOOR_LABELS[floor]?.[locale] || `${floor}. Kat`}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
