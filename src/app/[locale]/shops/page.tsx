import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getShops } from '@/lib/data';
import { CATEGORY_LABELS, FLOOR_LABELS, type ShopCategory, type Locale } from '@/lib/types';
import { ShopFilters } from '@/components/frontend/shop-filters';
import { ShopGrid } from '@/components/frontend/shop-grid';
import { Header, Footer } from '@/components/shared';

interface ShopsPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ category?: string; floor?: string }>;
}

export default async function ShopsPage({
    params,
    searchParams,
}: ShopsPageProps) {
    const { locale } = await params;
    const { category, floor } = await searchParams;
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

    // Get unique categories and floors from all shops for filter options
    const allShops = await getShops();
    const categories = [...new Set(allShops.map((s) => s.category))];
    const floors = [...new Set(allShops.map((s) => s.floor))].sort((a, b) => a - b);

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20 pb-16 bg-background">
                {/* Hero Section */}
                <section className="relative py-16 luxury-gradient">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl">
                            200+ mağaza ile alışverişin keyfini çıkarın
                        </p>
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
