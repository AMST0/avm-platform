"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, ArrowRight, Clock, Info, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { Event, Locale } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface EventsClientProps {
    upcomingEvents: Event[];
    pastEvents: Event[];
    locale: string;
    translations: {
        upcoming: string;
        past: string;
        noUpcoming: string;
    };
}

export function EventsClient({ upcomingEvents, pastEvents, locale, translations }: EventsClientProps) {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    return (
        <section className="container mx-auto px-4 py-8">
            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                    <TabsTrigger value="upcoming" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {translations.upcoming} ({upcomingEvents.length})
                    </TabsTrigger>
                    <TabsTrigger value="past" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {translations.past} ({pastEvents.length})
                    </TabsTrigger>
                </TabsList>

                {/* Upcoming Events */}
                <TabsContent value="upcoming">
                    {upcomingEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {upcomingEvents.map((event) => (
                                <div key={event.id} onClick={() => setSelectedEvent(event)} className="group cursor-pointer">
                                    <Card className="h-full overflow-hidden border-border/50 hover:border-gold/50 transition-all hover:shadow-lg">
                                        {/* Image */}
                                        <div className="relative aspect-[16/9] bg-accent overflow-hidden">
                                            {event.image ? (
                                                <img
                                                    src={event.image}
                                                    alt={event.title[locale as Locale]}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-accent">
                                                    <Calendar className="h-16 w-16 text-gold/50" />
                                                </div>
                                            )}

                                            {/* Date Badge */}
                                            <div className="absolute top-3 start-3 bg-gold text-black rounded-lg px-3 py-2 font-semibold shadow-lg">
                                                <div className="text-xs uppercase">
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

                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 font-medium">
                                                <MapPin className="h-4 w-4 text-gold" />
                                                {event.location}
                                            </div>

                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                                                {event.description[locale as Locale]}
                                            </p>

                                            <div className="flex items-center text-sm font-bold text-gold uppercase tracking-wider">
                                                Detayları Gör
                                                <ArrowRight className="h-4 w-4 ms-1 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-border/50">
                            <Calendar className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                            <p className="text-lg text-muted-foreground font-medium">
                                {translations.noUpcoming}
                            </p>
                        </div>
                    )}
                </TabsContent>

                {/* Past Events */}
                <TabsContent value="past">
                    {pastEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pastEvents.map((event) => (
                                <Card key={event.id} className="h-full overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="relative aspect-[16/9] bg-accent flex items-center justify-center grayscale">
                                        {event.image ? (
                                            <img
                                                src={event.image}
                                                alt={event.title[locale as Locale]}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-accent">
                                                <Calendar className="h-16 w-16 text-muted-foreground/50" />
                                            </div>
                                        )}

                                        <Badge className="absolute top-3 end-3 bg-black/80 text-white border-white/20 uppercase text-[10px] tracking-widest px-3">
                                            Sona Erdi
                                        </Badge>
                                    </div>

                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                            {event.title[locale as Locale]}
                                        </h3>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(event.startDate).toLocaleDateString(locale, {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-border/50">
                            <p className="text-lg text-muted-foreground font-medium">
                                Geçmiş etkinlik bulunmuyor
                            </p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* Event Detail Dialog */}
            <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
                <DialogContent className="max-w-3xl p-0 border-gold/20 bg-navy/95 backdrop-blur-xl text-white overflow-hidden shadow-2xl">
                    {selectedEvent && (
                        <div className="flex flex-col">
                            {/* Header Image */}
                            <div className="relative aspect-[16/9] bg-accent flex items-center justify-center border-b border-gold/10 overflow-hidden">
                                <img
                                    src={selectedEvent.image}
                                    alt={selectedEvent.title[locale as Locale]}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <Badge className="bg-gold text-black border-0 uppercase font-black tracking-tighter text-xs">
                                        ETKİNLİK
                                    </Badge>
                                    {new Date(selectedEvent.endDate) >= new Date() ? (
                                        <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 uppercase text-[10px]">
                                            YAKLAŞAN
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="border-red-500/50 text-red-400 uppercase text-[10px]">
                                            GEÇMİŞ
                                        </Badge>
                                    )}
                                </div>

                                <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tighter">
                                    {selectedEvent.title[locale as Locale]}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                                            <Calendar className="h-6 w-6 text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">Tarih</p>
                                            <p className="font-semibold">
                                                {new Date(selectedEvent.startDate).toLocaleDateString(locale, {
                                                    day: 'numeric',
                                                    month: 'long',
                                                })}{' - '}
                                                {new Date(selectedEvent.endDate).toLocaleDateString(locale, {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                                            <MapPin className="h-6 w-6 text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">Konum</p>
                                            <p className="font-semibold">{selectedEvent.location}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <p className="text-white/70 leading-relaxed whitespace-pre-line text-lg">
                                        {selectedEvent.description[locale as Locale]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
