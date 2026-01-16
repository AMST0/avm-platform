import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getFeaturedShops, getSliders, getUpcomingEvents } from '@/lib/data';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Store, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header, Footer, SpotlightSearch } from '@/components/shared';
import { FeaturedShopCard } from '@/components/frontend/featured-shop-card';
import { HomeSlider } from '@/components/frontend';
import type { Locale } from '@/lib/types';

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const tHero = await getTranslations('hero');
    const tShops = await getTranslations('shops');
    const tEvents = await getTranslations('events');
    const tCommon = await getTranslations('common');

    // Fetch data
    const [featuredShops, sliders, upcomingEvents] = await Promise.all([
        getFeaturedShops(6),
        getSliders(),
        getUpcomingEvents(),
    ]);

    return (
        <>
            <Header />
            <SpotlightSearch />

            {/* Hero Section - Dynamic Slider or Fallback */}
            {sliders.length > 0 ? (
                <HomeSlider sliders={sliders} />
            ) : (
                <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center luxury-gradient overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 end-1/4 w-64 h-64 bg-navy-light/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>

                    <div className="container mx-auto px-4 text-center relative z-10">
                        <Badge className="mb-6 bg-gold/20 text-gold border-gold/30 hover:bg-gold/30">
                            <Sparkles className="w-3 h-3 me-1" />
                            Premium Shopping Experience
                        </Badge>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                            {tHero('welcome')}
                        </h1>

                        <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto">
                            {tHero('subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-black font-semibold px-8 h-12 text-base">
                                <Link href="/shops">
                                    {tHero('exploreShops')}
                                    <ArrowRight className="ms-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="border-white/30 text-white bg-transparent hover:bg-white/10 px-8 h-12 text-base">
                                <Link href="/events">
                                    {tHero('upcomingEvents')}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredShops.map((shop, index) => (
                            <FeaturedShopCard
                                key={shop.id}
                                shop={shop}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Leasing CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="relative overflow-hidden rounded-[3rem] bg-navy min-h-[500px] flex items-center">
                        {/* Background with AI image */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/luxury_mall_leasing_bg_1768398194031.png"
                                className="w-full h-full object-cover opacity-40"
                                alt="Luxury Mall leasing"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
                        </div>

                        <div className="container mx-auto px-12 relative z-10 flex flex-col lg:flex-row items-center gap-12 py-16">
                            <div className="flex-1 text-center lg:text-start">
                                <Badge className="mb-6 bg-gold text-navy-dark border-0 px-4 py-1.5 text-sm font-semibold tracking-wider">
                                    {tCommon('leasing').toUpperCase()}
                                </Badge>
                                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                                    İşinizi Geleceğe Taşıyın
                                </h2>
                                <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl font-medium">
                                    AVM Platform bünyesinde yerinizi alarak markanızı binlerce ziyaretçimizle buluşturun. Modern mağaza alanlarımız sizi bekliyor.
                                </p>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                                    <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-navy-dark font-black px-10 h-16 rounded-2xl shadow-2xl shadow-gold/30 transition-all hover:scale-105">
                                        <Link href="/leasing">Hemen Başvur</Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline" className="border-white/40 text-white bg-transparent hover:bg-white/20 font-black px-10 h-16 rounded-2xl backdrop-blur-md transition-all hover:scale-105 border-2">
                                        <Link href="/leasing">{tCommon('learnMore')}</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="hidden lg:flex lg:w-1/3 justify-end">
                                <div className="relative">
                                    <div className="absolute -inset-8 bg-gold/30 blur-3xl rounded-full animate-pulse" />
                                    <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-[2.5rem] bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.3)]">
                                        <Sparkles className="w-16 h-16 lg:w-20 lg:h-20 text-navy-dark" />
                                    </div>
                                </div>
                            </div>
                        </div>
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
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/modern_mall_lifestyle_bg_1768398221170.png"
                        className="w-full h-full object-cover"
                        alt="Shopping Mall"
                    />
                    <div className="absolute inset-0 bg-navy/80 backdrop-blur-[2px]" />
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Alışverişin Tadını Çıkarın
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto mb-12 text-xl font-medium leading-relaxed">
                        200+ mağaza, dünya mutfakları, eğlence ve daha fazlası sizleri bekliyor. Hayatın ritmini burada tutun.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-navy-dark font-black px-12 h-16 rounded-2xl shadow-2xl shadow-gold/30 transition-all hover:scale-105 text-lg">
                            <Link href="/shops">
                                Mağazaları Keşfet
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-white/40 text-white bg-transparent hover:bg-white/20 font-black px-12 h-16 rounded-2xl backdrop-blur-md transition-all hover:scale-105 text-lg border-2">
                            <Link href="/contact">
                                Bize Ulaşın
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
