import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getUpcomingEvents, getPastEvents } from '@/lib/data';
import { Link } from '@/i18n/navigation';
import { Header, Footer } from '@/components/shared';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Locale } from '@/lib/types';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';

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
                {/* Hero Section */}
                <section className="relative py-16 luxury-gradient">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl">
                            Kaçırılmayacak etkinlikler ve özel organizasyonlar
                        </p>
                    </div>
                </section>

                {/* Events Content */}
                <section className="container mx-auto px-4 py-8">
                    <Tabs defaultValue="upcoming" className="w-full">
                        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                            <TabsTrigger value="upcoming" className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {t('upcoming')} ({upcomingEvents.length})
                            </TabsTrigger>
                            <TabsTrigger value="past" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {t('past')} ({pastEvents.length})
                            </TabsTrigger>
                        </TabsList>

                        {/* Upcoming Events */}
                        <TabsContent value="upcoming">
                            {upcomingEvents.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {upcomingEvents.map((event) => (
                                        <Link key={event.id} href={`/events/${event.slug}`} className="group">
                                            <Card className="h-full overflow-hidden border-border/50 hover:border-gold/50 transition-all hover:shadow-lg">
                                                {/* Image */}
                                                <div className="relative h-48 bg-gradient-to-br from-accent to-muted overflow-hidden">
                                                    {event.image ? (
                                                        <img
                                                            src={event.image}
                                                            alt={event.title[locale as Locale]}
                                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Calendar className="h-16 w-16 text-gold/50" />
                                                        </div>
                                                    )}

                                                    {/* Date Badge */}
                                                    <div className="absolute top-3 start-3 bg-gold text-black rounded-lg px-3 py-2 font-semibold">
                                                        <div className="text-xs">
                                                            {new Date(event.startDate).toLocaleDateString(locale, { month: 'short' })}
                                                        </div>
                                                        <div className="text-xl leading-none">
                                                            {new Date(event.startDate).getDate()}
                                                        </div>
                                                    </div>
                                                </div>

                                                <CardContent className="p-4">
                                                    <h3 className="font-semibold text-lg mb-2 group-hover:text-gold transition-colors line-clamp-2">
                                                        {event.title[locale as Locale]}
                                                    </h3>

                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                                        <MapPin className="h-4 w-4" />
                                                        {event.location}
                                                    </div>

                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                                        {event.description[locale as Locale]}
                                                    </p>

                                                    <div className="flex items-center text-sm font-medium text-gold">
                                                        Detayları Gör
                                                        <ArrowRight className="h-4 w-4 ms-1 transition-transform group-hover:translate-x-1" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <Calendar className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                                    <p className="text-lg text-muted-foreground">
                                        {t('noUpcoming')}
                                    </p>
                                </div>
                            )}
                        </TabsContent>

                        {/* Past Events */}
                        <TabsContent value="past">
                            {pastEvents.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {pastEvents.map((event) => (
                                        <Card key={event.id} className="h-full overflow-hidden opacity-70">
                                            <div className="relative h-48 bg-gradient-to-br from-accent to-muted grayscale">
                                                {event.image ? (
                                                    <img
                                                        src={event.image}
                                                        alt={event.title[locale as Locale]}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Calendar className="h-16 w-16 text-muted-foreground/50" />
                                                    </div>
                                                )}

                                                <Badge className="absolute top-3 end-3 bg-black/50 text-white border-0">
                                                    Sona Erdi
                                                </Badge>
                                            </div>

                                            <CardContent className="p-4">
                                                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                                    {event.title[locale as Locale]}
                                                </h3>

                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(event.startDate).toLocaleDateString(locale, {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-lg text-muted-foreground">
                                        Geçmiş etkinlik bulunmuyor
                                    </p>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </section>
            </main>

            <Footer />
        </>
    );
}
