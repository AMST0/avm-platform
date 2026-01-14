import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getShopBySlug, getShops } from '@/lib/data';
import { CATEGORY_LABELS, FLOOR_LABELS, type Locale } from '@/lib/types';
import { Link } from '@/i18n/navigation';
import { Header, Footer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    ArrowLeft,
    MapPin,
    Phone,
    Globe,
    Clock,
    QrCode,
    Share2,
    Store
} from 'lucide-react';

interface ShopDetailPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
    const shops = await getShops();
    return shops.map((shop) => ({ slug: shop.slug }));
}

export default async function ShopDetailPage({ params }: ShopDetailPageProps) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('shops');
    const shop = await getShopBySlug(slug);

    if (!shop) {
        notFound();
    }

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20 pb-16 bg-background">
                {/* Premium Banner/Hero Section */}
                <section className="relative h-[300px] md:h-[450px] flex items-center overflow-hidden bg-navy">
                    {shop.banner ? (
                        <img
                            src={shop.banner}
                            alt={shop.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-40"
                        />
                    ) : (
                        <img
                            src="/luxury_shops_hero_bg_1768398513889.png"
                            className="absolute inset-0 w-full h-full object-cover opacity-20"
                            alt="Default Banner"
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />

                    <div className="container mx-auto px-4 relative z-10 h-full flex items-end pb-12">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-8 w-full">
                            {/* Premium Logo Frame */}
                            <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white/10 backdrop-blur-sm p-4">
                                {shop.logo ? (
                                    <img src={shop.logo} alt={shop.name} className="w-full h-full object-contain" />
                                ) : (
                                    <Store className="h-20 w-20 text-gold" />
                                )}
                            </div>

                            <div className="flex-1 text-center md:text-left space-y-4">
                                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                                    <Badge className="bg-gold text-black font-black uppercase tracking-widest text-[10px] px-3 py-1">
                                        {CATEGORY_LABELS[shop.category]?.[locale as Locale] || shop.category}
                                    </Badge>
                                    <Badge variant="outline" className="bg-white/10 backdrop-blur-md text-white border-white/20 font-bold">
                                        <MapPin className="h-3.5 w-3.5 me-1.5" />
                                        {FLOOR_LABELS[shop.floor]?.[locale as Locale] || `${shop.floor}. Kat`}
                                    </Badge>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                                    {shop.name}
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Back Button */}
                            <Button asChild variant="ghost" size="sm" className="mb-6 -ms-3">
                                <Link href="/shops">
                                    <ArrowLeft className="h-4 w-4 me-2" />
                                    Tüm Mağazalar
                                </Link>
                            </Button>

                            {/* Description */}
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <h2 className="text-2xl font-semibold mb-4">Hakkında</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {shop.description[locale as Locale]}
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-80 space-y-6">
                            {/* Contact Card */}
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="font-semibold text-lg">İletişim</h3>

                                    {shop.phone && (
                                        <a
                                            href={`tel:${shop.phone}`}
                                            className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                                                <Phone className="h-5 w-5 text-gold" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">{t('phone')}</p>
                                                <p className="font-medium">{shop.phone}</p>
                                            </div>
                                        </a>
                                    )}

                                    {shop.website && (
                                        <a
                                            href={shop.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                                                <Globe className="h-5 w-5 text-gold" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">{t('website')}</p>
                                                <p className="font-medium truncate">{shop.website.replace(/^https?:\/\//, '')}</p>
                                            </div>
                                        </a>
                                    )}

                                    {shop.workingHours && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                                                <Clock className="h-5 w-5 text-gold" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">{t('workingHours')}</p>
                                                <p className="font-medium">{shop.workingHours}</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Location Card */}
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Konum
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {FLOOR_LABELS[shop.floor]?.[locale as Locale] || `${shop.floor}. Kat`}
                                    </p>

                                    <Separator />

                                    <div className="flex items-center justify-center py-4">
                                        <div className="text-center">
                                            <QrCode className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                                            <p className="text-sm text-muted-foreground">
                                                {t('scanQr')}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Share Button */}
                            <Button variant="outline" className="w-full">
                                <Share2 className="h-4 w-4 me-2" />
                                Paylaş
                            </Button>
                        </aside>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
