import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getUpcomingEvents, getPastEvents } from '@/lib/data';
import { Header, Footer } from '@/components/shared';
import { EventsClient } from '@/components/frontend/events-client';
import type { Locale } from '@/lib/types';

interface EventsPageProps {
    params: Promise<{ locale: string }>;
}

export default async function EventsPage({ params }: EventsPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('events');

    const [upcomingEvents, pastEvents] = await Promise.all([
        getUpcomingEvents(),
        getPastEvents(),
    ]);

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20 pb-16 bg-background">
                {/* Premium Hero Section */}
                <section className="relative h-[300px] md:h-[400px] flex items-center overflow-hidden bg-navy">
                    {/* Background with AI image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/mall_events_hero_bg_1768398541258.png"
                            className="w-full h-full object-cover"
                            alt="AVM Events"
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
                                Kaçırılmayacak etkinlikler, konserler ve özel organizasyonlar ile hayatın ritmi burada.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Events Content */}
                <EventsClient
                    upcomingEvents={upcomingEvents}
                    pastEvents={pastEvents}
                    locale={locale}
                    translations={{
                        upcoming: t('upcoming'),
                        past: t('past'),
                        noUpcoming: t('noUpcoming')
                    }}
                />
            </main>

            <Footer />
        </>
    );
}
