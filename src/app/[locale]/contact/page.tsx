import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/shared';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    Facebook,
    Instagram,
    Twitter
} from 'lucide-react';

interface ContactPageProps {
    params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('footer');

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20 pb-16 bg-background">
                {/* Hero Section */}
                <section className="relative py-16 luxury-gradient">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {t('contact')}
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl">
                            Sorularınız mı var? Bize ulaşın, size yardımcı olmaktan mutluluk duyarız.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <Card>
                            <CardContent className="p-6 md:p-8">
                                <h2 className="text-2xl font-semibold mb-6">Bize Mesaj Gönderin</h2>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Ad Soyad *</Label>
                                            <Input id="name" placeholder="Adınız Soyadınız" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">E-posta *</Label>
                                            <Input id="email" type="email" placeholder="ornek@email.com" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Konu</Label>
                                        <Input id="subject" placeholder="Mesajınızın konusu" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Mesaj *</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Mesajınızı buraya yazın..."
                                            rows={5}
                                            required
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-gold hover:bg-gold-light text-black">
                                        <Send className="h-4 w-4 me-2" />
                                        Mesaj Gönder
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-4">İletişim Bilgileri</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                                                <MapPin className="h-5 w-5 text-gold" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{t('address')}</p>
                                                <p className="text-muted-foreground">
                                                    Atatürk Bulvarı No: 123<br />
                                                    İstanbul, Türkiye
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                                                <Phone className="h-5 w-5 text-gold" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{t('phone')}</p>
                                                <a href="tel:+902121234567" className="text-muted-foreground hover:text-gold transition-colors">
                                                    +90 212 123 45 67
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                                                <Mail className="h-5 w-5 text-gold" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{t('email')}</p>
                                                <a href="mailto:info@avmplatform.com" className="text-muted-foreground hover:text-gold transition-colors">
                                                    info@avmplatform.com
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                                                <Clock className="h-5 w-5 text-gold" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{t('workingHours')}</p>
                                                <p className="text-muted-foreground">
                                                    10:00 - 22:00
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Social Media Card */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-4">{t('followUs')}</h3>
                                    <div className="flex gap-3">
                                        <a
                                            href="#"
                                            className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
                                        >
                                            <Facebook className="h-5 w-5" />
                                        </a>
                                        <a
                                            href="#"
                                            className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
                                        >
                                            <Instagram className="h-5 w-5" />
                                        </a>
                                        <a
                                            href="#"
                                            className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
                                        >
                                            <Twitter className="h-5 w-5" />
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Map Placeholder */}
                            <Card>
                                <CardContent className="p-0 h-[200px] bg-accent flex items-center justify-center">
                                    <div className="text-center text-muted-foreground">
                                        <MapPin className="h-8 w-8 mx-auto mb-2" />
                                        <p>Harita</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
