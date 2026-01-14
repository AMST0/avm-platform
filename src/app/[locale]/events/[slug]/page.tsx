import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getEventBySlug, getUpcomingEvents } from '@/lib/data';
import { Link } from '@/i18n/navigation';
import { Header, Footer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Locale } from '@/lib/types';
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Clock,
    Share2
} from 'lucide-react';

interface EventDetailPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
    const events = await getUpcomingEvents();
    return events.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('events');
    const event = await getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const isPast = endDate < new Date();

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20 pb-16 bg-background">
                {/* Hero Section */}
                <section className="relative h-[300px] md:h-[450px] overflow-hidden">
                    {event.image ? (
                        <img
                            src={event.image}
                            alt={event.title[locale as Locale]}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 luxury-gradient" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                    <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
                        <div>
                            {isPast && (
                                <Badge variant="secondary" className="mb-4">
                                    Sona Erdi
                                </Badge>
                            )}
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                {event.title[locale as Locale]}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-white/80">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    <span>
                                        {startDate.toLocaleDateString(locale, {
                                            day: 'numeric',
                                            month: 'long',
                                        })}
                                        {' - '}
                                        {endDate.toLocaleDateString(locale, {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    <span>{event.location}</span>
                                </div>
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
                                <Link href="/events">
                                    <ArrowLeft className="h-4 w-4 me-2" />
                                    Tüm Etkinlikler
                                </Link>
                            </Button>

                            {/* Description */}
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <h2 className="text-2xl font-semibold mb-4">Etkinlik Hakkında</h2>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {event.description[locale as Locale]}
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-80 space-y-6">
                            {/* Event Info Card */}
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="font-semibold text-lg">Etkinlik Bilgileri</h3>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                                            <Calendar className="h-5 w-5 text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">{t('date')}</p>
                                            <p className="font-medium">
                                                {startDate.toLocaleDateString(locale, {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                                            <Clock className="h-5 w-5 text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Süre</p>
                                            <p className="font-medium">
                                                {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} gün
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                                            <MapPin className="h-5 w-5 text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">{t('location')}</p>
                                            <p className="font-medium">{event.location}</p>
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
