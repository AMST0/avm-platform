"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useSpotlightStore, useShopPopupStore } from '@/lib/store';
import { getShopsAction } from '@/lib/actions/shop.actions';
import { getEventsAction } from '@/lib/actions/event.actions';
import type { Shop, Event, Locale } from '@/lib/types';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { Store, Calendar, ArrowRight, Sparkles, Search, Phone } from 'lucide-react';

export function SpotlightSearch() {
    const t = useTranslations('common');
    const locale = useLocale() as Locale;
    const router = useRouter();
    const { isOpen, close, query, setQuery } = useSpotlightStore();

    const [shops, setShops] = useState<Shop[]>([]);
    const [events, setEvents] = useState<Event[]>([]);

    // Load data on mount
    useEffect(() => {
        const loadData = async () => {
            const [shopsData, eventsData] = await Promise.all([
                getShopsAction({ isActive: true }),
                getEventsAction(),
            ]);
            setShops(shopsData);
            setEvents(eventsData);
        };
        loadData();
    }, []);

    // Filter results based on query
    const filteredShops = useMemo(() => {
        if (!query) return shops.slice(0, 5);
        const lowerQuery = query.toLowerCase();
        return shops
            .filter(
                (shop) =>
                    shop.name.toLowerCase().includes(lowerQuery)
            )
            .slice(0, 5);
    }, [query, shops, locale]);

    const filteredEvents = useMemo(() => {
        if (!query) return events.slice(0, 3);
        const lowerQuery = query.toLowerCase();
        return events
            .filter((event) =>
                event.title[locale].toLowerCase().includes(lowerQuery)
            )
            .slice(0, 3);
    }, [query, events, locale]);

    const openPopup = useShopPopupStore((state) => state.open);

    const handleSelect = (href: string, shop?: Shop) => {
        close();
        if (shop) {
            openPopup(shop);
        } else {
            router.push(href);
        }
    };

    return (
        <CommandDialog open={isOpen} onOpenChange={(open) => !open && close()}>
            <CommandInput
                placeholder={t('searchPlaceholder')}
                value={query}
                onValueChange={setQuery}
            />
            <CommandList>
                <CommandEmpty className="py-6 text-center">
                    <Sparkles className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">{t('noResults')}</p>
                </CommandEmpty>

                {/* Shops */}
                {filteredShops.length > 0 && (
                    <CommandGroup heading={t('shops')}>
                        {filteredShops.map((shop) => (
                            <CommandItem
                                key={shop.id}
                                value={shop.name}
                                onSelect={() => handleSelect(`/shops/${shop.slug}`, shop)}
                                className="flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-accent overflow-hidden">
                                        {shop.logo ? (
                                            <img
                                                src={shop.logo}
                                                alt={shop.name}
                                                className="w-full h-full object-contain p-1"
                                            />
                                        ) : (
                                            <Store className="h-4 w-4 text-navy" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium">{shop.name}</p>
                                    </div>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                {filteredShops.length > 0 && filteredEvents.length > 0 && (
                    <CommandSeparator />
                )}

                {/* Quick Access */}
                {!query && (
                    <>
                        <CommandSeparator />
                        <CommandGroup heading={t('links')}>
                            <CommandItem
                                onSelect={() => handleSelect('/leasing')}
                                className="flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center">
                                        <Search className="h-4 w-4 text-navy" />
                                    </div>
                                    <p className="font-medium">{t('leasing')}</p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </CommandItem>
                            <CommandItem
                                onSelect={() => handleSelect('/contact')}
                                className="flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center">
                                        <Phone className="h-4 w-4 text-navy" />
                                    </div>
                                    <p className="font-medium">{t('contact')}</p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </CommandItem>
                        </CommandGroup>
                    </>
                )}
            </CommandList>
        </CommandDialog>
    );
}
