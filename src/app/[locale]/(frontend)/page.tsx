import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getFeaturedShops, getSliders, getUpcomingEvents } from '@/lib/data';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Store, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Locale } from '@/lib/types';

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

    // Fetch data
    const [featuredShops, sliders, upcomingEvents] = await Promise.all([
        getFeaturedShops(6),
        getSliders(),
        getUpcomingEvents(),
    ]);

    return (
        <>
            {/* Hero Section */}
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
                        {t('welcome')}
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
                        <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 h-12 text-base">
                            <Link href="/events">
                                {t('upcomingEvents')}
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </section>

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
                                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-accent/5 border border-border/50 hover:border-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold/5 ${index === 0 ? 'md:col-span-2 md:row-span-2 min-h-[300px] lg:min-h-[400px]' : 'min-h-[200px]'
                                    }`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative h-full p-6 flex flex-col justify-end">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                            <Store className="h-6 w-6 text-gold" />
                                        </div>
                                        <Badge variant="secondary" className="bg-white/10 backdrop-blur-md text-white border-0">
                                            {shop.floor}. Kat
                                        </Badge>
                                    </div>

                                    <h3 className={`font-bold text-foreground group-hover:text-gold transition-colors ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                                        }`}>
                                        {shop.name}
                                    </h3>

                                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
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
                                <Card key={event.id} className="group overflow-hidden border-border/50 hover:border-gold/50 transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                                                <Calendar className="h-7 w-7 text-gold" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-lg text-foreground group-hover:text-gold transition-colors truncate">
                                                    {event.title[locale as Locale]}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {event.location}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {new Date(event.startDate).toLocaleDateString(locale, {
                                                        day: 'numeric',
                                                        month: 'long',
                                                    })} - {new Date(event.endDate).toLocaleDateString(locale, {
                                                        day: 'numeric',
                                                        month: 'long',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
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
                        <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
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
