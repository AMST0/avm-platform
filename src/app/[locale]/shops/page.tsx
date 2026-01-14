import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getShops } from '@/lib/data';
import { CATEGORY_LABELS, FLOOR_LABELS, type ShopCategory, type Locale } from '@/lib/types';
import { ShopFilters } from '@/components/frontend/shop-filters';
import { ShopGrid } from '@/components/frontend/shop-grid';
import { Header, Footer } from '@/components/shared';

interface ShopsPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ category?: string; floor?: string; search?: string }>;
}

export default async function ShopsPage({
    params,
    searchParams,
}: ShopsPageProps) {
    const { locale } = await params;
    const { category, floor, search } = await searchParams;
    setRequestLocale(locale);

    const t = await getTranslations('shops');
    const tCommon = await getTranslations('common');

    // Get all shops
    let shops = await getShops();

    // Apply filters
    if (category) {
        shops = shops.filter((shop) => shop.category === category);
    }
    if (floor !== undefined && floor !== '') {
        shops = shops.filter((shop) => shop.floor === parseInt(floor));
    }
    if (search) {
        shops = shops.filter((shop) =>
            shop.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Get unique categories and floors from all shops for filter options
    const allShops = await getShops();
    const categories = [...new Set(allShops.map((s) => s.category))];
    const floors = [...new Set(allShops.map((s) => s.floor))].sort((a, b) => a - b);

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20 pb-16 bg-background">
                {/* Premium Hero Section */}
                <section className="relative h-[300px] md:h-[400px] flex items-center overflow-hidden bg-navy">
                    {/* Background with AI image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/luxury_shops_hero_bg_1768398513889.png"
                            className="w-full h-full object-cover"
                            alt="Luxury Shops"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
                                {t('title')}
                            </h1>
                            <div className="w-20 h-1.5 bg-gold rounded-full mb-6" />
                            <p className="text-xl text-white/70 font-medium leading-relaxed max-w-xl">
                                200+ seçkin marka ve dünya standartlarında mağaza deneyimi sizi bekliyor.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters & Grid */}
                <section className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <aside className="lg:w-64 shrink-0">
                            <ShopFilters
                                categories={categories}
                                floors={floors}
                                selectedCategory={category}
                                selectedFloor={floor}
                                searchQuery={search}
                                locale={locale as Locale}
                            />
                        </aside>

                        {/* Shop Grid */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-muted-foreground">
                                    <span className="font-semibold text-foreground">{shops.length}</span>{' '}
                                    mağaza bulundu
                                </p>
                            </div>

                            {shops.length > 0 ? (
                                <ShopGrid shops={shops} locale={locale as Locale} />
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-muted-foreground text-lg">
                                        {tCommon('noResults')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
