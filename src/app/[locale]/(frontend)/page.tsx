import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getFeaturedShops, getSliders, getUpcomingEvents } from '@/lib/data';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Store, Calendar, Sparkles } from 'lucide-react';
import { HomeSlider } from '@/components/frontend';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Locale } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('hero');
    const tShops = await getTranslations('shops');
    const tEvents = await getTranslations('events');

    // Fetch data with error handling for sliders
    const [featuredShops, upcomingEvents] = await Promise.all([
        getFeaturedShops(6),
        getUpcomingEvents(),
    ]);

    let sliders: any[] = [];
    try {
        sliders = await getSliders();
    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error('[HomePage] Failed to fetch sliders:', error);
        sliders = [];
    }

    // return (
    return (
        <>
            {/* Hero Section */}
            {sliders.length > 0 ? (
                <HomeSlider sliders={sliders} />
            ) : (
                <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center luxury-gradient overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 end-1/4 w-64 h-64 bg-navy-light/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    </div>

                    <div className="container mx-auto px-4 text-center relative z-10">
                        <Badge className="mb-6 bg-gold/20 text-gold border-gold/30 hover:bg-gold/30">
                            <Sparkles className="w-3 h-3 me-1" />
                            Premium Shopping Experience
                        </Badge>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                            {t('welcome')} (DEBUG: NO SLIDERS)
                        </h1>

                        <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-black font-semibold px-8 h-12 text-base">
                                <Link href="/shops">
                                    {t('exploreShops')}
                                    <ArrowRight className="ms-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="border-white/30 text-white bg-transparent hover:bg-white/10 px-8 h-12 text-base">
                                <Link href="/events">
                                    {t('upcomingEvents')}
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
                </section>
            )}

            {/* Featured Shops - Bento Grid Style */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                                {tShops('featured')}
                            </h2>
                            <p className="text-muted-foreground">
                                En popüler mağazalarımızı keşfedin
                            </p>
                        </div>
                        <Button asChild variant="ghost" className="hidden sm:flex">
                            <Link href="/shops">
                                Tümünü Gör
                                <ArrowRight className="ms-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {featuredShops.map((shop, index) => (
                            <Link
                                key={shop.id}
                                href={`/shops/${shop.slug}`}
                                className={`group relative overflow-hidden rounded-2xl border border-border/50 hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-1 ${index === 0 ? 'md:col-span-2 md:row-span-2 min-h-[300px] lg:min-h-[400px]' : 'min-h-[200px]'
                                    }`}
                            >
                                {/* Background Image (Logo) */}
                                {shop.logo ? (
                                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
                                        <img
                                            src={shop.logo}
                                            alt={shop.name}
                                            className={`absolute object-contain transition-all duration-500 group-hover:scale-110 ${index === 0
                                                ? 'w-40 h-40 lg:w-56 lg:h-56 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-30'
                                                : 'w-24 h-24 top-4 right-4 opacity-15 group-hover:opacity-25'
                                                }`}
                                        />
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-card to-accent/5" />
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                {/* Content */}
                                <div className="relative h-full p-6 flex flex-col justify-end">
                                    <div className="flex items-center gap-3 mb-3">
                                        {shop.logo ? (
                                            <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center overflow-hidden border border-white/20">
                                                <img src={shop.logo} alt={shop.name} className="w-10 h-10 object-contain" />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded-xl bg-gold/20 backdrop-blur-md flex items-center justify-center border border-gold/30">
                                                <Store className="h-6 w-6 text-gold" />
                                            </div>
                                        )}
                                        <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-0 font-medium">
                                            {shop.floor}. Kat
                                        </Badge>
                                    </div>

                                    <h3 className={`font-bold text-white group-hover:text-gold transition-colors ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                                        }`}>
                                        {shop.name}
                                    </h3>

                                    <p className="text-white/70 text-sm mt-2 line-clamp-2">
                                        {shop.description?.[locale as Locale]}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
                <section className="py-20 bg-accent/30">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                                    {tEvents('upcoming')}
                                </h2>
                                <p className="text-muted-foreground">
                                    Kaçırılmayacak etkinlikler
                                </p>
                            </div>
                            <Button asChild variant="ghost" className="hidden sm:flex">
                                <Link href="/events">
                                    Tümünü Gör
                                    <ArrowRight className="ms-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {upcomingEvents.slice(0, 3).map((event) => (
                                <Link
                                    key={event.id}
                                    href={`/events/${event.slug}`}
                                    className="group relative overflow-hidden rounded-2xl min-h-[280px] border border-border/50 hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-1"
                                >
                                    {/* Background Image */}
                                    {event.image ? (
                                        <img
                                            src={event.image}
                                            alt={event.title[locale as Locale]}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-black" />
                                    )}

                                    {/* Gradient Overlay - sadece alt kısımda metin için */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                    {/* Content */}
                                    <div className="relative h-full p-6 flex flex-col justify-end">
                                        {/* Date Badge */}
                                        <div className="absolute top-4 left-4">
                                            <div className="bg-gold text-black px-4 py-2 rounded-xl font-bold text-center shadow-lg">
                                                <span className="text-2xl block leading-none">
                                                    {new Date(event.startDate).getDate()}
                                                </span>
                                                <span className="text-xs uppercase tracking-wider">
                                                    {new Date(event.startDate).toLocaleDateString(locale, { month: 'short' })}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Event Info */}
                                        <div>
                                            <h3 className="font-bold text-xl text-white group-hover:text-gold transition-colors mb-2">
                                                {event.title[locale as Locale]}
                                            </h3>
                                            <div className="flex items-center gap-2 text-white/70 text-sm">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {new Date(event.startDate).toLocaleDateString(locale, {
                                                        day: 'numeric',
                                                        month: 'long',
                                                    })} - {new Date(event.endDate).toLocaleDateString(locale, {
                                                        day: 'numeric',
                                                        month: 'long',
                                                    })}
                                                </span>
                                            </div>
                                            <p className="text-white/60 text-sm mt-1">
                                                📍 {event.location}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-navy via-navy-dark to-black text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Alışverişin Tadını Çıkarın
                    </h2>
                    <p className="text-white/70 max-w-xl mx-auto mb-8">
                        200+ mağaza, dünya mutfakları, eğlence ve daha fazlası sizleri bekliyor.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-black font-semibold">
                            <Link href="/shops">
                                Mağazaları Keşfet
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-white/30 text-white bg-transparent hover:bg-white/10">
                            <Link href="/contact">
                                Bize Ulaşın
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
